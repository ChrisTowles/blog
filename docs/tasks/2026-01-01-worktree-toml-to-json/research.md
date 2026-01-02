# Research: Convert Worktree Config from TOML to JSON

## Codebase Context

### Current Implementation

**Files using TOML:**
- `packages/towles-tool/worktree/skills/lib/slots.py` - Main parser using `tomllib`
- `packages/towles-tool/worktree/skills/worktree_init.py` - Generates `slots.toml`

**Config location:** `../{repo}-worktrees/config/slots.toml`

**Current TOML structure:**
```toml
[settings]
slot_count = 5

[variables.PORT]
description = "Dev server port"
values = [3001, 3002, 3003, 3004, 3005]
```

**Parsed to:**
```python
SlotsConfig(slots=[SlotConfig(slot=1, values={"PORT": 3001}), ...])
```

### Files to Modify

| File | Changes Needed |
|------|----------------|
| `skills/lib/slots.py` | Replace `tomllib` with `json`, update parsing |
| `skills/worktree_init.py` | Generate JSON instead of TOML |
| `skills/init.md` | Update docs |
| `skills/create.md` | Update docs |
| `commands/init.md` | Update docs |
| `README.md` | Update docs |

### Existing JSON Pattern

The project already uses JSON for `.worktree-registry.json`:
```json
{
  "repo_name": "blog",
  "slot_count": 5,
  "slots": {"1": null, "2": null, ...},
  "worktrees": {}
}
```

## Recommended Approach

### Proposed JSON Structure

**File:** `slots.config.json`

```json
{
  "$schema": "./slots.schema.json",
  "slotCount": 5,
  "variables": {
    "PORT": {
      "description": "Dev server port",
      "values": [3001, 3002, 3003, 3004, 3005]
    },
    "DB_PORT": {
      "description": "DB server port",
      "values": [5341, 5342, 5443, 5444, 5445]
    }
  }
}
```

**Why this structure:**
1. Matches current TOML semantic model (easy migration)
2. `$schema` enables IDE autocomplete/validation
3. camelCase aligns with JSON conventions
4. Variables-first design (current), not slots-first

### Benefits of JSON over TOML

| Aspect | TOML | JSON |
|--------|------|------|
| IDE support | Needs extension | Native everywhere |
| Python parsing | `tomllib` (3.11+) | `json` (stdlib, all versions) |
| Schema validation | No standard | JSON Schema |
| Familiarity | Niche | Universal |
| Comments | Supported | Not supported (use `_comment` keys) |

### Migration Path

1. Update `slots.py` to read JSON
2. Update `worktree_init.py` to write JSON
3. Add one-time migration: detect `slots.toml`, convert to `slots.config.json`
4. Update all markdown docs
5. Delete existing `slots.toml` in `blog-worktrees/config/`

### Optional: JSON Schema

Create `slots.schema.json` for validation:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["slotCount", "variables"],
  "properties": {
    "slotCount": {"type": "integer", "minimum": 1},
    "variables": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "required": ["values"],
        "properties": {
          "description": {"type": "string"},
          "values": {"type": "array"}
        }
      }
    }
  }
}
```

## Decision Points

1. **Filename:** `slots.config.json` vs `slots.json`
2. **Include JSON Schema?** Adds validation but extra file
3. **Handle comments?** TOML supports them, JSON doesn't - use `_description` keys?
