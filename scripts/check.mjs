#!/usr/bin/env node
// Checks the plugin before a merge or a release, with no dependencies:
// - every provider manifest and marketplace entry carries the same name and version
// - both marketplaces point at the plugin folder
// - CHANGELOG.md has a section for that version
// - with --tag vX.Y.Z, the tag matches the version
// - every skill has portable frontmatter (name = folder name, a description)
// - the plugin folder holds only what the Claude directory accepts (see below):
//   no scripts, SVG or other code, so the directory scan reads all of it
// - referenced asset files exist, no OS junk files, no oversized files
// Usage: node scripts/check.mjs [--tag vX.Y.Z]
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const PLUGIN_DIR = "plugins/ai-board-lite";
const plugin = join(root, PLUGIN_DIR);
const errors = [];
const fail = (msg) => errors.push(msg);
const read = (p) => readFileSync(join(root, p), "utf8");
const json = (p) => JSON.parse(read(p));

const claude = json(`${PLUGIN_DIR}/.claude-plugin/plugin.json`);
const codex = json(`${PLUGIN_DIR}/.codex-plugin/plugin.json`);
const gemini = json(`${PLUGIN_DIR}/gemini-extension.json`);
const claudeMarket = json(".claude-plugin/marketplace.json");
const codexMarket = json(".agents/plugins/marketplace.json");
const { name, version } = claude;

if (!/^\d+\.\d+\.\d+$/.test(version)) fail(`version "${version}" is not X.Y.Z`);
for (const [file, m] of [[".codex-plugin/plugin.json", codex], ["gemini-extension.json", gemini]]) {
  if (m.name !== name) fail(`${PLUGIN_DIR}/${file}: name "${m.name}" != "${name}"`);
  if (m.version !== version) fail(`${PLUGIN_DIR}/${file}: version "${m.version}" != "${version}"`);
}
const entry = claudeMarket.plugins.find((p) => p.name === name);
if (!entry) fail(`.claude-plugin/marketplace.json: no entry for ${name}`);
else {
  if (entry.version !== version) fail(`.claude-plugin/marketplace.json: version "${entry.version}" != "${version}"`);
  if (entry.source !== `./${PLUGIN_DIR}`) fail(`.claude-plugin/marketplace.json: source "${entry.source}" != "./${PLUGIN_DIR}"`);
}
const codexEntry = codexMarket.plugins.find((p) => p.name === name);
if (!codexEntry) fail(`.agents/plugins/marketplace.json: no entry for ${name}`);
else if (codexEntry.source?.path !== `./${PLUGIN_DIR}`)
  fail(`.agents/plugins/marketplace.json: path "${codexEntry.source?.path}" != "./${PLUGIN_DIR}"`);

const changelog = read(`${PLUGIN_DIR}/CHANGELOG.md`);
if (!new RegExp(`^## ${version.replaceAll(".", "\\.")}\\b`, "m").test(changelog))
  fail(`${PLUGIN_DIR}/CHANGELOG.md: no "## ${version}" section`);

const tagArg = process.argv.indexOf("--tag");
if (tagArg !== -1) {
  const tag = process.argv[tagArg + 1];
  if (tag !== `v${version}`) fail(`tag "${tag}" does not match manifest version v${version}`);
}

const skillsDir = join(plugin, "skills");
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
  if (!existsSync(join(plugin, p))) fail(`asset ${p} is referenced but missing`);

if (read("LICENSE") !== read(`${PLUGIN_DIR}/LICENSE`)) fail(`LICENSE and ${PLUGIN_DIR}/LICENSE differ`);

// The Claude plugin directory only accepts these from non-Verified organizations:
// Markdown, text, JSON, YAML and PNG/JPEG/GIF/WebP/ICO images, UTF-8 without NUL
// bytes, nothing starting with "#!", no package manager config. SVG is not allowed.
const IMAGES = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico"]);
const TEXT = new Set([".md", ".txt", ".json", ".yaml", ".yml"]);
const PACKAGE_CONFIG = /^(package\.json|package-lock\.json|pnpm-.*\.yaml|yarn\.lock|\.npmrc|\.yarnrc.*|bun\.lockb?)$/;
const SKIP = new Set([".git", "node_modules", "dist"]);
const utf8 = new TextDecoder("utf-8", { fatal: true });
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    if (SKIP.has(f)) continue;
    const p = join(dir, f), rel = relative(root, p);
    const st = statSync(p);
    if (st.isDirectory()) { walk(p); continue; }
    if ([".DS_Store", "Thumbs.db", "desktop.ini"].includes(f)) fail(`${rel}: OS junk file`);
    if (!IMAGES.has(extname(f)) && st.size > 256 * 1024) fail(`${rel}: over 256 KiB`);
    if (!rel.startsWith(`${PLUGIN_DIR}/`)) continue;
    const ext = extname(f).toLowerCase();
    if (IMAGES.has(ext)) continue;
    if (!(TEXT.has(ext) || f === "LICENSE") || PACKAGE_CONFIG.test(f)) {
      fail(`${rel}: the plugin directory only takes Markdown, text, JSON, YAML and PNG/JPEG/GIF/WebP/ICO here; keep tooling outside ${PLUGIN_DIR}`);
      continue;
    }
    const bytes = readFileSync(p);
    if (bytes.includes(0)) fail(`${rel}: contains NUL bytes`);
    try { utf8.decode(bytes); } catch { fail(`${rel}: not valid UTF-8`); }
    if (bytes.subarray(0, 2).toString() === "#!") fail(`${rel}: starts with #!`);
  }
})(root);

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log(`✔ ${name} ${version}: manifests, changelog and skills agree`);
