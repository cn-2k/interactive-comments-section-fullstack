CREATE TABLE `comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`name` text NOT NULL,
	`avatar` text NOT NULL,
	`content` text NOT NULL,
	`likes` integer DEFAULT 0,
	`comment_liked` integer DEFAULT false,
	`comment_disliked` integer DEFAULT false,
	`parent_id` integer,
	`reply` integer DEFAULT false,
	`new_comment` integer DEFAULT false,
	`created_at` text NOT NULL,
	FOREIGN KEY (`parent_id`) REFERENCES `comments`(`id`) ON UPDATE no action ON DELETE cascade
);
