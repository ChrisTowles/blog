"""Path utilities for worktree management."""
from __future__ import annotations

from pathlib import Path


def get_worktrees_dir(main_repo_dir: Path) -> Path:
    """Get the worktrees sibling directory."""
    repo_name = main_repo_dir.name
    return main_repo_dir.parent / f"{repo_name}-worktrees"


def get_config_dir(worktrees_dir: Path) -> Path:
    return worktrees_dir / "config"


def get_worktree_path(worktrees_dir: Path, worktree_name: str) -> Path:
    return worktrees_dir / worktree_name


def get_relative_path(from_path: Path, to_path: Path) -> str:
    """Get relative path from one location to another."""
    try:
        return str(to_path.relative_to(from_path))
    except ValueError:
        # Not relative, use ../ style
        return str(Path("..") / to_path.relative_to(from_path.parent))


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def worktree_name_from_branch(branch: str) -> str:
    """Convert branch name to worktree folder name.

    feature/142-add-feature -> 142-add-feature
    """
    import re
    return re.sub(r"^[^/]+/", "", branch)


def config_exists(worktrees_dir: Path) -> bool:
    return get_config_dir(worktrees_dir).exists()
