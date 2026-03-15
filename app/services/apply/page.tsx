"use client";

import { useState } from "react";
import Link from "next/link";

const PACKAGES = ["Content Engine", "Competitor Watch", "Full Autopilot"];

export default function ApplyPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    businessType: "",
    automationNeeds: "",
    package: PACKAGES[0],
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          businessType: form.businessType,
          automationNeeds: form.automationNeeds,
          package: form.package,
          source: "services",
        }),
      });

      if (!res.ok) throw new Error("Submit failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    background: "var(--bg-surface)",
    border: "3px solid var(--border)",
    boxShadow: "4px 4px 0px var(--pixel-shadow)",
    fontFamily: "var(--font-terminal)",
    fontSize: "20px",
    padding: "12px 16px",
    color: "var(--text-primary)",
    outline: "none",
    width: "100%",
  };

  if (status === "success") {
    return (
      <div
        className="flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-deep)", minHeight: "60vh" }}
      >
        <div className="text-center px-6">
          <h1
            className="text-pixel mb-6"
            style={{
              fontSize: "clamp(14px, 3vw, 22px)",
              color: "var(--accent-secondary)",
              letterSpacing: "3px",
            }}
          >
            SUBMISSION RECEIVED
          </h1>
          <p
            className="text-terminal mb-8"
            style={{ fontSize: "22px", color: "var(--text-secondary)" }}
          >
            Rex will review your application and get back to you soon.
          </p>
          <Link
            href="/services"
            className="pixel-btn pixel-btn-primary"
            style={{ fontSize: "10px", padding: "14px 28px", textDecoration: "none" }}
          >
            &larr; BACK TO SERVICES
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--bg-deep)" }}>
      {/* Header */}
      <header
        className="relative overflow-hidden"
        style={{
          borderBottom: "3px solid var(--border)",
          background:
            "linear-gradient(180deg, var(--bg-base) 0%, var(--bg-deep) 100%)",
        }}
      >
        <div className="scanlines absolute inset-0" />
        <div className="pixel-grid absolute inset-0 opacity-40" />

        <div className="relative z-10 px-6 py-12 md:py-16 max-w-3xl mx-auto text-center">
          <Link
            href="/services"
            className="text-pixel inline-block mb-6"
            style={{
              fontSize: "10px",
              color: "var(--text-muted)",
              textDecoration: "none",
              letterSpacing: "2px",
            }}
          >
            &larr; BACK TO SERVICES
          </Link>

          <h1
            className="text-pixel mb-3"
            style={{
              fontSize: "clamp(16px, 3.5vw, 28px)",
              color: "var(--accent)",
              textShadow: "0 0 28px var(--accent-glow), 4px 4px 0px #3a2a00",
              letterSpacing: "3px",
              lineHeight: 1.4,
            }}
          >
            HIRE REX
          </h1>
          <p
            className="text-terminal"
            style={{ fontSize: "22px", color: "var(--text-secondary)" }}
          >
            Tell us about your business and what you need automated.
          </p>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          {/* Name */}
          <div>
            <label
              className="text-pixel block mb-2"
              style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "2px" }}
            >
              NAME
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
              style={inputStyle}
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="text-pixel block mb-2"
              style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "2px" }}
            >
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={onChange}
              placeholder="you@company.com"
              style={inputStyle}
            />
          </div>

          {/* Business Type */}
          <div>
            <label
              className="text-pixel block mb-2"
              style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "2px" }}
            >
              BUSINESS TYPE
            </label>
            <input
              type="text"
              name="businessType"
              required
              value={form.businessType}
              onChange={onChange}
              placeholder="e.g. SaaS, E-commerce, Agency"
              style={inputStyle}
            />
          </div>

          {/* Automation Needs */}
          <div>
            <label
              className="text-pixel block mb-2"
              style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "2px" }}
            >
              WHAT DO YOU NEED AUTOMATED?
            </label>
            <textarea
              name="automationNeeds"
              required
              value={form.automationNeeds}
              onChange={onChange}
              rows={4}
              placeholder="Describe what you'd like Rex to handle..."
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          {/* Package */}
          <div>
            <label
              className="text-pixel block mb-2"
              style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "2px" }}
            >
              WHICH PACKAGE INTERESTS YOU?
            </label>
            <select
              name="package"
              value={form.package}
              onChange={onChange}
              style={{
                ...inputStyle,
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2378705e' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
                paddingRight: "40px",
              }}
            >
              {PACKAGES.map((pkg) => (
                <option key={pkg} value={pkg}>
                  {pkg}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="pixel-btn pixel-btn-primary mt-2"
            style={{
              fontSize: "12px",
              padding: "16px 32px",
              opacity: status === "submitting" ? 0.6 : 1,
            }}
          >
            {status === "submitting" ? "SUBMITTING..." : "SUBMIT \u2192"}
          </button>

          {status === "error" && (
            <p
              className="text-terminal text-center"
              style={{ color: "var(--danger)", fontSize: "18px" }}
            >
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </main>

    </div>
  );
}
