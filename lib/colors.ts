const CATEGORY_COLORS: Record<string, string> = {
  Design: "#ec4899",           // Pink
  Engineering: "#22d3ee",      // Cyan
  "Game Development": "#fb923c", // Orange
  Marketing: "#f87171",        // Red
  "Paid Media": "#fbbf24",     // Amber
  Product: "#4ade80",          // Green
  "Project Management": "#818cf8", // Indigo
  Sales: "#facc15",            // Yellow
  "Spatial Computing": "#a78bfa", // Purple
  Specialized: "#fb7185",      // Rose
  Support: "#2dd4bf",          // Teal
  Testing: "#c084fc",          // Violet
};

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? "#6366f1";
}