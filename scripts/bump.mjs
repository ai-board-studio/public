#!/usr/bin/env node
// Sets a new version in every manifest and opens a CHANGELOG section for it.
// Usage: node scripts/bump.mjs X.Y.Z   (then fill in the CHANGELOG entry)
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const version = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(version ?? "")) {
  console.error("usage: node scripts/bump.mjs X.Y.Z");
  process.exit(1);
}

const update = (file, fn) => {
  const p = join(root, file);
  const data = JSON.parse(readFileSync(p, "utf8"));
  fn(data);
  writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
};
const name = JSON.parse(readFileSync(join(root, ".claude-plugin/plugin.json"), "utf8")).name;

for (const file of [".claude-plugin/plugin.json", ".codex-plugin/plugin.json", "gemini-extension.json"])
  update(file, (m) => { m.version = version; });
update(".claude-plugin/marketplace.json", (m) => {
  for (const p of m.plugins) if (p.name === name) p.version = version;
});

const changelog = join(root, "CHANGELOG.md");
const text = readFileSync(changelog, "utf8");
if (!text.includes(`## ${version}`)) {
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync(changelog, text.replace(/^(# Changelog\n\n)/, `$1## ${version} — ${today}\n\nTODO: what changed.\n\n`));
}
console.log(`${name} → ${version}. Fill in CHANGELOG.md, then commit, merge and tag v${version}.`);
