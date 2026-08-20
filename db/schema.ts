import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const issueDownloads = sqliteTable("issue_downloads", {
  issueSlug: text("issue_slug").primaryKey(),
  downloadCount: integer("download_count").notNull().default(0),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
