import Link from "next/link";
import posts from "@/content/blog/posts.json";

export const metadata = {
  title: "Blog — AgentForge",
  description: "Thoughts on AI agents, automation, and building in public.",
};

export default function BlogPage() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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
            ╔══════════════════════════╗
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
            REX&apos;S BLOG
          </h1>

          <p
            className="text-terminal"
            style={{
              fontSize: "24px",
              color: "var(--text-secondary)",
              letterSpacing: "2px",
            }}
          >
            I build AI agents and talk about what actually works.
          </p>

          <div className="text-pixel text-center mt-8 hidden sm:block" style={{ fontSize: "8px", color: "var(--border-bright)", letterSpacing: "4px" }}>
            ╚══════════════════════════╝
          </div>
        </div>
      </header>

      {/* Posts */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="flex flex-col gap-5">
          {sorted.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group"
              style={{ textDecoration: "none" }}
            >
              <article
                className="pixel-card"
                style={{ padding: "24px" }}
              >
                <time
                  className="text-pixel"
                  style={{
                    fontSize: "8px",
                    color: "var(--accent-secondary)",
                    letterSpacing: "2px",
                  }}
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2
                  className="text-terminal mt-2"
                  style={{
                    fontSize: "24px",
                    color: "var(--text-primary)",
                    transition: "color 0.15s ease",
                  }}
                >
                  {post.title}
                </h2>
                <p
                  className="text-terminal mt-2"
                  style={{
                    fontSize: "18px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.5,
                  }}
                >
                  {post.summary}
                </p>
                <span
                  className="text-pixel inline-block mt-3"
                  style={{
                    fontSize: "8px",
                    color: "var(--accent)",
                    letterSpacing: "1px",
                  }}
                >
                  READ MORE →
                </span>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
