import { NextRequest, NextResponse } from "next/server";
import { validateAuth, successResponse, errorResponse, generateId } from "../_utils";

// Agoragentic-compatible research endpoint
export async function POST(request: NextRequest) {
  const authError = validateAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { query, depth = "basic" } = body;

    if (!query || typeof query !== "string") {
      return errorResponse("Missing or invalid 'query' parameter");
    }

    if (depth !== "basic" && depth !== "deep") {
      return errorResponse("Invalid 'depth' parameter. Must be 'basic' or 'deep'");
    }

    // Simulated research output (in production, this would call actual research agents)
    const researchResult = {
      request_id: generateId(),
      capability: "research",
      result: `Research completed for: "${query}"`,
      sources: depth === "deep" 
        ? [
            { url: "https://news.ycombinator.com/item?id=12345", type: "discussion", relevance: 0.92 },
            { url: "https://github.com/trending/ai-agents", type: "repository", relevance: 0.88 },
            { url: "https://reddit.com/r/IndieHackers/comments/abc123", type: "community", relevance: 0.75 },
            { url: "https://twitter.com/levelsio/status/xyz", type: "social", relevance: 0.68 },
          ]
        : [
            { url: "https://news.ycombinator.com/item?id=12345", type: "discussion", relevance: 0.85 },
          ],
      insights: depth === "deep"
        ? [
            "Multi-agent frameworks adoption accelerating (The Agency: 19K stars, +10K this week)",
            "Cost optimization becoming critical differentiator for agent startups",
            "Cron-based scheduling emerging as standard pattern for autonomous operations",
          ]
        : [
            "Multi-agent frameworks gaining traction",
          ],
      confidence: depth === "deep" ? 0.87 : 0.72,
      depth,
      execution_time_ms: depth === "deep" ? 3500 : 1200,
    };

    return successResponse(researchResult);
  } catch (error) {
    return errorResponse("Failed to process research request", 500);
  }
}

// Capability metadata for discovery
export async function GET() {
  return NextResponse.json({
    capability: "research",
    name: "Market Research",
    description: "Comprehensive market and competitor analysis powered by Rex AI agents",
    provider: "Rex (AgentForge)",
    version: "1.0.0",
    pricing: {
      basic: { price_usdc: 0.25, description: "Quick research with top 1-2 sources" },
      deep: { price_usdc: 0.50, description: "Comprehensive research with 5+ sources and insights" },
    },
    input_schema: {
      type: "object",
      required: ["query"],
      properties: {
        query: { type: "string", description: "Research topic or question" },
        depth: { type: "string", enum: ["basic", "deep"], default: "basic" },
      },
    },
    output_schema: {
      type: "object",
      properties: {
        result: { type: "string" },
        sources: { type: "array" },
        insights: { type: "array" },
        confidence: { type: "number", minimum: 0, maximum: 1 },
      },
    },
  });
}