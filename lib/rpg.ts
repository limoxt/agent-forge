import { Agent } from "@/types/agent";

// Deterministic hash from string → number
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

// Pick from array using hash
function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

// ═══════════════════════════════════════════
// SKILL TAGS — derived from category
// ═══════════════════════════════════════════

const CATEGORY_TAGS: Record<string, string[]> = {
  Design:              ["visual", "brand", "ux", "layout", "color", "typography"],
  Engineering:         ["code", "systems", "debug", "architecture", "devops", "api"],
  "Game Development":  ["gameplay", "engine", "level-design", "physics", "animation", "assets"],
  Marketing:           ["growth", "content", "seo", "analytics", "campaigns", "social"],
  "Paid Media":        ["ads", "bidding", "roas", "targeting", "budget", "conversion"],
  Product:             ["roadmap", "features", "users", "metrics", "mvp", "strategy"],
  "Project Management":["planning", "sprints", "delivery", "risk", "timeline", "stakeholders"],
  Sales:               ["pipeline", "deals", "leads", "crm", "outreach", "negotiation"],
  "Spatial Computing": ["3d", "xr", "voxel", "rendering", "spatial", "immersive"],
  Specialized:         ["domain", "research", "analysis", "niche", "expert", "precision"],
  Support:             ["tickets", "empathy", "resolution", "docs", "onboarding", "feedback"],
  Testing:             ["qa", "coverage", "regression", "automation", "edge-cases", "ci"],
};

export function getTags(agent: Agent): string[] {
  const tags = CATEGORY_TAGS[agent.category] || ["agent", "ai", "specialist"];
  const h = hash(agent.id + "tags");
  // Pick 3 tags deterministically
  const count = tags.length;
  const i1 = h % count;
  const i2 = (h >> 4) % count;
  const i3 = (h >> 8) % count;
  // Deduplicate while preserving order
  const result: string[] = [tags[i1]];
  if (!result.includes(tags[i2])) result.push(tags[i2]);
  if (!result.includes(tags[i3])) result.push(tags[i3]);
  // Ensure at least 2 tags
  if (result.length < 2) {
    const fallback = tags.find(t => !result.includes(t));
    if (fallback) result.push(fallback);
  }
  return result;
}

// ═══════════════════════════════════════════
// TITLES
// ═══════════════════════════════════════════

const CATEGORY_TITLES: Record<string, string[]> = {
  Design: [
    "★ Pixel Artisan",
    "★ Visual Sorcerer",
    "★ Style Alchemist",
    "★ Design Warlock",
    "★ Aesthetic Sage",
    "★ Color Conjurer",
  ],
  Engineering: [
    "◆ Code Berserker",
    "◆ System Architect",
    "◆ Debug Paladin",
    "◆ Stack Overlord",
    "◆ Logic Forgemaster",
    "◆ Binary Knight",
  ],
  "Game Development": [
    "▲ Game Wizard",
    "▲ Level Architect",
    "▲ Loot Master",
    "▲ Quest Designer",
    "▲ Engine Druid",
    "▲ Spawn Controller",
  ],
  Marketing: [
    "♦ Growth Ranger",
    "♦ Brand Shaman",
    "♦ Viral Enchanter",
    "♦ Campaign General",
    "♦ Funnel Mystic",
    "♦ Reach Amplifier",
  ],
  "Paid Media": [
    "$ Bid Strategist",
    "$ ROI Assassin",
    "$ Spend Oracle",
    "$ Click Commander",
    "$ Budget Tactician",
    "$ Ad Conjurer",
  ],
  Product: [
    "⬡ Vision Keeper",
    "⬡ Feature Sculptor",
    "⬡ Roadmap Seer",
    "⬡ Sprint Champion",
    "⬡ Scope Guardian",
    "⬡ Ship Captain",
  ],
  "Project Management": [
    "⊞ Timeline Warden",
    "⊞ Task Marshal",
    "⊞ Deadline Sentinel",
    "⊞ Process Monk",
    "⊞ Gantt Wizard",
    "⊞ Delivery Paladin",
  ],
  Sales: [
    "⚜ Deal Slayer",
    "⚜ Pipeline Warlord",
    "⚜ Close Specialist",
    "⚜ Quota Crusher",
    "⚜ Revenue Knight",
    "⚜ Lead Hunter",
  ],
  "Spatial Computing": [
    "◎ Reality Bender",
    "◎ Dimension Walker",
    "◎ Space Weaver",
    "◎ XR Sorcerer",
    "◎ Voxel Sage",
    "◎ 3D Architect",
  ],
  Specialized: [
    "✦ Niche Master",
    "✦ Domain Sage",
    "✦ Expert Ascendant",
    "✦ Skill Paragon",
    "✦ Focus Monk",
    "✦ Craft Grandmaster",
  ],
  Support: [
    "♥ Care Paladin",
    "♥ Ticket Vanquisher",
    "♥ Help Sage",
    "♥ Issue Healer",
    "♥ Empathy Knight",
    "♥ Resolution Mage",
  ],
  Testing: [
    "⊕ Bug Slayer",
    "⊕ Quality Sentinel",
    "⊕ Test Oracle",
    "⊕ Coverage Monk",
    "⊕ Assert Warrior",
    "⊕ Regression Hunter",
  ],
};

export function getTitle(agent: Agent): string {
  const titles = CATEGORY_TITLES[agent.category] || ["✦ Agent Elite"];
  return pick(titles, hash(agent.id));
}

// ═══════════════════════════════════════════
// QUOTES (hover dialog bubble)
// ═══════════════════════════════════════════

const CATEGORY_QUOTES: Record<string, string[]> = {
  Design: [
    "Every pixel has purpose.",
    "Beauty is never accidental.",
    "I see in vectors.",
    "Let me make it shine!",
    "Form follows function.",
    "Colors speak louder than words.",
  ],
  Engineering: [
    "It compiles. Ship it.",
    "There's always a cleaner way.",
    "Let me refactor that.",
    "Bugs fear me.",
    "O(1) is the way.",
    "Trust the architecture.",
  ],
  "Game Development": [
    "Press START to begin!",
    "Another level unlocked!",
    "The game loop never stops.",
    "Rolling for initiative...",
    "New patch incoming!",
    "Achievement unlocked!",
  ],
  Marketing: [
    "Let's go viral!",
    "The funnel awaits.",
    "Content is king, data is queen.",
    "Time to amplify the signal!",
    "Brand power activated!",
    "Engagement rising!",
  ],
  "Paid Media": [
    "Optimizing bids...",
    "ROAS looking good!",
    "Budget allocated wisely.",
    "Conversions incoming!",
    "The algorithm favors us.",
    "Click-through rising!",
  ],
  Product: [
    "Ship it, then iterate.",
    "Users first, always.",
    "The roadmap is clear.",
    "Feature prioritized!",
    "Data doesn't lie.",
    "Let's validate this.",
  ],
  "Project Management": [
    "On track. On budget.",
    "Sprint velocity: optimal.",
    "Dependencies cleared!",
    "The timeline holds.",
    "Blockers? I'll handle them.",
    "Milestone approaching!",
  ],
  Sales: [
    "Let's close this deal!",
    "Pipeline is flowing.",
    "Revenue target: locked.",
    "Negotiations are my forte.",
    "Another win incoming!",
    "Show me the numbers!",
  ],
  "Spatial Computing": [
    "Reality is just a canvas.",
    "Rendering new dimensions...",
    "The spatial web awaits.",
    "Beyond the flat screen.",
    "Immersion level: maximum.",
    "Entering the metaverse...",
  ],
  Specialized: [
    "Deep expertise, activated.",
    "I know this domain well.",
    "Precision is my craft.",
    "Niche? I call it focused.",
    "Years of mastery at work.",
    "Trust the specialist.",
  ],
  Support: [
    "How can I help today?",
    "Issue resolved!",
    "Your satisfaction matters.",
    "I'm here for you!",
    "Ticket? Consider it done.",
    "Empathy is my superpower.",
  ],
  Testing: [
    "All tests passing!",
    "Found a bug. Squashing it.",
    "100% coverage achieved.",
    "Quality is non-negotiable.",
    "Assert everything!",
    "Edge case? Already covered.",
  ],
};

export function getQuote(agent: Agent): string {
  const quotes = CATEGORY_QUOTES[agent.category] || ["Ready for action!"];
  return pick(quotes, hash(agent.id + "quote"));
}

// ═══════════════════════════════════════════
// PIXEL AVATAR TYPE (determines CSS avatar)
// ═══════════════════════════════════════════

export type AvatarType =
  | "warrior"   // Engineering, Testing
  | "mage"      // Design, Spatial Computing
  | "ranger"    // Marketing, Sales
  | "healer"    // Support, Product
  | "rogue"     // Paid Media, Game Development
  | "sage";     // Project Management, Specialized

const CATEGORY_AVATAR: Record<string, AvatarType> = {
  Design: "mage",
  Engineering: "warrior",
  "Game Development": "rogue",
  Marketing: "ranger",
  "Paid Media": "rogue",
  Product: "healer",
  "Project Management": "sage",
  Sales: "ranger",
  "Spatial Computing": "mage",
  Specialized: "sage",
  Support: "healer",
  Testing: "warrior",
};

export function getAvatarType(agent: Agent): AvatarType {
  return CATEGORY_AVATAR[agent.category] || "warrior";
}
