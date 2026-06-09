---
name: update-profile
description: Refresh the GitHub profile README for pooyagolchian/pooyagolchian — re-sync the headline, About, ventures (Hisabi.ai, Codenovai, pooyagolchian.com), tech stack, and links with the live sites and current positioning. Use when the user wants to update their profile, change their headline/role, add a new venture or skill, or generally modernize the README. Never touches the auto-generated blog-post list.
---

# Update Profile

Maintains `README.md` — the public GitHub profile for **Pooya Golchian**
(`AI Product Engineer · Leading Agentic Development`, Dubai). See `.claude/CLAUDE.md` for
full context and hard rules.

## When to use

- "Update my profile / README"
- "Change my headline / title / role"
- "Add a new venture / project / skill / badge"
- "Re-sync the README with my websites"

## Workflow

1. **Read** the current `README.md` and `.claude/CLAUDE.md`.
2. **Re-sync source of truth** — if the change touches a venture or positioning, `WebFetch`
   the relevant site(s) to confirm current taglines and facts:
   - `pooyagolchian.com` — role, headline, themes (AIDLC, agentic).
   - `hisabi.ai` — product description, country/currency coverage.
   - `codenovai.com` — agency positioning and services.
3. **Edit** only the relevant sections. Keep the structure: header badges → About →
   What I'm Building → Agentic Stack → GitHub Stats → Latest Writing → Get in Touch.
4. **Verify** against the checklist below.
5. **Report** the diff to the user. Do not commit or push unless asked.

## Hard rules (do not break)

- **Never touch** the content between `<!-- BLOG-POST-LIST:START -->` and
  `<!-- BLOG-POST-LIST:END -->`, and never remove those markers. The hourly GitHub Action
  owns that block (pulls from `pooya.blog/rss`).
- **No email** anywhere in the README — no `mailto:`, no inbox badges.
- Keep the **AIDLC** phases in order and unrenamed:
  `Frame → Spec → Scaffold → Generate → Eval → Harden → Ship → Operate`.
- Keep the **contribution snake** `<picture>` embed + `output`-branch URLs intact, paired with
  `.github/workflows/snake.yml`.
- Keep inline HTML (`<div align="center">`, `<picture>`, `<img>`, `<sub>`) — required for the
  showcase layout. Ignore markdownlint MD033 / MD041 / MD001 / MD036 warnings.
- All three properties (pooyagolchian.com, hisabi.ai, codenovai.com) must stay linked.

## Style

Senior, builder-first, no hype. Skimmable: short sections, shields.io badges, tables.
Signature line: *"Evals keep agents honest, and senior engineering holds the boundary."*

## Checklist

- [ ] Headline reflects current role (AI Product Engineer · Enterprise MVP Builder · Agentic)
- [ ] AIDLC section present, phases correct and in order
- [ ] All three sites linked and described accurately
- [ ] Logo wall current (models · agentic CLIs · protocols · build/ship)
- [ ] Stats / streak / trophies / activity graph + contribution snake intact
- [ ] Blog-post markers intact and untouched
- [ ] No email anywhere; contact links valid
- [ ] Inline HTML preserved
