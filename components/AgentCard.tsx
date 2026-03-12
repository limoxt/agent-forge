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
    <div
      className="pixel-card"
      style={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        borderLeftColor: color,
        borderLeftWidth: "4px",
      }}
    >
      {/* Category badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "7px",
            color: color,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {agent.category}
        </span>
        <span style={{ fontSize: "24px", lineHeight: 1 }}>{agent.emoji}</span>
      </div>

      {/* Agent name */}
      <h3
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "9px",
          color: "#e8e8f0",
          lineHeight: "1.6",
          margin: 0,
        }}
      >
        {agent.name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'VT323', monospace",
          fontSize: "16px",
          color: "#6b7280",
          margin: 0,
          lineHeight: "1.4",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          flex: 1,
        }}
      >
        {agent.description}
      </p>

      {/* Download buttons */}
      <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
        <button
          onClick={() => downloadAgentConfig(agent)}
          className="pixel-btn"
          style={{
            flex: 1,
            backgroundColor: "#6366f1",
            borderColor: "#4f46e5",
            color: "#fff",
          }}
        >
          ⬇ AGENT
        </button>
        <button
          onClick={() => downloadSkillConfig(agent)}
          className="pixel-btn"
          style={{
            flex: 1,
            backgroundColor: "#a855f7",
            borderColor: "#9333ea",
            color: "#fff",
          }}
        >
          ⬇ SKILL
        </button>
      </div>
    </div>
  );
}