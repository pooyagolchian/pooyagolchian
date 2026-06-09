# pooyagolchian/pooyagolchian — GitHub Profile Repo

This is the **special GitHub profile repository** (`pooyagolchian/pooyagolchian`). Its
`README.md` renders on the top of <https://github.com/pooyagolchian>. There is no app to
run, build, or test — the only deliverables are `README.md` and the GitHub Actions workflow.

## What lives here

- `README.md` — the public profile. Full-showcase, badge-driven, AI/agentic positioning:
  capsule-render banner + typing header, meta badges (views/followers/stars), About, an
  **AIDLC** section, ventures, an expanded **LLM + agentic-tooling logo wall**, stats/streak/
  trophies/activity-graph, a **contribution snake**, the blog auto-list, and a contact row.
- `.github/workflows/blog-post-workflow.yml` — hourly job that pulls the latest posts from
  `https://pooya.blog/rss` into the README.
- `.github/workflows/snake.yml` — generates the contribution snake SVGs (via `Platane/snk`)
  and pushes them to the **`output` branch**; the README embeds them from there.
- `.gitignore` — keeps `.claude/` tracked but ignores OS/editor cruft, secrets, and
  `.claude/*.local.json` / credentials.
- `.claude/` — agentic tooling for maintaining this profile (skills + agents).

## ⚠️ Hard rules

- **Never remove or rename** the `<!-- BLOG-POST-LIST:START -->` / `<!-- BLOG-POST-LIST:END -->`
  markers in `README.md`. The workflow rewrites everything between them; deleting them breaks
  the automation. Don't hand-edit the post list — let the workflow own it.
- **No email addresses** in `README.md` — no `mailto:` links, no Gmail/pooya.blog inbox badges.
  Route contact through LinkedIn / DEV / Stack Overflow / Telegram / the website only.
- **Don't break the snake** — keep the `output`-branch embed (`<picture>` with the
  `raw.githubusercontent.com/.../output/github-contribution-grid-snake*.svg` URLs) and the
  `snake.yml` workflow together. The image is blank until the workflow runs once on GitHub.
- Inline HTML (`<div align="center">`, `<picture>`, `<sub>`, `<img>`, etc.) is **intentional and
  correct** for a profile README — GitHub has no native centering/animation. Ignore markdownlint
  MD033/MD041/MD001/MD036 warnings; do not "fix" them by stripping the HTML or rewording.
- Keep external links live and correct: the three properties below are load-bearing.

## Who Pooya is (positioning — keep the README aligned to this)

- **Headline:** AI Product Engineer · Enterprise MVP Builder · Leading Agentic Development. Dubai, UAE.
- **Arc:** decade+ of front-end (React, Vue) → full-stack (Node/Nest) → production AI & agentic.
- **Core themes:** enterprise MVPs in weeks-not-quarters, Agentic Software Engineering, **AIDLC**,
  multi-agent orchestration, MCP servers, RAG, evaluation frameworks, token economics,
  private/sovereign AI (PDPL, DIFC compliance), AI engineering leadership.
- **AIDLC — the eight phases (keep in order, don't rename):**
  `Frame → Spec → Scaffold → Generate → Eval → Harden → Ship → Operate`
  ("from a framed problem to an operated, eval-guarded system").
- **Logo wall** covers models (Claude, GPT/Codex, Gemini, Llama, Mistral, Nous Hermes, Ollama,
  DeepSeek, Qwen, Grok), agentic dev tools/CLIs (Claude Code, Codex CLI, Gemini CLI, Cursor,
  Antigravity, Windsurf, Copilot), protocols/retrieval (MCP, LangChain/LangGraph, RAG, evals),
  and the build/ship stack.

## Properties (the three sites — always link these)

- **pooyagolchian.com** — personal site, writing & playbooks on agentic engineering / AIDLC.
- **hisabi.ai** — AI Accountant: invoicing, books, VAT & payroll, any country. ~150 countries,
  any ISO-4217 currency, bilingual EN/AR for GCC.
- **codenovai.com** (Technova) — Dubai Martech + AI automation agency that *operates* AI:
  agents, automation pipelines, sovereign deployments, fractional AI teams.

## Brand voice

Confident, senior, builder-first — not hype. The signature stance:
> "Agentic speed is the easy part. Evals keep agents honest, and senior engineering holds
> the boundary."

Prefer concrete capability over buzzwords. Use AI/agentic terms because they're accurate, not
decorative. Keep the README skimmable: short sections, badges, tables.

## How to update the profile

Use the `update-profile` skill in `.claude/skills/`, or the `profile-curator` agent in
`.claude/agents/` to re-sync the README with the live sites and positioning above.
