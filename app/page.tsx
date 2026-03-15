import AgentGrid from "@/components/AgentGrid";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ backgroundColor: "var(--bg-deep)" }}>
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

          {/* HUD Stats — static, no server data */}
          <div className="flex justify-center gap-3 sm:gap-5 md:gap-8">
            <div className="hud-panel px-3 py-3 sm:px-6 sm:py-4 text-center">
              <div className="hud-label mb-2">AGENTS</div>
              <div className="hud-value" style={{ color: "var(--accent)" }}>
                ⚔ 144
              </div>
            </div>
            <div className="hud-panel px-3 py-3 sm:px-6 sm:py-4 text-center">
              <div className="hud-label mb-2">CLASSES</div>
              <div className="hud-value" style={{ color: "var(--accent-secondary)" }}>
                🏰 12
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

      {/* Services CTA */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-base) 50%, var(--bg-deep) 100%)",
          borderBottom: "3px solid var(--border)",
        }}
      >
        <div className="scanlines absolute inset-0 opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2
                className="text-pixel mb-3"
                style={{ fontSize: "22px", color: "var(--accent-secondary)", letterSpacing: "2px" }}
              >
                🤖 MANAGED AI SERVICES
              </h2>
              <p
                className="text-terminal"
                style={{ fontSize: "20px", color: "var(--text-secondary)", lineHeight: 1.6 }}
              >
                Let Rex handle your content, competitor analysis, and social media.<br />
                <span style={{ color: "var(--accent)" }}>Starting at $99/mo. Limited to 5 clients.</span>
              </p>
            </div>
            <Link
              href="/services"
              className="pixel-btn pixel-btn-primary whitespace-nowrap"
              style={{ fontSize: "14px", padding: "16px 32px", textDecoration: "none" }}
            >
              VIEW SERVICES →
            </Link>
          </div>
        </div>
      </section>

      {/* Main content — generous padding */}
      <main className="max-w-7xl mx-auto px-3 sm:px-5 md:px-8 py-8 sm:py-10 md:py-14">
        <AgentGrid />
      </main>
    </div>
  );
}
