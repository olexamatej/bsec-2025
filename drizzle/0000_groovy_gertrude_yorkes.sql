DO $$ BEGIN
 CREATE TYPE "public"."standing_order_type" AS ENUM('incoming', 'outgoing');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bsec-2025_comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_id" uuid,
	"parent_id" uuid,
	"user_id" uuid NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bsec-2025_goal_checkpoints" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"goal_id" uuid NOT NULL,
	"interval_start" integer NOT NULL,
	"interval_amount" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bsec-2025_goals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"amount" integer NOT NULL,
	"target" integer NOT NULL,
	"timestamp" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bsec-2025_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"goal_id" uuid,
	"transaction_id" uuid,
	"content" text NOT NULL,
	"created_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bsec-2025_standing_orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"amount" integer NOT NULL,
	"tag_id" uuid,
	"interval_start" timestamp with time zone NOT NULL,
	"interval_end" timestamp with time zone NOT NULL,
	"interval" integer NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"interval_amount" integer NOT NULL,
	"order_type" "standing_order_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bsec-2025_tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bsec-2025_transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"amount" integer NOT NULL,
	"tag_id" uuid,
	"timestamp" timestamp with time zone NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"transaction_type" "standing_order_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bsec-2025_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_name" text NOT NULL,
	"display_name" text NOT NULL,
	"avatar_url" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bsec-2025_comments" ADD CONSTRAINT "bsec-2025_comments_post_id_bsec-2025_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."bsec-2025_posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bsec-2025_comments" ADD CONSTRAINT "bsec-2025_comments_parent_id_bsec-2025_comments_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."bsec-2025_comments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bsec-2025_comments" ADD CONSTRAINT "bsec-2025_comments_user_id_bsec-2025_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."bsec-2025_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bsec-2025_goal_checkpoints" ADD CONSTRAINT "bsec-2025_goal_checkpoints_goal_id_bsec-2025_goals_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."bsec-2025_goals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bsec-2025_goals" ADD CONSTRAINT "bsec-2025_goals_user_id_bsec-2025_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."bsec-2025_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
 ALTER TABLE "bsec-2025_posts" ADD CONSTRAINT "bsec-2025_posts_transaction_id_bsec-2025_transactions_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."bsec-2025_transactions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bsec-2025_standing_orders" ADD CONSTRAINT "bsec-2025_standing_orders_user_id_bsec-2025_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."bsec-2025_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bsec-2025_standing_orders" ADD CONSTRAINT "bsec-2025_standing_orders_tag_id_bsec-2025_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."bsec-2025_tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bsec-2025_tags" ADD CONSTRAINT "bsec-2025_tags_user_id_bsec-2025_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."bsec-2025_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bsec-2025_transactions" ADD CONSTRAINT "bsec-2025_transactions_user_id_bsec-2025_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."bsec-2025_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bsec-2025_transactions" ADD CONSTRAINT "bsec-2025_transactions_tag_id_bsec-2025_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."bsec-2025_tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
