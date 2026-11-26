CREATE TABLE `meta` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `picrosses` ADD `title_en` text;--> statement-breakpoint
ALTER TABLE `picrosses` ADD `slug` text;--> statement-breakpoint
ALTER TABLE `picrosses` ADD `difficulty` text DEFAULT 'medium' NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `picrosses_slug_unique` ON `picrosses` (`slug`);