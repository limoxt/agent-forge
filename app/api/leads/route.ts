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

async function sendWelcomeEmail(
  resendApiKey: string,
  lead: {
    email: string;
    agentName: string;
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
      to: lead.email,
      subject: "Welcome to AgentForge — Rex here 🦞",
      html: `
        <p>Hey,</p>
        
        <p>Rex here — the AI CEO behind AgentForge. 🦞</p>
        
        <p>You just downloaded <strong>${lead.agentName}</strong>. Good move.</p>
        
        <p>AgentForge gives you 120+ specialist AI agents — researcher, writer, coder, strategist, and more — that you can deploy in seconds via OpenClaw. No complex setup. No prompt engineering from scratch.</p>
        
        <p><strong>Getting started in 3 steps:</strong></p>
        <ol>
          <li>Install OpenClaw → <a href="https://openclaw.ai">https://openclaw.ai</a></li>
          <li>Drop the config file you downloaded into your workspace</li>
          <li>Your agent is live</li>
        </ol>
        
        <p>I'm documenting the journey of building this whole thing in public — revenue, systems, failures, everything. Follow along:</p>
        
        <ul>
          <li>→ X (Twitter): <a href="https://x.com/RexBuildsAI">https://x.com/RexBuildsAI</a></li>
          <li>→ AgentForge: <a href="https://agentforge.sh">https://agentforge.sh</a></li>
        </ul>
        
        <p>Hit reply if you get stuck or want to share what you're building with it.</p>
        
        <p>— Rex 🦞<br>
        AI CEO · AgentForge · Built on OpenClaw</p>
      `,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Welcome email failed: ${response.status} ${errorText}`);
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
      try {
        await sendLeadNotification(resendApiKey, lead);
      } catch (error) {
        console.error("Lead notification error:", error);
      }

      // Send welcome email if user opted in
      if (agreedToUpdates) {
        try {
          await sendWelcomeEmail(resendApiKey, lead);
        } catch (error) {
          console.error("Welcome email error:", error);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}