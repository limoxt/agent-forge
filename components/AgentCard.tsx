"use client";

import { Agent } from "@/types/agent";
import { getCategoryColor } from "@/lib/colors";
import { downloadAgentConfig } from "@/lib/download";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const color = getCategoryColor(agent.category);

  return (
    <div
      style={{
        border: `4px solid ${color}`,
        boxShadow: `4px 4px 0px #000`,
        backgroundColor: "#0d1117",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        cursor: "pointer",
        transition: "transform 0.1s ease, box-shadow 0.1s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `6px 6px 0px #000`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `4px 4px 0px #000`;
      }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(2px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `2px 2px 0px #000`;
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `6px 6px 0px #000`;
      }}
    >
      {/* Category badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "8px",
            color: color,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {agent.category}
        </span>
        <span style={{ fontSize: "28px", lineHeight: 1 }}>{agent.emoji}</span>
      </div>

      {/* Agent name */}
      <h3
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "10px",
          color: "#ffffff",
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
          fontSize: "18px",
          color: "#8b949e",
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

      {/* Download button */}
      <button
        onClick={() => downloadAgentConfig(agent)}
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "8px",
          backgroundColor: "#00ff88",
          color: "#000000",
          border: "3px solid #000",
          boxShadow: "3px 3px 0px #000",
          padding: "8px 12px",
          cursor: "pointer",
          textTransform: "uppercase",
          letterSpacing: "1px",
          width: "100%",
          transition: "transform 0.1s ease, box-shadow 0.1s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#00cc6a";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#00ff88";
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(2px)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "1px 1px 0px #000";
        }}
        onMouseUp={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "3px 3px 0px #000";
        }}
      >
        DOWNLOAD
      </button>
    </div>
  );
}
