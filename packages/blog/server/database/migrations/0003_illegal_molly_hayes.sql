CREATE TYPE "public"."loan_status" AS ENUM('intake', 'reviewing', 'approved', 'denied', 'flagged');--> statement-breakpoint
CREATE TYPE "public"."review_decision" AS ENUM('approved', 'denied', 'flagged');--> statement-breakpoint
CREATE TYPE "public"."reviewer" AS ENUM('the-bank', 'loan-market', 'background-checks');--> statement-breakpoint
CREATE TABLE "loan_applications" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"userId" varchar(36) NOT NULL,
	"status" "loan_status" DEFAULT 'intake',
	"applicationData" json DEFAULT '{}'::json,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "loan_messages" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"applicationId" varchar(36) NOT NULL,
	"role" "role",
	"parts" json,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "loan_reviews" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"applicationId" varchar(36) NOT NULL,
	"reviewer" "reviewer",
	"decision" "review_decision",
	"analysis" text,
	"flags" json DEFAULT '[]'::json,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "loan_messages" ADD CONSTRAINT "loan_messages_applicationId_loan_applications_id_fk" FOREIGN KEY ("applicationId") REFERENCES "public"."loan_applications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "loan_reviews" ADD CONSTRAINT "loan_reviews_applicationId_loan_applications_id_fk" FOREIGN KEY ("applicationId") REFERENCES "public"."loan_applications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "loan_applications_user_id_idx" ON "loan_applications" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "loan_messages_application_id_idx" ON "loan_messages" USING btree ("applicationId");--> statement-breakpoint
CREATE INDEX "loan_reviews_application_id_idx" ON "loan_reviews" USING btree ("applicationId");