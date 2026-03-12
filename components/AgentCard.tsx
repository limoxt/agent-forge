"use client";

import { Agent } from "@/types/agent";
import { getCategoryColor } from "@/lib/colors";
import { downloadAgentConfig, downloadSkillConfig } from "@/lib/download";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const color = getCategoryColor(agent.category);

  return (
    <div className="pixel-card flex flex-col">
      {/* Top color bar */}
      <div className="card-color-bar" style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }} />

      {/* Hover glow overlay */}
      <div className="card-glow" style={{ background: `linear-gradient(135deg, ${color}08, ${color}15)` }} />

      {/* Card content */}
      <div className="relative p-4 flex flex-col gap-3 flex-1">
        {/* Header: category + emoji */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-pixel" style={{
              fontSize: "7px",
              color: color,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}>
              {agent.category}
            </span>
            <h3 className="text-pixel m-0" style={{
              fontSize: "9px",
              color: "var(--text-primary)",
              lineHeight: 1.8,
            }}>
              {agent.name}
            </h3>
          </div>
          <span className="card-emoji">{agent.emoji}</span>
        </div>

        {/* Description */}
        <p className="text-terminal m-0 line-clamp-3 flex-1" style={{
          fontSize: "17px",
          color: "var(--text-secondary)",
          lineHeight: 1.4,
        }}>
          {agent.description}
        </p>

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto pt-1">
          <button
            onClick={() => downloadAgentConfig(agent)}
            className="pixel-btn flex-1"
            style={{
              backgroundColor: "var(--accent)",
              borderColor: "#4f46e5",
              color: "#fff",
            }}
          >
            ⬇ AGENT
          </button>
          <button
            onClick={() => downloadSkillConfig(agent)}
            className="pixel-btn flex-1"
            style={{
              backgroundColor: "var(--accent-secondary)",
              borderColor: "#9333ea",
              color: "#fff",
            }}
          >
            ⬇ SKILL
          </button>
        </div>
      </div>
    </div>
  );
}
