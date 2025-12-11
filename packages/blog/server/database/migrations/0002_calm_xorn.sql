CREATE TYPE "public"."provider" AS ENUM('github');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'assistant');--> statement-breakpoint
ALTER TABLE "messages" RENAME COLUMN "content" TO "parts";--> statement-breakpoint
ALTER TABLE "chats" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "role" SET DATA TYPE "public"."role" USING "role"::"public"."role";--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "provider" SET DATA TYPE "public"."provider" USING "provider"::"public"."provider";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT now();