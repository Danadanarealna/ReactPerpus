CREATE TABLE `books` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`category` text,
	`publisher` text,
	`isbn` text,
	`issn` text,
	`author` text,
	`year` integer,
	`price` real,
	`description` text
);
