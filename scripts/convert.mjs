#!/usr/bin/env node

/**
 * Convert script: transforms raw agency-agents .md files into
 * OpenClaw-compatible format (SOUL.md, IDENTITY.md, AGENTS.md, SKILL.md)
 *
 * Output: public/downloads/{agent-id}.json
 *   { agent: { "SOUL.md": ..., "IDENTITY.md": ..., "AGENTS.md": ..., "README.md": ... },
 *     skill: { "SKILL.md": ..., "README.md": ... } }
 *
 * Usage: node scripts/convert.mjs
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const RAW_DIR = join(ROOT, "data", "raw");
const OUT_DIR = join(ROOT, "public", "downloads");

// ═══════════════════════════════════════════
// PARSING
// ═══════════════════════════════════════════

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };

  const metaStr = match[1];
  const body = match[2].trim();
  const meta = {};

  for (const line of metaStr.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
    meta[key] = value;
  }

  return { meta, body };
}

/**
 * Extract sections from the markdown body by ## headings.
 * Returns a Map<heading, content>
 */
function extractSections(body) {
  const sections = new Map();
  const lines = body.split("\n");
  let currentHeading = "_intro";
  let currentContent = [];

  for (const line of lines) {
    const headingMatch = line.match(/^##\s+(.+)$/);
    if (headingMatch) {
      sections.set(currentHeading, currentContent.join("\n").trim());
      currentHeading = headingMatch[1].replace(/[🧠🎯🚨📋🔄💭🔧📝💬🔁🎯🚀🛡️⚡]/g, "").trim();
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }
  sections.set(currentHeading, currentContent.join("\n").trim());
  return sections;
}

/**
 * Find a section by partial heading match (case-insensitive)
 */
function findSection(sections, ...keywords) {
  for (const [heading, content] of sections) {
    const lower = heading.toLowerCase();
    if (keywords.some(kw => lower.includes(kw.toLowerCase()))) {
      return content;
    }
  }
  return "";
}

// ═══════════════════════════════════════════
// GENERATORS
// ═══════════════════════════════════════════

function generateSOUL(meta, sections, body) {
  // SOUL.md = persona + tone + boundaries + communication style
  const intro = sections.get("_intro") || "";
  const communication = findSection(sections, "communication", "style");
  const rules = findSection(sections, "critical rules", "rules", "boundaries");
  const identity = findSection(sections, "identity", "memory");

  return `# ${meta.name}

## Core Truths

${intro}

${identity ? `## Identity\n\n${identity}\n` : ""}
## Boundaries

${rules || "- Prioritize substantive help over pleasantries\n- Seek permission before external communications\n- Acknowledge limitations honestly"}

## Vibe

${meta.vibe || `Professional, focused ${meta.name} specialist.`}

## Communication Style

${communication || "- Be clear and concise\n- Provide actionable recommendations\n- Acknowledge uncertainty when present"}

---
*Source: [agency-agents](${meta.source_url || `https://github.com/msitarzewski/agency-agents`}) — adapted for OpenClaw*
`;
}

function generateIDENTITY(meta) {
  return `---
name: ${meta.name}
creature: AI specialist agent
vibe: ${meta.vibe || `Expert ${meta.name}`}
emoji: ${meta.emoji || "🤖"}
avatar:
---

# ${meta.name}

${meta.description}
`;
}

function generateAGENTS(meta, sections) {
  const mission = findSection(sections, "core mission", "mission", "responsibilities");
  const workflow = findSection(sections, "workflow", "process", "step");
  const deliverables = findSection(sections, "deliverable", "output", "template", "checklist");
  const memory = findSection(sections, "memory", "learning");
  const success = findSection(sections, "success", "metrics");
  const advanced = findSection(sections, "advanced", "capabilities");

  return `# AGENTS.md — ${meta.name}

## Session start (required)

* Read \`SOUL.md\`, \`USER.md\`, and \`IDENTITY.md\` before responding.
* You are **${meta.name}**: ${meta.description}

## Core Mission

${mission || meta.description}

${workflow ? `## Workflow\n\n${workflow}\n` : ""}
${deliverables ? `## Deliverables\n\n${deliverables}\n` : ""}
${advanced ? `## Advanced Capabilities\n\n${advanced}\n` : ""}
${success ? `## Success Metrics\n\n${success}\n` : ""}
## Memory system

* Daily log: \`memory/YYYY-MM-DD.md\`
* Long-term memory: \`MEMORY.md\` for durable facts, preferences, and decisions.
${memory ? `\n### Domain Memory\n\n${memory}\n` : ""}
## Safety defaults

* Don't dump directories or secrets into chat.
* Don't run destructive commands unless explicitly asked.
* Don't share private data, contact info, or internal notes.

## Tools & skills

* Tools live in skills; follow each skill's \`SKILL.md\` when you need it.
* Keep environment-specific notes in \`TOOLS.md\`.

---
*Source: [agency-agents](${meta.source_url || `https://github.com/msitarzewski/agency-agents`}) — adapted for OpenClaw*
`;
}

function generateAgentREADME(meta) {
  return `# ${meta.emoji} ${meta.name} — OpenClaw Agent

> ${meta.description}

## Installation

Copy these files into your OpenClaw workspace:

\`\`\`bash
# Default workspace location
cp SOUL.md ~/.openclaw/workspace/SOUL.md
cp IDENTITY.md ~/.openclaw/workspace/IDENTITY.md
cp AGENTS.md ~/.openclaw/workspace/AGENTS.md
\`\`\`

Or if using a custom workspace:

\`\`\`bash
cp SOUL.md /path/to/your/workspace/SOUL.md
cp IDENTITY.md /path/to/your/workspace/IDENTITY.md
cp AGENTS.md /path/to/your/workspace/AGENTS.md
\`\`\`

## Multi-Agent Setup

To add as a separate agent in \`~/.openclaw/openclaw.json\`:

\`\`\`json5
{
  agents: {
    list: [
      { id: "${meta.id}", workspace: "~/.openclaw/workspace-${meta.id}" }
    ]
  }
}
\`\`\`

Then copy the files into \`~/.openclaw/workspace-${meta.id}/\`.

## What's Included

| File | Purpose |
|------|---------|
| \`SOUL.md\` | Persona, tone, boundaries, communication style |
| \`IDENTITY.md\` | Name, emoji, vibe |
| \`AGENTS.md\` | Operating instructions, workflow, deliverables, memory |

## Source

Adapted from [agency-agents](${meta.source_url || "https://github.com/msitarzewski/agency-agents"}) for OpenClaw.

---
*Generated by [Agent Forge](https://agentforge.sh)*
`;
}

function generateSKILL(meta, sections, body) {
  const mission = findSection(sections, "core mission", "mission", "responsibilities");
  const workflow = findSection(sections, "workflow", "process", "step");
  const deliverables = findSection(sections, "deliverable", "output", "template", "checklist");
  const rules = findSection(sections, "critical rules", "rules");
  const communication = findSection(sections, "communication", "style");

  return `---
name: ${meta.id}
description: "${meta.description}"
---

# ${meta.name}

${meta.description}

${mission ? `## When to Use\n\n${mission}\n` : ""}
${rules ? `## Rules\n\n${rules}\n` : ""}
${workflow ? `## Workflow\n\n${workflow}\n` : ""}
${deliverables ? `## Deliverables\n\n${deliverables}\n` : ""}
${communication ? `## Communication Style\n\n${communication}\n` : ""}
---
*Source: [agency-agents](${meta.source_url || `https://github.com/msitarzewski/agency-agents`}) — adapted for OpenClaw*
`;
}

function generateSkillREADME(meta) {
  return `# ${meta.emoji} ${meta.name} — OpenClaw Skill

> ${meta.description}

## Installation

Copy the \`${meta.id}/\` folder into your skills directory:

\`\`\`bash
# Workspace-level (this agent only)
cp -r ${meta.id}/ ~/.openclaw/workspace/skills/${meta.id}/

# Or managed-level (all agents)
cp -r ${meta.id}/ ~/.openclaw/skills/${meta.id}/
\`\`\`

## What's Included

| File | Purpose |
|------|---------|
| \`SKILL.md\` | Skill definition with instructions |

## Usage

Once installed, the skill is automatically available. Invoke with:

> "Use ${meta.name} to help me with..."

## Source

Adapted from [agency-agents](${meta.source_url || "https://github.com/msitarzewski/agency-agents"}) for OpenClaw.

---
*Generated by [Agent Forge](https://agentforge.sh)*
`;
}

// ═══════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════

function main() {
  console.log("🔄 Converting agents to OpenClaw format...\n");

  mkdirSync(OUT_DIR, { recursive: true });

  const files = readdirSync(RAW_DIR).filter(f => f.endsWith(".md"));
  let count = 0;

  // Load agents.json to get metadata
  const agentsJson = JSON.parse(readFileSync(join(ROOT, "data", "agents.json"), "utf-8"));
  const agentMap = new Map(agentsJson.map(a => [a.id, a]));

  for (const file of files) {
    const id = file.replace(".md", "");
    const agentMeta = agentMap.get(id);
    if (!agentMeta) {
      console.warn(`  ⚠ No metadata for ${id}, skipping`);
      continue;
    }

    const raw = readFileSync(join(RAW_DIR, file), "utf-8");
    const { meta, body } = parseFrontmatter(raw);
    const sections = extractSections(body);

    // Merge frontmatter meta with agents.json meta
    const fullMeta = { ...agentMeta, ...meta, id, source_url: agentMeta.source_url };

    const result = {
      agent: {
        "SOUL.md": generateSOUL(fullMeta, sections, body),
        "IDENTITY.md": generateIDENTITY(fullMeta),
        "AGENTS.md": generateAGENTS(fullMeta, sections),
        "README.md": generateAgentREADME(fullMeta),
      },
      skill: {
        "SKILL.md": generateSKILL(fullMeta, sections, body),
        "README.md": generateSkillREADME(fullMeta),
      },
    };

    writeFileSync(join(OUT_DIR, `${id}.json`), JSON.stringify(result, null, 2), "utf-8");
    count++;
    process.stdout.write(`\r  Converted ${count}/${files.length}`);
  }

  console.log(`\n\n✅ Converted ${count} agents → ${OUT_DIR}`);
}

main();
