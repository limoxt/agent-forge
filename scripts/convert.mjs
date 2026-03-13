#!/usr/bin/env node

/**
 * Convert script: transforms raw agency-agents .md files into
 * OpenClaw-compatible format (SOUL.md, IDENTITY.md, AGENTS.md, SKILL.md, USER.md)
 *
 * Output: public/downloads/{agent-id}.json
 *   { agent: { "SOUL.md": ..., "IDENTITY.md": ..., "AGENTS.md": ..., "USER.md": ..., "README.md": ... },
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
 * Find a section by partial heading match (case-insensitive).
 * Tracks consumed headings in the `used` Set if provided.
 */
function findSection(sections, used, ...keywords) {
  for (const [heading, content] of sections) {
    const lower = heading.toLowerCase();
    if (keywords.some(kw => lower.includes(kw.toLowerCase()))) {
      if (used) used.add(heading);
      return content;
    }
  }
  return "";
}

/**
 * Collect all sections NOT consumed by findSection calls.
 * Returns formatted markdown string of remaining sections.
 */
function getUnconsumedSections(sections, used) {
  const remaining = [];
  for (const [heading, content] of sections) {
    if (heading === "_intro") continue;
    if (used.has(heading)) continue;
    if (!content || content.length < 20) continue;
    remaining.push(`## ${heading}\n\n${content}`);
  }
  return remaining.join("\n\n");
}

// ═══════════════════════════════════════════
// GENERATORS
// ═══════════════════════════════════════════

function generateSOUL(meta, sections, body, used) {
  // SOUL.md = persona + tone + boundaries + communication style
  const intro = sections.get("_intro") || "";
  const communication = findSection(sections, used, "communication", "style", "approach", "philosophy");
  const rules = findSection(sections, used, "critical rules", "rules", "boundaries", "principles", "guidelines");
  const identity = findSection(sections, used, "identity", "memory");

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
  // P1: 移除空的 avatar 字段
  return `---
name: ${meta.name}
creature: AI specialist agent
vibe: ${meta.vibe || `Expert ${meta.name}`}
emoji: ${meta.emoji || "🤖"}
---

# ${meta.name}

${meta.description}
`;
}

function generateAGENTS(meta, sections, used) {
  // P1: 扩展 section 关键词映射
  const mission = findSection(sections, used, "core mission", "mission", "responsibilities", "objective");
  const workflow = findSection(sections, used, "workflow", "process", "step", "procedure");
  const deliverables = findSection(sections, used, "deliverable", "output", "template", "checklist", "artifacts");
  const memory = findSection(sections, used, "memory", "learning");
  const success = findSection(sections, used, "success", "metrics", "quality", "standards");
  const advanced = findSection(sections, used, "advanced", "capabilities", "expertise", "mastery");
  const roleDefinition = findSection(sections, used, "role definition", "role");
  const specializedSkills = findSection(sections, used, "specialized skills", "core expertise", "specialization", "competencies");
  const decisionFramework = findSection(sections, used, "decision framework", "decision logic", "decision making");
  const tooling = findSection(sections, used, "tooling", "tool stack", "technical stack", "tools & technologies", "technologies");
  const executiveSummary = findSection(sections, used, "executive summary");
  const methodology = findSection(sections, used, "methodology", "framework", "approach");
  const examples = findSection(sections, used, "examples", "patterns", "best practices", "common patterns");

  // Collect all remaining unconsumed sections
  const unconsumed = getUnconsumedSections(sections, used);

  return `# AGENTS.md — ${meta.name}

## Session start (required)

* Read \`SOUL.md\`, \`USER.md\`, and \`IDENTITY.md\` before responding.
* You are **${meta.name}**: ${meta.description}

## Core Mission

${mission || meta.description}

${roleDefinition ? `## Role Definition\n\n${roleDefinition}\n` : ""}
${methodology ? `## Methodology\n\n${methodology}\n` : ""}
${workflow ? `## Workflow\n\n${workflow}\n` : ""}
${deliverables ? `## Deliverables\n\n${deliverables}\n` : ""}
${advanced ? `## Advanced Capabilities\n\n${advanced}\n` : ""}
${specializedSkills ? `## Specialized Skills\n\n${specializedSkills}\n` : ""}
${decisionFramework ? `## Decision Framework\n\n${decisionFramework}\n` : ""}
${tooling ? `## Tooling & Automation\n\n${tooling}\n` : ""}
${examples ? `## Examples & Patterns\n\n${examples}\n` : ""}
${executiveSummary ? `## Executive Summary Template\n\n${executiveSummary}\n` : ""}
${success ? `## Success Metrics\n\n${success}\n` : ""}
${unconsumed ? `## Domain Knowledge\n\n${unconsumed}\n` : ""}
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

// P0: 生成 USER.md 模板文件
function generateUSER(meta) {
  return `# USER.md — About Your Human

_Learn about the person you're helping. Update this as you go._

- **Name**: [Your Name]
- **What to call them**: [Preferred address]
- **Pronouns**: _(optional)_
- **Timezone**: America/Chicago
- **Notes**:
  - Update this file with your preferences
  - Add context about your work, goals, and communication style
  - Include any domain-specific context relevant to this agent

## Context

This agent was installed from [Agent Forge](https://agentforge.sh).
Customize this file to personalize the agent's behavior.

---

_The more you know, the better the agent can help. But remember — you're learning about a person, not building a dossier. Respect the difference._
`;
}

function generateAgentREADME(meta) {
  return `# ${meta.emoji} ${meta.name} — OpenClaw Agent

> ${meta.description}

## Installation

### Option 1: Copy to workspace

Copy these files into your OpenClaw workspace:

\`\`\`bash
# Default workspace location
cp SOUL.md ~/.openclaw/workspace/SOUL.md
cp IDENTITY.md ~/.openclaw/workspace/IDENTITY.md
cp AGENTS.md ~/.openclaw/workspace/AGENTS.md
cp USER.md ~/.openclaw/workspace/USER.md
\`\`\`

### Option 2: Multi-agent setup

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
| \`USER.md\` | User profile template (customize this!) |

## Verification

After installation, restart OpenClaw and verify:

\`\`\`bash
openclaw gateway restart
\`\`\`

## Source

Adapted from [agency-agents](${meta.source_url || "https://github.com/msitarzewski/agency-agents"}) for OpenClaw.

---
*Generated by [Agent Forge](https://agentforge.sh)*
`;
}

function generateSKILL(meta, sections, body, used) {
  // Skill uses its own used set — it's a separate output that should also be complete
  const skillUsed = new Set();
  
  // P1: 扩展 section 关键词映射
  const mission = findSection(sections, skillUsed, "core mission", "mission", "responsibilities", "objective");
  const workflow = findSection(sections, skillUsed, "workflow", "process", "step", "procedure");
  const deliverables = findSection(sections, skillUsed, "deliverable", "output", "template", "checklist", "artifacts");
  const rules = findSection(sections, skillUsed, "critical rules", "rules", "principles", "guidelines");
  const communication = findSection(sections, skillUsed, "communication", "style", "approach");
  const advanced = findSection(sections, skillUsed, "advanced", "capabilities", "expertise", "mastery");
  const specializedSkills = findSection(sections, skillUsed, "specialized skills", "core expertise", "specialization", "competencies");
  const examples = findSection(sections, skillUsed, "examples", "patterns", "best practices");

  // Include unconsumed sections in skill too (using the skill's own tracking)
  // Skip _intro and sections already in the skill
  const remaining = [];
  for (const [heading, content] of sections) {
    if (heading === "_intro") continue;
    if (skillUsed.has(heading)) continue;
    if (!content || content.length < 20) continue;
    remaining.push(`## ${heading}\n\n${content}`);
  }
  const unconsumed = remaining.join("\n\n");

  // P0: 添加 metadata.openclaw 配置
  const emoji = meta.emoji || "🤖";
  const homepage = `https://agentforge.sh/agents/${meta.id}`;

  return `---
name: ${meta.id}
description: "${meta.description}"
homepage: "${homepage}"
user-invocable: true
metadata:
  {
    "openclaw":
      {
        "emoji": "${emoji}",
        "homepage": "${homepage}"
      }
  }
---

# ${meta.name}

${meta.description}

${mission ? `## When to Use\n\n${mission}\n` : ""}
${rules ? `## Rules\n\n${rules}\n` : ""}
${workflow ? `## Workflow\n\n${workflow}\n` : ""}
${deliverables ? `## Deliverables\n\n${deliverables}\n` : ""}
${advanced ? `## Advanced Capabilities\n\n${advanced}\n` : ""}
${specializedSkills ? `## Specialized Skills\n\n${specializedSkills}\n` : ""}
${examples ? `## Examples & Patterns\n\n${examples}\n` : ""}
${communication ? `## Communication Style\n\n${communication}\n` : ""}
${unconsumed ? `## Domain Knowledge\n\n${unconsumed}\n` : ""}
---
*Source: [agency-agents](${meta.source_url || `https://github.com/msitarzewski/agency-agents`}) — adapted for OpenClaw*
`;
}

function generateSkillREADME(meta) {
  const homepage = `https://agentforge.sh/agents/${meta.id}`;
  
  return `# ${meta.emoji} ${meta.name} — OpenClaw Skill

> ${meta.description}

## Installation

### Option 1: Copy to skills directory

\`\`\`bash
# Workspace-level (this agent only)
cp -r ${meta.id}/ ~/.openclaw/workspace/skills/${meta.id}/

# Or managed-level (all agents)
cp -r ${meta.id}/ ~/.openclaw/skills/${meta.id}/
\`\`\`

### Option 2: Via ClawHub

If this skill is published on [ClawHub](https://clawhub.com):

\`\`\`bash
clawhub install ${meta.id}
\`\`\`

## What's Included

| File | Purpose |
|------|---------|
| \`SKILL.md\` | Skill definition with instructions |

## Usage

Once installed, the skill is automatically available. Invoke with:

> "Use ${meta.name} to help me with..."

Or via slash command (if \`user-invocable\` is enabled):

> /${meta.id}

## Verification

After installation, verify the skill is loaded:

\`\`\`bash
openclaw gateway restart
\`\`\`

## Source

Adapted from [agency-agents](${meta.source_url || "https://github.com/msitarzewski/agency-agents"}) for OpenClaw.

---
*Generated by [Agent Forge](${homepage})*
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

    // Track consumed sections across agent generators
    const used = new Set();

    const result = {
      agent: {
        "SOUL.md": generateSOUL(fullMeta, sections, body, used),
        "IDENTITY.md": generateIDENTITY(fullMeta),
        "AGENTS.md": generateAGENTS(fullMeta, sections, used),
        "USER.md": generateUSER(fullMeta),
        "README.md": generateAgentREADME(fullMeta),
      },
      skill: {
        "SKILL.md": generateSKILL(fullMeta, sections, body, used),
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