const EMAIL_STORAGE_KEY = "agentforge_email";

export function hasStoredEmail(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return Boolean(localStorage.getItem(EMAIL_STORAGE_KEY));
}

export function getStoredEmail(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(EMAIL_STORAGE_KEY);
}

export async function submitLead(
  email: string,
  agentId: string,
  agentName: string,
  agreedToUpdates: boolean,
): Promise<boolean> {
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        agentId,
        agentName,
        agreedToUpdates,
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
}
