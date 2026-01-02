"""Git operations."""
from __future__ import annotations

import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Optional


def _run(cmd: list[str], cwd: Optional[Path] = None, check: bool = True, capture: bool = True) -> str:
    """Run command and return stdout."""
    result = subprocess.run(
        cmd,
        cwd=cwd,
        capture_output=capture,
        text=True,
        check=check,
    )
    return result.stdout.strip() if capture else ""


def _run_silent(cmd: list[str], cwd: Optional[Path] = None) -> Optional[str]:
    """Run command, return stdout or None on error."""
    try:
        result = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, check=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError:
        return None


@dataclass
class WorktreeInfo:
    path: str
    branch: str
    head: str


def get_repo_name(cwd: Optional[Path] = None) -> str:
    """Get repo name from remote or folder."""
    try:
        remote = _run(["git", "remote", "get-url", "origin"], cwd=cwd)
        import re
        match = re.search(r"/([^/]+?)(?:\.git)?$", remote)
        if match:
            return match.group(1)
    except subprocess.CalledProcessError:
        pass
    return (cwd or Path.cwd()).name


def get_main_branch(cwd: Optional[Path] = None) -> str:
    """Get main branch name (main or master)."""
    if _run_silent(["git", "rev-parse", "--verify", "main"], cwd=cwd) is not None:
        return "main"
    if _run_silent(["git", "rev-parse", "--verify", "master"], cwd=cwd) is not None:
        return "master"
    return "main"


def branch_exists(branch: str, cwd: Optional[Path] = None) -> bool:
    return _run_silent(["git", "rev-parse", "--verify", branch], cwd=cwd) is not None


def create_branch(branch: str, base_branch: str, cwd: Optional[Path] = None) -> None:
    _run(["git", "branch", branch, base_branch], cwd=cwd)


def create_worktree(path: Path, branch: str, cwd: Optional[Path] = None) -> None:
    subprocess.run(["git", "worktree", "add", str(path), branch], cwd=cwd, check=True)


def remove_worktree(path: Path, force: bool = False, cwd: Optional[Path] = None) -> None:
    cmd = ["git", "worktree", "remove"]
    if force:
        cmd.append("--force")
    cmd.append(str(path))
    subprocess.run(cmd, cwd=cwd, check=True)


def list_worktrees(cwd: Optional[Path] = None) -> list[WorktreeInfo]:
    """List all worktrees."""
    output = _run(["git", "worktree", "list", "--porcelain"], cwd=cwd)
    worktrees = []
    current: dict = {}

    for line in output.split("\n"):
        if line.startswith("worktree "):
            if current.get("path"):
                worktrees.append(WorktreeInfo(**current))
            current = {"path": line[9:], "branch": "", "head": ""}
        elif line.startswith("HEAD "):
            current["head"] = line[5:]
        elif line.startswith("branch "):
            current["branch"] = line[7:].replace("refs/heads/", "")

    if current.get("path"):
        worktrees.append(WorktreeInfo(**current))

    return worktrees


def worktree_exists(path: Path, cwd: Optional[Path] = None) -> bool:
    worktrees = list_worktrees(cwd)
    return any(w.path == str(path) for w in worktrees)


def is_branch_merged(branch: str, base_branch: str, cwd: Optional[Path] = None) -> bool:
    try:
        merged = _run(["git", "branch", "--merged", base_branch], cwd=cwd)
        return any(b.strip() == branch for b in merged.split("\n"))
    except subprocess.CalledProcessError:
        return False


def delete_branch(branch: str, force: bool = False, cwd: Optional[Path] = None) -> None:
    flag = "-D" if force else "-d"
    subprocess.run(["git", "branch", flag, branch], cwd=cwd, check=True)


def has_uncommitted_changes(worktree_path: Path) -> bool:
    if not worktree_path.exists():
        return False
    try:
        status = _run(["git", "status", "--porcelain"], cwd=worktree_path)
        return len(status) > 0
    except subprocess.CalledProcessError:
        return False


def stash_changes(worktree_path: Path, message: str) -> None:
    subprocess.run(["git", "stash", "push", "-m", message], cwd=worktree_path, check=True)


def get_current_branch(cwd: Optional[Path] = None) -> str:
    return _run(["git", "branch", "--show-current"], cwd=cwd)
