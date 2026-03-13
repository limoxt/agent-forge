"use client";

import { useState, useCallback } from "react";
import { Agent } from "@/types/agent";
import { getCategoryColor } from "@/lib/colors";
import { downloadAgentConfig, downloadSkillConfig } from "@/lib/download";
import { hasStoredEmail, submitLead } from "@/lib/emailGate";
import { getTitle, getQuote, getAvatarType, getTags } from "@/lib/rpg";
import PixelAvatar from "./PixelAvatar";
import EmailModal from "./EmailModal";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [pendingDownloadType, setPendingDownloadType] = useState<"agent" | "skill" | null>(null);
  const color = getCategoryColor(agent.category);
  const title = getTitle(agent);
  const quote = getQuote(agent);
  const avatarType = getAvatarType(agent);
  const tags = getTags(agent);

  const performDownload = useCallback(async (type: "agent" | "skill") => {
    setDownloading(type);
    try {
      if (type === "agent") {
        await downloadAgentConfig(agent);
      } else {
        await downloadSkillConfig(agent);
      }
    } catch (err) {
      alert(`Download failed for ${agent.name}. Please try again.`);
    } finally {
      setDownloading(null);
    }
  }, [agent]);

  const handleLeadSubmit = useCallback(async (email: string, agreedToUpdates: boolean) => {
    if (!pendingDownloadType) {
      return false;
    }

    const success = await submitLead(email, agent.id, agent.name, agreedToUpdates);
    if (!success) {
      return false;
    }

    const nextDownloadType = pendingDownloadType;
    setPendingDownloadType(null);
    setShowEmailModal(false);
    await performDownload(nextDownloadType);
    return true;
  }, [agent.id, agent.name, pendingDownloadType, performDownload]);

  const handleDownload = useCallback(async (type: "agent" | "skill") => {
    if (!hasStoredEmail()) {
      setPendingDownloadType(type);
      setShowEmailModal(true);
      return;
    }

    await performDownload(type);
  }, [performDownload]);

  return (
    <>
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
        <div className="relative p-4 sm:p-5 flex flex-col gap-3 flex-1">
          {/* Header: avatar left + info center + emoji right */}
          <div className="flex items-start gap-4">
            {/* Pixel avatar */}
            <div className="pt-1">
              <PixelAvatar type={avatarType} color={color} size={3} />
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

          {/* Description — click to expand/collapse */}
          <div
            onClick={() => setExpanded(!expanded)}
            style={{ cursor: "pointer" }}
          >
            <p className={`text-terminal m-0 ${expanded ? "" : "line-clamp-3"}`} style={{
              fontSize: "22px",
              color: "var(--text-secondary)",
              lineHeight: 1.35,
            }}>
              {agent.description}
            </p>
            <span className="text-terminal" style={{
              fontSize: "16px",
              color: "var(--text-muted)",
              marginTop: "4px",
              display: "inline-block",
            }}>
              {expanded ? "▲ show less" : "▼ read more"}
            </span>
          </div>

          {/* Skill tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="skill-tag" style={{ borderColor: `${color}44`, color }}>
                #{tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-auto pt-2">
            <button
              onClick={() => handleDownload("agent")}
              disabled={downloading !== null}
              className="pixel-btn pixel-btn-primary flex-1"
            >
              {downloading === "agent" ? "⏳ ..." : "⬇ AGENT"}
            </button>
            <button
              onClick={() => handleDownload("skill")}
              disabled={downloading !== null}
              className="pixel-btn pixel-btn-secondary flex-1"
            >
              {downloading === "skill" ? "⏳ ..." : "⬇ SKILL"}
            </button>
          </div>
        </div>
      </div>
      <EmailModal
        isOpen={showEmailModal}
        onClose={() => {
          setShowEmailModal(false);
          setPendingDownloadType(null);
        }}
        onSubmit={handleLeadSubmit}
        agentName={agent.name}
      />
    </>
  );
}
