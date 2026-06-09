---
name: forge-badge
description: Generate on-brand shields.io badges for a profile/project README — model, tool, tech-stack, npm version/downloads, and status badges that match a fixed color palette and style. Use when the user wants to add or restyle a badge, extend the logo wall, or keep badges visually consistent. Reads brand colors from references/palette.md.
license: MIT
---

# Forge Badge

Produces consistent [shields.io](https://shields.io) badges so a README's logo wall and package
rows stay visually coherent. Every badge uses `style=flat-square` and a color from the brand
palette in [references/palette.md](references/palette.md) — read that file first.

## When to use

- "Add a badge for <tech / model / tool>"
- "Add <package> to the logo wall / npm section"
- "Make these badges match" / "restyle the badges"

## Badge recipes

**Static tech/model badge**
```
![LABEL](https://img.shields.io/badge/LABEL-HEX?style=flat-square&logo=SLUG&logoColor=white)
```
- `LABEL` — URL-encode spaces as `_`; encode a literal `-` as `--`.
- `HEX` — pick from `references/palette.md` (prefer the vendor's brand color; fall back to the
  three-color house palette for non-branded items).
- `SLUG` — a [simpleicons.org](https://simpleicons.org) slug (verify it exists; omit `&logo=`
  if there's no icon).

**Live npm badges** (auto-updating)
```
version:   https://img.shields.io/npm/v/PKG?style=flat-square&logo=npm&logoColor=white&color=6C47FF&label=
downloads: https://img.shields.io/npm/dm/PKG?style=flat-square&color=8E75B2&label=%E2%86%93%2Fmo
```
For the profile's npm section, don't hand-add these — let the `sync-npm-packages` skill own the
marker block.

**Link-wrapped badge**
```
[![LABEL](…badge URL…)](https://target.example)
```

## Rules

- Default to `style=flat-square` (matches the existing README). Use `for-the-badge` only for the
  header hero row.
- Group related badges under a bold `**Category**` line, one blank line between groups.
- Verify logo slugs against simpleicons.org before committing to one.
- Badges render on github.com via the camo proxy, not reliably in the IDE preview — sanity-check
  the URL by opening it, not the markdown preview.

## Install elsewhere

Portable Agent Skill: `npx skills add pooyagolchian/pooyagolchian/forge-badge`.
