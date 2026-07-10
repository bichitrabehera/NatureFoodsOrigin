import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getOrderById } from "../../actions";
import { StatusUpdater } from "./status-updater";
import { SendReceiptButton } from "./send-receipt-button";
import LocationMap from "./location-map";

export const dynamic = "force-dynamic";

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

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getOrderById(Number(id));

  if ("error" in result) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="font-medium text-red-500">
          {result.error === "Unauthorized" ? "Unauthorized" : "Order not found"}
        </p>
      </div>
    );
  }

  const { order, items } = result;

  const statusSteps = [
    "pending",
    "confirmed",
    "preparing",
    "ready",
    "delivered",
  ];

  const subtotal = Number(order.subtotal);
  const gstAmount = Number(order.gstAmount);
  const total = Number(order.totalAmount);

  return (
    <div>
      <Link
        href="/orders"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Orders
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {order.orderNumber}
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h2 className="mb-3 text-base font-semibold text-gray-900">
              Customer Details
            </h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Name</dt>
                <dd className="font-medium text-gray-900">
                  {order.customerName}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Phone</dt>
                <dd className="font-medium text-gray-900">
                  {order.customerPhone}
                </dd>
              </div>
              {order.customerEmail && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Email</dt>
                  <dd className="font-medium text-gray-900">
                    {order.customerEmail}
                  </dd>
                </div>
              )}
              {order.address && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Address</dt>
                  <dd className="max-w-[250px] text-right font-medium text-gray-900">
                    {order.address}
                  </dd>
                </div>
              )}
              {order.pincode && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Pincode</dt>
                  <dd className="font-medium text-gray-900">
                    {order.pincode}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {order.latitude && order.longitude && (
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <h2 className="mb-3 text-base font-semibold text-gray-900">
                Delivery Location
              </h2>
              <LocationMap lat={order.latitude} lng={order.longitude} />
            </div>
          )}

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h2 className="mb-3 text-base font-semibold text-gray-900">
              Order Info
            </h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Date</dt>
                <dd className="font-medium text-gray-900">
                  {formatDate(order.createdAt)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Payment</dt>
                <dd className="font-medium text-green-600">
                  {order.paymentStatus === "paid"
                    ? "Paid"
                    : order.paymentStatus}
                </dd>
              </div>
              {order.notes && (
                <div>
                  <dt className="mb-1 text-gray-500">Notes</dt>
                  <dd className="rounded-md bg-gray-50 p-3 text-sm text-gray-700">
                    {order.notes}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h2 className="mb-3 text-base font-semibold text-gray-900">
              Status
            </h2>

            <div className="mb-4 flex items-center gap-2">
              {statusSteps.map((step, i) => {
                const currentIdx = statusSteps.indexOf(order.status);
                const isActive = i <= currentIdx;
                const isCancelled = order.status === "cancelled";

                return (
                  <React.Fragment key={step}>
                    <div
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isCancelled
                          ? "bg-red-100 text-red-700"
                          : isActive
                            ? "bg-primary text-white"
                            : "border border-gray-300 text-gray-400"
                      }`}
                    >
                      {i + 1}
                    </div>
                    {i < statusSteps.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 ${
                          isCancelled
                            ? "bg-red-200"
                            : isActive && i < currentIdx
                              ? "bg-primary"
                              : "bg-gray-200"
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <StatusUpdater orderId={order.id} currentStatus={order.status} />

            {order.status === "cancelled" && (
              <p className="mt-3 text-sm font-medium text-red-500">
                This order has been cancelled.
              </p>
            )}
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h2 className="mb-3 text-base font-semibold text-gray-900">
              Price Breakdown
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">
                  GST ({order.gstRate}%)
                </span>
                <span className="text-gray-900">
                  {formatCurrency(gstAmount)}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-primary">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h2 className="mb-3 text-base font-semibold text-gray-900">
              Items
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-2 text-left font-medium text-gray-500">
                      Product
                    </th>
                    <th className="pb-2 text-center font-medium text-gray-500">
                      Qty
                    </th>
                    <th className="pb-2 text-right font-medium text-gray-500">
                      Price
                    </th>
                    <th className="pb-2 text-right font-medium text-gray-500">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-2 font-medium text-gray-900">
                        {item.productName}
                      </td>
                      <td className="py-2 text-center text-gray-600">
                        {item.quantity}
                      </td>
                      <td className="py-2 text-right text-gray-600">
                        {formatCurrency(item.unitPrice)}
                      </td>
                      <td className="py-2 text-right font-medium text-gray-900">
                        {formatCurrency(
                          Number(item.unitPrice) * item.quantity,
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {order.customerEmail && (
            <div className="flex justify-end">
              <SendReceiptButton orderId={order.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
