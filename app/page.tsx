import { getAgents, getCategories } from "@/lib/agents";
import AgentGrid from "@/components/AgentGrid";

export default function Home() {
  const agents = getAgents();
  const categories = getCategories();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f0f1a" }}>
      {/* Hero */}
      <header
        style={{
          position: "relative",
          borderBottom: "3px solid #2a2a4a",
          padding: "48px 24px 40px",
          textAlign: "center",
          overflow: "hidden",
          background: "linear-gradient(180deg, #16162a 0%, #0f0f1a 100%)",
        }}
      >
        {/* Scanlines overlay */}
        <div className="scanlines" style={{ position: "absolute", inset: 0 }} />

        {/* Pixel grid decoration */}
        <div
          className="pixel-grid"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.5,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Title */}
          <h1
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(18px, 4vw, 36px)",
              color: "#6366f1",
              textShadow: "0 0 20px rgba(99, 102, 241, 0.5), 3px 3px 0px #312e81",
              margin: "0 0 12px",
              letterSpacing: "3px",
              lineHeight: 1.4,
            }}
          >
            AGENT FORGE
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: "26px",
              color: "#6b7280",
              margin: "0 0 24px",
              letterSpacing: "2px",
            }}
          >
            Your AI team, on-demand.
          </p>

          {/* Stats bar */}
          <div
            style={{
              display: "inline-flex",
              gap: "24px",
              border: "3px solid #2a2a4a",
              backgroundColor: "#16162a",
              padding: "10px 20px",
              boxShadow: "4px 4px 0px #000",
            }}
          >
            <span
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "8px",
                color: "#6366f1",
              }}
            >
              ⚔ {agents.length} AGENTS
            </span>
            <span
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "8px",
                color: "#a855f7",
              }}
            >
              🏰 {categories.length} CLASSES
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px 24px" }}>
        <AgentGrid agents={agents} categories={categories} />
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "3px solid #2a2a4a",
          padding: "24px",
          textAlign: "center",
          backgroundColor: "#16162a",
        }}
      >
        <p
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "8px",
            color: "#2a2a4a",
            margin: 0,
            letterSpacing: "2px",
          }}
        >
          AGENT FORGE © 2026 — POWERED BY AI
        </p>
      </footer>
    </div>
  );
}