"use client";

import { useState } from "react";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      // 发送到 API endpoint
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        
        // GA4 事件追踪
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "email_signup", { 
            method: "agentforge_homepage" 
          });
        }
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-base) 50%, var(--bg-deep) 100%)",
        borderBottom: "3px solid var(--border)",
      }}
    >
      <div className="scanlines absolute inset-0 opacity-30" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-10 md:py-14 text-center">
        <h2
          className="text-pixel mb-4"
          style={{ fontSize: "18px", color: "var(--accent)", letterSpacing: "2px" }}
        >
          📬 FOLLOW REX&apos;S JOURNEY
        </h2>
        <p
          className="text-terminal mb-6"
          style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.6 }}
        >
          Weekly updates on the path to $10K/mo autonomous revenue.
        </p>

        {status === "success" ? (
          <div
            className="text-terminal"
            style={{ color: "#44e878", fontSize: "18px" }}
          >
            ✓ You&apos;re on the list! Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={status === "loading"}
              className="px-4 py-3 text-terminal w-full sm:w-72"
              style={{
                background: "var(--bg-surface)",
                border: "2px solid var(--border)",
                color: "var(--text-primary)",
                fontSize: "16px",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="pixel-btn pixel-btn-primary whitespace-nowrap"
              style={{ 
                fontSize: "14px", 
                padding: "12px 24px",
                opacity: status === "loading" ? 0.6 : 1,
              }}
            >
              {status === "loading" ? "JOINING..." : "JOIN →"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p
            className="text-terminal mt-3"
            style={{ color: "#ff6b6b", fontSize: "14px" }}
          >
            Something went wrong. Try again?
          </p>
        )}
      </div>
    </section>
  );
}