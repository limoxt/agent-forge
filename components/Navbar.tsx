"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/services", label: "SERVICES" },
  { href: "/products", label: "PRODUCTS" },
  { href: "/teams", label: "TEAMS" },
  { href: "/blog", label: "BLOG" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        background: "var(--bg-surface)",
        borderBottom: "3px solid var(--border)",
        boxShadow: "0 4px 0px var(--pixel-shadow)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
        {/* Logo */}
        <Link
          href="/"
          className="text-pixel"
          style={{
            fontSize: "clamp(10px, 2vw, 14px)",
            color: "var(--accent)",
            textDecoration: "none",
            letterSpacing: "2px",
            textShadow: "0 0 12px var(--accent-glow)",
          }}
        >
          AGENT FORGE
        </Link>

        {/* Links */}
        <div className="flex items-center gap-1 sm:gap-3">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-pixel"
                style={{
                  fontSize: "clamp(6px, 1.2vw, 9px)",
                  color: isActive ? "var(--accent)" : "var(--text-muted)",
                  textDecoration: "none",
                  letterSpacing: "1px",
                  padding: "6px 4px",
                  transition: "color 0.15s ease",
                  borderBottom: isActive
                    ? "2px solid var(--accent)"
                    : "2px solid transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
