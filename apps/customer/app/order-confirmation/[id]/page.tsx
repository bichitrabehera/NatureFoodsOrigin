import React from "react";
import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { getDb } from "@naturefoods/shared";
import { orders } from "@naturefoods/shared";
import { eq } from "drizzle-orm";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const db = getDb();
  const [order] = await db
    .select({
      totalAmount: orders.totalAmount,
    })
    .from(orders)
    .where(eq(orders.orderNumber, id))
    .limit(1);

  return (
    <section className="bg-background min-h-screen py-24 md:py-32">
      <div className="mx-auto max-w-lg px-6 text-center sm:px-8 lg:px-10">
        <CheckCircle className="mx-auto mb-6 h-24 w-24 text-primary" />

        <h1 className="mb-4 text-4xl font-black text-[#0D530E]">
          Order Placed!
        </h1>

        <p className="mb-2 text-xl text-[#0D530E]/70">
          Your order number is:
        </p>
        <p className="mb-8 text-3xl font-black text-primary">{id}</p>

        <div className="mb-8 rounded-2xl border-2 border-[#0D530E] bg-[#FBF5DD] p-6 text-left">
          {order && (
            <div className="mb-4 text-center">
              <p className="text-lg text-[#0D530E]/70">Total Paid</p>
              <p className="text-3xl font-black text-primary">
                Rs {order.totalAmount}
              </p>
            </div>
          )}
          <p className="mb-2 text-lg font-bold text-[#0D530E]">
            What happens next?
          </p>
          <ol className="space-y-2 text-[#0D530E]/80">
            <li>1. We&apos;ll confirm your order shortly.</li>
            <li>2. Our team will prepare it fresh.</li>
            <li>3. You&apos;ll get notified when it&apos;s ready.</li>
          </ol>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/order-now"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#0D530E] bg-[#FBF5DD] px-8 py-3 text-lg font-bold text-[#0D530E] transition-all hover:bg-[#E7E1B1]"
          >
            <ArrowLeft className="h-5 w-5" />
            Order Again
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-lg font-bold text-white transition-all hover:bg-primary/90"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
