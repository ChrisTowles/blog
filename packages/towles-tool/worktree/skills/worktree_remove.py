#!/usr/bin/env python3
"""Remove a worktree and free its slot."""
from __future__ import annotations

import sys
from dataclasses import dataclass
from pathlib import Path

from lib.registry import (
    read_registry,
    write_registry,
    find_slot_by_issue,
    find_slot_by_branch,
    free_slot,
)
from lib.git import (
    get_main_branch,
    is_branch_merged,
    delete_branch,
    remove_worktree,
    has_uncommitted_changes,
    stash_changes,
)
from lib.paths import (
    get_worktrees_dir,
    get_worktree_path,
    get_relative_path,
    config_exists,
)


@dataclass
class RemoveResult:
    success: bool
    slot: int
    branch: str
    worktree_path: str
    stashed: bool
    branch_deleted: bool


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
        raise RuntimeError("No worktree config found. Run /worktree:init first.")

    registry = read_registry(worktrees_dir)

    # Find slot by issue number or branch name
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

    # Check for uncommitted changes
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

    # Check if branch is merged
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

    # Remove worktree
    if worktree_path.exists():
        print("Removing worktree...")
        remove_worktree(worktree_path, force, main_repo_dir)
    else:
        print("Worktree path does not exist (stale entry)")

    # Delete branch if requested
    if delete_branch_flag:
        print(f"Deleting branch {branch}...")
        delete_branch(branch, force or not merged, main_repo_dir)
        branch_deleted = True

    # Free slot in registry
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


def main() -> None:
    args = sys.argv[1:]

    dry_run = "--dry-run" in args
    force = "--force" in args
    stash = "--stash" in args
    delete_branch_flag = "--delete-branch" in args

    positional = [a for a in args if not a.startswith("--")]

    if not positional:
        print("Usage: worktree_remove.py <issue-number|branch-name> [options]", file=sys.stderr)
        print("\nOptions:", file=sys.stderr)
        print("  --dry-run        Preview without removing", file=sys.stderr)
        print("  --stash          Stash uncommitted changes", file=sys.stderr)
        print("  --force          Force removal even with uncommitted changes", file=sys.stderr)
        print("  --delete-branch  Also delete the git branch", file=sys.stderr)
        sys.exit(1)

    try:
        result = remove(
            Path.cwd(),
            positional[0],
            dry_run=dry_run,
            force=force,
            stash=stash,
            delete_branch_flag=delete_branch_flag,
        )

        print("\n✅ Worktree removed!")
        print(f"\nSlot {result.slot} freed")

        if result.stashed:
            print("Changes stashed. Recover with: git stash list")
        if result.branch_deleted:
            print(f"Branch {result.branch} deleted")

    except Exception as e:
        print(f"\n❌ Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
