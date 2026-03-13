#!/usr/bin/env node

/**
 * Sync script: pulls persona files from allanbunch/mindmark repo
 * and adds them to data/agents.json + data/raw/
 *
 * Usage: node scripts/sync-mindmark.mjs
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const RAW_DIR = join(ROOT, "data", "raw");
const AGENTS_JSON = join(ROOT, "data", "agents.json");

const REPO = "allanbunch/mindmark";
const BRANCH = "main";

// Map MindMark categories to AgentForge categories
const CATEGORY_MAP = {
  art: "Creative",
  culinary: "Lifestyle",
  education: "Education",
  lifestyle: "Lifestyle",
  professional: "Professional",
};

// Map MindMark categories to emojis
const EMOJI_MAP = {
  art: "🎨",
  culinary: "🍷",
  education: "📚",
  lifestyle: "✨",
  professional: "💼",
};

async function fetchGitTree() {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/git/trees/${BRANCH}?recursive=1`,
    { headers: { "User-Agent": "agentforge-sync" } }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();
  return data.tree
    .filter((f) => f.path.startsWith("minds/") && f.path.endsWith(".md"))
    .map((f) => f.path);
}

async function fetchFile(path) {
  const url = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${path}`;
  const res = await fetch(url, { headers: { "User-Agent": "agentforge-sync" } });
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  return res.text();
}

function parseMindMarkFile(content, filePath) {
  // Extract category from path: minds/{category}/{name}.md
  const parts = filePath.split("/");
  const category = parts[1]; // e.g., "art", "culinary"
  const filename = parts[2].replace(".md", "");

  // Extract role description from ## Role section
  const roleMatch = content.match(/## Role\s*\n### (.+?)(?:\n|$)/);
  const description = roleMatch
    ? roleMatch[1].trim()
    : `${toTitleCase(filename.replace(/-/g, " "))} specialist`;

  // Extract name — use filename, title-cased
  const name = toTitleCase(filename.replace(/-/g, " "));

  return {
    name,
    category,
    description,
    filename,
  };
}

function toTitleCase(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

function generateId(category, filename) {
  return `mindmark-${category}-${filename}`;
}

async function main() {
  console.log("🔄 Syncing MindMark personas...\n");

  mkdirSync(RAW_DIR, { recursive: true });

  // Load existing agents
  const existingAgents = JSON.parse(readFileSync(AGENTS_JSON, "utf-8"));
  const existingIds = new Set(existingAgents.map((a) => a.id));

  // Fetch file list
  const files = await fetchGitTree();
  console.log(`  Found ${files.length} persona files\n`);

  let added = 0;
  let skipped = 0;

  for (const filePath of files) {
    const parts = filePath.split("/");
    if (parts.length !== 3) continue; // skip unexpected paths

    const category = parts[1];
    const filename = parts[2].replace(".md", "");
    const id = generateId(category, filename);

    if (existingIds.has(id)) {
      skipped++;
      continue;
    }

    const content = await fetchFile(filePath);
    const parsed = parseMindMarkFile(content, filePath);

    // Convert to agency-agents-like format with frontmatter
    const agentForgeContent = `---
name: "${parsed.name}"
category: "${CATEGORY_MAP[parsed.category] || "Specialized"}"
emoji: "${EMOJI_MAP[parsed.category] || "🤖"}"
description: "${parsed.description.replace(/"/g, '\\"')}"
vibe: "${parsed.name} specialist"
source: mindmark
---

${content}
`;

    // Save raw file
    writeFileSync(join(RAW_DIR, `${id}.md`), agentForgeContent, "utf-8");

    // Add to agents list
    existingAgents.push({
      id,
      name: parsed.name,
      category: CATEGORY_MAP[parsed.category] || "Specialized",
      emoji: EMOJI_MAP[parsed.category] || "🤖",
      description: parsed.description,
      vibe: `${parsed.name} specialist`,
      color: "",
      source_url: `https://github.com/${REPO}/blob/${BRANCH}/${filePath}`,
    });

    added++;
    process.stdout.write(`\r  Synced ${added} personas`);

    // Rate limiting
    await new Promise((r) => setTimeout(r, 100));
  }

  // Save updated agents.json
  writeFileSync(AGENTS_JSON, JSON.stringify(existingAgents, null, 2), "utf-8");

  console.log(`\n\n✅ MindMark sync complete:`);
  console.log(`   Added: ${added}`);
  console.log(`   Skipped (already exists): ${skipped}`);
  console.log(`   Total agents: ${existingAgents.length}`);
}

main().catch(console.error);
