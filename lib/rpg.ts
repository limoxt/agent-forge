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
// STATS: Creativity ⚡, Reliability 🛡, Expertise ⚔
// ═══════════════════════════════════════════

interface Stats {
  creativity: number;   // 1-10
  reliability: number;  // 1-10
  expertise: number;    // 1-10
}

const CATEGORY_STAT_PROFILES: Record<string, [number, number, number]> = {
  Design:              [9, 6, 8],
  Engineering:         [7, 9, 9],
  "Game Development":  [9, 7, 8],
  Marketing:           [8, 6, 7],
  "Paid Media":        [6, 8, 8],
  Product:             [8, 8, 7],
  "Project Management":[5, 9, 7],
  Sales:               [7, 7, 8],
  "Spatial Computing": [9, 7, 9],
  Specialized:         [7, 8, 9],
  Support:             [5, 9, 7],
  Testing:             [4, 10, 8],
};

export function getStats(agent: Agent): Stats {
  const base = CATEGORY_STAT_PROFILES[agent.category] || [7, 7, 7];
  const h = hash(agent.id);
  // Add -1 to +1 variation based on agent name hash
  const vary = (val: number, seed: number) => Math.max(1, Math.min(10, val + ((seed % 3) - 1)));
  return {
    creativity: vary(base[0], h),
    reliability: vary(base[1], h >> 4),
    expertise: vary(base[2], h >> 8),
  };
}

// ═══════════════════════════════════════════
// LEVEL
// ═══════════════════════════════════════════

export function getLevel(agent: Agent): number {
  const h = hash(agent.id + agent.category);
  // Range 12-99, weighted toward higher levels for more "epic" feel
  return 12 + (h % 88);
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
