"use client";

import { Agent } from "@/types/agent";
import { getCategoryColor, getCategoryBgColor } from "@/lib/colors";
import { downloadAgentConfig, downloadSkillConfig } from "@/lib/download";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const color = getCategoryColor(agent.category);
  const bgColor = getCategoryBgColor(agent.category);

  return (
    <div className="agent-card p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <span 
          className="category-badge"
          style={{ 
            color: color, 
            backgroundColor: bgColor,
          }}
        >
          {agent.category}
        </span>
        <span className="text-2xl">{agent.emoji}</span>
      </div>

      {/* Name */}
      <h3 className="text-base font-semibold text-white leading-tight">
        {agent.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 flex-1">
        {agent.description}
      </p>

      {/* Actions */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => downloadAgentConfig(agent)}
          className="flex-1 px-3 py-2 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/20 transition-colors"
        >
          ⬇ Agent
        </button>
        <button
          onClick={() => downloadSkillConfig(agent)}
          className="flex-1 px-3 py-2 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/30 hover:bg-purple-500/20 transition-colors"
        >
          ⬇ Skill
        </button>
      </div>
    </div>
  );
}