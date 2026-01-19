# Plan: Convert Worktree Config from TOML to JSON

## Summary

Convert the worktree plugin from TOML-based config to JSON with a new slot-first structure. No migration tooling needed (only you use it currently).

## New JSON Structure

**File:** `slots.config.json`

```json
{
  "$schema": "./slots.schema.json",
  "slots": {
    "slot-1": { "PORT": 3001, "DB_PORT": 5341 },
    "slot-2": { "PORT": 3002, "DB_PORT": 5342 },
    "slot-3": { "PORT": 3003, "DB_PORT": 5343 }
  }
}
```

**Key decisions:**

- Slot-first structure (named slots as keys, not variable arrays)
- Named slots (default: `slot-1`, `slot-2`, etc.)
- Default 3 slots on init
- Auto-generate unnamed slots (e.g., `slot-4`) when configured slots full
- JSON Schema generated alongside config for IDE hints
- No runtime schema validation (IDE hints only)
- Strict: slot count inferred from object keys

---

## Phase 1: Update Data Models

### TODO: Update `slots.py` parser

- [ ] Replace `tomllib` with `json`
- [ ] Update `SlotsConfig` to handle new structure
- [ ] Parse slot names as keys, not indices
- [ ] Remove slot_count field (infer from len(slots))

### TODO: Update `SlotConfig` dataclass

- [ ] Add `name: str` field
- [ ] Variables now flat dict per slot, not aggregated

---

## Phase 2: Update Init Skill

### TODO: Update `worktree_init.py`

- [ ] Generate `slots.config.json` instead of `slots.toml`
- [ ] Generate `slots.schema.json` alongside
- [ ] Default to 3 slots: `slot-1`, `slot-2`, `slot-3`
- [ ] Default PORT values: 3001, 3002, 3003

### TODO: Create JSON Schema template

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["slots"],
  "properties": {
    "$schema": { "type": "string" },
    "slots": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "additionalProperties": true
      }
    }
  }
}
```

---

## Phase 3: Update Worktree Create Logic

### TODO: Update slot allocation

- [ ] Find first available named slot
- [ ] If all named slots occupied, generate `slot-N` (N = next available int)
- [ ] Update registry with slot name

---

## Phase 4: Update Documentation

### TODO: Update markdown docs

- [ ] `skills/init.md` - new JSON structure examples
- [ ] `skills/create.md` - slot naming behavior
- [ ] `commands/init.md` - JSON output
- [ ] `README.md` - overall structure docs

---

## Phase 5: Cleanup

### TODO: Remove TOML artifacts

- [ ] Delete `slots.toml` from `blog-worktrees/config/`
- [ ] Remove any `tomllib` imports

---

## Files to Modify

| File                        | Change                   |
| --------------------------- | ------------------------ |
| `skills/lib/slots.py`       | TOML→JSON, new structure |
| `skills/worktree_init.py`   | Generate JSON + schema   |
| `skills/worktree_create.py` | Slot naming logic        |
| `skills/init.md`            | Update docs              |
| `skills/create.md`          | Update docs              |
| `commands/init.md`          | Update docs              |
| `README.md`                 | Update docs              |

## Files to Create

| File                                   | Purpose              |
| -------------------------------------- | -------------------- |
| `slots.schema.json` (template in init) | IDE validation hints |

## Files to Delete

| File                               | Reason           |
| ---------------------------------- | ---------------- |
| `blog-worktrees/config/slots.toml` | Replaced by JSON |
