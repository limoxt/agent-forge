const CATEGORY_COLORS: Record<string, string> = {
  Design: "#f472b6",           // Rose
  Engineering: "#60a5fa",      // Blue
  "Game Development": "#fb923c", // Orange
  Marketing: "#f87171",        // Red
  "Paid Media": "#fbbf24",     // Amber
  Product: "#4ade80",          // Green
  "Project Management": "#818cf8", // Indigo
  Sales: "#facc15",            // Yellow
  "Spatial Computing": "#c084fc", // Purple
  Specialized: "#fb7185",      // Pink
  Support: "#2dd4bf",          // Teal
  Testing: "#a78bfa",          // Violet
};

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? "#94a3b8";
}

export function getCategoryBgColor(category: string): string {
  const colors: Record<string, string> = {
    Design: "rgba(244, 114, 182, 0.1)",
    Engineering: "rgba(96, 165, 250, 0.1)",
    "Game Development": "rgba(251, 146, 60, 0.1)",
    Marketing: "rgba(248, 113, 113, 0.1)",
    "Paid Media": "rgba(251, 191, 36, 0.1)",
    Product: "rgba(74, 222, 128, 0.1)",
    "Project Management": "rgba(129, 140, 248, 0.1)",
    Sales: "rgba(250, 204, 21, 0.1)",
    "Spatial Computing": "rgba(192, 132, 252, 0.1)",
    Specialized: "rgba(251, 113, 133, 0.1)",
    Support: "rgba(45, 212, 191, 0.1)",
    Testing: "rgba(167, 139, 250, 0.1)",
  };
  return colors[category] ?? "rgba(148, 163, 184, 0.1)";
}