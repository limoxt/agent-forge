import Link from "next/link";

const bundles = [
  {
    id: "startup-launch",
    name: "🚀 Startup Launch Team",
    price: 19,
    agents: [
      "Frontend Developer",
      "Backend Architect",
      "Growth Hacker",
      "Rapid Prototyper",
      "Reality Checker",
    ],
    value: "From idea to launch — ship your first version in one week",
    target: "Indie hackers, founders",
  },
  {
    id: "social-media-growth",
    name: "📱 Social Media Growth Team",
    price: 19,
    agents: [
      "Content Creator",
      "Twitter Engager",
      "Instagram Curator",
      "Reddit Community Builder",
      "Analytics Reporter",
    ],
    value: "Multi-platform marketing with automated weekly content",
    target: "Content creators, brand managers",
  },
  {
    id: "content-engine",
    name: "✍️ Content Engine Team",
    price: 19,
    agents: [
      "Content Creator",
      "SEO Specialist",
      "Technical Writer",
      "Book Co-Author",
      "Podcast Strategist",
    ],
    value: "Research, write, and publish high-quality content at scale",
    target: "Bloggers, newsletter authors",
  },
  {
    id: "dev-tools",
    name: "🛠️ Dev Tools Team",
    price: 19,
    agents: [
      "Code Reviewer",
      "Security Engineer",
      "DevOps Automator",
      "Git Workflow Master",
      "Technical Writer",
    ],
    value: "Automate code review, security scans, and documentation",
    target: "Engineering teams, startups",
  },
  {
    id: "data-pipeline",
    name: "📊 Data Pipeline Team",
    price: 19,
    agents: [
      "Data Engineer",
      "Backend Architect",
      "Analytics Reporter",
      "AI Engineer",
      "Database Optimizer",
    ],
    value: "Build and maintain robust data infrastructure",
    target: "Data teams, analysts",
  },
  {
    id: "research-squad",
    name: "🔬 Research Squad",
    price: 19,
    agents: [
      "Research Synthesizer",
      "Trend Researcher",
      "Competitor Monitor",
      "Technical Writer",
      "Proposal Strategist",
    ],
    value: "Deep research and competitive intelligence on autopilot",
    target: "Strategists, consultants",
  },
];

function BundleCard({
  bundle,
}: {
  bundle: (typeof bundles)[0];
}) {
  return (
    <div
      className="relative overflow-hidden rounded-lg p-6"
      style={{
        backgroundColor: "var(--bg-surface)",
        border: "3px solid var(--border)",
        boxShadow: "0 0 20px var(--accent-glow)",
      }}
    >
      {/* Corner decorations */}
      <div
        className="absolute left-0 top-0 h-4 w-4"
        style={{ background: "var(--accent)" }}
      />
      <div
        className="absolute right-0 top-0 h-4 w-4"
        style={{ background: "var(--accent)" }}
      />
      <div
        className="absolute bottom-0 left-0 h-4 w-4"
        style={{ background: "var(--accent)" }}
      />
      <div
        className="absolute bottom-0 right-0 h-4 w-4"
        style={{ background: "var(--accent)" }}
      />

      {/* Team name */}
      <h3
        className="text-pixel mb-3"
        style={{
          fontSize: "16px",
          color: "var(--accent)",
          letterSpacing: "2px",
        }}
      >
        {bundle.name}
      </h3>

      {/* Target badge */}
      <div
        className="mb-4 inline-block rounded px-3 py-1 text-pixel"
        style={{
          backgroundColor: "var(--bg-deep)",
          border: "1px solid var(--border)",
          fontSize: "9px",
          color: "var(--text-muted)",
        }}
      >
        For: {bundle.target}
      </div>

      {/* Agents list */}
      <div className="mb-4">
        <div
          className="text-terminal mb-2"
          style={{ fontSize: "12px", color: "var(--text-secondary)" }}
        >
          Includes {bundle.agents.length} agents:
        </div>
        <div className="flex flex-wrap gap-2">
          {bundle.agents.map((agent) => (
            <span
              key={agent}
              className="rounded px-2 py-1 text-terminal"
              style={{
                backgroundColor: "var(--bg-deep)",
                border: "1px solid var(--border)",
                fontSize: "11px",
                color: "var(--text-primary)",
              }}
            >
              {agent}
            </span>
          ))}
        </div>
      </div>

      {/* Value proposition */}
      <p
        className="text-terminal mb-6"
        style={{
          fontSize: "14px",
          color: "var(--text-secondary)",
          lineHeight: 1.5,
          fontStyle: "italic",
        }}
      >
        &quot;{bundle.value}&quot;
      </p>

      {/* Price and CTA */}
      <div className="flex items-center justify-between">
        <div>
          <span
            className="text-pixel"
            style={{ fontSize: "20px", color: "var(--accent)" }}
          >
            ${bundle.price}
          </span>
          <span
            className="text-terminal ml-1"
            style={{ fontSize: "12px", color: "var(--text-muted)" }}
          >
            /team
          </span>
        </div>
        <button
          className="pixel-btn pixel-btn-primary"
          style={{ fontSize: "9px", padding: "10px 20px" }}
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
}

export default function TeamsPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-deep)" }}
    >
      {/* Hero */}
      <header
        className="relative overflow-hidden"
        style={{
          borderBottom: "3px solid var(--border)",
          background: "linear-gradient(180deg, var(--bg-base) 0%, var(--bg-deep) 100%)",
        }}
      >
        {/* Scanlines overlay */}
        <div className="scanlines absolute inset-0" />
        {/* Pixel grid */}
        <div className="pixel-grid absolute inset-0 opacity-40" />

        <div className="relative z-10 px-6 py-14 md:py-20 max-w-5xl mx-auto">
          {/* ASCII border */}
          <div
            className="text-pixel text-center mb-8 hidden sm:block"
            style={{
              fontSize: "8px",
              color: "var(--border-bright)",
              letterSpacing: "4px",
            }}
          >
            ╔════════════════════════════════════╗
          </div>

          {/* Back link */}
          <div className="text-center mb-6">
            <Link
              href="/"
              className="text-terminal"
              style={{
                fontSize: "14px",
                color: "var(--text-muted)",
                textDecoration: "underline",
              }}
            >
              ← Back to all agents
            </Link>
          </div>

          {/* Title */}
          <h1
            className="text-pixel text-center mb-4"
            style={{
              fontSize: "clamp(20px, 4vw, 36px)",
              color: "var(--accent)",
              textShadow: "0 0 28px var(--accent-glow), 4px 4px 0px #3a2a00",
              letterSpacing: "4px",
              lineHeight: 1.4,
            }}
          >
            PRE-BUILT AGENT TEAMS
          </h1>

          {/* Tagline */}
          <p
            className="text-terminal text-center"
            style={{
              fontSize: "clamp(18px, 2.5vw, 26px)",
              color: "var(--text-secondary)",
              letterSpacing: "2px",
            }}
          >
            One-click teams for your most important workflows
          </p>

          {/* ASCII border */}
          <div
            className="text-pixel text-center mt-8 hidden sm:block"
            style={{
              fontSize: "8px",
              color: "var(--border-bright)",
              letterSpacing: "4px",
            }}
          >
            ╚════════════════════════════════════╝
          </div>
        </div>
      </header>

      {/* Bundles grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>

        {/* Info section */}
        <div
          className="mt-12 rounded-lg p-6 text-center"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "2px solid var(--border)",
          }}
        >
          <h3
            className="text-pixel mb-3"
            style={{ fontSize: "14px", color: "var(--accent)" }}
          >
            HOW IT WORKS
          </h3>
          <p
            className="text-terminal mx-auto max-w-2xl"
            style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.6 }}
          >
            Purchase a team bundle to get instant access to a curated set of specialist
            agents. Each team is designed to work together on a specific workflow —
            from product launches to content creation.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: "var(--bg-surface)" }}>
        <div className="pixel-divider" />
        <div className="px-6 py-8 text-center">
          <div
            className="text-pixel"
            style={{
              fontSize: "8px",
              color: "var(--text-muted)",
              letterSpacing: "2px",
            }}
          >
            ░░ AGENT FORGE © 2026 — POWERED BY AI ░░
          </div>
        </div>
      </footer>
    </div>
  );
}