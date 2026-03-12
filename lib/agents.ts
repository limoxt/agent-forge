import { Agent } from "@/types/agent";
import agentsData from "@/data/agents.json";

export function getAgents(): Agent[] {
  return agentsData as Agent[];
}

export function getCategories(): string[] {
  const agents = getAgents();
  const cats = new Set(agents.map((a) => a.category));
  return Array.from(cats).sort();
}
