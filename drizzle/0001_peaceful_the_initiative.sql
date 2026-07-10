ALTER TABLE "orders" ADD COLUMN "subtotal" numeric(10, 2) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "gst_amount" numeric(10, 2) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "gst_rate" numeric(5, 2) DEFAULT '5.00' NOT NULL;