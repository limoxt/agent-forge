"use client";

import { FormEvent, useEffect, useState } from "react";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, agreedToUpdates: boolean) => Promise<boolean>;
  agentName: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailModal({
  isOpen,
  onClose,
  onSubmit,
  agentName,
}: EmailModalProps) {
  const [email, setEmail] = useState("");
  const [agreedToUpdates, setAgreedToUpdates] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setError("");
      setLoading(false);
      return;
    }

    const storedEmail = localStorage.getItem("agentforge_email");
    const storedConsent = localStorage.getItem("agentforge_updates_opt_in");

    if (storedEmail) {
      setEmail(storedEmail);
    }

    if (storedConsent) {
      setAgreedToUpdates(storedConsent === "true");
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    const success = await onSubmit(normalizedEmail, agreedToUpdates);
    setLoading(false);

    if (!success) {
      setError("Something went wrong. Please try again.");
      return;
    }

    localStorage.setItem("agentforge_email", normalizedEmail);
    localStorage.setItem("agentforge_email_time", Date.now().toString());
    localStorage.setItem("agentforge_updates_opt_in", String(agreedToUpdates));
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div
        className="relative w-full max-w-md rounded-lg p-6"
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "3px solid var(--border)",
          boxShadow: "0 0 30px var(--accent-glow)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-pixel"
          style={{ color: "var(--text-muted)", fontSize: "12px" }}
          aria-label="Close email capture"
        >
          X
        </button>

        <h2
          className="text-pixel mb-4 text-center"
          style={{ fontSize: "14px", color: "var(--accent)" }}
        >
          Download {agentName}
        </h2>

        <p
          className="text-terminal mb-6 text-center"
          style={{ fontSize: "20px", color: "var(--text-secondary)" }}
        >
          Enter your email to unlock this download.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="your@email.com"
            className="mb-4 w-full rounded p-3 text-terminal"
            style={{
              backgroundColor: "var(--bg-deep)",
              border: "2px solid var(--border)",
              color: "var(--text-primary)",
              fontSize: "18px",
            }}
            autoFocus
            required
          />

          <label className="mb-6 flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={agreedToUpdates}
              onChange={(event) => setAgreedToUpdates(event.target.checked)}
              className="h-5 w-5"
            />
            <span
              className="text-terminal"
              style={{ fontSize: "16px", color: "var(--text-secondary)" }}
            >
              I agree to receive updates about new agents
            </span>
          </label>

          {error ? (
            <p
              className="text-terminal mb-4"
              style={{ fontSize: "14px", color: "var(--danger)" }}
            >
              {error}
            </p>
          ) : null}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded py-3 text-pixel"
              style={{
                backgroundColor: "var(--bg-deep)",
                border: "2px solid var(--border)",
                color: "var(--text-muted)",
                fontSize: "10px",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="pixel-btn pixel-btn-primary flex-1 rounded py-3 text-pixel"
              style={{ fontSize: "10px" }}
            >
              {loading ? "Loading..." : "Download"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}