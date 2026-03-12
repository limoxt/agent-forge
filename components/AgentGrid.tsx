"use client";

import { useState } from "react";
import { Agent } from "@/types/agent";
import { getCategoryColor, getCategoryBgColor } from "@/lib/colors";
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
    const matchesSearch = searchQuery === "" || 
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const allCategories = ["All", ...categories];

  return (
    <>
      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search agents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input w-full max-w-md"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {allCategories.map((cat) => {
          const isActive = cat === activeCategory;
          const color = cat === "All" ? "#818cf8" : getCategoryColor(cat);
          const bgColor = cat === "All" ? "rgba(129, 140, 248, 0.1)" : getCategoryBgColor(cat);
          
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                backgroundColor: isActive ? bgColor : "transparent",
                color: isActive ? color : "#71717a",
                border: `1px solid ${isActive ? color : "#27272a"}`,
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <p className="text-sm text-zinc-500 mb-6">
        {filtered.length} agent{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </>
  );
}