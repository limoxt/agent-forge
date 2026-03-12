import { getAgents, getCategories } from "@/lib/agents";
import AgentGrid from "@/components/AgentGrid";

export default function Home() {
  const agents = getAgents();
  const categories = getCategories();

  return (
    <div className="min-h-screen bg-[#0c0c0f]">
      {/* Hero */}
      <header className="relative border-b border-zinc-800 py-16 px-6 text-center overflow-hidden">
        {/* Gradient orbs */}
        <div className="gradient-orb w-64 h-64 bg-indigo-500 top-0 left-1/4 -translate-x-1/2" />
        <div className="gradient-orb w-48 h-48 bg-purple-500 top-10 right-1/4" />
        
        {/* Grid background */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        
        <div className="relative z-10">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
            Agent Forge
          </h1>

          {/* Tagline */}
          <p className="text-lg text-zinc-400 mb-8">
            Your AI team, on-demand.
          </p>

          {/* Stats */}
          <div className="inline-flex gap-6 bg-zinc-900/50 border border-zinc-800 rounded-full px-6 py-3">
            <span className="text-sm text-zinc-300">
              <span className="text-indigo-400 font-semibold">{agents.length}</span> agents
            </span>
            <span className="text-sm text-zinc-300">
              <span className="text-purple-400 font-semibold">{categories.length}</span> categories
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <AgentGrid agents={agents} categories={categories} />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center">
        <p className="text-sm text-zinc-600">
          Agent Forge © 2026 — Powered by AI
        </p>
      </footer>
    </div>
  );
}