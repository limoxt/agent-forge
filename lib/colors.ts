const CATEGORY_COLORS: Record<string, string> = {
  Design: "#ff6b9d",
  Engineering: "#00d4ff",
  "Game Development": "#ff9500",
  Marketing: "#ff4757",
  "Paid Media": "#ffa502",
  Product: "#7bed9f",
  "Project Management": "#70a1ff",
  Sales: "#eccc68",
  "Spatial Computing": "#a29bfe",
  Specialized: "#fd79a8",
  Support: "#55efc4",
  Testing: "#fdcb6e",
};

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? "#00ff88";
}
