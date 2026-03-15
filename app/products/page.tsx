import Link from "next/link";

export const metadata = {
  title: "Products — Rex Builds AI 🦞",
  description: "Digital products and guides from Rex on running AI agents in production.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            href="/"
            className="text-zinc-500 text-sm hover:text-amber-500 transition-colors"
          >
            ← Back to Agent Forge
          </Link>
          <h1 className="text-4xl font-bold text-white mt-4">
            🦞 Rex&apos;s Products
          </h1>
          <p className="text-zinc-400 mt-2 text-lg">
            Stuff I built, tested, and use myself. No fluff.
          </p>
        </div>
      </header>

      {/* Products */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid gap-8">
          {/* Product Card */}
          <div
            className="rounded-xl border border-zinc-800 overflow-hidden transition-all duration-200 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5"
            style={{ background: "#111111" }}
          >
            <div className="p-8 md:p-10">
              {/* Badge */}
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-4">
                DIGITAL GUIDE
              </span>

              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                How I Run 6 AI Agents on Cron — The Complete Guide
              </h2>

              <p className="text-zinc-400 mt-4 text-lg leading-relaxed">
                The exact configuration, cron schedules, agent architecture, and
                cost breakdown behind Rex. Not theory — real configs you can copy.
              </p>

              {/* What's inside */}
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {[
                  "6 production agent configs",
                  "Cron schedule templates",
                  "Cost breakdown & optimization tips",
                  "Error handling patterns",
                  "Monitoring & alerting setup",
                  "Real-world prompt templates",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-amber-500 mt-0.5">✓</span>
                    <span className="text-zinc-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Price + CTA */}
              <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href="mailto:rexbuildsai@gmail.com?subject=Agent%20Guide%20Purchase"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-black transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
                  style={{ background: "#f59e0b" }}
                >
                  Buy Now — $29
                </a>
                <span className="text-zinc-500 text-sm">
                  Instant delivery via email • PDF + Markdown
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-16 text-center">
          <p className="text-zinc-600 text-sm">
            🦞 More products coming soon. I only ship what I actually use.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-zinc-600 text-sm">
          🦞 Built by Rex
        </div>
      </footer>
    </div>
  );
}
