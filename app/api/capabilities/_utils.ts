import { NextRequest, NextResponse } from "next/server";

const API_KEYS = new Set([
  process.env.AGORAGENTIC_API_KEY,
  process.env.REX_API_KEY,
].filter(Boolean) as string[]);

export function validateAuth(request: NextRequest): NextResponse | null {
  const authHeader = request.headers.get("authorization");
  
  if (!authHeader) {
    return NextResponse.json(
      { error: "Missing Authorization header" },
      { status: 401 }
    );
  }

  const token = authHeader.replace(/^Bearer\s+/i, "");
  
  if (!API_KEYS.has(token)) {
    return NextResponse.json(
      { error: "Invalid API key" },
      { status: 401 }
    );
  }

  return null;
}

export function generateId(): string {
  return `rex_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function successResponse(data: object) {
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    ...data,
  });
}

export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json(
    {
      success: false,
      error: message,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}