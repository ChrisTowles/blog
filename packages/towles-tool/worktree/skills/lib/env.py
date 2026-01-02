"""Environment template processing."""
from __future__ import annotations

import re
from pathlib import Path
from typing import Any, Optional


def get_template_files(config_dir: Path) -> list[Path]:
    if not config_dir.exists():
        return []
    return sorted(p for p in config_dir.iterdir() if p.name.startswith(".env") and p.name.endswith(".template"))


def get_output_filename(template_path: Path) -> str:
    return template_path.name.removesuffix(".template")


def extract_slot_vars(content: str) -> list[str]:
    """Extract {{VAR}} placeholders (not COPY:)."""
    matches = re.findall(r"\{\{([A-Z_][A-Z0-9_]*)\}\}", content)
    return list(set(v for v in matches if not v.startswith("COPY:")))


def extract_copy_vars(content: str) -> list[str]:
    """Extract {{COPY:VAR}} placeholders."""
    matches = re.findall(r"\{\{COPY:([A-Z_][A-Z0-9_]*)\}\}", content)
    return list(set(matches))


def read_env_file(path: Path) -> dict[str, str]:
    """Parse .env file into dict."""
    if not path.exists():
        return {}

    env_vars = {}
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        match = re.match(r"^([A-Z_][A-Z0-9_]*)=(.*)$", line)
        if match:
            env_vars[match.group(1)] = match.group(2)
    return env_vars


def process_template(
    template_content: str,
    slot_config: Optional[Any],  # SlotConfig or None
    main_env_vars: dict[str, str],
) -> tuple[str, list[str]]:
    """Process template, replacing {{VAR}} and {{COPY:VAR}}.

    If slot_config is None, slot variables are left as-is with warnings.
    Returns (processed_content, warnings).
    """
    warnings = []
    result = template_content

    # Replace slot vars {{VAR}}
    def replace_slot_var(match: re.Match) -> str:
        var_name = match.group(1)
        if var_name.startswith("COPY:"):
            return match.group(0)
        if slot_config is None:
            warnings.append(f"Template has {{{{{var_name}}}}} but no slot config available")
            return match.group(0)
        value = slot_config.get(var_name)
        if value is None:
            warnings.append(f"Template has {{{{{var_name}}}}} but not defined in slots.config.json")
            return match.group(0)
        return str(value)

    result = re.sub(r"\{\{([A-Z_][A-Z0-9_]*)\}\}", replace_slot_var, result)

    # Replace copy vars {{COPY:VAR}}
    def replace_copy_var(match: re.Match) -> str:
        var_name = match.group(1)
        value = main_env_vars.get(var_name)
        if value is None:
            warnings.append(f"{{{{COPY:{var_name}}}}} not found in main .env, leaving empty")
            return ""
        return value

    result = re.sub(r"\{\{COPY:([A-Z_][A-Z0-9_]*)\}\}", replace_copy_var, result)

    return result, warnings


def find_main_env_files(main_repo_dir: Path) -> list[Path]:
    """Find .env files in main repo (not templates or examples)."""
    if not main_repo_dir.exists():
        return []
    return sorted(
        p for p in main_repo_dir.iterdir()
        if p.name.startswith(".env")
        and not p.name.endswith(".template")
        and not p.name.endswith(".example")
        and p.is_file()
    )
