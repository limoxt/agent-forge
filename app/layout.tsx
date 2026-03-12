import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentForge — Your AI team, on-demand.",
  description: "Browse and download AI agents for your team. 120+ pre-configured agents across 12 categories.",
  keywords: ["AI agents", "automation", "OpenClaw", "AI team", "agent marketplace"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased" style={{ background: "var(--bg-deep)", color: "var(--text-primary)" }}>
        {children}
      </body>
    </html>
  );
}
