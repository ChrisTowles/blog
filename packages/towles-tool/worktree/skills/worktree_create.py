#!/usr/bin/env python3
"""Create a new worktree with slot allocation."""
from __future__ import annotations

import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

from lib.registry import (
    read_registry,
    write_registry,
    find_free_slot,
    find_slot_by_issue,
    find_slot_by_branch,
    allocate_slot,
)
from lib.slots import read_slots, get_slot_config
from lib.env import (
    get_template_files,
    get_output_filename,
    process_template,
    read_env_file,
    find_main_env_files,
)
from lib.git import (
    get_main_branch,
    branch_exists,
    create_branch,
    create_worktree,
)
from lib.github import fetch_issue, create_branch_name
from lib.ports import check_ports, extract_ports_from_slot
from lib.paths import (
    get_worktrees_dir,
    get_config_dir,
    get_worktree_path,
    get_relative_path,
    worktree_name_from_branch,
    config_exists,
)


@dataclass
class CreateResult:
    success: bool
    slot: int
    branch: str
    worktree_path: str
    relative_path: str
    port_warnings: list[str]
    env_warnings: list[str]


def create(
    main_repo_dir: Path,
    input_arg: str | int,
    dry_run: bool = False,
) -> CreateResult:
    """Create a new worktree with slot allocation."""
    worktrees_dir = get_worktrees_dir(main_repo_dir)
    config_dir = get_config_dir(worktrees_dir)

    # Check config exists
    if not config_exists(worktrees_dir):
        raise RuntimeError("No worktree config found. Run /worktree:init first.")

    # Read registry and slots
    registry = read_registry(worktrees_dir)
    slots_config = read_slots(worktrees_dir)

    # Determine branch name
    branch: str
    issue_number: Optional[int] = None

    input_str = str(input_arg)
    if input_str.isdigit():
        issue_number = int(input_str)

        # Check if already exists
        existing = find_slot_by_issue(registry, issue_number)
        if existing:
            raise RuntimeError(f"Worktree for issue #{issue_number} already exists (slot {existing.slot})")

        # Fetch issue from GitHub
        issue = fetch_issue(issue_number)
        if not issue:
            raise RuntimeError(f"GitHub issue #{issue_number} not found")
        branch = create_branch_name(issue_number, issue.title)
        print(f"Issue #{issue_number}: {issue.title}")
    else:
        branch = input_str
        # Check if branch already has worktree
        existing = find_slot_by_branch(registry, branch)
        if existing:
            raise RuntimeError(f'Worktree for branch "{branch}" already exists (slot {existing.slot})')

    # Find free slot
    free_slot = find_free_slot(registry)
    if not free_slot:
        raise RuntimeError(f"All {registry.slot_count} slots in use. Remove a worktree first.")

    slot_config = get_slot_config(slots_config, free_slot.slot)
    if not slot_config:
        raise RuntimeError(f"Slot {free_slot.slot} not defined in slots.toml")

    # Check ports
    ports = extract_ports_from_slot(slot_config)
    port_status = check_ports(ports)
    port_warnings = [f"Port {port} appears to be in use" for port, in_use in port_status.items() if in_use]

    worktree_name = worktree_name_from_branch(branch)
    worktree_path = get_worktree_path(worktrees_dir, worktree_name)
    relative_path = get_relative_path(main_repo_dir, worktree_path)

    print("\nCreating worktree:")
    print(f"  Branch: {branch}")
    print(f"  Slot: {free_slot.slot}")
    print(f"  Path: {relative_path}")

    if dry_run:
        print("\n[DRY RUN] Would create worktree and process templates")
        return CreateResult(
            success=True,
            slot=free_slot.slot,
            branch=branch,
            worktree_path=str(worktree_path),
            relative_path=relative_path,
            port_warnings=port_warnings,
            env_warnings=[],
        )

    # Create branch if needed
    main_branch = get_main_branch(main_repo_dir)
    if not branch_exists(branch, main_repo_dir):
        print(f"Creating branch from {main_branch}...")
        create_branch(branch, main_branch, main_repo_dir)

    # Create worktree
    print("Creating worktree...")
    create_worktree(worktree_path, branch, main_repo_dir)

    # Process templates
    print("Processing .env templates...")
    template_files = get_template_files(config_dir)
    main_env_files = find_main_env_files(main_repo_dir)
    main_env_vars: dict[str, str] = {}
    for env_file in main_env_files:
        main_env_vars.update(read_env_file(env_file))

    env_warnings: list[str] = []
    for template_path in template_files:
        template_content = template_path.read_text()
        content, warnings = process_template(template_content, slot_config, main_env_vars)
        env_warnings.extend(warnings)

        output_name = get_output_filename(template_path)
        output_path = worktree_path / output_name
        output_path.write_text(content)
        print(f"  ✓ Created {output_name}")

    # Update registry
    allocate_slot(registry, free_slot.slot, issue_number, branch, worktree_name)
    write_registry(worktrees_dir, registry)

    return CreateResult(
        success=True,
        slot=free_slot.slot,
        branch=branch,
        worktree_path=str(worktree_path),
        relative_path=relative_path,
        port_warnings=port_warnings,
        env_warnings=env_warnings,
    )


def main() -> None:
    args = sys.argv[1:]
    dry_run = "--dry-run" in args
    args = [a for a in args if not a.startswith("--")]

    if not args:
        print("Usage: worktree_create.py <issue-number|branch-name> [--dry-run]", file=sys.stderr)
        sys.exit(1)

    try:
        result = create(Path.cwd(), args[0], dry_run=dry_run)
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

    except Exception as e:
        print(f"\n❌ Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
