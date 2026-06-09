---
name: profile-doctor
description: Health-check a GitHub profile README — verify every link and badge returns a live HTTP status, surface dead links, and flag known-flaky dynamic widgets (github-readme-stats / github-profile-trophy) that should stay disabled or self-hosted. Use before committing README changes, when a badge/image looks broken, or for a periodic link audit.
license: MIT
---

# Profile Doctor

Audits `README.md` for broken links and unreliable widgets so nothing on the public profile
renders as a dead image. Distinguishes a genuinely broken link from a **known-flaky** shared
widget instance (which is intentionally disabled — see `.claude/CLAUDE.md`).

## When to use

- Before committing/pushing README changes
- "A badge / image is broken on my profile"
- Periodic link audit

## How it works

```bash
bash .claude/skills/profile-doctor/scripts/check-links.sh
```

The script extracts every `http(s)` URL from `README.md`, follows redirects, prints the HTTP
status for each, and:

- **2xx / 3xx** → healthy.
- **known-flaky hosts** (`github-readme-stats.vercel.app`, `github-profile-trophy.vercel.app`)
  → reported but **not** failed; these public instances return 503/402 under load and are meant
  to stay commented-out or self-hosted.
- **anything else** → marked `<== CHECK` and the script exits non-zero.

## Reading the results

- A real 404/410/DNS error on a profile/site/social link → fix or remove it.
- A flaky-host non-2xx → leave it disabled, or follow the self-hosting steps in
  `.claude/CLAUDE.md` (fork + deploy your own instance, then uncomment).
- `shields.io` and `capsule-render` URLs should be 2xx; if not, check the encoding.
- Reliable widgets that should pass: `komarev.com` (views), `streak-stats.demolab.com`,
  `github-readme-activity-graph.vercel.app`, and the `output`-branch contribution snake.

> Camo proxy note: GitHub serves these through its image proxy, so the IDE markdown preview is
> not a valid test — this HTTP check (or the live profile page) is.

## Install elsewhere

Portable Agent Skill: `npx skills add pooyagolchian/pooyagolchian/profile-doctor`.
