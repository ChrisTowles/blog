CREATE TABLE `chats` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`title` text(200),
	`userId` text(36) NOT NULL,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `chats_user_id_idx` ON `chats` (`userId`);--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`chatId` text(36) NOT NULL,
	`role` text(20) NOT NULL,
	`parts` text,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`chatId`) REFERENCES `chats`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `messages_chat_id_idx` ON `messages` (`chatId`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`email` text(255) NOT NULL,
	`name` text(100) NOT NULL,
	`avatar` text(500) NOT NULL,
	`username` text(50) NOT NULL,
	`provider` text(20) NOT NULL,
	`providerId` text(50) NOT NULL,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_provider_id_idx` ON `users` (`provider`,`providerId`);