#!/usr/bin/env node

/**
 * Sync script: pulls all agent .md files from agency-agents GitHub repo
 * and saves them to data/raw/ with metadata in data/agents.json
 *
 * Usage: node scripts/sync.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const RAW_DIR = join(ROOT, "data", "raw");
const REPO = "msitarzewski/agency-agents";

// Categories and their subdirectory structure
const CATEGORIES = [
  { dir: "design", category: "Design" },
  { dir: "engineering", category: "Engineering" },
  { dir: "game-development", category: "Game Development", subdirs: ["godot", "roblox-studio", "unity", "unreal-engine"] },
  { dir: "marketing", category: "Marketing" },
  { dir: "paid-media", category: "Paid Media" },
  { dir: "product", category: "Product" },
  { dir: "project-management", category: "Project Management" },
  { dir: "sales", category: "Sales" },
  { dir: "spatial-computing", category: "Spatial Computing" },
  { dir: "specialized", category: "Specialized" },
  { dir: "support", category: "Support" },
  { dir: "testing", category: "Testing" },
];

async function fetchGitHubDir(path) {
  const url = `https://api.github.com/repos/${REPO}/contents/${path}`;
  const res = await fetch(url, {
    headers: { "Accept": "application/vnd.github.v3+json" },
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} for ${path}`);
  return res.json();
}

async function fetchFileContent(downloadUrl) {
  const res = await fetch(downloadUrl);
  if (!res.ok) throw new Error(`Failed to fetch: ${downloadUrl}`);
  return res.text();
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };

  const metaStr = match[1];
  const body = match[2];
  const meta = {};

  for (const line of metaStr.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();
    meta[key] = value.replace(/^["']|["']$/g, "");
  }

  return { meta, body };
}

async function processDirectory(dirPath, category) {
  const entries = await fetchGitHubDir(dirPath);
  const agents = [];

  for (const entry of entries) {
    if (entry.type === "dir") continue; // Skip subdirectories (handled separately)
    if (!entry.name.endsWith(".md")) continue;

    console.log(`  Fetching ${entry.name}...`);
    const content = await fetchFileContent(entry.download_url);
    const { meta } = parseFrontmatter(content);

    const id = entry.name.replace(".md", "");
    const rawPath = join(RAW_DIR, `${id}.md`);

    // Save raw file
    writeFileSync(rawPath, content, "utf-8");

    agents.push({
      id,
      name: meta.name || id,
      category,
      emoji: meta.emoji || "🤖",
      description: meta.description || "",
      vibe: meta.vibe || "",
      color: meta.color || "",
      source_url: `https://github.com/${REPO}/blob/main/${dirPath}/${entry.name}`,
    });
  }

  return agents;
}

async function main() {
  console.log("🔄 Syncing agency-agents repo...\n");

  mkdirSync(RAW_DIR, { recursive: true });

  const allAgents = [];

  for (const cat of CATEGORIES) {
    console.log(`\n📂 ${cat.category} (${cat.dir}/)`);

    // Process main directory .md files
    const agents = await processDirectory(cat.dir, cat.category);
    allAgents.push(...agents);

    // Process subdirectories if any
    if (cat.subdirs) {
      for (const sub of cat.subdirs) {
        console.log(`  📁 ${sub}/`);
        const subAgents = await processDirectory(`${cat.dir}/${sub}`, cat.category);
        allAgents.push(...subAgents);
      }
    }
  }

  // Sort by category then name
  allAgents.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

  // Write agents.json
  const agentsJsonPath = join(ROOT, "data", "agents.json");
  writeFileSync(agentsJsonPath, JSON.stringify(allAgents, null, 2), "utf-8");

  console.log(`\n✅ Synced ${allAgents.length} agents`);
  console.log(`   Raw files: ${RAW_DIR}`);
  console.log(`   Index: ${agentsJsonPath}`);
}

main().catch((err) => {
  console.error("❌ Sync failed:", err);
  process.exit(1);
});
