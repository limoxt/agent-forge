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
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filtered = agents.filter((a) => {
    const matchesCategory = activeCategory === "All" || a.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const allCategories = ["All", ...categories];

  return (
    <>
      {/* Search */}
      <div style={{ marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="SEARCH AGENTS..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
          style={{ width: "100%", maxWidth: "400px" }}
        />
      </div>

      {/* Category filter tabs */}
      <div
        className="no-scrollbar"
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "4px",
          marginBottom: "24px",
          flexWrap: "nowrap",
        }}
      >
        {allCategories.map((cat) => {
          const isActive = cat === activeCategory;
          const color = cat === "All" ? "#6366f1" : getCategoryColor(cat);
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "7px",
                whiteSpace: "nowrap",
                padding: "8px 12px",
                border: `3px solid ${isActive ? color : "#2a2a4a"}`,
                backgroundColor: isActive ? color : "#16162a",
                color: isActive ? "#fff" : "#6b7280",
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
          fontSize: "18px",
          color: "#6b7280",
          marginBottom: "20px",
        }}
      >
        {filtered.length} AGENT{filtered.length !== 1 ? "S" : ""} FOUND
      </p>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "16px",
        }}
      >
        {filtered.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </>
  );
}