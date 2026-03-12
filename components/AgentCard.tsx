"use client";

import { Agent } from "@/types/agent";
import { getCategoryColor } from "@/lib/colors";
import { downloadAgentConfig, downloadSkillConfig } from "@/lib/download";
import { getStats, getLevel, getTitle, getQuote, getAvatarType } from "@/lib/rpg";
import PixelAvatar from "./PixelAvatar";

interface AgentCardProps {
  agent: Agent;
}

const STAT_COLORS: Record<string, string> = {
  creativity: "#f0c040",
  reliability: "#50c878",
  expertise: "#e85454",
};

export default function AgentCard({ agent }: AgentCardProps) {
  const color = getCategoryColor(agent.category);
  const stats = getStats(agent);
  const level = getLevel(agent);
  const title = getTitle(agent);
  const quote = getQuote(agent);
  const avatarType = getAvatarType(agent);

  return (
    <div className="pixel-card flex flex-col">
      {/* Top color bar */}
      <div className="card-color-bar" style={{ background: `linear-gradient(90deg, ${color}, ${color}66)` }} />

      {/* Hover glow overlay */}
      <div className="card-glow" style={{ background: `linear-gradient(135deg, ${color}06, ${color}12)` }} />

      {/* Speech bubble on hover */}
      <div className="speech-bubble">
        &quot;{quote}&quot;
      </div>

      {/* Card content */}
      <div className="relative p-4 flex flex-col gap-2 flex-1">
        {/* Header: avatar + info + level */}
        <div className="flex items-start gap-3">
          {/* Pixel avatar */}
          <div className="flex flex-col items-center gap-1 pt-1">
            <PixelAvatar type={avatarType} color={color} size={3} />
            <span className="card-emoji">{agent.emoji}</span>
          </div>

          {/* Name + category + title */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-pixel" style={{
                fontSize: "7px",
                color: color,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}>
                {agent.category}
              </span>
              <span className="level-badge">LV.{level}</span>
            </div>
            <h3 className="text-pixel m-0 mb-1" style={{
              fontSize: "9px",
              color: "var(--text-primary)",
              lineHeight: 1.8,
            }}>
              {agent.name}
            </h3>
            <div className="agent-title" style={{ color }}>
              {title}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-terminal m-0 line-clamp-3" style={{
          fontSize: "17px",
          color: "var(--text-secondary)",
          lineHeight: 1.4,
        }}>
          {agent.description}
        </p>

        {/* RPG Stat bars */}
        <div className="flex flex-col gap-1 mt-1">
          <div className="stat-row">
            <span className="stat-label">⚡</span>
            <div className="stat-bar-bg">
              <div className="stat-bar-fill" style={{
                width: `${stats.creativity * 10}%`,
                backgroundColor: STAT_COLORS.creativity,
              }} />
            </div>
            <span className="stat-value">{stats.creativity}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">🛡</span>
            <div className="stat-bar-bg">
              <div className="stat-bar-fill" style={{
                width: `${stats.reliability * 10}%`,
                backgroundColor: STAT_COLORS.reliability,
              }} />
            </div>
            <span className="stat-value">{stats.reliability}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">⚔</span>
            <div className="stat-bar-bg">
              <div className="stat-bar-fill" style={{
                width: `${stats.expertise * 10}%`,
                backgroundColor: STAT_COLORS.expertise,
              }} />
            </div>
            <span className="stat-value">{stats.expertise}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto pt-2">
          <button
            onClick={() => downloadAgentConfig(agent)}
            className="pixel-btn flex-1"
            style={{
              backgroundColor: "#2a5a3a",
              borderColor: "#3a7a4a",
              color: "#50c878",
            }}
          >
            ⬇ AGENT
          </button>
          <button
            onClick={() => downloadSkillConfig(agent)}
            className="pixel-btn flex-1"
            style={{
              backgroundColor: "#5a4a20",
              borderColor: "#7a6a30",
              color: "var(--accent)",
            }}
          >
            ⬇ SKILL
          </button>
        </div>
      </div>
    </div>
  );
}
