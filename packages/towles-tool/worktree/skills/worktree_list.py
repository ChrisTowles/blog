#!/usr/bin/env python3
"""List worktree slots and their status."""
from __future__ import annotations

import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Literal

from lib.registry import read_registry, registry_exists
from lib.slots import read_slots, get_slot_config
from lib.git import list_worktrees
from lib.paths import get_worktrees_dir, get_relative_path, config_exists


@dataclass
class SlotDisplay:
    slot: int
    issue: str
    branch: str
    path: str
    port: str
    status: Literal["active", "free", "stale"]


def list_slots(main_repo_dir: Path) -> list[SlotDisplay]:
    """List all slots and their status."""
    worktrees_dir = get_worktrees_dir(main_repo_dir)

    if not config_exists(worktrees_dir):
        raise RuntimeError("No worktree config found. Run /worktree:init first.")

    if not registry_exists(worktrees_dir):
        raise RuntimeError("No registry found. Run /worktree:init first.")

    registry = read_registry(worktrees_dir)
    slots_config = read_slots(worktrees_dir)
    git_worktrees = list_worktrees(main_repo_dir)

    results: list[SlotDisplay] = []

    for assignment in registry.assignments:
        slot_config = get_slot_config(slots_config, assignment.slot)
        port = slot_config.get("PORT") if slot_config else "-"

        if assignment.worktree is None:
            # Free slot
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
            # Check if worktree actually exists
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


def format_table(slots: list[SlotDisplay]) -> str:
    """Format slots as ASCII table."""
    header = "Slot | Issue | Branch                    | Path                              | PORT | Status"
    separator = "-----|-------|---------------------------|-----------------------------------|------|--------"

    rows = []
    for s in slots:
        issue = s.issue.ljust(5)
        branch = s.branch[:25].ljust(25)
        path = s.path[:33].ljust(33)
        port = str(s.port).ljust(4)
        status = "stale ⚠️" if s.status == "stale" else s.status
        rows.append(f"{s.slot}    | {issue} | {branch} | {path} | {port} | {status}")

    return "\n".join([header, separator, *rows])


def main() -> None:
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
            print("   Use /worktree:remove to clean up the registry.")

    except Exception as e:
        print(f"\n❌ Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
