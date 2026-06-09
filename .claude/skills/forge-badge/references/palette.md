# Brand palette & badge color reference

The profile uses a three-color house palette plus vendor brand colors for known logos.

## House palette

| Role | Hex | Use for |
| :-- | :-- | :-- |
| Primary (violet) | `6C47FF` | headline accents, version badges, primary CTAs |
| Mid (mauve) | `8E75B2` | secondary badges, downloads, follower counts |
| Accent (teal) | `00C2A8` | success/ship accents, stars, Codenovai |
| Ink | `0A0A0A` | dark/neutral badges (website, DEV, neutral CLIs) |

Gradients (capsule-render): header `0:6C47FF,50:8E75B2,100:00C2A8`; footer reversed.

## Vendor brand colors (prefer these for named logos)

| Item | Hex | simpleicons slug |
| :-- | :-- | :-- |
| Claude / Anthropic | `D97757` | `anthropic` |
| OpenAI / GPT / Codex | `412991` | `openai` |
| Gemini | `1C69FF` | `googlegemini` |
| Llama / Meta | `0866FF` | `meta` |
| Mistral | `FA520F` | `mistralai` |
| Ollama | `000000` | `ollama` |
| DeepSeek | `4D6BFE` | `deepseek` |
| Qwen | `615CED` | `qwen` |
| Grok / X | `000000` | `x` |
| Cursor | `000000` | `cursor` |
| Windsurf | `09B6A2` | `windsurf` |
| MCP | `000000` | `modelcontextprotocol` |
| LangChain | `1C3C3C` | `langchain` |
| TypeScript | `3178C6` | `typescript` |
| Node.js | `5FA04E` | `nodedotjs` |
| NestJS | `E0234E` | `nestjs` |
| Next.js | `000000` | `nextdotjs` |
| React | `61DAFB` | `react` (use `logoColor=black`) |
| Vue.js | `4FC08D` | `vuedotjs` |
| Astro | `BC52EE` | `astro` |
| Tailwind | `06B6D4` | `tailwindcss` |
| AWS | `FF9900` | `amazonwebservices` |
| Docker | `2496ED` | `docker` |
| PostgreSQL | `4169E1` | `postgresql` |
| MongoDB | `47A248` | `mongodb` |
| GitHub Actions | `2088FF` | `githubactions` |
| npm | `CB3837` | `npm` |
| LinkedIn | `0A66C2` | `linkedin` |

## Encoding cheatsheet

- Space in label → `_` (or `%20`); literal `-` → `--`; literal `_` → `__`.
- `↓` → `%E2%86%93`, `·` → `%C2%B7`, `/` → `%2F`.
- Light logo on dark fill → add `&logoColor=white`; dark logo on light fill → `&logoColor=black`.
- npm version with no label text → `&label=` (empty).
