#!/usr/bin/env node
// Checks the plugin before a merge or a release, with no dependencies:
// - every provider manifest and marketplace entry carries the same name and version
// - CHANGELOG.md has a section for that version
// - with --tag vX.Y.Z, the tag matches the version
// - every skill has portable frontmatter (name = folder name, a description)
// - referenced asset files exist, no OS junk files, no oversized files
// Usage: node scripts/check.mjs [--tag vX.Y.Z]
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const errors = [];
const fail = (msg) => errors.push(msg);
const json = (p) => JSON.parse(readFileSync(join(root, p), "utf8"));

const claude = json(".claude-plugin/plugin.json");
const codex = json(".codex-plugin/plugin.json");
const gemini = json("gemini-extension.json");
const claudeMarket = json(".claude-plugin/marketplace.json");
const codexMarket = json(".agents/plugins/marketplace.json");
const { name, version } = claude;

if (!/^\d+\.\d+\.\d+$/.test(version)) fail(`version "${version}" is not X.Y.Z`);
for (const [file, m] of [[".codex-plugin/plugin.json", codex], ["gemini-extension.json", gemini]]) {
  if (m.name !== name) fail(`${file}: name "${m.name}" != "${name}"`);
  if (m.version !== version) fail(`${file}: version "${m.version}" != "${version}"`);
}
const entry = claudeMarket.plugins.find((p) => p.name === name);
if (!entry) fail(`.claude-plugin/marketplace.json: no entry for ${name}`);
else if (entry.version !== version) fail(`.claude-plugin/marketplace.json: version "${entry.version}" != "${version}"`);
if (!codexMarket.plugins.some((p) => p.name === name)) fail(`.agents/plugins/marketplace.json: no entry for ${name}`);

const changelog = readFileSync(join(root, "CHANGELOG.md"), "utf8");
if (!new RegExp(`^## ${version.replaceAll(".", "\\.")}\\b`, "m").test(changelog))
  fail(`CHANGELOG.md: no "## ${version}" section`);

const tagArg = process.argv.indexOf("--tag");
if (tagArg !== -1) {
  const tag = process.argv[tagArg + 1];
  if (tag !== `v${version}`) fail(`tag "${tag}" does not match manifest version v${version}`);
}

const skillsDir = join(root, "skills");
for (const dir of readdirSync(skillsDir)) {
  const file = join(skillsDir, dir, "SKILL.md");
  if (!existsSync(file)) { fail(`skills/${dir}: no SKILL.md`); continue; }
  const front = readFileSync(file, "utf8").match(/^---\n([\s\S]*?)\n---/);
  if (!front) { fail(`skills/${dir}/SKILL.md: no frontmatter`); continue; }
  const keys = Object.fromEntries(front[1].split("\n").map((l) => l.split(/:\s*/, 2)).filter((kv) => kv.length === 2));
  if (keys.name !== dir) fail(`skills/${dir}/SKILL.md: name "${keys.name}" != folder "${dir}"`);
  if (!keys.description) fail(`skills/${dir}/SKILL.md: no description`);
  const extra = Object.keys(keys).filter((k) => !["name", "description"].includes(k));
  if (extra.length) fail(`skills/${dir}/SKILL.md: non-portable frontmatter keys ${extra.join(", ")}`);
}

for (const p of [claude.icon, codex.interface.logo, codex.interface.composerIcon])
  if (!existsSync(join(root, p))) fail(`asset ${p} is referenced but missing`);

const IMAGES = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"]);
const SKIP = new Set([".git", "node_modules", "dist"]);
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    if (SKIP.has(f)) continue;
    const p = join(dir, f), rel = p.slice(root.length);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if ([".DS_Store", "Thumbs.db", "desktop.ini"].includes(f)) fail(`${rel}: OS junk file`);
    if (!IMAGES.has(extname(f)) && statSync(p).size > 256 * 1024) fail(`${rel}: over 256 KiB`);
  }
})(root);

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log(`✔ ${name} ${version}: manifests, changelog and skills agree`);
