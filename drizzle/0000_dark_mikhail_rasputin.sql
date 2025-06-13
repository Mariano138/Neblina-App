CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text,
	`content` text,
	`color` text NOT NULL,
	`createdDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
