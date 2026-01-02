"""Slot configuration from JSON."""
from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Optional

from .constants import SLOTS_CONFIG_FILE, SLOTS_SCHEMA_FILE, SLOT_PREFIX, CONFIG_DIR


@dataclass
class SlotConfig:
    name: str
    values: dict[str, Any]

    def get(self, key: str) -> Any:
        return self.values.get(key)

    def __getitem__(self, key: str) -> Any:
        return self.values[key]

    def __contains__(self, key: str) -> bool:
        return key in self.values

    def items(self) -> list[tuple[str, Any]]:
        return list(self.values.items())


@dataclass
class SlotsConfig:
    slots: list[SlotConfig]
    copy_from_root_repo: list[str] = field(default_factory=list)  # e.g., [".env", ".env.local"]

    @classmethod
    def from_dict(cls, data: dict) -> SlotsConfig:
        slots = []
        slots_data = data.get("slots", [])

        # Handle array format: [{"id": "slot-1", "PORT": 3001, ...}, ...]
        for slot_obj in slots_data:
            slot_id = slot_obj.get("id", "")
            values = {k: v for k, v in slot_obj.items() if k != "id"}
            slots.append(SlotConfig(name=slot_id, values=values))

        # Sort by slot name (slot-1, slot-2, etc.)
        slots.sort(key=lambda s: s.name)

        # Parse copyFromRootRepo - can be string or array
        copy_from_raw = data.get("copyFromRootRepo", [])
        if isinstance(copy_from_raw, str):
            copy_from = [copy_from_raw]
        else:
            copy_from = list(copy_from_raw)

        return cls(slots=slots, copy_from_root_repo=copy_from)

    def slot_count(self) -> int:
        return len(self.slots)


def get_slots_path(worktrees_dir: Path) -> Path:
    return worktrees_dir / CONFIG_DIR / SLOTS_CONFIG_FILE


def get_slots_schema_path(worktrees_dir: Path) -> Path:
    return worktrees_dir / CONFIG_DIR / SLOTS_SCHEMA_FILE


def slots_exist(worktrees_dir: Path) -> bool:
    return get_slots_path(worktrees_dir).exists()


def read_slots(worktrees_dir: Path) -> SlotsConfig:
    path = get_slots_path(worktrees_dir)
    if not path.exists():
        raise FileNotFoundError(f"Slots config not found at {path}. Run /worktree:init first.")
    data = json.loads(path.read_text())
    return SlotsConfig.from_dict(data)


def get_slot_config(slots_config: SlotsConfig, slot_name: str) -> Optional[SlotConfig]:
    for s in slots_config.slots:
        if s.name == slot_name:
            return s
    return None


def get_slot_by_index(slots_config: SlotsConfig, index: int) -> Optional[SlotConfig]:
    """Get slot by 0-based index."""
    if 0 <= index < len(slots_config.slots):
        return slots_config.slots[index]
    return None


def get_slot_variable_names(slots_config: SlotsConfig) -> list[str]:
    if not slots_config.slots:
        return []
    return list(slots_config.slots[0].values.keys())


def validate_slot_config(slots_config: SlotsConfig) -> list[str]:
    errors = []
    if not slots_config.slots:
        errors.append(f"No slots defined in {SLOTS_CONFIG_FILE}")
        return errors

    var_names = get_slot_variable_names(slots_config)
    for slot in slots_config.slots:
        for var_name in var_names:
            if var_name not in slot:
                errors.append(f"Slot {slot.name} missing variable: {var_name}")

    return errors


def generate_slots_json(slots: dict[str, dict[str, Any]], copy_from_root_repo: list[str] | None = None) -> str:
    """Generate slots.config.json content.

    Args:
        slots: Dict of slot_name -> variable values dict
        copy_from_root_repo: List of .env files in root repo to copy variables from
    """
    config: dict[str, Any] = {
        "$schema": f"./{SLOTS_SCHEMA_FILE}",
    }
    if copy_from_root_repo:
        config["copyFromRootRepo"] = copy_from_root_repo
    # Convert to array format with id field
    config["slots"] = [{"id": name, **values} for name, values in slots.items()]
    return json.dumps(config, indent=2)


def generate_slots_schema() -> str:
    """Generate slots.schema.json content."""
    schema = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "required": ["slots"],
        "properties": {
            "$schema": {"type": "string"},
            "copyFromRootRepo": {
                "description": "File(s) in root repo to copy {{COPY:VAR}} values from",
                "oneOf": [
                    {"type": "string"},
                    {"type": "array", "items": {"type": "string"}},
                ],
            },
            "slots": {
                "type": "array",
                "items": {
                    "type": "object",
                    "required": ["id"],
                    "properties": {
                        "id": {"type": "string"},
                    },
                    "additionalProperties": True,
                },
            },
        },
    }
    return json.dumps(schema, indent=2)


def next_slot_name(slots_config: SlotsConfig) -> str:
    """Generate next available slot name (slot-N)."""
    existing_nums = set()
    for slot in slots_config.slots:
        if slot.name.startswith(SLOT_PREFIX):
            try:
                num = int(slot.name[len(SLOT_PREFIX):])
                existing_nums.add(num)
            except ValueError:
                pass

    n = 1
    while n in existing_nums:
        n += 1
    return f"{SLOT_PREFIX}{n}"
