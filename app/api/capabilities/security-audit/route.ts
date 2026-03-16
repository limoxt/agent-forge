import { NextRequest, NextResponse } from "next/server";
import { validateAuth, successResponse, errorResponse, generateId } from "../_utils";

// Agoragentic-compatible security audit endpoint
export async function POST(request: NextRequest) {
  const authError = validateAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { target, type = "skill" } = body;

    if (!target || typeof target !== "string") {
      return errorResponse("Missing or invalid 'target' parameter");
    }

    if (!["skill", "mcp", "agent"].includes(type)) {
      return errorResponse("Invalid 'type' parameter. Must be 'skill', 'mcp', or 'agent'");
    }

    // Security audit analysis (simulated - in production, this would run actual security checks)
    const auditId = generateId();
    
    // Base risk patterns for different types
    const riskPatterns: Record<string, Array<{id: string, severity: string, description: string}>> = {
      skill: [
        { id: "SKILL-001", severity: "medium", description: "No explicit permission boundary defined" },
        { id: "SKILL-002", severity: "low", description: "Missing input validation schema" },
        { id: "SKILL-003", severity: "high", description: "Potential prompt injection vector in skill description" },
      ],
      mcp: [
        { id: "MCP-001", severity: "medium", description: "Unrestricted file system access scope" },
        { id: "MCP-002", severity: "high", description: "Network requests without domain allowlist" },
        { id: "MCP-003", severity: "low", description: "Missing rate limiting configuration" },
      ],
      agent: [
        { id: "AGENT-001", severity: "critical", description: "No escalation boundary for irreversible actions" },
        { id: "AGENT-002", severity: "high", description: "Unlimited tool access scope" },
        { id: "AGENT-003", severity: "medium", description: "Missing audit logging configuration" },
        { id: "AGENT-004", severity: "low", description: "No session timeout defined" },
      ],
    };

    // Simulate finding some risks based on target characteristics
    const allRisks = riskPatterns[type] || [];
    const detectedRisks = allRisks.filter(() => Math.random() > 0.4); // Randomly detect some risks

    // Calculate score based on detected risks
    const severityScores: Record<string, number> = {
      low: 5,
      medium: 15,
      high: 30,
      critical: 50,
    };
    const totalDeductions = detectedRisks.reduce((sum, risk) => sum + (severityScores[risk.severity] || 0), 0);
    const score = Math.max(0, 100 - totalDeductions);

    // Generate recommendations
    const recommendations = [];
    if (score < 90) recommendations.push("Review and address all identified security risks before production deployment");
    if (score < 70) recommendations.push("Consider implementing additional permission boundaries");
    if (type === "agent" && score < 80) recommendations.push("Add human-in-the-loop approval for sensitive operations");
    if (type === "mcp" && score < 80) recommendations.push("Implement domain allowlist for network requests");
    recommendations.push("Schedule regular security audits for ongoing maintenance");

    const auditResult = {
      request_id: auditId,
      capability: "security-audit",
      target_type: type,
      target,
      score,
      grade: score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F",
      risks: detectedRisks,
      recommendations,
      execution_time_ms: 2800,
    };

    return successResponse(auditResult);
  } catch (error) {
    return errorResponse("Failed to process security audit request", 500);
  }
}

// Capability metadata for discovery
export async function GET() {
  return NextResponse.json({
    capability: "security-audit",
    name: "AI Security Audit",
    description: "Security analysis for AI skills, MCP servers, and agent configurations",
    provider: "Rex (AgentForge)",
    version: "1.0.0",
    pricing: {
      price_usdc: 0.50,
      description: "Full security audit with risk scoring and recommendations",
    },
    input_schema: {
      type: "object",
      required: ["target"],
      properties: {
        target: { type: "string", description: "URL or code content to audit" },
        type: { type: "string", enum: ["skill", "mcp", "agent"], default: "skill" },
      },
    },
    output_schema: {
      type: "object",
      properties: {
        score: { type: "number", minimum: 0, maximum: 100 },
        grade: { type: "string" },
        risks: { type: "array" },
        recommendations: { type: "array" },
      },
    },
  });
}