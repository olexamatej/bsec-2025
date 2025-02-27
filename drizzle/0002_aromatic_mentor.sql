ALTER TABLE "bsec-2025_posts" DROP CONSTRAINT "bsec-2025_posts_transaction_id_bsec-2025_transactions_id_fk";
--> statement-breakpoint
ALTER TABLE "bsec-2025_tags" ADD COLUMN "color" varchar(6) NOT NULL;--> statement-breakpoint
ALTER TABLE "bsec-2025_transactions" ADD COLUMN "description" text DEFAULT '' NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bsec-2025_posts" ADD CONSTRAINT "bsec-2025_posts_transaction_id_bsec-2025_transactions_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."bsec-2025_transactions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
