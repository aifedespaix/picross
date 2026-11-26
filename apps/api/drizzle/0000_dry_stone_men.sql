CREATE TABLE `likes` (
	`user_id` text NOT NULL,
	`picross_id` text NOT NULL,
	`created_at` integer NOT NULL,
	PRIMARY KEY(`user_id`, `picross_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`picross_id`) REFERENCES `picrosses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `picrosses` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`map` text NOT NULL,
	`width` integer NOT NULL,
	`height` integer NOT NULL,
	`validated` integer DEFAULT false NOT NULL,
	`author_id` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `picrosses_author_idx` ON `picrosses` (`author_id`);--> statement-breakpoint
CREATE INDEX `picrosses_validated_idx` ON `picrosses` (`validated`,`created_at`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`password_hash` text NOT NULL,
	`role` text DEFAULT 'user' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_name_lower_unique` ON `users` (lower("name"));