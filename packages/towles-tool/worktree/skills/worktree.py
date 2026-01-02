#!/usr/bin/env python3
"""Unified worktree CLI with slot allocation."""
from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Literal, Optional

from lib.constants import SLOTS_CONFIG_FILE, SLOTS_SCHEMA_FILE, SLOT_PREFIX
from lib.env import (
    find_main_env_files,
    get_output_filename,
    get_template_files,
    process_template,
    read_env_file,
)
from lib.git import (
    branch_exists,
    create_branch,
    create_worktree,
    delete_branch,
    get_main_branch,
    get_repo_name,
    has_uncommitted_changes,
    is_branch_merged,
    list_worktrees,
    remove_worktree,
    stash_changes,
)
from lib.github import create_branch_name, fetch_issue
from lib.paths import (
    config_exists,
    ensure_dir,
    get_config_dir,
    get_relative_path,
    get_worktree_path,
    get_worktrees_dir,
    worktree_name_from_branch,
)
from lib.ports import check_ports, extract_ports_from_slot
from lib.registry import (
    add_slot,
    allocate_slot,
    create_empty_registry,
    find_free_slot,
    find_slot_by_branch,
    find_slot_by_issue,
    free_slot,
    read_registry,
    registry_exists,
    write_registry,
)
from lib.slots import (
    generate_slots_json,
    generate_slots_schema,
    get_slot_config,
    get_slots_path,
    get_slots_schema_path,
    next_slot_name,
    read_slots,
)


# ============================================================================
# Data classes
# ============================================================================


@dataclass
class CreateResult:
    success: bool
    slot: str
    branch: str
    worktree_path: str
    relative_path: str
    port_warnings: list[str]
    env_warnings: list[str]


@dataclass
class RemoveResult:
    success: bool
    slot: str
    branch: str
    worktree_path: str
    stashed: bool
    branch_deleted: bool


@dataclass
class SlotDisplay:
    slot: str
    issue: str
    branch: str
    path: str
    port: str
    status: Literal["active", "free", "stale"]


@dataclass
class EnvTemplateConfig:
    source: Path
    slot_vars: list[str]
    copy_vars: list[str]


@dataclass
class InitConfig:
    slot_count: int
    slot_vars: list[str]
    slot_values: list[dict[str, Any]]
    env_templates: list[EnvTemplateConfig]
    copy_from_root_repo: list[str] = field(default_factory=list)


# ============================================================================
# Core functions
# ============================================================================


def create(
    main_repo_dir: Path,
    input_arg: str | int,
    dry_run: bool = False,
) -> CreateResult:
    """Create a new worktree with slot allocation."""
    worktrees_dir = get_worktrees_dir(main_repo_dir)
    config_dir = get_config_dir(worktrees_dir)

    if not config_exists(worktrees_dir):
        raise RuntimeError("No worktree config found. Run 'worktree init' first.")

    registry = read_registry(worktrees_dir)
    slots_config = read_slots(worktrees_dir)

    branch: str
    issue_number: Optional[int] = None

    input_str = str(input_arg)
    if input_str.isdigit():
        issue_number = int(input_str)
        existing = find_slot_by_issue(registry, issue_number)
        if existing:
            raise RuntimeError(f"Worktree for issue #{issue_number} already exists (slot {existing.slot})")

        issue = fetch_issue(issue_number)
        if not issue:
            raise RuntimeError(f"GitHub issue #{issue_number} not found")
        branch = create_branch_name(issue_number, issue.title)
        print(f"Issue #{issue_number}: {issue.title}")
    else:
        branch = input_str
        existing = find_slot_by_branch(registry, branch)
        if existing:
            raise RuntimeError(f'Worktree for branch "{branch}" already exists (slot {existing.slot})')

    free_slot_assignment = find_free_slot(registry)

    if not free_slot_assignment:
        new_slot_name = next_slot_name(slots_config)
        free_slot_assignment = add_slot(registry, new_slot_name)
        print(f"Auto-generated new slot: {new_slot_name}")

    slot_config = get_slot_config(slots_config, free_slot_assignment.slot)
    if not slot_config:
        print(f"Warning: Slot {free_slot_assignment.slot} not defined in slots.config.json, using empty config")
        slot_config = None

    port_warnings: list[str] = []
    if slot_config:
        ports = extract_ports_from_slot(slot_config)
        port_status = check_ports(ports)
        port_warnings = [f"Port {port} appears to be in use" for port, in_use in port_status.items() if in_use]

    worktree_name = worktree_name_from_branch(branch)
    worktree_path = get_worktree_path(worktrees_dir, worktree_name)
    relative_path = get_relative_path(main_repo_dir, worktree_path)

    print("\nCreating worktree:")
    print(f"  Branch: {branch}")
    print(f"  Slot: {free_slot_assignment.slot}")
    print(f"  Path: {relative_path}")

    if dry_run:
        print("\n[DRY RUN] Would create worktree and process templates")
        return CreateResult(
            success=True,
            slot=free_slot_assignment.slot,
            branch=branch,
            worktree_path=str(worktree_path),
            relative_path=relative_path,
            port_warnings=port_warnings,
            env_warnings=[],
        )

    main_branch = get_main_branch(main_repo_dir)
    if not branch_exists(branch, main_repo_dir):
        print(f"Creating branch from {main_branch}...")
        create_branch(branch, main_branch, main_repo_dir)

    print("Creating worktree...")
    create_worktree(worktree_path, branch, main_repo_dir)

    print("Processing .env templates...")
    template_files = get_template_files(config_dir)

    main_env_vars: dict[str, str] = {}
    if slots_config.copy_from_root_repo:
        for env_filename in slots_config.copy_from_root_repo:
            env_path = main_repo_dir / env_filename
            if env_path.exists():
                main_env_vars.update(read_env_file(env_path))
            else:
                print(f"  Warning: {env_filename} not found in root repo")

    env_warnings: list[str] = []
    for template_path in template_files:
        template_content = template_path.read_text()
        if slot_config:
            content, warnings = process_template(template_content, slot_config, main_env_vars)
        else:
            content, warnings = process_template(template_content, None, main_env_vars)
        env_warnings.extend(warnings)

        output_name = get_output_filename(template_path)
        output_path = worktree_path / output_name
        output_path.write_text(content)
        print(f"  ✓ Created {output_name}")

    allocate_slot(registry, free_slot_assignment.slot, issue_number, branch, worktree_name)
    write_registry(worktrees_dir, registry)

    return CreateResult(
        success=True,
        slot=free_slot_assignment.slot,
        branch=branch,
        worktree_path=str(worktree_path),
        relative_path=relative_path,
        port_warnings=port_warnings,
        env_warnings=env_warnings,
    )


def remove(
    main_repo_dir: Path,
    input_arg: str | int,
    dry_run: bool = False,
    force: bool = False,
    stash: bool = False,
    delete_branch_flag: bool = False,
) -> RemoveResult:
    """Remove a worktree and free its slot."""
    worktrees_dir = get_worktrees_dir(main_repo_dir)

    if not config_exists(worktrees_dir):
        raise RuntimeError("No worktree config found. Run 'worktree init' first.")

    registry = read_registry(worktrees_dir)

    input_str = str(input_arg)
    if input_str.isdigit():
        issue_number = int(input_str)
        assignment = find_slot_by_issue(registry, issue_number)
        if not assignment:
            raise RuntimeError(f"No worktree found for issue #{issue_number}")
    else:
        assignment = find_slot_by_branch(registry, input_str)
        if not assignment:
            raise RuntimeError(f'No worktree found for branch "{input_str}"')

    if not assignment.worktree or not assignment.branch:
        raise RuntimeError(f"Slot {assignment.slot} is not assigned")

    worktree_path = get_worktree_path(worktrees_dir, assignment.worktree)
    relative_path = get_relative_path(main_repo_dir, worktree_path)
    branch = assignment.branch

    print("\nRemoving worktree:")
    print(f"  Slot: {assignment.slot}")
    print(f"  Branch: {branch}")
    print(f"  Path: {relative_path}")

    stashed = False
    if worktree_path.exists() and has_uncommitted_changes(worktree_path):
        if stash:
            print("\nStashing uncommitted changes...")
            if not dry_run:
                stash_changes(worktree_path, f"worktree-remove: {branch}")
                stashed = True
        elif not force:
            raise RuntimeError(
                "Worktree has uncommitted changes. Use --stash to stash them or --force to discard."
            )

    main_branch = get_main_branch(main_repo_dir)
    merged = is_branch_merged(branch, main_branch, main_repo_dir)
    branch_deleted = False

    if not merged and delete_branch_flag and not force:
        raise RuntimeError(
            f'Branch "{branch}" is not merged into {main_branch}. Use --force to delete anyway.'
        )

    if dry_run:
        print("\n[DRY RUN] Would remove worktree and free slot")
        if delete_branch_flag:
            print(f"[DRY RUN] Would delete branch: {branch}")
        return RemoveResult(
            success=True,
            slot=assignment.slot,
            branch=branch,
            worktree_path=str(worktree_path),
            stashed=stashed,
            branch_deleted=False,
        )

    if worktree_path.exists():
        print("Removing worktree...")
        remove_worktree(worktree_path, force, main_repo_dir)
    else:
        print("Worktree path does not exist (stale entry)")

    if delete_branch_flag:
        print(f"Deleting branch {branch}...")
        delete_branch(branch, force or not merged, main_repo_dir)
        branch_deleted = True

    free_slot(registry, assignment.slot)
    write_registry(worktrees_dir, registry)

    return RemoveResult(
        success=True,
        slot=assignment.slot,
        branch=branch,
        worktree_path=str(worktree_path),
        stashed=stashed,
        branch_deleted=branch_deleted,
    )


def list_slots(main_repo_dir: Path) -> list[SlotDisplay]:
    """List all slots and their status."""
    worktrees_dir = get_worktrees_dir(main_repo_dir)

    if not config_exists(worktrees_dir):
        raise RuntimeError("No worktree config found. Run 'worktree init' first.")

    if not registry_exists(worktrees_dir):
        raise RuntimeError("No registry found. Run 'worktree init' first.")

    registry = read_registry(worktrees_dir)
    slots_config = read_slots(worktrees_dir)
    git_worktrees = list_worktrees(main_repo_dir)

    results: list[SlotDisplay] = []

    for assignment in registry.assignments:
        slot_config = get_slot_config(slots_config, assignment.slot)
        port = slot_config.get("PORT") if slot_config else "-"

        if assignment.worktree is None:
            results.append(
                SlotDisplay(
                    slot=assignment.slot,
                    issue="-",
                    branch="-",
                    path="-",
                    port=str(port) if port else "-",
                    status="free",
                )
            )
        else:
            worktree_path = worktrees_dir / assignment.worktree
            exists = any(w.path == str(worktree_path) for w in git_worktrees)

            results.append(
                SlotDisplay(
                    slot=assignment.slot,
                    issue=f"#{assignment.issue}" if assignment.issue else "-",
                    branch=assignment.branch or "-",
                    path=get_relative_path(main_repo_dir, worktree_path),
                    port=str(port) if port else "-",
                    status="active" if exists else "stale",
                )
            )

    return results


def generate_env_template(
    env_content: str,
    slot_vars: list[str],
    copy_vars: list[str],
) -> str:
    """Convert .env content to .env.template with placeholders."""
    result = env_content
    for var_name in slot_vars:
        pattern = rf"^({var_name})=.*$"
        result = re.sub(pattern, rf"\1={{{{{var_name}}}}}", result, flags=re.MULTILINE)
    for var_name in copy_vars:
        pattern = rf"^({var_name})=.*$"
        result = re.sub(pattern, rf"\1={{{{COPY:{var_name}}}}}", result, flags=re.MULTILINE)
    return result


def init(main_repo_dir: Path, config: InitConfig) -> None:
    """Initialize worktree config for a repository."""
    repo_name = get_repo_name(main_repo_dir)
    worktrees_dir = get_worktrees_dir(main_repo_dir)
    config_dir = get_config_dir(worktrees_dir)

    print(f"\nInitializing worktree config for: {repo_name}")
    print(f"Config location: {worktrees_dir}/config/")

    ensure_dir(config_dir)

    slots: dict[str, dict[str, Any]] = {}
    for i in range(config.slot_count):
        slot_name = f"{SLOT_PREFIX}{i + 1}"
        slot_values: dict[str, Any] = {}
        for var_name in config.slot_vars:
            if i < len(config.slot_values):
                slot_values[var_name] = config.slot_values[i].get(var_name, "")
            else:
                slot_values[var_name] = ""
        slots[slot_name] = slot_values

    slots_json = generate_slots_json(slots, copy_from_root_repo=config.copy_from_root_repo or None)
    get_slots_path(worktrees_dir).write_text(slots_json)
    print(f"✓ Created {SLOTS_CONFIG_FILE}")

    schema_json = generate_slots_schema()
    get_slots_schema_path(worktrees_dir).write_text(schema_json)
    print(f"✓ Created {SLOTS_SCHEMA_FILE}")

    for template in config.env_templates:
        env_content = template.source.read_text()
        template_content = generate_env_template(
            env_content,
            template.slot_vars,
            template.copy_vars,
        )
        output_name = template.source.name + ".template"
        (config_dir / output_name).write_text(template_content)
        print(f"✓ Created {output_name}")

    registry = create_empty_registry(repo_name, config.slot_count)
    write_registry(worktrees_dir, registry)
    print("✓ Created .worktree-registry.json")

    print("\n✅ Worktree config initialized!")
    print("\nNext steps:")
    print(f"1. Review and edit config/{SLOTS_CONFIG_FILE} with your slot values")
    print("2. Review config/*.template files")
    print("3. Use 'worktree create <issue>' to create worktrees")


# ============================================================================
# CLI helpers
# ============================================================================


def format_table(slots: list[SlotDisplay]) -> str:
    """Format slots as ASCII table."""
    header = "Slot    | Issue | Branch                    | Path                              | PORT | Status"
    separator = "--------|-------|---------------------------|-----------------------------------|------|--------"

    rows = []
    for s in slots:
        slot_name = s.slot.ljust(7)
        issue = s.issue.ljust(5)
        branch = s.branch[:25].ljust(25)
        path = s.path[:33].ljust(33)
        port = str(s.port).ljust(4)
        status = "stale ⚠️" if s.status == "stale" else s.status
        rows.append(f"{slot_name} | {issue} | {branch} | {path} | {port} | {status}")

    return "\n".join([header, separator, *rows])


# ============================================================================
# Command handlers
# ============================================================================


def cmd_create(args: argparse.Namespace) -> int:
    try:
        result = create(Path.cwd(), args.target, dry_run=args.dry_run)
        print("\n✅ Worktree created!")
        print(f"\nSlot {result.slot} assigned")
        print(f"Path: {result.relative_path}")

        if result.port_warnings:
            print("\n⚠️  Port warnings:")
            for w in result.port_warnings:
                print(f"  - {w}")

        if result.env_warnings:
            print("\n⚠️  Template warnings:")
            for w in result.env_warnings:
                print(f"  - {w}")

        print("\nNext steps:")
        print(f"  cd {result.relative_path}")
        print("  pnpm install  # or npm install")
        print("  pnpm dev      # start development")
        return 0
    except Exception as e:
        print(f"\n❌ Error: {e}", file=sys.stderr)
        return 1


def cmd_delete(args: argparse.Namespace) -> int:
    try:
        result = remove(
            Path.cwd(),
            args.target,
            dry_run=args.dry_run,
            force=args.force,
            stash=args.stash,
            delete_branch_flag=args.delete_branch,
        )

        print("\n✅ Worktree deleted!")
        print(f"\nSlot {result.slot} freed")

        if result.stashed:
            print("Changes stashed. Recover with: git stash list")
        if result.branch_deleted:
            print(f"Branch {result.branch} deleted")
        return 0
    except Exception as e:
        print(f"\n❌ Error: {e}", file=sys.stderr)
        return 1


def cmd_list(args: argparse.Namespace) -> int:
    try:
        slots = list_slots(Path.cwd())
        print("\nWorktree Slots:\n")
        print(format_table(slots))

        active = sum(1 for s in slots if s.status == "active")
        free = sum(1 for s in slots if s.status == "free")
        stale = sum(1 for s in slots if s.status == "stale")

        summary = f"\nSummary: {active} active, {free} free"
        if stale > 0:
            summary += f", {stale} stale"
        print(summary)

        if stale > 0:
            print("\n⚠️  Stale entries exist. The worktree was removed outside this tool.")
            print("   Use 'worktree delete' to clean up the registry.")
        return 0
    except Exception as e:
        print(f"\n❌ Error: {e}", file=sys.stderr)
        return 1


def cmd_init(args: argparse.Namespace) -> int:
    """CLI entry point for init - shows info, actual init is via skill."""
    cwd = Path.cwd()
    main_env_files = find_main_env_files(cwd)

    print("Git Worktree Init")
    print("=================")
    print(f"Repository: {get_repo_name(cwd)}")
    print(f"Found .env files: {len(main_env_files)}")
    for f in main_env_files:
        print(f"  - {f}")
    print("\nThis command is meant to be called by the /worktree:init skill.")
    print("The skill will gather configuration interactively and call init().")
    return 0


# ============================================================================
# Main entry point
# ============================================================================


def main() -> int:
    parser = argparse.ArgumentParser(
        prog="worktree",
        description="Git worktree management with slot allocation",
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    # create
    create_parser = subparsers.add_parser("create", help="Create a new worktree")
    create_parser.add_argument("target", help="Issue number or branch name")
    create_parser.add_argument("--dry-run", action="store_true", help="Preview without creating")

    # delete
    delete_parser = subparsers.add_parser("delete", help="Delete a worktree")
    delete_parser.add_argument("target", help="Issue number or branch name")
    delete_parser.add_argument("--dry-run", action="store_true", help="Preview without deleting")
    delete_parser.add_argument("--stash", action="store_true", help="Stash uncommitted changes")
    delete_parser.add_argument("--force", action="store_true", help="Force deletion")
    delete_parser.add_argument("--delete-branch", action="store_true", help="Also delete the git branch")

    # list
    subparsers.add_parser("list", aliases=["ls"], help="List worktree slots")

    # init
    subparsers.add_parser("init", help="Initialize worktree config (interactive)")

    args = parser.parse_args()

    handlers = {
        "create": cmd_create,
        "delete": cmd_delete,
        "list": cmd_list,
        "ls": cmd_list,
        "init": cmd_init,
    }

    return handlers[args.command](args)


if __name__ == "__main__":
    sys.exit(main())
