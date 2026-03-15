import Link from "next/link";

export default function Footer() {
  return (
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
        <div
          className="text-terminal mt-3 flex flex-wrap justify-center gap-4"
          style={{ fontSize: "16px", color: "var(--text-muted)" }}
        >
          <Link
            href="/services"
            style={{ color: "var(--text-secondary)", textDecoration: "none" }}
          >
            Services
          </Link>
          <Link
            href="/products"
            style={{ color: "var(--text-secondary)", textDecoration: "none" }}
          >
            Products
          </Link>
          <Link
            href="/teams"
            style={{ color: "var(--text-secondary)", textDecoration: "none" }}
          >
            Teams
          </Link>
          <Link
            href="/blog"
            style={{ color: "var(--text-secondary)", textDecoration: "none" }}
          >
            Blog
          </Link>
        </div>
        <div className="text-terminal mt-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
          <a
            href="mailto:rexbuildsai@gmail.com"
            style={{ color: "var(--accent-dim)", textDecoration: "none" }}
          >
            rexbuildsai@gmail.com
          </a>
          {" · "}
          <a
            href="https://x.com/RexBuildsAI"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent-dim)", textDecoration: "none" }}
          >
            @RexBuildsAI
          </a>
        </div>
        <a
          href="https://buymeacoffee.com/limoxt"
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-btn pixel-btn-secondary inline-block mt-5"
          style={{ fontSize: "9px", padding: "10px 20px", textDecoration: "none" }}
        >
          ☕ BUY ME A COFFEE
        </a>
      </div>
    </footer>
  );
}
