# Brand palette & badge color reference

The profile uses a **monochrome (black / white / gray)** house palette. All badges use a dark
ink fill with white text and white logos — vendor brand colors are intentionally NOT used, so
the wall reads as one clean grayscale set.

## House palette (monochrome)

| Role | Hex | Use for |
| :-- | :-- | :-- |
| Ink (fill) | `0A0A0A` | every badge fill — models, tools, stack, contact, version |
| Label | `2B2B2B` | left label segment (`&labelColor=2B2B2B`), downloads badge |
| Mid gray | `808080` | typing-SVG text, muted accents |
| Faint gray | `AAAAAA` | dates / secondary numbers in widgets |
| White | `FFFFFF` | text, logos (`&logoColor=white`), widget strokes |

Gradients (capsule-render): header `0:000000,100:434343`; footer `0:434343,100:000000`.

## Logo slugs (use the slug, but always force a monochrome fill)

Fill every badge with `0A0A0A` and add `&logoColor=white`. Keep the simpleicons slug only for
the icon shape — ignore the vendor's brand color.

| Item | simpleicons slug | Item | simpleicons slug |
| :-- | :-- | :-- | :-- |
| Claude / Anthropic | `anthropic` | TypeScript | `typescript` |
| OpenAI / GPT / Codex | `openai` | Node.js | `nodedotjs` |
| Gemini | `googlegemini` | NestJS | `nestjs` |
| Llama / Meta | `meta` | Next.js | `nextdotjs` |
| Mistral | `mistralai` | React | `react` |
| Ollama | `ollama` | Vue.js | `vuedotjs` |
| DeepSeek | `deepseek` | Astro | `astro` |
| Qwen | `qwen` | Tailwind | `tailwindcss` |
| Grok / X | `x` | AWS | `amazonwebservices` |
| Cursor | `cursor` | Docker | `docker` |
| Windsurf | `windsurf` | PostgreSQL | `postgresql` |
| MCP | `modelcontextprotocol` | MongoDB | `mongodb` |
| LangChain | `langchain` | GitHub Actions | `githubactions` |
| Copilot | `githubcopilot` | npm | `npm` |
| Notion | `notion` | LinkedIn | `linkedin` |

> Note: with a `0A0A0A` fill, use `&logoColor=white` for **every** logo (including React, which
> normally uses a dark logo). Never set `logoColor=black` on the monochrome wall.

## Encoding cheatsheet

- Space in label → `_` (or `%20`); literal `-` → `--`; literal `_` → `__`.
- `↓` → `%E2%86%93`, `·` → `%C2%B7`, `/` → `%2F`.
- Dark fill (always) → add `&logoColor=white`.
- npm version with no label text → `&label=` (empty).
