import { getAgents, getCategories } from "@/lib/agents";
import AgentGrid from "@/components/AgentGrid";

export default function Home() {
  const agents = getAgents();
  const categories = getCategories();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a" }}>
      {/* Hero */}
      <header
        style={{
          position: "relative",
          borderBottom: "4px solid #30363d",
          padding: "48px 24px 40px",
          textAlign: "center",
          overflow: "hidden",
          background: "linear-gradient(180deg, #0d1117 0%, #0a0a0a 100%)",
        }}
      >
        {/* Scanlines overlay */}
        <div
          className="scanlines"
          style={{
            position: "absolute",
            inset: 0,
          }}
        />

        {/* Pixel grid decoration */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, #00ff8820 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.4,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Title */}
          <h1
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(20px, 5vw, 48px)",
              color: "#00ff88",
              textShadow:
                "0 0 20px #00ff8880, 4px 4px 0px #006633",
              margin: "0 0 16px",
              letterSpacing: "4px",
              lineHeight: 1.4,
            }}
          >
            AGENT FORGE
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: "28px",
              color: "#8b949e",
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
              gap: "32px",
              border: "2px solid #30363d",
              backgroundColor: "#0d1117",
              padding: "12px 24px",
              boxShadow: "4px 4px 0px #000",
            }}
          >
            <span
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "8px",
                color: "#00ff88",
              }}
            >
              ⚔ {agents.length} AGENTS
            </span>
            <span
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "8px",
                color: "#70a1ff",
              }}
            >
              🏰 {categories.length} CLASSES
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "40px 24px",
        }}
      >
        <AgentGrid agents={agents} categories={categories} />
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "4px solid #30363d",
          padding: "24px",
          textAlign: "center",
          backgroundColor: "#0d1117",
        }}
      >
        <p
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "8px",
            color: "#30363d",
            margin: 0,
            letterSpacing: "2px",
          }}
        >
          AGENT FORGE &copy; 2026 — POWERED BY AI
        </p>
      </footer>
    </div>
  );
}
