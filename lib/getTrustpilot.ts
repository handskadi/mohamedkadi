import type { TrustpilotResponse } from "./trustpilot";

const API_BASE = process.env.TRUSTPILOT_API_BASE;

export async function getTrustpilot(): Promise<TrustpilotResponse> {
  const res = await fetch(`${API_BASE}/api/trustpilot`, {
    // Choose ONE:
    // cache: "no-store", // always fresh, SSR every request
    next: { revalidate: 60 }, // ISR: refresh every 60s (recommended)
  });

  if (!res.ok) {
    throw new Error(`Trustpilot API error: ${res.status}`);
  }

  return res.json();
}
