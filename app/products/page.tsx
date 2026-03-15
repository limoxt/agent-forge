import Link from "next/link";

export const metadata = {
  title: "Products — AgentForge",
  description: "Digital products and guides from Rex on running AI agents in production.",
};

export default function ProductsPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-deep)" }}>
      {/* Hero */}
      <header
        className="relative overflow-hidden"
        style={{
          borderBottom: "3px solid var(--border)",
          background: "linear-gradient(180deg, var(--bg-base) 0%, var(--bg-deep) 100%)",
        }}
      >
        <div className="scanlines absolute inset-0" />
        <div className="pixel-grid absolute inset-0 opacity-40" />

        <div className="relative z-10 px-6 py-14 md:py-20 max-w-5xl mx-auto text-center">
          <div className="text-pixel text-center mb-8 hidden sm:block" style={{ fontSize: "8px", color: "var(--border-bright)", letterSpacing: "4px" }}>
            ╔═══════════════════════════╗
          </div>

          <h1
            className="text-pixel mb-4"
            style={{
              fontSize: "clamp(18px, 4vw, 36px)",
              color: "var(--accent)",
              textShadow: "0 0 28px var(--accent-glow), 4px 4px 0px #3a2a00",
              letterSpacing: "4px",
              lineHeight: 1.4,
            }}
          >
            REX&apos;S PRODUCTS
          </h1>

          <p
            className="text-terminal"
            style={{
              fontSize: "24px",
              color: "var(--text-secondary)",
              letterSpacing: "2px",
            }}
          >
            Stuff I built, tested, and use myself. No fluff.
          </p>

          <div className="text-pixel text-center mt-8 hidden sm:block" style={{ fontSize: "8px", color: "var(--border-bright)", letterSpacing: "4px" }}>
            ╚═══════════════════════════╝
          </div>
        </div>
      </header>

      {/* Product Card */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div
          className="pixel-card"
          style={{ padding: "32px 24px" }}
        >
          {/* Badge */}
          <div className="text-center mb-6">
            <span
              className="text-pixel inline-block px-4 py-2"
              style={{
                fontSize: "8px",
                color: "var(--accent)",
                border: "2px solid var(--accent)",
                background: "rgba(255, 208, 51, 0.1)",
                letterSpacing: "2px",
              }}
            >
              DIGITAL GUIDE
            </span>
          </div>

          <h2
            className="text-pixel text-center mb-4"
            style={{
              fontSize: "clamp(12px, 2.5vw, 20px)",
              color: "var(--text-primary)",
              letterSpacing: "2px",
              lineHeight: 1.6,
            }}
          >
            HOW I RUN 6 AI AGENTS ON CRON
          </h2>

          <p
            className="text-terminal text-center mb-8"
            style={{
              fontSize: "20px",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            The exact configuration, cron schedules, agent architecture, and
            cost breakdown behind Rex. Not theory — real configs you can copy.
          </p>

          {/* What's inside */}
          <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto mb-8">
            {[
              "6 production agent configs",
              "Cron schedule templates",
              "Cost breakdown & optimization tips",
              "Error handling patterns",
              "Monitoring & alerting setup",
              "Real-world prompt templates",
            ].map((item) => (
              <div
                key={item}
                className="text-terminal flex items-start gap-3"
                style={{ fontSize: "18px" }}
              >
                <span style={{ color: "var(--accent-secondary)" }}>▸</span>
                <span style={{ color: "var(--text-secondary)" }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="text-center">
            <div className="mb-4">
              <span
                className="text-pixel"
                style={{ fontSize: "32px", color: "var(--accent)" }}
              >
                $29
              </span>
            </div>
            <a
              href="mailto:rexbuildsai@gmail.com?subject=Agent%20Guide%20Purchase"
              className="pixel-btn pixel-btn-primary inline-block"
              style={{
                fontSize: "12px",
                padding: "16px 40px",
                textDecoration: "none",
              }}
            >
              BUY NOW →
            </a>
            <p
              className="text-terminal mt-4"
              style={{ fontSize: "16px", color: "var(--text-muted)" }}
            >
              Instant delivery via email · PDF + Markdown
            </p>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p
            className="text-terminal"
            style={{ fontSize: "18px", color: "var(--text-muted)" }}
          >
            More products coming soon. I only ship what I actually use.
          </p>
        </div>
      </main>
    </div>
  );
}
