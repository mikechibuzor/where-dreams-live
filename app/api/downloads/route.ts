const ISSUE_SLUG = "issue-01";
const TRACKING_TIMEOUT_MS = 3_000;

type DownloadPayload = {
  issue?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as DownloadPayload;

  if (payload.issue && payload.issue !== ISSUE_SLUG) {
    return Response.json({ error: "Unknown issue" }, { status: 400 });
  }

  const webhookUrl = process.env.DOWNLOAD_SHEET_WEBHOOK_URL;
  const trackingSecret = process.env.DOWNLOAD_SHEET_SECRET;

  if (!webhookUrl || !trackingSecret) {
    console.warn("Download tracking is not configured.");
    return new Response(null, { status: 204 });
  }

  try {
    const trackingResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        secret: trackingSecret,
        timestamp: new Date().toISOString(),
        issue: ISSUE_SLUG,
        requestId: crypto.randomUUID(),
        referrer: request.headers.get("referer") ?? "",
        country: request.headers.get("x-vercel-ip-country") ?? "",
        userAgent: request.headers.get("user-agent") ?? "",
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(TRACKING_TIMEOUT_MS),
    });

    if (!trackingResponse.ok) {
      console.error(`Download tracking failed with status ${trackingResponse.status}.`);
    } else {
      const trackingResult = (await trackingResponse.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!trackingResult?.ok) {
        console.error("Download tracking was rejected by Google Apps Script.");
      }
    }
  } catch (error) {
    console.error("Download tracking request failed.", error);
  }

  // Analytics must never block or break the visitor's PDF download.
  return new Response(null, { status: 204 });
}
