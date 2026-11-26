// Fichier généré par scripts/bundle-migrations.ts — ne pas modifier à la main.
import type { MigrationMeta } from 'drizzle-orm/migrator';

export const migrations: MigrationMeta[] = [
  {
    sql: [
      'CREATE TABLE `likes` (\n\t`user_id` text NOT NULL,\n\t`picross_id` text NOT NULL,\n\t`created_at` integer NOT NULL,\n\tPRIMARY KEY(`user_id`, `picross_id`),\n\tFOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,\n\tFOREIGN KEY (`picross_id`) REFERENCES `picrosses`(`id`) ON UPDATE no action ON DELETE cascade\n);\n',
      '\nCREATE TABLE `picrosses` (\n\t`id` text PRIMARY KEY NOT NULL,\n\t`title` text NOT NULL,\n\t`map` text NOT NULL,\n\t`width` integer NOT NULL,\n\t`height` integer NOT NULL,\n\t`validated` integer DEFAULT false NOT NULL,\n\t`author_id` text,\n\t`created_at` integer NOT NULL,\n\tFOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null\n);\n',
      '\nCREATE INDEX `picrosses_author_idx` ON `picrosses` (`author_id`);',
      '\nCREATE INDEX `picrosses_validated_idx` ON `picrosses` (`validated`,`created_at`);',
      "\nCREATE TABLE `users` (\n\t`id` text PRIMARY KEY NOT NULL,\n\t`email` text NOT NULL,\n\t`name` text NOT NULL,\n\t`password_hash` text NOT NULL,\n\t`role` text DEFAULT 'user' NOT NULL,\n\t`created_at` integer NOT NULL\n);\n",
      '\nCREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);',
      '\nCREATE UNIQUE INDEX `users_name_lower_unique` ON `users` (lower("name"));',
    ],
    bps: true,
    folderMillis: 1795677654832,
    hash: 'bdd284dfb9a63e9c0e09234a6b95141cd4ef8ef8c10581433f7edebd336fe1ef',
  },
  {
    sql: [
      'CREATE TABLE `meta` (\n\t`key` text PRIMARY KEY NOT NULL,\n\t`value` text NOT NULL\n);\n',
      '\nALTER TABLE `picrosses` ADD `title_en` text;',
      '\nALTER TABLE `picrosses` ADD `slug` text;',
      "\nALTER TABLE `picrosses` ADD `difficulty` text DEFAULT 'medium' NOT NULL;",
      '\nCREATE UNIQUE INDEX `picrosses_slug_unique` ON `picrosses` (`slug`);',
    ],
    bps: true,
    folderMillis: 1795680327554,
    hash: '5438bb37f733a150074cf8d1b07758fa6dd80789edee1e325c9bfb3b2108bc24',
  },
];
