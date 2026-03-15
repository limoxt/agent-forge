import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const title = "AgentForge — Your AI team, on-demand.";
const description = "Browse and download 187 pre-configured AI agents across 12 categories. Free, open-source, OpenClaw-compatible.";
const url = "https://agentforge.sh";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["AI agents", "automation", "OpenClaw", "AI team", "agent marketplace"],
  metadataBase: new URL(url),
  openGraph: {
    title,
    description,
    url,
    siteName: "AgentForge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Preload only latin fonts (used) */}
        <link
          rel="preload"
          href="/_next/static/media/press-start-2p-latin-400-normal.a1abb227.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/vt323-latin-400-normal.715b6d9d.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased" style={{ background: "var(--bg-deep)", color: "var(--text-primary)" }}>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem("theme");if(t)document.documentElement.className=t})()` }} />
        {children}
        {/* GA - load after page is interactive */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FCZW0W0SZE"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-FCZW0W0SZE');`}
        </Script>
      </body>
    </html>
  );
}