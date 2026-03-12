"use client";

import { Agent } from "@/types/agent";

interface DownloadData {
  agent: Record<string, string>;
  skill: Record<string, string>;
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function fetchConvertedData(agentId: string): Promise<DownloadData> {
  const res = await fetch(`/downloads/${agentId}.json`);
  if (!res.ok) {
    throw new Error(`Failed to fetch converted data for ${agentId}`);
  }
  return res.json();
}

export async function downloadAgentConfig(agent: Agent) {
  const data = await fetchConvertedData(agent.id);
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  // Add all OpenClaw agent files
  for (const [filename, content] of Object.entries(data.agent)) {
    zip.file(filename, content);
  }

  const blob = await zip.generateAsync({ type: "blob" });
  triggerDownload(blob, `${agent.id}-agent.zip`);
}

export async function downloadSkillConfig(agent: Agent) {
  const data = await fetchConvertedData(agent.id);
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  // Add skill files inside a directory named after the agent
  const folder = zip.folder(agent.id);
  if (folder) {
    for (const [filename, content] of Object.entries(data.skill)) {
      folder.file(filename, content);
    }
  }

  const blob = await zip.generateAsync({ type: "blob" });
  triggerDownload(blob, `${agent.id}-skill.zip`);
}
