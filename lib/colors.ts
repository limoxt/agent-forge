// eBoy-inspired high-saturation palette
const CATEGORY_COLORS: Record<string, string> = {
  Design: "#f050a8",           // Hot magenta
  Engineering: "#30d0f0",      // Electric cyan
  "Game Development": "#f0a020", // Bright orange
  Marketing: "#f06060",        // Vivid red
  "Paid Media": "#e8c020",     // Rich gold
  Product: "#40e870",          // Neon green
  "Project Management": "#7878f0", // Bright indigo
  Sales: "#f0d840",            // Sunny yellow
  "Spatial Computing": "#b050f0", // Vivid violet
  Specialized: "#f07088",      // Bright rose
  Support: "#30e0b0",          // Bright teal
  Testing: "#c060f0",          // Electric purple
};

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? "#ffd033";
}
