CREATE TABLE `issue_downloads` (
	`issue_slug` text PRIMARY KEY NOT NULL,
	`download_count` integer DEFAULT 0 NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
