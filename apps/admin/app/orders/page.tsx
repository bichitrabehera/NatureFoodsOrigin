import React from "react";
import Link from "next/link";
import { Eye, Search } from "lucide-react";
import { getOrders } from "../actions";

export const dynamic = "force-dynamic";

const STATUSES = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Preparing", value: "preparing" },
  { label: "Ready", value: "ready" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  preparing: "bg-purple-100 text-purple-800",
  ready: "bg-green-100 text-green-800",
  delivered: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

function formatCurrency(amount: string | number) {
  const num = Number(amount);
  return `Rs ${num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string; page?: string }>;
}) {
  const { search, status, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const result = await getOrders(search, status, currentPage);

  if ("error" in result) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="font-medium text-red-500">{(result as any).error}</p>
      </div>
    );
  }

  const { orders, total } = result;
  const totalPages = Math.ceil(total / 20);

  const buildUrl = (pageNum: number, statusOverride?: string) => {
    const p = new URLSearchParams();
    if (search) p.set("search", search);
    if (statusOverride !== undefined) {
      if (statusOverride) p.set("status", statusOverride);
    } else if (status) {
      p.set("status", status);
    }
    p.set("page", String(pageNum));
    return `/orders?${p.toString()}`;
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Orders</h1>

      <div className="mb-4 flex items-center gap-1 overflow-x-auto">
        {STATUSES.map((s) => {
          const isActive = (status || "") === s.value;
          return (
            <Link
              key={s.value}
              href={buildUrl(1, s.value)}
              className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {s.label}
            </Link>
          );
        })}
      </div>

      <form method="GET" action="/orders" className="mb-4 flex gap-2">
        {status && <input type="hidden" name="status" value={status} />}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            name="search"
            defaultValue={search}
            placeholder="Search order number..."
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-gray-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          Search
        </button>
      </form>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 font-medium text-gray-500">#</th>
              <th className="px-4 py-3 font-medium text-gray-500">Order</th>
              <th className="px-4 py-3 font-medium text-gray-500">Customer</th>
              <th className="px-4 py-3 font-medium text-gray-500">Items</th>
              <th className="px-4 py-3 font-medium text-gray-500">Subtotal</th>
              <th className="px-4 py-3 font-medium text-gray-500">GST</th>
              <th className="px-4 py-3 font-medium text-gray-500">Total</th>
              <th className="px-4 py-3 font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 font-medium text-gray-500">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-12 text-center text-gray-400"
                >
                  No orders found
                </td>
              </tr>
            )}
            {orders.map((order, idx) => (
              <tr
                key={order.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-gray-400">
                  {(currentPage - 1) * 20 + idx + 1}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {order.orderNumber}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">
                    {order.customerName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.customerPhone}
                  </p>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {order.itemCount}
                </td>
                <td className="px-4 py-3 text-gray-900">
                  {formatCurrency(order.subtotal)}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {formatCurrency(order.gstAmount)}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {formatCurrency(order.totalAmount)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                      STATUS_BADGE[order.status] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/orders/${order.id}`}
                    className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            {currentPage > 1 && (
              <Link
                href={buildUrl(currentPage - 1)}
                className="rounded-md border border-gray-300 px-3 py-1.5 transition-colors hover:bg-gray-50"
              >
                Previous
              </Link>
            )}
            {currentPage < totalPages && (
              <Link
                href={buildUrl(currentPage + 1)}
                className="rounded-md border border-gray-300 px-3 py-1.5 transition-colors hover:bg-gray-50"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
