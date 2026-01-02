#!/usr/bin/env python3
"""Initialize worktree configuration for a repository."""
from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from lib.git import get_repo_name
from lib.paths import get_worktrees_dir, get_config_dir, ensure_dir
from lib.registry import create_empty_registry, write_registry
from lib.env import find_main_env_files
from lib.slots import generate_slots_toml


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


def generate_env_template(
    env_content: str,
    slot_vars: list[str],
    copy_vars: list[str],
) -> str:
    """Convert .env content to .env.template with placeholders."""
    result = env_content

    # Replace slot vars with placeholders
    for var_name in slot_vars:
        pattern = rf"^({var_name})=.*$"
        result = re.sub(pattern, rf"\1={{{{{var_name}}}}}", result, flags=re.MULTILINE)

    # Replace copy vars with placeholders
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

    # Create directories
    ensure_dir(config_dir)

    # Build variables dict for slots.toml generation
    variables: dict[str, list[Any]] = {}
    for var_name in config.slot_vars:
        variables[var_name] = [sv.get(var_name, "") for sv in config.slot_values]

    # Write slots.toml
    slots_toml = generate_slots_toml(config.slot_count, variables)
    (config_dir / "slots.toml").write_text(slots_toml)
    print("✓ Created slots.toml")

    # Write .env templates
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

    # Initialize registry
    registry = create_empty_registry(repo_name, config.slot_count)
    write_registry(worktrees_dir, registry)
    print("✓ Created .worktree-registry.json")

    print("\n✅ Worktree config initialized!")
    print("\nNext steps:")
    print("1. Review and edit config/slots.toml with your slot values")
    print("2. Review config/*.template files")
    print("3. Use /worktree:create <issue> to create worktrees")


def main() -> None:
    """CLI entry point - shows info, actual init is via skill."""
    cwd = Path.cwd()
    main_env_files = find_main_env_files(cwd)

    print("Git Worktree Init")
    print("=================")
    print(f"Repository: {get_repo_name(cwd)}")
    print(f"Found .env files: {len(main_env_files)}")
    for f in main_env_files:
        print(f"  - {f}")
    print("\nThis script is meant to be called by the /worktree:init skill.")
    print("The skill will gather configuration interactively and call init().")


if __name__ == "__main__":
    main()
