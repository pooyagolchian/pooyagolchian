#!/usr/bin/env node
/**
 * npm-pulse — a zero-dependency MCP server exposing live npm registry stats
 * for a maintainer (default: pooya). Lets skills/agents pull package data and
 * download counts without ad-hoc curl, so the profile README stays in sync.
 *
 * Transport: stdio, newline-delimited JSON-RPC 2.0.
 * Requirements: Node 18+ (uses global fetch). No npm install, no build step.
 *
 * Tools:
 *   - list_packages      { maintainer? }            → all packages for a maintainer
 *   - package_downloads  { package, period? }       → download count for a period
 *   - package_info       { package }                → version, links, last publish
 *   - profile_summary    { maintainer? }            → aggregate count + yearly downloads
 */

import readline from "node:readline";

const REGISTRY = "https://registry.npmjs.org";
const DOWNLOADS = "https://api.npmjs.org/downloads";
const DEFAULT_MAINTAINER = process.env.NPM_MAINTAINER || "pooya";
const PERIODS = ["last-day", "last-week", "last-month", "last-year"];

const TOOLS = [
  {
    name: "list_packages",
    description:
      "List every npm package published by a maintainer, with version and description.",
    inputSchema: {
      type: "object",
      properties: {
        maintainer: {
          type: "string",
          description: `npm username (default: ${DEFAULT_MAINTAINER}).`,
        },
      },
    },
  },
  {
    name: "package_downloads",
    description: "Get the download count for an npm package over a time period.",
    inputSchema: {
      type: "object",
      properties: {
        package: { type: "string", description: "npm package name." },
        period: {
          type: "string",
          enum: PERIODS,
          description: "Time window (default: last-month).",
        },
      },
      required: ["package"],
    },
  },
  {
    name: "package_info",
    description:
      "Get metadata for an npm package: latest version, description, homepage/repo links, and last publish date.",
    inputSchema: {
      type: "object",
      properties: {
        package: { type: "string", description: "npm package name." },
      },
      required: ["package"],
    },
  },
  {
    name: "profile_summary",
    description:
      "Aggregate a maintainer's npm footprint: package count and total downloads in the last year (per-package breakdown included).",
    inputSchema: {
      type: "object",
      properties: {
        maintainer: {
          type: "string",
          description: `npm username (default: ${DEFAULT_MAINTAINER}).`,
        },
      },
    },
  },
];

const json = async (url) => {
  const r = await fetch(url, { headers: { "user-agent": "npm-pulse/1.0" } });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} — ${url}`);
  return r.json();
};

async function searchMaintainer(maintainer = DEFAULT_MAINTAINER) {
  const d = await json(
    `${REGISTRY}/-/v1/search?text=maintainer:${encodeURIComponent(maintainer)}&size=250`,
  );
  return (d.objects || []).map((o) => ({
    name: o.package.name,
    version: o.package.version,
    description: o.package.description || "",
    links: o.package.links || {},
    date: o.package.date,
  }));
}

async function downloads(pkg, period = "last-month") {
  if (!PERIODS.includes(period)) throw new Error(`period must be one of ${PERIODS.join(", ")}`);
  const d = await json(`${DOWNLOADS}/point/${period}/${encodeURIComponent(pkg)}`);
  return { package: pkg, period, downloads: d.downloads ?? null };
}

async function packageInfo(pkg) {
  const d = await json(`${REGISTRY}/${encodeURIComponent(pkg)}`);
  const latest = d["dist-tags"]?.latest;
  return {
    name: d.name,
    version: latest,
    description: d.description || "",
    homepage: d.homepage || null,
    repository: d.repository?.url || null,
    license: d.license || null,
    lastPublish: latest ? d.time?.[latest] : null,
    keywords: d.keywords || [],
  };
}

async function profileSummary(maintainer = DEFAULT_MAINTAINER) {
  const pkgs = await searchMaintainer(maintainer);
  let totalYear = 0;
  const breakdown = await Promise.all(
    pkgs.map(async (p) => {
      let year = 0;
      try {
        year = (await downloads(p.name, "last-year")).downloads || 0;
      } catch {
        /* keep 0 */
      }
      totalYear += year;
      return { name: p.name, version: p.version, downloadsLastYear: year };
    }),
  );
  breakdown.sort((a, b) => b.downloadsLastYear - a.downloadsLastYear);
  return {
    maintainer,
    packageCount: pkgs.length,
    totalDownloadsLastYear: totalYear,
    packages: breakdown,
  };
}

async function callTool(name, args = {}) {
  switch (name) {
    case "list_packages":
      return searchMaintainer(args.maintainer);
    case "package_downloads":
      return downloads(args.package, args.period);
    case "package_info":
      return packageInfo(args.package);
    case "profile_summary":
      return profileSummary(args.maintainer);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

const send = (msg) => process.stdout.write(JSON.stringify(msg) + "\n");

const rl = readline.createInterface({ input: process.stdin });
rl.on("line", async (line) => {
  line = line.trim();
  if (!line) return;
  let msg;
  try {
    msg = JSON.parse(line);
  } catch {
    return;
  }
  const { id, method, params } = msg;
  try {
    if (method === "initialize") {
      send({
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: params?.protocolVersion || "2024-11-05",
          capabilities: { tools: {} },
          serverInfo: { name: "npm-pulse", version: "1.0.0" },
        },
      });
    } else if (method === "notifications/initialized") {
      // no response for notifications
    } else if (method === "ping") {
      send({ jsonrpc: "2.0", id, result: {} });
    } else if (method === "tools/list") {
      send({ jsonrpc: "2.0", id, result: { tools: TOOLS } });
    } else if (method === "tools/call") {
      const data = await callTool(params?.name, params?.arguments || {});
      send({
        jsonrpc: "2.0",
        id,
        result: { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] },
      });
    } else if (id !== undefined) {
      send({ jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${method}` } });
    }
  } catch (e) {
    if (id !== undefined) {
      send({ jsonrpc: "2.0", id, error: { code: -32603, message: String(e?.message || e) } });
    }
  }
});
