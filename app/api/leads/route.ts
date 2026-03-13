import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Use /tmp for Vercel serverless functions (writable)
const LEADS_DIR = path.join("/tmp", "leads");
const LEADS_FILE = path.join(LEADS_DIR, "leads.jsonl");
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM_EMAIL = "noreply@agentforge.sh";
const TO_EMAIL = "limoxt@gmail.com";

interface LeadPayload {
  email?: string;
  agentId?: string;
  agentName?: string;
  agreedToUpdates?: boolean;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!forwardedFor) {
    return "unknown";
  }

  return forwardedFor.split(",")[0]?.trim() || "unknown";
}

async function sendLeadNotification(
  resendApiKey: string,
  lead: {
    email: string;
    agentId: string;
    agentName: string;
    agreedToUpdates: boolean;
    timestamp: string;
    ip: string;
  },
) {
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New Lead: ${lead.email} downloaded ${lead.agentName}`,
      html: `
        <h2>New Lead from Agent Forge</h2>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Agent:</strong> ${lead.agentName} (${lead.agentId})</p>
        <p><strong>Agreed to updates:</strong> ${lead.agreedToUpdates ? "Yes" : "No"}</p>
        <p><strong>Time:</strong> ${lead.timestamp}</p>
        <p><strong>IP:</strong> ${lead.ip}</p>
      `,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend request failed: ${response.status} ${errorText}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as LeadPayload;
    const email = payload.email?.trim().toLowerCase() || "";
    const agentId = payload.agentId?.trim() || "";
    const agentName = payload.agentName?.trim() || "";
    const agreedToUpdates = Boolean(payload.agreedToUpdates);

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!agentId || !agentName) {
      return NextResponse.json({ error: "Missing agent info" }, { status: 400 });
    }

    const lead = {
      email,
      agentId,
      agentName,
      agreedToUpdates,
      timestamp: new Date().toISOString(),
      ip: getClientIp(request),
    };

    // Try to save to /tmp (optional, may not persist)
    try {
      await fs.mkdir(LEADS_DIR, { recursive: true });
      await fs.appendFile(LEADS_FILE, `${JSON.stringify(lead)}\n`, "utf8");
    } catch {
      // Ignore file write errors - email is the primary delivery
    }

    // Send email notification (primary delivery)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      await sendLeadNotification(resendApiKey, lead);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}