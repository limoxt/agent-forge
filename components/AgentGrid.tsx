"use client";

import { useState, useEffect } from "react";
import { Agent } from "@/types/agent";
import { getCategoryColor } from "@/lib/colors";
import AgentCard from "./AgentCard";

interface AgentGridProps {
  initialAgents?: Agent[];
}

export default function AgentGrid({ initialAgents }: AgentGridProps) {
  const [agents, setAgents] = useState<Agent[]>(initialAgents || []);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(!initialAgents?.length);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAll, setShowAll] = useState(false);
  const INITIAL_COUNT = 12;

  useEffect(() => {
    if (!initialAgents?.length) {
      fetch("/api/agents")
        .then((res) => res.json())
        .then((data) => {
          setAgents(data);
          const cats = new Set((data as Agent[]).map((a: Agent) => a.category));
          setCategories(Array.from(cats).sort());
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      const cats = new Set(initialAgents.map((a) => a.category));
      setCategories(Array.from(cats).sort());
    }
  }, [initialAgents]);

  const filtered = agents.filter((a) => {
    const matchesCategory = activeCategory === "All" || a.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const allCategories = ["All", ...categories];

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="text-terminal animate-pulse" style={{ fontSize: "26px", color: "var(--accent)" }}>
          LOADING AGENTS...
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Search bar */}
      <div className="relative mb-8" style={{ maxWidth: "520px" }}>
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-terminal" style={{ fontSize: "26px", color: "var(--text-muted)" }}>
          ▸
        </span>
        <input
          type="text"
          placeholder="SEARCH AGENTS..."
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setShowAll(false); }}
          className="search-input w-full"
        />
      </div>

      {/* Category filter tags — wrapping */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        {allCategories.map((cat) => {
          const isActive = cat === activeCategory;
          const color = cat === "All" ? "#ffd033" : getCategoryColor(cat);
          return (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setShowAll(false); }}
              className={`category-tag ${isActive ? "active" : ""}`}
              style={isActive ? {
                borderColor: color,
                backgroundColor: color,
                color: "#0e110f",
              } : undefined}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <div className="flex items-center gap-4 mb-7">
        <div className="pixel-divider flex-1" />
        <span className="text-terminal" style={{ fontSize: "22px", color: "var(--text-muted)", letterSpacing: "1px" }}>
          {filtered.length} AGENT{filtered.length !== 1 ? "S" : ""} FOUND
        </span>
        <div className="pixel-divider flex-1" />
      </div>

      {/* Grid — wider cards, more spacing */}
      <div className="grid gap-4 sm:gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))" }}>
        {(showAll ? filtered : filtered.slice(0, INITIAL_COUNT)).map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      {/* Show more button */}
      {!showAll && filtered.length > INITIAL_COUNT && (
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="pixel-btn pixel-btn-primary"
            style={{ padding: "14px 32px" }}
          >
            ▼ SHOW ALL {filtered.length} AGENTS
          </button>
        </div>
      )}

      {/* Collapse button */}
      {showAll && filtered.length > INITIAL_COUNT && (
        <div className="text-center mt-10">
          <button
            onClick={() => { setShowAll(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="pixel-btn pixel-btn-secondary"
            style={{ padding: "14px 32px" }}
          >
            ▲ SHOW LESS
          </button>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div style={{ fontSize: "56px", marginBottom: "20px" }}>🔍</div>
          <p className="text-pixel" style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            NO AGENTS FOUND
          </p>
          <p className="text-terminal mt-3" style={{ fontSize: "24px", color: "var(--text-muted)" }}>
            Try a different search or category
          </p>
        </div>
      )}
    </>
  );
}