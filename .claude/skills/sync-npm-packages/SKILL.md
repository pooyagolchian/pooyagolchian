---
name: sync-npm-packages
description: Refresh the "Open Source & npm" section of a GitHub profile README from the live npm registry. Use when the user publishes/unpublishes/renames an npm package, wants their package list, versions, or download counts updated, or asks to re-sync the npm block. Regenerates everything between the NPM-PACKAGES markers from maintainer data — never hand-edit that block.
license: MIT
---

# Sync npm Packages

Regenerates the **📦 Open Source & npm** block in `README.md` from the live npm registry, so
package versions, download counts, and the headline stat stay accurate without manual edits.

The block lives between these markers (mirroring the blog-post automation):

```
<!-- NPM-PACKAGES:START -->
…generated table…
<!-- NPM-PACKAGES:END -->
```

## When to use

- "Update / re-sync my npm packages"
- "I published a new package" (or unpublished / renamed one)
- "Refresh the download counts / versions on my profile"

## How it works

Two interchangeable data paths — both read `maintainer:pooya` from npm:

1. **Script (canonical — also runs in CI):**
   ```bash
   node .claude/skills/sync-npm-packages/scripts/refresh-readme.mjs
   ```
   Fetches the package list + yearly downloads, rebuilds the grouped table with live
   `shields.io` version/downloads badges, and rewrites the marker block in `README.md`.
   Honors `NPM_MAINTAINER` and `README_PATH` env vars. Exits non-zero on failure.

2. **MCP (interactive inspection):** the `npm-pulse` MCP server exposes `list_packages`,
   `package_downloads`, `package_info`, and `profile_summary`. Use these to verify data or
   answer questions before/after running the script.

## Conventions

- **Never hand-edit** between the `NPM-PACKAGES` markers, and never remove the markers — the
  script/workflow owns that block (same rule as the blog-post list).
- Grouping lives in `scripts/refresh-readme.mjs` (`GROUPS`). New packages that aren't grouped
  auto-appear under **📦 More** — add them to a group for nicer placement.
- Badge colors track the brand palette (see the `forge-badge` skill): version `#6C47FF`,
  downloads `#8E75B2`.
- Badges render on github.com via the camo proxy — the IDE markdown preview is not a valid test.

## Workflow

1. Run the script (or first inspect via `npm-pulse` tools).
2. Review the README diff; confirm groups/descriptions read well.
3. Report the diff. Do **not** commit or push unless the user asks.

## Install elsewhere

This is a portable Agent Skill: `npx skills add pooyagolchian/pooyagolchian/sync-npm-packages`
(point it at a different profile by setting `NPM_MAINTAINER`).
