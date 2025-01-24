-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "tags_name_key" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "tags" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"content" text,
	"link" text,
	"author" text,
	"pub_date" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
ALTER TABLE "events" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "event_tags" (
	"event_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "event_tags_pkey" PRIMARY KEY("event_id","tag_id")
);
--> statement-breakpoint
ALTER TABLE "event_tags" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "event_tags" ADD CONSTRAINT "event_tags_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_tags" ADD CONSTRAINT "event_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_tags_name" ON "tags" USING btree ("name" text_ops);--> statement-breakpoint
CREATE POLICY "Allow authenticated delete on tags" ON "tags" AS PERMISSIVE FOR DELETE TO public USING ((auth.role() = 'authenticated'::text));--> statement-breakpoint
CREATE POLICY "Allow authenticated update on tags" ON "tags" AS PERMISSIVE FOR UPDATE TO public;--> statement-breakpoint
CREATE POLICY "Allow authenticated insert on tags" ON "tags" AS PERMISSIVE FOR INSERT TO public;--> statement-breakpoint
CREATE POLICY "Allow public read on tags" ON "tags" AS PERMISSIVE FOR SELECT TO public;--> statement-breakpoint
CREATE POLICY "Allow authenticated delete on events" ON "events" AS PERMISSIVE FOR DELETE TO public USING ((auth.role() = 'authenticated'::text));--> statement-breakpoint
CREATE POLICY "Allow authenticated update on events" ON "events" AS PERMISSIVE FOR UPDATE TO public;--> statement-breakpoint
CREATE POLICY "Allow authenticated insert on events" ON "events" AS PERMISSIVE FOR INSERT TO public;--> statement-breakpoint
CREATE POLICY "Allow public read on events" ON "events" AS PERMISSIVE FOR SELECT TO public;--> statement-breakpoint
CREATE POLICY "Allow authenticated delete on event_tags" ON "event_tags" AS PERMISSIVE FOR DELETE TO public USING ((auth.role() = 'authenticated'::text));--> statement-breakpoint
CREATE POLICY "Allow authenticated update on event_tags" ON "event_tags" AS PERMISSIVE FOR UPDATE TO public;--> statement-breakpoint
CREATE POLICY "Allow authenticated insert on event_tags" ON "event_tags" AS PERMISSIVE FOR INSERT TO public;--> statement-breakpoint
CREATE POLICY "Allow public read on event_tags" ON "event_tags" AS PERMISSIVE FOR SELECT TO public;
*/