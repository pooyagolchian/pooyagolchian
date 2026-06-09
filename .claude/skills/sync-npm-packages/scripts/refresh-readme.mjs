#!/usr/bin/env node
/**
 * refresh-readme.mjs — regenerates the npm-packages block in README.md between the
 *   <!-- NPM-PACKAGES:START --> / <!-- NPM-PACKAGES:END -->
 * markers. Source of truth: the live npm registry (maintainer:pooya).
 *
 * Zero dependencies, Node 18+ (global fetch). Used by both the `sync-npm-packages`
 * skill and `.github/workflows/npm-packages-workflow.yml`.
 *
 * Env:
 *   NPM_MAINTAINER  npm username (default: pooya)
 *   README_PATH     override README location (default: repo-root README.md)
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const MAINTAINER = process.env.NPM_MAINTAINER || "pooya";
const README =
  process.env.README_PATH ||
  resolve(dirname(fileURLToPath(import.meta.url)), "../../../../README.md");

// brand palette (keep in sync with .claude/skills/forge-badge)
const C_VER = "6C47FF"; // version badge
const C_DL = "8E75B2"; // downloads badge

// Curated grouping. Any package not listed here drops into an auto "📦 More" group,
// so newly published packages appear without code changes.
const GROUPS = [
  { title: "🤖 AI / Agentic", names: ["use-local-llm"] },
  { title: "💱 Currency & i18n", names: ["dirham", "riyal"] },
  {
    title: "🎨 Vue / Nuxt — UI & Theming",
    names: ["vue-multiple-themes", "nuxt-multiple-themes", "vue-js-star-rating"],
  },
  { title: "🧰 CSS Tooling", names: ["scss-helper"] },
];

const json = async (url) => {
  const r = await fetch(url, { headers: { "user-agent": "npm-pulse/1.0" } });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} — ${url}`);
  return r.json();
};

const short = (s, n = 112) => {
  s = (s || "").replace(/\s+/g, " ").trim();
  return s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, "").trimEnd() + "…";
};

const fmt = (n) => (n >= 1000 ? `${Math.round(n / 1000)}K` : String(n));

const verBadge = (p) =>
  `[![v](https://img.shields.io/npm/v/${p}?style=flat-square&logo=npm&logoColor=white&color=${C_VER}&label=)](https://www.npmjs.com/package/${p})`;
const dlBadge = (p) =>
  `[![dm](https://img.shields.io/npm/dm/${p}?style=flat-square&color=${C_DL}&label=%E2%86%93%2Fmo)](https://www.npmjs.com/package/${p})`;

async function main() {
  const search = await json(
    `https://registry.npmjs.org/-/v1/search?text=maintainer:${encodeURIComponent(MAINTAINER)}&size=250`,
  );
  const pkgs = new Map();
  for (const o of search.objects || []) {
    pkgs.set(o.package.name, {
      name: o.package.name,
      version: o.package.version,
      description: o.package.description || "",
    });
  }
  if (pkgs.size === 0) throw new Error(`no packages found for maintainer:${MAINTAINER}`);

  // yearly downloads → headline stat
  let totalYear = 0;
  await Promise.all(
    [...pkgs.keys()].map(async (name) => {
      try {
        const d = await json(`https://api.npmjs.org/downloads/point/last-year/${name}`);
        totalYear += d.downloads || 0;
      } catch {
        /* ignore single-package failures */
      }
    }),
  );

  // build groups (+ auto "More" for anything uncategorised)
  const used = new Set();
  const groups = GROUPS.map((g) => ({
    title: g.title,
    items: g.names.filter((n) => pkgs.has(n)),
  }));
  groups.forEach((g) => g.items.forEach((n) => used.add(n)));
  const rest = [...pkgs.keys()].filter((n) => !used.has(n)).sort();
  if (rest.length) groups.push({ title: "📦 More", items: rest });

  let out = `<div align="center"><sub><b>${pkgs.size} packages</b> · ~${fmt(totalYear)} downloads / year on npm · published under <a href="https://www.npmjs.com/~${MAINTAINER}"><code>${MAINTAINER}</code></a></sub></div>\n\n`;

  for (const g of groups) {
    if (!g.items.length) continue;
    out += `**${g.title}**\n\n`;
    out += `| Package | What it does | Version | Downloads |\n| :-- | :-- | :-: | :-: |\n`;
    for (const n of g.items) {
      const p = pkgs.get(n);
      out += `| [\`${n}\`](https://www.npmjs.com/package/${n}) | ${short(p.description)} | ${verBadge(n)} | ${dlBadge(n)} |\n`;
    }
    out += `\n`;
  }
  out = out.trimEnd() + "\n";

  const md = await readFile(README, "utf8");
  const S = "<!-- NPM-PACKAGES:START -->";
  const E = "<!-- NPM-PACKAGES:END -->";
  const re = new RegExp(`${S}[\\s\\S]*?${E}`);
  if (!re.test(md)) throw new Error(`markers ${S} / ${E} not found in ${README}`);
  const next = md.replace(re, `${S}\n${out}${E}`);

  if (next === md) {
    console.error("refresh-readme: no changes.");
    return;
  }
  await writeFile(README, next);
  console.error(`refresh-readme: updated ${pkgs.size} packages (~${fmt(totalYear)}/yr).`);
}

main().catch((e) => {
  console.error("refresh-readme failed:", e.message);
  process.exit(1);
});
