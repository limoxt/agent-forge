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
      {/* Search bar with pixel icon */}
      <div className="relative mb-6" style={{ maxWidth: "480px" }}>
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-terminal" style={{ fontSize: "22px", color: "var(--text-muted)" }}>
          ▸
        </span>
        <input
          type="text"
          placeholder="SEARCH AGENTS..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input w-full"
        />
      </div>

      {/* Category filter tags - wrapping grid */}
      <div className="flex flex-wrap gap-2 mb-6">
        {allCategories.map((cat) => {
          const isActive = cat === activeCategory;
          const color = cat === "All" ? "#6366f1" : getCategoryColor(cat);
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`category-tag ${isActive ? "active" : ""}`}
              style={isActive ? {
                borderColor: color,
                backgroundColor: color,
              } : undefined}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <div className="flex items-center gap-3 mb-5">
        <div className="pixel-divider flex-1" />
        <span className="text-terminal" style={{ fontSize: "20px", color: "var(--text-muted)", letterSpacing: "1px" }}>
          {filtered.length} AGENT{filtered.length !== 1 ? "S" : ""} FOUND
        </span>
        <div className="pixel-divider flex-1" />
      </div>

      {/* Grid */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
        {filtered.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
          <p className="text-pixel" style={{ fontSize: "10px", color: "var(--text-muted)" }}>
            NO AGENTS FOUND
          </p>
          <p className="text-terminal mt-2" style={{ fontSize: "20px", color: "var(--text-muted)" }}>
            Try a different search or category
          </p>
        </div>
      )}
    </>
  );
}
