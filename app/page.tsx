import { getAgents, getCategories } from "@/lib/agents";
import AgentGrid from "@/components/AgentGrid";

export default function Home() {
  const agents = getAgents();
  const categories = getCategories();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-deep)" }}>
      {/* Hero */}
      <header className="relative overflow-hidden" style={{ borderBottom: "3px solid var(--border)", background: "linear-gradient(180deg, #141e18 0%, var(--bg-deep) 100%)" }}>
        {/* Scanlines overlay */}
        <div className="scanlines absolute inset-0" />
        {/* Pixel grid */}
        <div className="pixel-grid absolute inset-0 opacity-40" />

        <div className="relative z-10 px-6 py-12 md:py-16 max-w-5xl mx-auto">
          {/* ASCII-style top border */}
          <div className="text-pixel text-center mb-6" style={{ fontSize: "7px", color: "var(--border-bright)", letterSpacing: "4px" }}>
            ╔══════════════════════════════╗
          </div>

          {/* Title */}
          <h1 className="text-pixel text-center mb-3" style={{
            fontSize: "clamp(20px, 5vw, 40px)",
            color: "var(--accent)",
            textShadow: "0 0 24px var(--accent-glow), 4px 4px 0px #3a2a00",
            letterSpacing: "4px",
            lineHeight: 1.4,
          }}>
            AGENT FORGE
          </h1>

          {/* Tagline */}
          <p className="text-terminal text-center mb-8 cursor-blink" style={{
            fontSize: "28px",
            color: "var(--text-secondary)",
            letterSpacing: "2px",
          }}>
            Your AI team, on-demand
          </p>

          {/* ASCII-style bottom border */}
          <div className="text-pixel text-center mb-8" style={{ fontSize: "7px", color: "var(--border-bright)", letterSpacing: "4px" }}>
            ╚══════════════════════════════╝
          </div>

          {/* HUD Stats */}
          <div className="flex justify-center gap-4 md:gap-6">
            <div className="hud-panel px-5 py-3 text-center">
              <div className="hud-label mb-1">AGENTS</div>
              <div className="hud-value" style={{ color: "var(--accent)" }}>
                ⚔ {agents.length}
              </div>
            </div>
            <div className="hud-panel px-5 py-3 text-center">
              <div className="hud-label mb-1">CLASSES</div>
              <div className="hud-value" style={{ color: "var(--accent-secondary)" }}>
                🏰 {categories.length}
              </div>
            </div>
            <div className="hud-panel px-5 py-3 text-center">
              <div className="hud-label mb-1">STATUS</div>
              <div className="hud-value" style={{ color: "#50c878" }}>
                ● ONLINE
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10">
        <AgentGrid agents={agents} categories={categories} />
      </main>

      {/* Footer */}
      <footer style={{ background: "var(--bg-surface)" }}>
        <div className="pixel-divider" />
        <div className="px-6 py-6 text-center">
          <div className="text-pixel" style={{ fontSize: "7px", color: "var(--text-muted)", letterSpacing: "2px" }}>
            ░░ AGENT FORGE © 2026 — POWERED BY AI ░░
          </div>
        </div>
      </footer>
    </div>
  );
}
