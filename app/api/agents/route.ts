import { NextResponse } from "next/server";
import agentsData from "@/data/agents.json";

export async function GET() {
  return NextResponse.json(agentsData);
}