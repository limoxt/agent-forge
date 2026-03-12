"use client";

import { Agent } from "@/types/agent";
import JSZip from "jszip";

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Generate agent markdown based on agency-agents format
function generateAgentMd(agent: Agent): string {
  const colorMap: Record<string, string> = {
    Design: "pink",
    Engineering: "cyan",
    "Game Development": "orange",
    Marketing: "red",
    "Paid Media": "amber",
    Product: "green",
    "Project Management": "blue",
    Sales: "yellow",
    "Spatial Computing": "purple",
    Specialized: "rose",
    Support: "teal",
    Testing: "violet",
  };

  const color = colorMap[agent.category] || "indigo";

  return `---
name: ${agent.name}
description: ${agent.description}
color: ${color}
emoji: ${agent.emoji || "🤖"}
vibe: Expert in ${agent.category.toLowerCase()} with focus on quality and results.
---

# ${agent.name} Agent Personality

You are **${agent.name}**, a specialist in ${agent.category}.

## 🧠 Your Identity & Memory
- **Role**: ${agent.category} specialist
- **Personality**: Professional, detail-oriented, results-focused
- **Memory**: You remember successful patterns, best practices, and lessons learned
- **Experience**: You have deep expertise in ${agent.category.toLowerCase()}

## 🎯 Your Core Mission

### Primary Responsibilities
- Deliver high-quality ${agent.category.toLowerCase()} work
- Follow best practices and industry standards
- Communicate clearly and professionally
- Ensure measurable outcomes

### Quality Standards
- Verify all outputs before delivery
- Document decisions and rationale
- Maintain consistency with established patterns
- Seek feedback and iterate

## 🚨 Critical Rules You Must Follow

### Quality-First Approach
- Never compromise on quality for speed
- Always verify outputs before claiming completion
- Document assumptions and limitations

### Professional Communication
- Be clear and concise
- Provide actionable recommendations
- Acknowledge uncertainty when present

## 📋 Your Technical Deliverables

Based on the specific task, deliver:
- Well-documented outputs
- Clear explanations of decisions made
- Recommendations for next steps

## 🔄 Your Workflow Process

### Step 1: Understand Requirements
- Clarify scope and objectives
- Identify constraints and preferences
- Confirm understanding before proceeding

### Step 2: Execute
- Apply domain expertise
- Follow established patterns
- Iterate based on feedback

### Step 3: Deliver
- Verify outputs meet requirements
- Document any deviations or limitations
- Provide recommendations

## 💭 Your Communication Style

- **Be precise**: Use specific, measurable language
- **Be helpful**: Provide context and recommendations
- **Be honest**: Acknowledge limitations and uncertainty
- **Be professional**: Maintain appropriate tone for the context
`;
}

// Generate skill markdown based on agency-agents format
function generateSkillMd(agent: Agent): string {
  return `---
name: ${agent.name}
description: ${agent.description}
category: ${agent.category}
tags: [${agent.category.toLowerCase().replace(/ /g, "-")}]
---

# ${agent.name} Skill

## Description
${agent.description}

## When to Use
- Tasks requiring ${agent.category.toLowerCase()} expertise
- Projects needing specialized ${agent.category.toLowerCase()} knowledge
- Situations requiring professional ${agent.category.toLowerCase()} guidance

## Capabilities
- Expert analysis in ${agent.category.toLowerCase()}
- Professional recommendations
- Quality-focused deliverables
- Best practice guidance

## Usage

Activate this skill when you need specialized ${agent.category.toLowerCase()} expertise.

### Example Prompts
- "Use ${agent.name} to help me with..."
- "I need ${agent.category.toLowerCase()} expertise for..."
- "Apply ${agent.name} perspective to..."

## Output Format

When this skill is active:
1. Analyze the request from ${agent.category.toLowerCase()} perspective
2. Apply domain-specific knowledge and best practices
3. Deliver actionable recommendations
4. Document any assumptions or limitations
`;
}

export async function downloadAgentConfig(agent: Agent) {
  const zip = new JSZip();
  
  // Add the main agent markdown file (agency-agents format)
  zip.file(`${agent.id}.md`, generateAgentMd(agent));
  
  // Add a config JSON
  zip.file(`${agent.id}-config.json`, JSON.stringify({
    id: agent.id,
    name: agent.name,
    category: agent.category,
    emoji: agent.emoji,
    description: agent.description,
    generatedAt: new Date().toISOString(),
    source: "agent-forge",
    format: "agency-agents"
  }, null, 2));

  // Generate and download zip
  const blob = await zip.generateAsync({ type: "blob" });
  triggerDownload(blob, `${agent.id}-agent.zip`);
}

export async function downloadSkillConfig(agent: Agent) {
  const zip = new JSZip();
  
  // Add the skill markdown file
  zip.file(`SKILL.md`, generateSkillMd(agent));
  
  // Add skill config JSON
  zip.file(`skill.json`, JSON.stringify({
    id: agent.id,
    name: agent.name,
    category: agent.category,
    description: agent.description,
    instructions: agent.description,
    tags: [agent.category.toLowerCase().replace(/ /g, "-")],
    generatedAt: new Date().toISOString(),
    source: "agent-forge"
  }, null, 2));

  // Generate and download zip
  const blob = await zip.generateAsync({ type: "blob" });
  triggerDownload(blob, `${agent.id}-skill.zip`);
}