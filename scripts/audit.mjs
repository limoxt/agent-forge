#!/usr/bin/env node

/**
 * Audit script: checks which sections from raw agent files
 * are NOT being captured by the current convert.mjs logic.
 */

import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAW_DIR = join(__dirname, "..", "data", "raw");

// These are the keywords currently used in convert.mjs findSection() calls
const MATCHED_KEYWORDS = [
  // generateSOUL
  "communication", "style",
  "critical rules", "rules", "boundaries",
  "identity", "memory",
  // generateAGENTS
  "core mission", "mission", "responsibilities",
  "workflow", "process", "step",
  "deliverable", "output", "template", "checklist",
  "learning",
  "success", "metrics",
  "advanced", "capabilities",
  "role definition", "role",
  "specialized skills", "core expertise", "specialization",
  "decision framework", "decision logic",
  "tooling", "tool stack", "technical stack",
  "executive summary",
];

function extractSections(body) {
  const sections = new Map();
  const lines = body.split("\n");
  let currentHeading = "_intro";
  let currentContent = [];

  for (const line of lines) {
    const headingMatch = line.match(/^##\s+(.+)$/);
    if (headingMatch) {
      sections.set(currentHeading, currentContent.join("\n").trim());
      currentHeading = headingMatch[1].replace(/[🧠🎯🚨📋🔄💭🔧📝💬🔁🚀🛡️⚡]/g, "").trim();
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }
  sections.set(currentHeading, currentContent.join("\n").trim());
  return sections;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { body: content };
  return { body: match[2].trim() };
}

function isMatched(heading) {
  if (heading === "_intro") return true;
  const lower = heading.toLowerCase();
  return MATCHED_KEYWORDS.some(kw => lower.includes(kw.toLowerCase()));
}

// Main
const files = readdirSync(RAW_DIR).filter(f => f.endsWith(".md"));
const unmatchedMap = new Map(); // heading -> count
let totalDropped = 0;
let totalSections = 0;
const droppedByAgent = [];

for (const file of files) {
  const raw = readFileSync(join(RAW_DIR, file), "utf-8");
  const { body } = parseFrontmatter(raw);
  const sections = extractSections(body);

  const dropped = [];
  for (const [heading, content] of sections) {
    totalSections++;
    if (!isMatched(heading) && content.length > 20) {
      dropped.push({ heading, chars: content.length });
      unmatchedMap.set(heading, (unmatchedMap.get(heading) || 0) + 1);
      totalDropped++;
    }
  }

  if (dropped.length > 0) {
    droppedByAgent.push({ file, dropped });
  }
}

console.log("═══════════════════════════════════════════");
console.log("CONVERSION AUDIT REPORT");
console.log("═══════════════════════════════════════════\n");
console.log(`Total sections across all agents: ${totalSections}`);
console.log(`Sections being dropped: ${totalDropped}`);
console.log(`Agents with dropped content: ${droppedByAgent.length}/${files.length}\n`);

console.log("── DROPPED SECTIONS BY FREQUENCY ──\n");
const sorted = [...unmatchedMap.entries()].sort((a, b) => b[1] - a[1]);
for (const [heading, count] of sorted) {
  console.log(`  ${String(count).padStart(3)}x  ${heading}`);
}

console.log(`\n── AGENTS WITH MOST DROPPED CONTENT ──\n`);
droppedByAgent
  .sort((a, b) => b.dropped.length - a.dropped.length)
  .slice(0, 15)
  .forEach(({ file, dropped }) => {
    console.log(`  ${file} (${dropped.length} sections dropped):`);
    dropped.forEach(d => console.log(`    - ${d.heading} (${d.chars} chars)`));
  });
