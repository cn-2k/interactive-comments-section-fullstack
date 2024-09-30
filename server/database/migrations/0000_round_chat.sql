CREATE TABLE `comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`avatar` text NOT NULL,
	`content` text NOT NULL,
	`likes` integer DEFAULT 0,
	`comment_liked` integer DEFAULT 0,
	`comment_disliked` integer DEFAULT 0,
	`parent_id` integer,
	`reply` integer DEFAULT 0,
	`me` integer DEFAULT 0,
	`new_comment` integer DEFAULT 0,
	`created_at` text DEFAULT (CURRENT_DATE)
);
