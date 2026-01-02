"""GitHub operations via gh CLI."""
from __future__ import annotations

import json
import re
import subprocess
from dataclasses import dataclass
from typing import Optional


@dataclass
class GithubIssue:
    number: int
    title: str
    state: str


def fetch_issue(issue_number: int) -> Optional[GithubIssue]:
    """Fetch issue from GitHub using gh CLI."""
    try:
        result = subprocess.run(
            ["gh", "issue", "view", str(issue_number), "--json", "number,title,state"],
            capture_output=True,
            text=True,
            check=True,
        )
        data = json.loads(result.stdout)
        return GithubIssue(
            number=data["number"],
            title=data["title"],
            state=data["state"],
        )
    except (subprocess.CalledProcessError, json.JSONDecodeError):
        return None


def slugify(title: str, max_length: int = 30) -> str:
    """Convert title to URL-safe slug."""
    slug = title.lower()
    slug = re.sub(r"[^a-z0-9\s-]", "", slug)
    slug = re.sub(r"\s+", "-", slug)
    slug = re.sub(r"-+", "-", slug)
    slug = slug[:max_length].rstrip("-")
    return slug


def create_branch_name(issue_number: int, title: str) -> str:
    """Create branch name from issue number and title."""
    slug = slugify(title)
    return f"feature/{issue_number}-{slug}"


def is_github_repo() -> bool:
    """Check if current repo is a GitHub repo."""
    try:
        result = subprocess.run(
            ["gh", "repo", "view", "--json", "name"],
            capture_output=True,
            text=True,
            check=True,
        )
        return len(result.stdout.strip()) > 0
    except subprocess.CalledProcessError:
        return False
