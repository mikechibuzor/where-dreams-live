import { env } from "cloudflare:workers";

const ISSUE_SLUG = "issue-01";

async function ensureDownloadsTable(database: D1Database) {
  await database
    .prepare(`
      CREATE TABLE IF NOT EXISTS issue_downloads (
        issue_slug TEXT PRIMARY KEY NOT NULL,
        download_count INTEGER NOT NULL DEFAULT 0,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    .run();
}

function unavailableResponse() {
  return Response.json(
    { count: null, tracking: "unavailable" },
    { status: 503, headers: { "cache-control": "no-store" } },
  );
}

export async function GET() {
  try {
    const database = env.DB;
    if (!database) return unavailableResponse();

    await ensureDownloadsTable(database);
    const row = await database
      .prepare("SELECT download_count FROM issue_downloads WHERE issue_slug = ?")
      .bind(ISSUE_SLUG)
      .first<{ download_count: number }>();

    return Response.json(
      { count: row?.download_count ?? 0 },
      { headers: { "cache-control": "no-store" } },
    );
  } catch {
    return unavailableResponse();
  }
}

export async function POST(request: Request) {
  try {
    const database = env.DB;
    if (!database) return unavailableResponse();

    const payload = (await request.json().catch(() => ({}))) as { issue?: string };
    if (payload.issue && payload.issue !== ISSUE_SLUG) {
      return Response.json({ error: "Unknown issue" }, { status: 400 });
    }

    await ensureDownloadsTable(database);
    const row = await database
      .prepare(`
        INSERT INTO issue_downloads (issue_slug, download_count)
        VALUES (?, 1)
        ON CONFLICT(issue_slug) DO UPDATE SET
          download_count = download_count + 1,
          updated_at = CURRENT_TIMESTAMP
        RETURNING download_count
      `)
      .bind(ISSUE_SLUG)
      .first<{ download_count: number }>();

    return Response.json(
      { count: row?.download_count ?? 1 },
      { headers: { "cache-control": "no-store" } },
    );
  } catch {
    return unavailableResponse();
  }
}
