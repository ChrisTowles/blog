CREATE TABLE `chats` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`userId` text NOT NULL,
	`containerId` text,
	`createdAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `chats_user_id_idx` ON `chats` (`userId`);--> statement-breakpoint
CREATE TABLE `document_chunks` (
	`id` text PRIMARY KEY NOT NULL,
	`documentId` text NOT NULL,
	`chunkIndex` integer NOT NULL,
	`content` text NOT NULL,
	`contextualContent` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL,
	FOREIGN KEY (`documentId`) REFERENCES `documents`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `document_chunks_document_id_idx` ON `document_chunks` (`documentId`);--> statement-breakpoint
CREATE INDEX `document_chunks_chunk_index_idx` ON `document_chunks` (`documentId`,`chunkIndex`);--> statement-breakpoint
CREATE TABLE `documents` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`path` text NOT NULL,
	`url` text NOT NULL,
	`contentHash` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `documents_slug_unique` ON `documents` (`slug`);--> statement-breakpoint
CREATE INDEX `documents_slug_idx` ON `documents` (`slug`);--> statement-breakpoint
CREATE TABLE `loan_applications` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`status` text DEFAULT 'intake',
	`applicationData` text DEFAULT '{}',
	`createdAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `loan_applications_user_id_idx` ON `loan_applications` (`userId`);--> statement-breakpoint
CREATE TABLE `loan_messages` (
	`id` text PRIMARY KEY NOT NULL,
	`applicationId` text NOT NULL,
	`role` text,
	`parts` text,
	`createdAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL,
	FOREIGN KEY (`applicationId`) REFERENCES `loan_applications`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `loan_messages_application_id_idx` ON `loan_messages` (`applicationId`);--> statement-breakpoint
CREATE TABLE `loan_reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`applicationId` text NOT NULL,
	`reviewer` text,
	`decision` text,
	`analysis` text,
	`flags` text DEFAULT '[]',
	`createdAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL,
	FOREIGN KEY (`applicationId`) REFERENCES `loan_applications`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `loan_reviews_application_id_idx` ON `loan_reviews` (`applicationId`);--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`chatId` text NOT NULL,
	`role` text NOT NULL,
	`parts` text,
	`createdAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL,
	FOREIGN KEY (`chatId`) REFERENCES `chats`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `messages_chat_id_idx` ON `messages` (`chatId`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`avatar` text NOT NULL,
	`username` text NOT NULL,
	`provider` text NOT NULL,
	`providerId` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_provider_id_idx` ON `users` (`provider`,`providerId`);--> statement-breakpoint
CREATE TABLE `typing_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`learnerId` integer NOT NULL,
	`lessonId` integer,
	`gameSlug` text,
	`wpm` real NOT NULL,
	`netWpm` real DEFAULT 0 NOT NULL,
	`accuracy` real NOT NULL,
	`durationMs` integer NOT NULL,
	`errorsByKey` text DEFAULT '{}' NOT NULL,
	`completedAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL,
	FOREIGN KEY (`learnerId`) REFERENCES `typing_learners`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`lessonId`) REFERENCES `typing_lessons`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `typing_attempts_learner_id_completed_at_idx` ON `typing_attempts` (`learnerId`,`completedAt`);--> statement-breakpoint
CREATE INDEX `typing_attempts_lesson_id_idx` ON `typing_attempts` (`lessonId`);--> statement-breakpoint
CREATE INDEX `typing_attempts_game_slug_idx` ON `typing_attempts` (`gameSlug`);--> statement-breakpoint
CREATE TABLE `typing_group_invites` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`groupId` integer NOT NULL,
	`token` text NOT NULL,
	`email` text,
	`expiresAt` integer NOT NULL,
	`acceptedBy` text,
	`acceptedAt` integer,
	`createdAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL,
	FOREIGN KEY (`groupId`) REFERENCES `typing_groups`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`acceptedBy`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `typing_group_invites_token_idx` ON `typing_group_invites` (`token`);--> statement-breakpoint
CREATE INDEX `typing_group_invites_group_id_idx` ON `typing_group_invites` (`groupId`);--> statement-breakpoint
CREATE TABLE `typing_group_members` (
	`groupId` integer NOT NULL,
	`userId` text NOT NULL,
	`role` text DEFAULT 'guardian' NOT NULL,
	`invitedBy` text,
	`joinedAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL,
	PRIMARY KEY(`groupId`, `userId`),
	FOREIGN KEY (`groupId`) REFERENCES `typing_groups`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`invitedBy`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `typing_group_members_user_id_idx` ON `typing_group_members` (`userId`);--> statement-breakpoint
CREATE TABLE `typing_groups` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`kind` text DEFAULT 'family' NOT NULL,
	`createdAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `typing_groups_slug_unique` ON `typing_groups` (`slug`);--> statement-breakpoint
CREATE TABLE `typing_key_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`learnerId` integer NOT NULL,
	`key` text NOT NULL,
	`attempts` integer DEFAULT 0 NOT NULL,
	`errors` integer DEFAULT 0 NOT NULL,
	`avgMs` real DEFAULT 0 NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL,
	FOREIGN KEY (`learnerId`) REFERENCES `typing_learners`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `typing_key_stats_learner_id_key_idx` ON `typing_key_stats` (`learnerId`,`key`);--> statement-breakpoint
CREATE TABLE `typing_learners` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`groupId` integer NOT NULL,
	`displayName` text NOT NULL,
	`avatarUrl` text,
	`birthYear` integer,
	`currentStage` integer DEFAULT 1 NOT NULL,
	`preferredVoice` text DEFAULT 'chirp3-en-us-Aoede' NOT NULL,
	`createdAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL,
	FOREIGN KEY (`groupId`) REFERENCES `typing_groups`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `typing_learners_group_id_idx` ON `typing_learners` (`groupId`);--> statement-breakpoint
CREATE TABLE `typing_lessons` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`stage` integer NOT NULL,
	`kind` text NOT NULL,
	`title` text NOT NULL,
	`text` text NOT NULL,
	`targetWpm` integer DEFAULT 10 NOT NULL,
	`targetAccuracy` real DEFAULT 0.95 NOT NULL,
	`topic` text,
	`spellingListId` integer,
	`generatedBy` text DEFAULT 'system' NOT NULL,
	`createdAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `typing_lessons_slug_idx` ON `typing_lessons` (`slug`);--> statement-breakpoint
CREATE INDEX `typing_lessons_stage_idx` ON `typing_lessons` (`stage`);--> statement-breakpoint
CREATE INDEX `typing_lessons_spelling_list_id_idx` ON `typing_lessons` (`spellingListId`);--> statement-breakpoint
CREATE TABLE `typing_spelling_lists` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`learnerId` integer NOT NULL,
	`weekOf` text NOT NULL,
	`words` text DEFAULT '[]' NOT NULL,
	`source` text DEFAULT 'type' NOT NULL,
	`sourceImageUrl` text,
	`createdBy` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch('subsec') * 1000) NOT NULL,
	FOREIGN KEY (`learnerId`) REFERENCES `typing_learners`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `typing_spelling_lists_learner_id_week_of_idx` ON `typing_spelling_lists` (`learnerId`,`weekOf`);--> statement-breakpoint
CREATE TABLE `typing_spelling_progress` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`spellingListId` integer NOT NULL,
	`word` text NOT NULL,
	`consecutiveCorrect` integer DEFAULT 0 NOT NULL,
	`mastered` integer DEFAULT false NOT NULL,
	`masteredAt` integer,
	FOREIGN KEY (`spellingListId`) REFERENCES `typing_spelling_lists`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `typing_spelling_progress_list_word_idx` ON `typing_spelling_progress` (`spellingListId`,`word`);--> statement-breakpoint
CREATE TABLE `node_executions` (
	`id` text PRIMARY KEY NOT NULL,
	`runId` text NOT NULL,
	`nodeId` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`promptSent` text,
	`rawResponse` text,
	`parsedOutput` text,
	`tokensIn` integer,
	`tokensOut` integer,
	`latencyMs` integer,
	`error` text,
	`startedAt` text,
	`completedAt` text,
	FOREIGN KEY (`runId`) REFERENCES `workflow_runs`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `workflow_edges` (
	`id` text PRIMARY KEY NOT NULL,
	`workflowId` text NOT NULL,
	`edgeId` text NOT NULL,
	`sourceNode` text NOT NULL,
	`targetNode` text NOT NULL,
	`sourceHandle` text,
	`targetHandle` text,
	`label` text,
	`animated` integer DEFAULT 0 NOT NULL,
	`edgeType` text DEFAULT 'smoothstep' NOT NULL,
	`createdAt` text,
	FOREIGN KEY (`workflowId`) REFERENCES `workflows`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `workflow_nodes` (
	`id` text PRIMARY KEY NOT NULL,
	`workflowId` text NOT NULL,
	`nodeId` text NOT NULL,
	`type` text NOT NULL,
	`label` text NOT NULL,
	`positionX` real DEFAULT 0 NOT NULL,
	`positionY` real DEFAULT 0 NOT NULL,
	`prompt` text DEFAULT '' NOT NULL,
	`model` text DEFAULT 'claude-haiku-4-5' NOT NULL,
	`temperature` real DEFAULT 0.7 NOT NULL,
	`maxTokens` integer DEFAULT 1024 NOT NULL,
	`outputSchema` text DEFAULT '{"type":"object","properties":{},"required":[]}' NOT NULL,
	`inputMapping` text DEFAULT '{}' NOT NULL,
	`createdAt` text,
	`updatedAt` text,
	FOREIGN KEY (`workflowId`) REFERENCES `workflows`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `workflow_runs` (
	`id` text PRIMARY KEY NOT NULL,
	`workflowId` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`inputData` text,
	`outputData` text,
	`startedAt` text,
	`completedAt` text,
	`error` text,
	`createdAt` text,
	FOREIGN KEY (`workflowId`) REFERENCES `workflows`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `workflows` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`viewport` text,
	`ownerId` text NOT NULL,
	`isPublished` integer DEFAULT 0 NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text,
	`updatedAt` text
);
