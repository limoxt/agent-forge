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

    if (response.ok) {
      // GA4 事件追踪
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "email_signup", {
          method: "agentforge_download"
        });
      }
      return true;
    }

    return false;
  } catch {
    return false;
  }
}