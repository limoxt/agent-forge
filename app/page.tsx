import { getAgents, getCategories } from "@/lib/agents";
import AgentGrid from "@/components/AgentGrid";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const agents = getAgents();
  const categories = getCategories();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-deep)" }}>
      <ThemeToggle />
      {/* Hero */}
      <header className="relative overflow-hidden" style={{ borderBottom: "3px solid var(--border)", background: "linear-gradient(180deg, var(--bg-base) 0%, var(--bg-deep) 100%)" }}>
        {/* Scanlines overlay */}
        <div className="scanlines absolute inset-0" />
        {/* Pixel grid */}
        <div className="pixel-grid absolute inset-0 opacity-40" />

        <div className="relative z-10 px-6 py-14 md:py-20 max-w-5xl mx-auto">
          {/* ASCII border — hidden on mobile */}
          <div className="text-pixel text-center mb-8 hidden sm:block" style={{ fontSize: "8px", color: "var(--border-bright)", letterSpacing: "4px" }}>
            ╔══════════════════════════════╗
          </div>

          {/* Title */}
          <h1 className="text-pixel text-center mb-4" style={{
            fontSize: "clamp(22px, 5vw, 44px)",
            color: "var(--accent)",
            textShadow: "0 0 28px var(--accent-glow), 4px 4px 0px #3a2a00",
            letterSpacing: "5px",
            lineHeight: 1.4,
          }}>
            AGENT FORGE
          </h1>

          {/* Tagline */}
          <p className="text-terminal text-center mb-10 cursor-blink" style={{
            fontSize: "32px",
            color: "var(--text-secondary)",
            letterSpacing: "2px",
          }}>
            Your AI team, on-demand
          </p>

          {/* ASCII border — hidden on mobile */}
          <div className="text-pixel text-center mb-10 hidden sm:block" style={{ fontSize: "8px", color: "var(--border-bright)", letterSpacing: "4px" }}>
            ╚══════════════════════════════╝
          </div>

          {/* HUD Stats */}
          <div className="flex justify-center gap-3 sm:gap-5 md:gap-8">
            <div className="hud-panel px-3 py-3 sm:px-6 sm:py-4 text-center">
              <div className="hud-label mb-2">AGENTS</div>
              <div className="hud-value" style={{ color: "var(--accent)" }}>
                ⚔ {agents.length}
              </div>
            </div>
            <div className="hud-panel px-3 py-3 sm:px-6 sm:py-4 text-center">
              <div className="hud-label mb-2">CLASSES</div>
              <div className="hud-value" style={{ color: "var(--accent-secondary)" }}>
                🏰 {categories.length}
              </div>
            </div>
            <div className="hud-panel px-3 py-3 sm:px-6 sm:py-4 text-center">
              <div className="hud-label mb-2">STATUS</div>
              <div className="hud-value" style={{ color: "#44e878" }}>
                ● ONLINE
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content — generous padding */}
      <main className="max-w-7xl mx-auto px-3 sm:px-5 md:px-8 py-8 sm:py-10 md:py-14">
        <AgentGrid agents={agents} categories={categories} />
      </main>

      {/* Footer */}
      <footer style={{ background: "var(--bg-surface)" }}>
        <div className="pixel-divider" />
        <div className="px-6 py-8 text-center">
          <div className="text-pixel" style={{ fontSize: "8px", color: "var(--text-muted)", letterSpacing: "2px" }}>
            ░░ AGENT FORGE © 2026 — POWERED BY AI ░░
          </div>
          <div className="text-terminal mt-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
            Agents sourced from{" "}
            <a
              href="https://github.com/msitarzewski/agency-agents"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent-dim)", textDecoration: "underline" }}
            >
              agency-agents
            </a>
            {" "}(MIT License) — adapted for OpenClaw
          </div>
          <a
            href="https://buymeacoffee.com/limoxt"
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn pixel-btn-secondary inline-block mt-5"
            style={{ fontSize: "9px", padding: "10px 20px", textDecoration: "none" }}
          >
            ☕ BUY ME A COFFEE
          </a>
        </div>
      </footer>
    </div>
  );
}
