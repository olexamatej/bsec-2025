CREATE TABLE IF NOT EXISTS "bsec-2025_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"goal_id" uuid,
	"transaction_id" uuid,
	"content" text NOT NULL,
	"created_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "bsec-2025_comments" ADD COLUMN "post_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bsec-2025_posts" ADD CONSTRAINT "bsec-2025_posts_user_id_bsec-2025_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."bsec-2025_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bsec-2025_posts" ADD CONSTRAINT "bsec-2025_posts_goal_id_bsec-2025_goals_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."bsec-2025_goals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bsec-2025_posts" ADD CONSTRAINT "bsec-2025_posts_transaction_id_bsec-2025_transactions_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."bsec-2025_transactions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bsec-2025_comments" ADD CONSTRAINT "bsec-2025_comments_post_id_bsec-2025_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."bsec-2025_posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
