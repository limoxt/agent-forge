import Link from "next/link";
import { notFound } from "next/navigation";
import posts from "@/content/blog/posts.json";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — AgentForge`,
    description: post.summary,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <div style={{ backgroundColor: "var(--bg-deep)" }}>
      {/* Header */}
      <header
        className="relative overflow-hidden"
        style={{
          borderBottom: "3px solid var(--border)",
          background: "linear-gradient(180deg, var(--bg-base) 0%, var(--bg-deep) 100%)",
        }}
      >
        <div className="scanlines absolute inset-0" />
        <div className="pixel-grid absolute inset-0 opacity-40" />

        <div className="relative z-10 px-6 py-10 md:py-14 max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="text-pixel inline-block mb-6"
            style={{
              fontSize: "9px",
              color: "var(--text-muted)",
              textDecoration: "none",
              letterSpacing: "2px",
            }}
          >
            ← BACK TO BLOG
          </Link>

          <time
            className="text-pixel block mb-3"
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

          <h1
            className="text-pixel"
            style={{
              fontSize: "clamp(14px, 3vw, 24px)",
              color: "var(--accent)",
              textShadow: "0 0 20px var(--accent-glow)",
              letterSpacing: "2px",
              lineHeight: 1.6,
            }}
          >
            {post.title}
          </h1>
        </div>
      </header>

      {/* Article */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <article>
          {post.content.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="text-pixel mt-10 mb-4"
                  style={{
                    fontSize: "12px",
                    color: "var(--accent)",
                    letterSpacing: "2px",
                  }}
                >
                  {block.replace("## ", "")}
                </h2>
              );
            }
            if (block.startsWith("- ")) {
              return (
                <ul key={i} className="my-4" style={{ listStyle: "none", padding: 0 }}>
                  {block.split("\n").map((line, j) => (
                    <li
                      key={j}
                      className="text-terminal"
                      style={{
                        fontSize: "20px",
                        color: "var(--text-secondary)",
                        padding: "4px 0",
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ color: "var(--accent-secondary)" }}>▸ </span>
                      {line.replace(/^- /, "")}
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.match(/^1\. /)) {
              return (
                <ol key={i} className="my-4" style={{ listStyle: "none", padding: 0 }}>
                  {block.split("\n").map((line, j) => (
                    <li
                      key={j}
                      className="text-terminal"
                      style={{
                        fontSize: "20px",
                        color: "var(--text-secondary)",
                        padding: "4px 0",
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        className="text-pixel mr-2"
                        style={{ fontSize: "10px", color: "var(--accent)" }}
                      >
                        {j + 1}.
                      </span>
                      {line.replace(/^\d+\.\s/, "")}
                    </li>
                  ))}
                </ol>
              );
            }
            return (
              <p
                key={i}
                className="text-terminal my-4"
                style={{
                  fontSize: "20px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                {block}
              </p>
            );
          })}
        </article>

        {/* Back link */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="pixel-btn pixel-btn-secondary inline-block"
            style={{
              fontSize: "9px",
              padding: "12px 24px",
              textDecoration: "none",
            }}
          >
            ← ALL POSTS
          </Link>
        </div>
      </main>
    </div>
  );
}
