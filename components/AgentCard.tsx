"use client";

import { Agent } from "@/types/agent";
import { getCategoryColor } from "@/lib/colors";
import { downloadAgentConfig, downloadSkillConfig } from "@/lib/download";
import { getStats, getTitle, getQuote, getAvatarType } from "@/lib/rpg";
import PixelAvatar from "./PixelAvatar";

interface AgentCardProps {
  agent: Agent;
}

const STAT_COLORS: Record<string, string> = {
  creativity: "#ffd033",
  reliability: "#44e878",
  expertise: "#f07050",
};

export default function AgentCard({ agent }: AgentCardProps) {
  const color = getCategoryColor(agent.category);
  const stats = getStats(agent);
  const title = getTitle(agent);
  const quote = getQuote(agent);
  const avatarType = getAvatarType(agent);

  return (
    <div className="pixel-card flex flex-col">
      {/* Top color bar */}
      <div className="card-color-bar" style={{ background: `linear-gradient(90deg, ${color}, ${color}55)` }} />

      {/* Hover glow overlay */}
      <div className="card-glow" style={{ background: `linear-gradient(135deg, ${color}08, ${color}14)` }} />

      {/* Speech bubble — floats above card on hover */}
      <div className="speech-bubble">
        &quot;{quote}&quot;
      </div>

      {/* Card content */}
      <div className="relative p-5 flex flex-col gap-3 flex-1">
        {/* Header: avatar left + info center + emoji right */}
        <div className="flex items-start gap-4">
          {/* Pixel avatar */}
          <div className="pt-1">
            <PixelAvatar type={avatarType} color={color} size={4} />
          </div>

          {/* Name + category + title */}
          <div className="flex-1 min-w-0">
            <span className="text-pixel block mb-2" style={{
              fontSize: "9px",
              color: color,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}>
              {agent.category}
            </span>
            <h3 className="text-pixel m-0 mb-1" style={{
              fontSize: "12px",
              color: "var(--text-primary)",
              lineHeight: 1.8,
            }}>
              {agent.name}
            </h3>
            <div className="agent-title" style={{ color }}>
              {title}
            </div>
          </div>

          {/* Emoji badge — top right */}
          <span className="card-emoji flex-shrink-0">{agent.emoji}</span>
        </div>

        {/* Description */}
        <p className="text-terminal m-0 line-clamp-3" style={{
          fontSize: "22px",
          color: "var(--text-secondary)",
          lineHeight: 1.35,
        }}>
          {agent.description}
        </p>

        {/* RPG Stat bars — text labels instead of emoji */}
        <div className="flex flex-col gap-1.5 mt-1">
          <div className="stat-row">
            <span className="stat-label">CRE</span>
            <div className="stat-bar-bg">
              <div className="stat-bar-fill" style={{
                width: `${stats.creativity * 10}%`,
                backgroundColor: STAT_COLORS.creativity,
              }} />
            </div>
            <span className="stat-value" style={{ color: STAT_COLORS.creativity }}>{stats.creativity}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">REL</span>
            <div className="stat-bar-bg">
              <div className="stat-bar-fill" style={{
                width: `${stats.reliability * 10}%`,
                backgroundColor: STAT_COLORS.reliability,
              }} />
            </div>
            <span className="stat-value" style={{ color: STAT_COLORS.reliability }}>{stats.reliability}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">EXP</span>
            <div className="stat-bar-bg">
              <div className="stat-bar-fill" style={{
                width: `${stats.expertise * 10}%`,
                backgroundColor: STAT_COLORS.expertise,
              }} />
            </div>
            <span className="stat-value" style={{ color: STAT_COLORS.expertise }}>{stats.expertise}</span>
          </div>
        </div>

        {/* Action buttons — distinct colors with clear labels */}
        <div className="flex gap-3 mt-auto pt-2">
          <button
            onClick={() => downloadAgentConfig(agent)}
            className="pixel-btn pixel-btn-primary flex-1"
          >
            ⬇ AGENT
          </button>
          <button
            onClick={() => downloadSkillConfig(agent)}
            className="pixel-btn pixel-btn-secondary flex-1"
          >
            ⬇ SKILL
          </button>
        </div>
      </div>
    </div>
  );
}
