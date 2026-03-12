const CATEGORY_COLORS: Record<string, string> = {
  Design: "#e86cbe",           // Hot pink
  Engineering: "#40c8e0",      // Bright cyan
  "Game Development": "#f0a030", // Warm orange
  Marketing: "#e85454",        // Vivid red
  "Paid Media": "#e8c840",     // Gold
  Product: "#50c878",          // Emerald
  "Project Management": "#8888f0", // Periwinkle
  Sales: "#f0d040",            // Bright yellow
  "Spatial Computing": "#b060e8", // Vivid purple
  Specialized: "#e87088",      // Rose
  Support: "#40d8b0",          // Turquoise
  Testing: "#c070f0",          // Lavender
};

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? "#f0c040";
}
