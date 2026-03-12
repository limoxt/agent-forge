import { Agent } from "@/types/agent";

export function downloadAgentConfig(agent: Agent): void {
  const config = {
    id: agent.id,
    name: agent.name,
    category: agent.category,
    emoji: agent.emoji,
    description: agent.description,
    source_url: agent.source_url,
  };
  const blob = new Blob([JSON.stringify(config, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${agent.id}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
