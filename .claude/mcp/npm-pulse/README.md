# npm-pulse — MCP server

A **zero-dependency** [Model Context Protocol](https://modelcontextprotocol.io) server that
exposes live npm registry stats for a maintainer (default: `pooya`). It lets the profile skills
and agents pull package names, versions, and download counts as structured tool calls instead
of ad-hoc `curl`, so the README's **Open Source & npm** section stays accurate.

> No `npm install`, no build step. Pure Node 18+ (`server.mjs` uses the global `fetch` and the
> stdio JSON-RPC transport, hand-rolled in ~200 lines).

## Tools

| Tool | Args | Returns |
| :-- | :-- | :-- |
| `list_packages` | `maintainer?` | All packages for a maintainer (name, version, description, links) |
| `package_downloads` | `package`, `period?` | Downloads for `last-day` / `last-week` / `last-month` / `last-year` |
| `package_info` | `package` | Latest version, description, homepage/repo, license, last publish |
| `profile_summary` | `maintainer?` | Package count + total downloads (last year) with per-package breakdown |

## Register it

It is already wired in the repo-root [`.mcp.json`](../../../.mcp.json):

```json
{
  "mcpServers": {
    "npm-pulse": {
      "command": "node",
      "args": [".claude/mcp/npm-pulse/server.mjs"],
      "env": { "NPM_MAINTAINER": "pooya" }
    }
  }
}
```

Set `NPM_MAINTAINER` to point it at any npm username.

## Smoke test (no MCP client needed)

```bash
printf '%s\n' \
  '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}' \
  '{"jsonrpc":"2.0","id":2,"method":"tools/list"}' \
  '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"profile_summary","arguments":{}}}' \
  | node .claude/mcp/npm-pulse/server.mjs
```
