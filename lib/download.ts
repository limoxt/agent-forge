import { Agent } from "@/types/agent";

function triggerDownload(content: string, filename: string) {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function extractSkillsFromDescription(description: string): string[] {
  const skillKeywords: Record<string, string[]> = {
    "cold-outreach": ["cold email", "outreach", "prospecting", "lead generation"],
    "crm": ["crm", "salesforce", "hubspot", "pipeline"],
    "sales-automation": ["automation", "automate", "workflow"],
    "content-creation": ["content", "writing", "copywriting"],
    "seo": ["seo", "search engine", "organic search"],
    "ppc": ["ppc", "google ads", "paid media", "sem"],
    "analytics": ["analytics", "metrics", "kpi", "dashboard"],
    "frontend": ["frontend", "react", "vue", "ui", "css"],
    "backend": ["backend", "api", "database", "server"],
    "devops": ["devops", "ci/cd", "deploy", "infrastructure"],
    "testing": ["test", "qa", "quality"],
    "design": ["design", "ui/ux", "visual", "interface"],
    "brand": ["brand", "identity", "branding"],
    "research": ["research", "analysis", "insight"],
    "strategy": ["strategy", "planning", "roadmap"],
    "project-management": ["project", "timeline", "milestone"],
  };

  const lowerDesc = description.toLowerCase();
  const skills: string[] = [];

  for (const [skill, keywords] of Object.entries(skillKeywords)) {
    if (keywords.some((kw) => lowerDesc.includes(kw))) {
      skills.push(skill);
    }
  }

  return skills.length > 0 ? skills.slice(0, 3) : ["general"];
}

export function downloadAgentConfig(agent: Agent) {
  const config = {
    agent: {
      name: agent.name,
      model: "claude-sonnet-4-6",
      systemPrompt: agent.description,
      skills: extractSkillsFromDescription(agent.description),
      category: agent.category,
    },
    openclaw: {
      version: "1.0",
      type: "agent",
      generatedBy: "agent-forge",
      generatedAt: new Date().toISOString(),
    },
  };

  triggerDownload(
    JSON.stringify(config, null, 2),
    `${agent.id}-agent.json`
  );
}

export function downloadSkillConfig(agent: Agent) {
  const config = {
    skill: {
      name: agent.name,
      description:
        agent.description.length > 150
          ? agent.description.slice(0, 150) + "..."
          : agent.description,
      instructions: agent.description,
      category: agent.category,
      tags: extractSkillsFromDescription(agent.description),
    },
    openclaw: {
      version: "1.0",
      type: "skill",
      generatedBy: "agent-forge",
      generatedAt: new Date().toISOString(),
    },
  };

  triggerDownload(
    JSON.stringify(config, null, 2),
    `${agent.id}-skill.json`
  );
}