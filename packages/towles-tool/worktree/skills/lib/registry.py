"""Registry for tracking worktree slot assignments."""
from __future__ import annotations

import json
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Optional


@dataclass
class SlotAssignment:
    slot: int
    issue: Optional[int] = None
    branch: Optional[str] = None
    worktree: Optional[str] = None
    created_at: Optional[str] = None

    def to_dict(self) -> dict:
        return {
            "slot": self.slot,
            "issue": self.issue,
            "branch": self.branch,
            "worktree": self.worktree,
            "createdAt": self.created_at,
        }

    @classmethod
    def from_dict(cls, data: dict) -> SlotAssignment:
        return cls(
            slot=data["slot"],
            issue=data.get("issue"),
            branch=data.get("branch"),
            worktree=data.get("worktree"),
            created_at=data.get("createdAt"),
        )


@dataclass
class WorktreeRegistry:
    repo_name: str
    slot_count: int
    assignments: list[SlotAssignment]

    def to_dict(self) -> dict:
        return {
            "repoName": self.repo_name,
            "slotCount": self.slot_count,
            "assignments": [a.to_dict() for a in self.assignments],
        }

    @classmethod
    def from_dict(cls, data: dict) -> WorktreeRegistry:
        return cls(
            repo_name=data["repoName"],
            slot_count=data["slotCount"],
            assignments=[SlotAssignment.from_dict(a) for a in data["assignments"]],
        )


def get_registry_path(worktrees_dir: Path) -> Path:
    return worktrees_dir / ".worktree-registry.json"


def registry_exists(worktrees_dir: Path) -> bool:
    return get_registry_path(worktrees_dir).exists()


def read_registry(worktrees_dir: Path) -> WorktreeRegistry:
    path = get_registry_path(worktrees_dir)
    if not path.exists():
        raise FileNotFoundError(f"Registry not found at {path}. Run /worktree:init first.")
    data = json.loads(path.read_text())
    return WorktreeRegistry.from_dict(data)


def write_registry(worktrees_dir: Path, registry: WorktreeRegistry) -> None:
    path = get_registry_path(worktrees_dir)
    path.write_text(json.dumps(registry.to_dict(), indent=2) + "\n")


def create_empty_registry(repo_name: str, slot_count: int) -> WorktreeRegistry:
    assignments = [SlotAssignment(slot=i) for i in range(1, slot_count + 1)]
    return WorktreeRegistry(repo_name=repo_name, slot_count=slot_count, assignments=assignments)


def find_free_slot(registry: WorktreeRegistry) -> Optional[SlotAssignment]:
    for a in registry.assignments:
        if a.worktree is None:
            return a
    return None


def find_slot_by_issue(registry: WorktreeRegistry, issue: int) -> Optional[SlotAssignment]:
    for a in registry.assignments:
        if a.issue == issue:
            return a
    return None


def find_slot_by_branch(registry: WorktreeRegistry, branch: str) -> Optional[SlotAssignment]:
    for a in registry.assignments:
        if a.branch == branch:
            return a
    return None


def find_slot_by_worktree(registry: WorktreeRegistry, worktree: str) -> Optional[SlotAssignment]:
    for a in registry.assignments:
        if a.worktree == worktree:
            return a
    return None


def allocate_slot(
    registry: WorktreeRegistry,
    slot_number: int,
    issue: Optional[int],
    branch: str,
    worktree_name: str,
) -> None:
    slot = next((a for a in registry.assignments if a.slot == slot_number), None)
    if slot is None:
        raise ValueError(f"Slot {slot_number} not found")
    if slot.worktree is not None:
        raise ValueError(f"Slot {slot_number} already in use")

    slot.issue = issue
    slot.branch = branch
    slot.worktree = worktree_name
    slot.created_at = datetime.now().isoformat()


def free_slot(registry: WorktreeRegistry, slot_number: int) -> None:
    slot = next((a for a in registry.assignments if a.slot == slot_number), None)
    if slot is None:
        raise ValueError(f"Slot {slot_number} not found")

    slot.issue = None
    slot.branch = None
    slot.worktree = None
    slot.created_at = None
