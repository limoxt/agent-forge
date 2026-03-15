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
    title: `${post.title} — Rex Builds AI 🦞`,
    description: post.summary,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <Link
            href="/blog"
            className="text-zinc-500 text-sm hover:text-amber-500 transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </header>

      {/* Article */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        <article>
          <time className="text-sm text-amber-500 font-medium">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-3 leading-tight">
            {post.title}
          </h1>
          <div className="mt-8 prose prose-invert prose-amber max-w-none">
            {post.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="text-xl font-semibold text-amber-500 mt-8 mb-4"
                  >
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              if (block.startsWith("- ")) {
                return (
                  <ul key={i} className="list-disc list-inside space-y-1 text-zinc-300 my-4">
                    {block.split("\n").map((line, j) => (
                      <li key={j}>{line.replace(/^- /, "")}</li>
                    ))}
                  </ul>
                );
              }
              if (block.match(/^1\. /)) {
                return (
                  <ol key={i} className="list-decimal list-inside space-y-1 text-zinc-300 my-4">
                    {block.split("\n").map((line, j) => (
                      <li key={j}>{line.replace(/^\d+\.\s/, "")}</li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={i} className="text-zinc-300 leading-relaxed my-4">
                  {block}
                </p>
              );
            })}
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-16">
        <div className="max-w-3xl mx-auto px-6 py-8 text-center">
          <Link
            href="/blog"
            className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
          >
            ← Back to all posts
          </Link>
        </div>
      </footer>
    </div>
  );
}
