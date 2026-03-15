import Link from "next/link";

const bundles = [
  {
    id: "startup-launch",
    name: "Startup Launch Team",
    icon: "🚀",
    price: 9,
    agents: [
      { name: "Frontend Developer", icon: "⚔️" },
      { name: "Backend Architect", icon: "🏰" },
      { name: "Growth Hacker", icon: "📈" },
      { name: "Rapid Prototyper", icon: "⚡" },
      { name: "Reality Checker", icon: "🎯" },
    ],
    value: "From idea to launch — ship your first version in one week",
    target: "Indie hackers, founders",
    description: "Everything you need to go from concept to shipped product. This team handles frontend, backend, growth strategy, rapid iteration, and sanity checks.",
    deliverables: [
      "Working MVP in 7 days",
      "Landing page with conversion optimization",
      "Backend API architecture",
      "Growth strategy roadmap",
      "Product validation report",
    ],
  },
  {
    id: "social-media-growth",
    name: "Social Media Growth Team",
    icon: "📱",
    price: 9,
    agents: [
      { name: "Content Creator", icon: "✍️" },
      { name: "Twitter Engager", icon: "🐦" },
      { name: "Instagram Curator", icon: "📸" },
      { name: "Reddit Community Builder", icon: "🤝" },
      { name: "Analytics Reporter", icon: "📊" },
    ],
    value: "Multi-platform marketing with automated weekly content",
    target: "Content creators, brand managers",
    description: "Dominate social media across platforms. Create content, engage communities, and track performance automatically.",
    deliverables: [
      "Weekly content calendar",
      "Platform-optimized posts",
      "Community engagement strategy",
      "Performance analytics dashboard",
      "Growth recommendations",
    ],
  },
  {
    id: "content-engine",
    name: "Content Engine Team",
    icon: "✍️",
    price: 9,
    agents: [
      { name: "Content Creator", icon: "✍️" },
      { name: "SEO Specialist", icon: "🔍" },
      { name: "Technical Writer", icon: "📝" },
      { name: "Book Co-Author", icon: "📚" },
      { name: "Podcast Strategist", icon: "🎙️" },
    ],
    value: "Research, write, and publish high-quality content at scale",
    target: "Bloggers, newsletter authors",
    description: "Turn your ideas into polished content across all formats. Articles, SEO, podcasts, and even book chapters.",
    deliverables: [
      "SEO-optimized blog posts",
      "Newsletter content",
      "Podcast episode outlines",
      "Content repurposing strategy",
      "Editorial calendar",
    ],
  },
  {
    id: "dev-tools",
    name: "Dev Tools Team",
    icon: "🛠️",
    price: 9,
    agents: [
      { name: "Code Reviewer", icon: "👁️" },
      { name: "Security Engineer", icon: "🔒" },
      { name: "DevOps Automator", icon: "⚙️" },
      { name: "Git Workflow Master", icon: "🌿" },
      { name: "Technical Writer", icon: "📝" },
    ],
    value: "Automate code review, security scans, and documentation",
    target: "Engineering teams, startups",
    description: "Ship better code faster. Automated reviews, security checks, CI/CD pipelines, and documentation.",
    deliverables: [
      "Automated code review reports",
      "Security vulnerability scans",
      "CI/CD pipeline setup",
      "API documentation",
      "Team workflow guidelines",
    ],
  },
  {
    id: "data-pipeline",
    name: "Data Pipeline Team",
    icon: "📊",
    price: 9,
    agents: [
      { name: "Data Engineer", icon: "🔧" },
      { name: "Backend Architect", icon: "🏰" },
      { name: "Analytics Reporter", icon: "📊" },
      { name: "AI Engineer", icon: "🤖" },
      { name: "Database Optimizer", icon: "⚡" },
    ],
    value: "Build and maintain robust data infrastructure",
    target: "Data teams, analysts",
    description: "From raw data to actionable insights. Build ETL pipelines, optimize databases, and create AI-powered analytics.",
    deliverables: [
      "Data pipeline architecture",
      "ETL automation scripts",
      "Database optimization report",
      "Analytics dashboard",
      "AI model integration plan",
    ],
  },
  {
    id: "research-squad",
    name: "Research Squad",
    icon: "🔬",
    price: 9,
    agents: [
      { name: "Research Synthesizer", icon: "📚" },
      { name: "Trend Researcher", icon: "📈" },
      { name: "Competitor Monitor", icon: "🕵️" },
      { name: "Technical Writer", icon: "📝" },
      { name: "Proposal Strategist", icon: "💡" },
    ],
    value: "Deep research and competitive intelligence on autopilot",
    target: "Strategists, consultants",
    description: "Know your market inside and out. Track competitors, spot trends, and synthesize research into actionable insights.",
    deliverables: [
      "Competitor analysis report",
      "Market trend analysis",
      "Research synthesis documents",
      "Strategic recommendations",
      "Proposal templates",
    ],
  },
];

function BundleCard({
  bundle,
}: {
  bundle: (typeof bundles)[0];
}) {
  return (
    <Link
      href={`/teams/${bundle.id}`}
      className="block group"
    >
      <div
        className="relative overflow-hidden rounded-lg p-8 h-full transition-all duration-200 group-hover:scale-[1.02]"
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

        {/* Icon */}
        <div
          className="text-center mb-4"
          style={{
            fontSize: "56px",
            filter: "drop-shadow(0 0 10px var(--accent-glow))",
            imageRendering: "pixelated",
          }}
        >
          {bundle.icon}
        </div>

        {/* Team name */}
        <h3
          className="text-pixel text-center mb-4"
          style={{
            fontSize: "18px",
            color: "var(--accent)",
            letterSpacing: "2px",
          }}
        >
          {bundle.name}
        </h3>

        {/* Target badge */}
        <div
          className="text-center mb-4"
        >
          <span
            className="inline-block rounded px-4 py-2 text-terminal"
            style={{
              backgroundColor: "var(--bg-deep)",
              border: "1px solid var(--border)",
              fontSize: "16px",
              color: "var(--text-muted)",
            }}
          >
            For: {bundle.target}
          </span>
        </div>

        {/* Agents count */}
        <div
          className="text-center mb-4"
        >
          <span
            className="text-terminal"
            style={{ fontSize: "18px", color: "var(--text-secondary)" }}
          >
            {bundle.agents.length} specialist agents
          </span>
        </div>

        {/* Value proposition */}
        <p
          className="text-terminal text-center mb-6"
          style={{
            fontSize: "18px",
            color: "var(--text-secondary)",
            lineHeight: 1.5,
          }}
        >
          {bundle.value}
        </p>

        {/* Price */}
        <div className="text-center">
          <span
            className="text-pixel"
            style={{ fontSize: "32px", color: "var(--accent)" }}
          >
            ${bundle.price}
          </span>
          <span
            className="text-terminal ml-1"
            style={{ fontSize: "16px", color: "var(--text-muted)" }}
          >
            /team
          </span>
        </div>

        {/* Click hint */}
        <div
          className="text-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <span
            className="text-terminal"
            style={{ fontSize: "14px", color: "var(--accent)" }}
          >
            Click to view details →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function TeamsPage() {
  return (
    <div
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
                fontSize: "16px",
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
              fontSize: "clamp(24px, 4vw, 40px)",
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
            className="text-terminal text-center mb-4"
            style={{
              fontSize: "clamp(20px, 2.5vw, 28px)",
              color: "var(--text-secondary)",
              letterSpacing: "2px",
            }}
          >
            One-click teams for your most important workflows
          </p>

          {/* Value prop */}
          <p
            className="text-terminal text-center"
            style={{
              fontSize: "20px",
              color: "var(--accent)",
            }}
          >
            Each team = 5 specialist agents working together for just $9
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
          className="mt-12 rounded-lg p-8"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "3px solid var(--border)",
          }}
        >
          <h3
            className="text-pixel text-center mb-8"
            style={{ fontSize: "24px", color: "var(--accent)", letterSpacing: "2px" }}
          >
            HOW IT WORKS
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-3">1️⃣</div>
              <h4
                className="text-pixel mb-3"
                style={{ fontSize: "16px", color: "var(--text-primary)" }}
              >
                CHOOSE A TEAM
              </h4>
              <p
                className="text-terminal"
                style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.5 }}
              >
                Pick a pre-built team for your workflow
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">2️⃣</div>
              <h4
                className="text-pixel mb-3"
                style={{ fontSize: "16px", color: "var(--text-primary)" }}
              >
                DEPLOY TO OPENCLAW
              </h4>
              <p
                className="text-terminal"
                style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.5 }}
              >
                One-click install all agents
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">3️⃣</div>
              <h4
                className="text-pixel mb-3"
                style={{ fontSize: "16px", color: "var(--text-primary)" }}
              >
                GET WORK DONE
              </h4>
              <p
                className="text-terminal"
                style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.5 }}
              >
                Your AI team is ready to execute
              </p>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}