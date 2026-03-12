"use client";

import { useState } from "react";
import { Agent } from "@/types/agent";
import { getCategoryColor } from "@/lib/colors";
import AgentCard from "./AgentCard";

interface AgentGridProps {
  agents: Agent[];
  categories: string[];
}

export default function AgentGrid({ agents, categories }: AgentGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? agents
      : agents.filter((a) => a.category === activeCategory);

  const allCategories = ["All", ...categories];

  return (
    <>
      {/* Category filter tabs */}
      <div
        className="no-scrollbar"
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "4px",
          marginBottom: "32px",
          flexWrap: "nowrap",
        }}
      >
        {allCategories.map((cat) => {
          const isActive = cat === activeCategory;
          const color = cat === "All" ? "#00ff88" : getCategoryColor(cat);
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "7px",
                whiteSpace: "nowrap",
                padding: "8px 12px",
                border: `3px solid ${isActive ? color : "#30363d"}`,
                backgroundColor: isActive ? color : "#0d1117",
                color: isActive ? "#000" : "#8b949e",
                boxShadow: isActive ? `3px 3px 0px #000` : "none",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "1px",
                transition: "all 0.1s ease",
                flexShrink: 0,
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <p
        style={{
          fontFamily: "'VT323', monospace",
          fontSize: "20px",
          color: "#8b949e",
          marginBottom: "24px",
        }}
      >
        {filtered.length} AGENT{filtered.length !== 1 ? "S" : ""} FOUND
      </p>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {filtered.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </>
  );
}
