"""Slot configuration from TOML."""
from __future__ import annotations

import tomllib
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Optional


@dataclass
class SlotConfig:
    slot: int
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

    @classmethod
    def from_dict(cls, data: dict) -> SlotsConfig:
        slots = []
        slots_data = data.get("slots", {})

        # Handle table-style: [slots.1], [slots.2], etc.
        if isinstance(slots_data, dict):
            for slot_key, values in slots_data.items():
                slot_num = int(slot_key)
                slots.append(SlotConfig(slot=slot_num, values=dict(values)))
        # Handle array-style: [[slots]]
        elif isinstance(slots_data, list):
            for item in slots_data:
                slot_num = item.pop("slot", len(slots) + 1)
                slots.append(SlotConfig(slot=slot_num, values=item))

        slots.sort(key=lambda s: s.slot)
        return cls(slots=slots)


def get_slots_path(worktrees_dir: Path) -> Path:
    return worktrees_dir / "config" / "slots.toml"


def slots_exist(worktrees_dir: Path) -> bool:
    return get_slots_path(worktrees_dir).exists()


def read_slots(worktrees_dir: Path) -> SlotsConfig:
    path = get_slots_path(worktrees_dir)
    if not path.exists():
        raise FileNotFoundError(f"Slots config not found at {path}. Run /worktree:init first.")
    data = tomllib.loads(path.read_text())
    return SlotsConfig.from_dict(data)


def get_slot_config(slots_config: SlotsConfig, slot_number: int) -> Optional[SlotConfig]:
    for s in slots_config.slots:
        if s.slot == slot_number:
            return s
    return None


def get_slot_variable_names(slots_config: SlotsConfig) -> list[str]:
    if not slots_config.slots:
        return []
    return list(slots_config.slots[0].values.keys())


def validate_slot_config(slots_config: SlotsConfig) -> list[str]:
    errors = []
    if not slots_config.slots:
        errors.append("No slots defined in slots.toml")
        return errors

    var_names = get_slot_variable_names(slots_config)
    for slot in slots_config.slots:
        for var_name in var_names:
            if var_name not in slot:
                errors.append(f"Slot {slot.slot} missing variable: {var_name}")

    return errors


def generate_slots_toml(slot_count: int, variables: dict[str, list[Any]]) -> str:
    """Generate slots.toml content from variables dict.

    Args:
        slot_count: Number of slots
        variables: Dict of var_name -> list of values (one per slot)
    """
    lines = []
    for i in range(1, slot_count + 1):
        lines.append(f"[slots.{i}]")
        for var_name, values in variables.items():
            value = values[i - 1] if i - 1 < len(values) else ""
            if isinstance(value, str):
                lines.append(f'{var_name} = "{value}"')
            else:
                lines.append(f"{var_name} = {value}")
        lines.append("")
    return "\n".join(lines)
