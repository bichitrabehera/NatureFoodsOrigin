import React from "react";
import Link from "next/link";
import { ShoppingBag, TrendingUp, Clock } from "lucide-react";
import { getOrderStats } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getOrderStats();

  if ("error" in stats) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="mb-4 text-xl font-bold text-red-500">{(stats as any).error}</p>
          <p className="text-text/70">Set up your DATABASE_URL in .env.local and run <code className="rounded bg-text/10 px-2 py-1 font-mono text-sm">npx drizzle-kit migrate</code> then <code className="rounded bg-text/10 px-2 py-1 font-mono text-sm">npx tsx packages/shared/src/db/seed.ts</code>.</p>
        </div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    preparing: "bg-purple-100 text-purple-800",
    ready: "bg-green-100 text-green-800",
    delivered: "bg-gray-100 text-gray-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <h1 className="mb-8 text-4xl font-black text-text">Dashboard</h1>

      <div className="mb-12 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border-2 border-text bg-[#FBF5DD] p-6">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold text-text/70">Total Orders</p>
          <p className="text-4xl font-black text-primary">{stats.total}</p>
        </div>

        <div className="rounded-2xl border-2 border-text bg-[#FBF5DD] p-6">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
            <TrendingUp className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold text-text/70">Today&apos;s Orders</p>
          <p className="text-4xl font-black text-primary">{stats.today}</p>
        </div>

        <Link
          href="/orders"
          className="rounded-2xl border-2 border-text bg-[#FBF5DD] p-6 transition-all hover:bg-[#E7E1B1]"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
            <Clock className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold text-text/70">Pending Orders</p>
          <p className="text-4xl font-black text-primary">
            {stats.byStatus.pending || 0}
          </p>
        </Link>
      </div>

      <h2 className="mb-4 text-2xl font-black text-text">Orders by Status</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(stats.byStatus).map(([status, count]) => (
          <div
            key={status}
            className="flex items-center justify-between rounded-xl border-2 border-text/20 bg-[#FBF5DD] px-5 py-4"
          >
            <span
              className={`rounded-full px-3 py-1 text-sm font-bold capitalize ${
                statusColors[status] || "bg-gray-100"
              }`}
            >
              {status}
            </span>
            <span className="text-2xl font-black text-text">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
