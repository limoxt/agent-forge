import Link from "next/link";
import { notFound } from "next/navigation";
import BuyButton from "@/components/BuyButton";

const bundles = [
  {
    id: "startup-launch",
    name: "Startup Launch Team",
    icon: "🚀",
    price: 9,
    agents: [
      { name: "Frontend Developer", icon: "⚔️", desc: "Build beautiful, responsive UIs" },
      { name: "Backend Architect", icon: "🏰", desc: "Design scalable APIs and systems" },
      { name: "Growth Hacker", icon: "📈", desc: "Drive user acquisition and retention" },
      { name: "Rapid Prototyper", icon: "⚡", desc: "Ship MVPs in days, not weeks" },
      { name: "Reality Checker", icon: "🎯", desc: "Validate ideas before over-investing" },
    ],
    value: "From idea to launch — ship your first version in one week",
    target: "Indie hackers, founders",
    description: "Everything you need to go from concept to shipped product. This team handles frontend, backend, growth strategy, rapid iteration, and sanity checks. Perfect for solo founders who need an entire engineering team.",
    deliverables: [
      "Working MVP in 7 days",
      "Landing page with conversion optimization",
      "Backend API architecture",
      "Growth strategy roadmap",
      "Product validation report",
    ],
    useCases: [
      "Launching a new SaaS product",
      "Building a mobile app MVP",
      "Creating a landing page for your idea",
      "Validating product-market fit",
    ],
  },
  {
    id: "social-media-growth",
    name: "Social Media Growth Team",
    icon: "📱",
    price: 9,
    agents: [
      { name: "Content Creator", icon: "✍️", desc: "Create engaging posts and articles" },
      { name: "Twitter Engager", icon: "🐦", desc: "Build your Twitter following" },
      { name: "Instagram Curator", icon: "📸", desc: "Curate visual content that converts" },
      { name: "Reddit Community Builder", icon: "🤝", desc: "Engage niche communities" },
      { name: "Analytics Reporter", icon: "📊", desc: "Track and optimize performance" },
    ],
    value: "Multi-platform marketing with automated weekly content",
    target: "Content creators, brand managers",
    description: "Dominate social media across platforms. Create content, engage communities, and track performance automatically. Your 24/7 social media team.",
    deliverables: [
      "Weekly content calendar",
      "Platform-optimized posts",
      "Community engagement strategy",
      "Performance analytics dashboard",
      "Growth recommendations",
    ],
    useCases: [
      "Building a personal brand",
      "Growing a startup's social presence",
      "Managing multiple client accounts",
      "Creating viral content campaigns",
    ],
  },
  {
    id: "content-engine",
    name: "Content Engine Team",
    icon: "✍️",
    price: 9,
    agents: [
      { name: "Content Creator", icon: "✍️", desc: "Write compelling articles and posts" },
      { name: "SEO Specialist", icon: "🔍", desc: "Optimize for search visibility" },
      { name: "Technical Writer", icon: "📝", desc: "Create clear documentation" },
      { name: "Book Co-Author", icon: "📚", desc: "Help write longer-form content" },
      { name: "Podcast Strategist", icon: "🎙️", desc: "Plan and structure episodes" },
    ],
    value: "Research, write, and publish high-quality content at scale",
    target: "Bloggers, newsletter authors",
    description: "Turn your ideas into polished content across all formats. Articles, SEO, podcasts, and even book chapters. Never stare at a blank page again.",
    deliverables: [
      "SEO-optimized blog posts",
      "Newsletter content",
      "Podcast episode outlines",
      "Content repurposing strategy",
      "Editorial calendar",
    ],
    useCases: [
      "Running a blog or newsletter",
      "Creating a content marketing strategy",
      "Launching a podcast",
      "Writing an ebook or book",
    ],
  },
  {
    id: "dev-tools",
    name: "Dev Tools Team",
    icon: "🛠️",
    price: 9,
    agents: [
      { name: "Code Reviewer", icon: "👁️", desc: "Catch bugs before they ship" },
      { name: "Security Engineer", icon: "🔒", desc: "Find and fix vulnerabilities" },
      { name: "DevOps Automator", icon: "⚙️", desc: "Streamline CI/CD pipelines" },
      { name: "Git Workflow Master", icon: "🌿", desc: "Optimize branching strategies" },
      { name: "Technical Writer", icon: "📝", desc: "Document everything clearly" },
    ],
    value: "Automate code review, security scans, and documentation",
    target: "Engineering teams, startups",
    description: "Ship better code faster. Automated reviews, security checks, CI/CD pipelines, and documentation. Like having a senior engineer watching every commit.",
    deliverables: [
      "Automated code review reports",
      "Security vulnerability scans",
      "CI/CD pipeline setup",
      "API documentation",
      "Team workflow guidelines",
    ],
    useCases: [
      "Improving code quality",
      "Setting up CI/CD",
      "Security audits",
      "Team onboarding documentation",
    ],
  },
  {
    id: "data-pipeline",
    name: "Data Pipeline Team",
    icon: "📊",
    price: 9,
    agents: [
      { name: "Data Engineer", icon: "🔧", desc: "Build robust data pipelines" },
      { name: "Backend Architect", icon: "🏰", desc: "Design scalable data systems" },
      { name: "Analytics Reporter", icon: "📊", desc: "Create insightful dashboards" },
      { name: "AI Engineer", icon: "🤖", desc: "Integrate ML models" },
      { name: "Database Optimizer", icon: "⚡", desc: "Speed up queries 10x" },
    ],
    value: "Build and maintain robust data infrastructure",
    target: "Data teams, analysts",
    description: "From raw data to actionable insights. Build ETL pipelines, optimize databases, and create AI-powered analytics. Turn your data into decisions.",
    deliverables: [
      "Data pipeline architecture",
      "ETL automation scripts",
      "Database optimization report",
      "Analytics dashboard",
      "AI model integration plan",
    ],
    useCases: [
      "Building a data warehouse",
      "Creating analytics dashboards",
      "Setting up ML pipelines",
      "Database performance tuning",
    ],
  },
  {
    id: "research-squad",
    name: "Research Squad",
    icon: "🔬",
    price: 9,
    agents: [
      { name: "Research Synthesizer", icon: "📚", desc: "Summarize complex information" },
      { name: "Trend Researcher", icon: "📈", desc: "Spot emerging opportunities" },
      { name: "Competitor Monitor", icon: "🕵️", desc: "Track competitive moves" },
      { name: "Technical Writer", icon: "📝", desc: "Create clear reports" },
      { name: "Proposal Strategist", icon: "💡", desc: "Win more deals" },
    ],
    value: "Deep research and competitive intelligence on autopilot",
    target: "Strategists, consultants",
    description: "Know your market inside and out. Track competitors, spot trends, and synthesize research into actionable insights. Your always-on strategy team.",
    deliverables: [
      "Competitor analysis report",
      "Market trend analysis",
      "Research synthesis documents",
      "Strategic recommendations",
      "Proposal templates",
    ],
    useCases: [
      "Market research",
      "Competitive analysis",
      "Due diligence",
      "Strategic planning",
    ],
  },
];

export async function generateStaticParams() {
  return bundles.map((bundle) => ({
    id: bundle.id,
  }));
}

export default function TeamDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { success?: string; canceled?: string };
}) {
  const bundle = bundles.find((b) => b.id === params.id);
  
  if (!bundle) {
    notFound();
  }

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
        <div className="scanlines absolute inset-0" />
        <div className="pixel-grid absolute inset-0 opacity-40" />

        <div className="relative z-10 px-6 py-12 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <Link
              href="/teams"
              className="text-terminal"
              style={{
                fontSize: "16px",
                color: "var(--text-muted)",
                textDecoration: "underline",
              }}
            >
              ← Back to all teams
            </Link>
          </div>

          {/* Icon */}
          <div
            className="text-center mb-4"
            style={{
              fontSize: "64px",
              filter: "drop-shadow(0 0 20px var(--accent-glow))",
            }}
          >
            {bundle.icon}
          </div>

          {/* Title */}
          <h1
            className="text-pixel text-center mb-4"
            style={{
              fontSize: "clamp(24px, 5vw, 40px)",
              color: "var(--accent)",
              textShadow: "0 0 28px var(--accent-glow)",
              letterSpacing: "3px",
            }}
          >
            {bundle.name}
          </h1>

          {/* Price */}
          <div className="text-center mb-6">
            <span
              className="text-pixel"
              style={{ fontSize: "36px", color: "var(--accent)" }}
            >
              ${bundle.price}
            </span>
            <span
              className="text-terminal ml-2"
              style={{ fontSize: "18px", color: "var(--text-muted)" }}
            >
              /team
            </span>
          </div>

          {/* Target */}
          <div className="text-center">
            <span
              className="inline-block rounded px-4 py-2 text-terminal"
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "2px solid var(--border)",
                fontSize: "18px",
                color: "var(--text-secondary)",
              }}
            >
              Perfect for: {bundle.target}
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Success/Canceled message */}
        {searchParams.success && (
          <div
            className="rounded-lg p-6 mb-8 text-center"
            style={{ backgroundColor: "#064e3b", border: "2px solid #10b981" }}
          >
            <p className="text-terminal" style={{ fontSize: "18px", color: "#6ee7b7" }}>
              🎉 Payment successful! Your team bundle is being prepared...
            </p>
          </div>
        )}
        {searchParams.canceled && (
          <div
            className="rounded-lg p-6 mb-8 text-center"
            style={{ backgroundColor: "#7f1d1d", border: "2px solid #ef4444" }}
          >
            <p className="text-terminal" style={{ fontSize: "18px", color: "#fca5a5" }}>
              Payment canceled. Feel free to try again when you&apos;re ready.
            </p>
          </div>
        )}

        {/* Description */}
        <div
          className="rounded-lg p-8 mb-8"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "2px solid var(--border)",
          }}
        >
          <p
            className="text-terminal text-center"
            style={{
              fontSize: "20px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            {bundle.description}
          </p>
        </div>

        {/* Agents */}
        <div className="mb-8">
          <h2
            className="text-pixel mb-6 text-center"
            style={{ fontSize: "20px", color: "var(--accent)", letterSpacing: "2px" }}
          >
            INCLUDED AGENTS ({bundle.agents.length})
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {bundle.agents.map((agent) => (
              <div
                key={agent.name}
                className="rounded-lg p-5 flex items-center gap-4"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "2px solid var(--border)",
                }}
              >
                <span style={{ fontSize: "36px" }}>{agent.icon}</span>
                <div>
                  <h3
                    className="text-pixel"
                    style={{ fontSize: "16px", color: "var(--text-primary)" }}
                  >
                    {agent.name}
                  </h3>
                  <p
                    className="text-terminal"
                    style={{ fontSize: "16px", color: "var(--text-secondary)" }}
                  >
                    {agent.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div className="mb-8">
          <h2
            className="text-pixel mb-6 text-center"
            style={{ fontSize: "20px", color: "var(--accent)", letterSpacing: "2px" }}
          >
            WHAT YOU&apos;LL GET
          </h2>
          <div
            className="rounded-lg p-8"
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "2px solid var(--border)",
            }}
          >
            <ul className="space-y-4">
              {bundle.deliverables.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-terminal"
                  style={{ fontSize: "18px", color: "var(--text-primary)" }}
                >
                  <span style={{ color: "var(--accent)", fontSize: "20px" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-8">
          <h2
            className="text-pixel mb-6 text-center"
            style={{ fontSize: "20px", color: "var(--accent)", letterSpacing: "2px" }}
          >
            USE CASES
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {bundle.useCases.map((useCase, i) => (
              <div
                key={i}
                className="rounded-lg p-5 text-center"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "2px solid var(--border)",
                }}
              >
                <span
                  className="text-terminal"
                  style={{ fontSize: "18px", color: "var(--text-secondary)" }}
                >
                  {useCase}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <BuyButton teamId={bundle.id} price={bundle.price} />
      </main>
    </div>
  );
}