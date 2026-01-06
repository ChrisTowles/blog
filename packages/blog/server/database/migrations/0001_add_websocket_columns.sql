-- Add WebSocket session columns to chats table
ALTER TABLE "chats" ADD COLUMN "sdk_session_id" text;--> statement-breakpoint
ALTER TABLE "chats" ADD COLUMN "connection_status" text;--> statement-breakpoint
ALTER TABLE "chats" ADD COLUMN "last_activity_at" timestamp;
