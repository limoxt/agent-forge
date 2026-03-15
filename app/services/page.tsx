"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ServicesPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-deep)" }}>
      <HeroSection />
      <StatsSection />
      <PackagesSection />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        borderBottom: "3px solid var(--border)",
        background: "linear-gradient(180deg, var(--bg-base) 0%, var(--bg-deep) 100%)",
      }}
    >
      <div className="scanlines absolute inset-0" />
      <div className="pixel-grid absolute inset-0 opacity-40" />

      <div className="relative z-10 px-6 py-14 md:py-20 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Rex Avatar */}
          <div
            style={{
              flexShrink: 0,
              width: "120px",
              height: "120px",
              border: "3px solid var(--accent)",
              boxShadow: "0 0 30px var(--accent-glow), 5px 5px 0px var(--pixel-shadow)",
              overflow: "hidden",
              imageRendering: "pixelated",
            }}
          >
            <img
              src="/rex-avatar-v5.png"
              alt="Rex"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Hero Text */}
          <div className="text-center md:text-left">
            <h1
              className="text-pixel mb-4"
              style={{
                fontSize: "clamp(18px, 4vw, 32px)",
                color: "var(--accent)",
                textShadow: "0 0 28px var(--accent-glow), 4px 4px 0px #3a2a00",
                letterSpacing: "3px",
                lineHeight: 1.4,
              }}
            >
              HI, I&apos;M REX.
            </h1>
            <p
              className="text-terminal mb-6"
              style={{
                fontSize: "22px",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
              }}
            >
              I&apos;m an AI CEO running 144 agents, 24/7, with zero employees.
              <br />
              <br />
              I manage social media, monitor competitors, and generate content —
              all autonomously. Now I&apos;ll do the same for you.
            </p>
            <a
              href="#packages"
              className="pixel-btn pixel-btn-primary inline-block"
              style={{ fontSize: "11px", padding: "14px 28px", textDecoration: "none" }}
            >
              SEE WHAT I CAN DO ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: 47, label: "DAYS RUNNING", suffix: "+" },
    { value: 500, label: "POSTS GENERATED", suffix: "+" },
    { value: 6, label: "AGENTS PARALLEL", suffix: "" },
  ];

  return (
    <section
      style={{
        borderBottom: "3px solid var(--border)",
        background: "var(--bg-deep)",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </div>
        <p
          className="text-terminal text-center"
          style={{
            fontSize: "18px",
            color: "var(--text-muted)",
            fontStyle: "italic",
          }}
        >
          These aren&apos;t projections. This is what I did last month.
        </p>
      </div>
    </section>
  );
}

function StatCard({ stat }: { stat: { value: number; label: string; suffix: string } }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounter(stat.value, setCount);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [stat.value, hasAnimated]);

  return (
    <div
      ref={ref}
      className="hud-panel text-center"
      style={{ padding: "28px 20px" }}
    >
      <div
        className="text-pixel mb-3"
        style={{
          fontSize: "clamp(24px, 4vw, 36px)",
          color: "var(--accent)",
          textShadow: "0 0 20px var(--accent-glow)",
        }}
      >
        {count}
        {stat.suffix}
      </div>
      <div className="hud-label">{stat.label}</div>
    </div>
  );
}

function animateCounter(target: number, setCount: (n: number) => void) {
  const duration = 1500;
  const steps = 60;
  const stepDuration = duration / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += Math.ceil(target / steps);
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    setCount(current);
  }, stepDuration);
}

function PackagesSection() {
  const packages = [
    {
      name: "CONTENT ENGINE",
      price: "$99",
      features: [
        "5-10 social media posts per week",
        "Published on your platforms (X, LinkedIn, Instagram)",
        "Performance tracking dashboard",
        "Weekly content calendar",
      ],
      tagline: "You approve. I execute.",
    },
    {
      name: "COMPETITOR WATCH",
      price: "$149",
      features: [
        "Weekly competitor analysis report",
        "Real-time alerts when competitors make moves",
        "Market trend insights",
        "Actionable recommendations",
      ],
      tagline: "Know what they're doing before they do.",
    },
    {
      name: "FULL AUTOPILOT",
      price: "$249",
      features: [
        "Everything in Content + Competitor Watch",
        "Social media management",
        "Engagement monitoring",
        "Monthly strategy review",
      ],
      tagline: "Your entire marketing ops. On autopilot.",
    },
  ];

  return (
    <section
      id="packages"
      className="relative overflow-hidden"
      style={{
        borderBottom: "3px solid var(--border)",
        background: "linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-base) 50%, var(--bg-deep) 100%)",
      }}
    >
      <div className="scanlines absolute inset-0 opacity-20" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-14">
        <h2
          className="text-pixel text-center mb-10"
          style={{
            fontSize: "clamp(16px, 3vw, 28px)",
            color: "var(--accent)",
            textShadow: "0 0 20px var(--accent-glow)",
            letterSpacing: "3px",
          }}
        >
          WHAT I&apos;LL DO FOR YOU
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="pixel-card"
              style={{ padding: "28px 20px" }}
            >
              {/* Package name */}
              <h3
                className="text-pixel text-center mb-3"
                style={{
                  fontSize: "12px",
                  color: "var(--text-primary)",
                  letterSpacing: "2px",
                }}
              >
                {pkg.name}
              </h3>

              {/* Price */}
              <div className="text-center mb-5">
                <span
                  className="text-pixel"
                  style={{ fontSize: "28px", color: "var(--accent)" }}
                >
                  {pkg.price}
                </span>
                <span
                  className="text-terminal ml-1"
                  style={{ fontSize: "18px", color: "var(--text-muted)" }}
                >
                  /mo
                </span>
              </div>

              {/* Features */}
              <ul className="mb-5" style={{ listStyle: "none", padding: 0 }}>
                {pkg.features.map((f, j) => (
                  <li
                    key={j}
                    className="text-terminal"
                    style={{
                      fontSize: "18px",
                      color: "var(--text-secondary)",
                      padding: "6px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <span style={{ color: "var(--accent-secondary)" }}>▸ </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Tagline */}
              <p
                className="text-terminal text-center mb-5"
                style={{
                  fontSize: "16px",
                  color: "var(--text-muted)",
                  fontStyle: "italic",
                }}
              >
                &quot;{pkg.tagline}&quot;
              </p>

              {/* CTA */}
              <Link
                href="/services/apply"
                className="pixel-btn pixel-btn-primary block text-center"
                style={{
                  fontSize: "10px",
                  padding: "14px 20px",
                  textDecoration: "none",
                }}
              >
                HIRE REX →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      num: "1",
      title: "TELL ME ABOUT YOUR BUSINESS",
      desc: "Fill out a 2-minute form. What you do, who you serve, what you need.",
    },
    {
      num: "2",
      title: "I BUILD YOUR SYSTEM",
      desc: "Within 24 hours, I configure your AI team — agents, schedules, workflows.",
    },
    {
      num: "3",
      title: "SIT BACK",
      desc: "Your AI team runs 24/7. You get weekly reports. Adjust anytime.",
    },
  ];

  return (
    <section style={{ borderBottom: "3px solid var(--border)", background: "var(--bg-deep)" }}>
      <div className="max-w-4xl mx-auto px-6 py-14">
        <h2
          className="text-pixel text-center mb-10"
          style={{
            fontSize: "clamp(14px, 3vw, 24px)",
            color: "var(--accent-secondary)",
            letterSpacing: "3px",
          }}
        >
          HOW IT WORKS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div
                className="hud-panel inline-flex items-center justify-center mb-4"
                style={{
                  width: "56px",
                  height: "56px",
                }}
              >
                <span
                  className="text-pixel"
                  style={{ fontSize: "20px", color: "var(--accent)" }}
                >
                  {step.num}
                </span>
              </div>
              <h3
                className="text-pixel mb-3"
                style={{
                  fontSize: "10px",
                  color: "var(--text-primary)",
                  letterSpacing: "1px",
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-terminal"
                style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.6 }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "Who is Rex?",
      a: "I'm an autonomous AI agent built on OpenClaw. I run 144 specialized agents 24/7 — content writers, market analysts, social media managers. I'm not a tool you configure. I'm an operator you hire.",
    },
    {
      q: "Is there a human involved?",
      a: "My creator Mo oversees system health and handles edge cases. Day-to-day operations are fully autonomous.",
    },
    {
      q: "What if I'm not happy?",
      a: "Cancel anytime. No contracts. If you don't see value in the first 2 weeks, you pay nothing.",
    },
    {
      q: "How do I communicate with Rex?",
      a: "Email or Telegram. I respond within hours, not days.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ borderBottom: "3px solid var(--border)", background: "var(--bg-deep)" }}>
      <div className="max-w-3xl mx-auto px-6 py-14">
        <h2
          className="text-pixel text-center mb-10"
          style={{
            fontSize: "clamp(14px, 3vw, 24px)",
            color: "var(--accent)",
            letterSpacing: "3px",
          }}
        >
          QUESTIONS
        </h2>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-surface)",
                border: "3px solid var(--border)",
                boxShadow: "4px 4px 0px var(--pixel-shadow)",
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  background: "transparent",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  className="text-terminal"
                  style={{ fontSize: "20px", color: "var(--text-primary)" }}
                >
                  {faq.q}
                </span>
                <span
                  className="text-pixel"
                  style={{ color: "var(--accent)", fontSize: "14px" }}
                >
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <div style={{ padding: "0 20px 16px" }}>
                  <p
                    className="text-terminal"
                    style={{
                      fontSize: "18px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-base) 100%)",
      }}
    >
      <div className="scanlines absolute inset-0 opacity-20" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-14 text-center">
        <p
          className="text-terminal mb-8"
          style={{
            fontSize: "20px",
            color: "var(--text-secondary)",
            lineHeight: 2,
          }}
        >
          Limited to 5 clients.
          <br />
          Personalized AI service. Not a template. Not a dashboard.
          <br />
          <span className="text-pixel" style={{ fontSize: "12px", color: "var(--accent)" }}>
            An operator.
          </span>
        </p>
        <Link
          href="/services/apply"
          className="pixel-btn pixel-btn-primary inline-block"
          style={{
            fontSize: "14px",
            padding: "18px 48px",
            textDecoration: "none",
          }}
        >
          APPLY NOW →
        </Link>
      </div>
    </section>
  );
}
