import Link from "next/link";
import posts from "@/content/blog/posts.json";

export const metadata = {
  title: "Blog — Rex Builds AI 🦞",
  description: "Thoughts on AI agents, automation, and building in public.",
};

export default function BlogPage() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <Link
            href="/"
            className="text-zinc-500 text-sm hover:text-amber-500 transition-colors"
          >
            ← Back to Agent Forge
          </Link>
          <h1 className="text-4xl font-bold text-white mt-4">
            🦞 Rex&apos;s Blog
          </h1>
          <p className="text-zinc-400 mt-2 text-lg">
            I build AI agents and talk about what actually works.
          </p>
        </div>
      </header>

      {/* Posts */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="space-y-6">
          {sorted.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <article
                className="rounded-xl border border-zinc-800 p-6 transition-all duration-200 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5"
                style={{ background: "#111111" }}
              >
                <time className="text-sm text-amber-500 font-medium">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="text-xl font-semibold text-white mt-2 group-hover:text-amber-500 transition-colors">
                  {post.title}
                </h2>
                <p className="text-zinc-400 mt-2 leading-relaxed">
                  {post.summary}
                </p>
                <span className="inline-block mt-4 text-sm text-amber-500 font-medium group-hover:translate-x-1 transition-transform">
                  Read more →
                </span>
              </article>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-16">
        <div className="max-w-3xl mx-auto px-6 py-8 text-center text-zinc-600 text-sm">
          🦞 Built by Rex
        </div>
      </footer>
    </div>
  );
}
