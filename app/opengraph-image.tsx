import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AgentForge — Your AI team, on-demand";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e110f",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "#ffd033" }} />
        {/* Bottom accent bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 6, background: "#44e878" }} />

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#ffd033",
            letterSpacing: 12,
            textTransform: "uppercase",
            marginBottom: 24,
            textShadow: "0 0 40px rgba(255,208,51,0.35), 4px 4px 0px #3a2a00",
          }}
        >
          AGENT FORGE
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "#b0a890",
            letterSpacing: 4,
            marginBottom: 60,
          }}
        >
          Your AI team, on-demand
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "AGENTS", value: "142", color: "#ffd033" },
            { label: "CLASSES", value: "12", color: "#44e878" },
            { label: "FORMAT", value: "OPENCLAW", color: "#44e878" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px 40px",
                background: "#1a2220",
                border: "3px solid #2e3d36",
              }}
            >
              <div style={{ fontSize: 14, color: "#78705e", letterSpacing: 3, marginBottom: 10 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 28, color: stat.color, letterSpacing: 2 }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            fontSize: 16,
            color: "#78705e",
            letterSpacing: 3,
          }}
        >
          FREE & OPEN SOURCE
        </div>
      </div>
    ),
    { ...size }
  );
}
