"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "../../actions";

const STATUSES = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "delivered",
  "cancelled",
] as const;

export function StatusUpdater({
  orderId,
  currentStatus,
}: {
  orderId: number;
  currentStatus: string;
}) {
  const router = useRouter();

  const handleUpdate = async (status: string) => {
    await updateOrderStatus(orderId, status);
    router.refresh();
  };

  return (
    <div className="flex flex-wrap gap-2">
      {STATUSES.map((status) => {
        const isActive = status === currentStatus;
        const isCancel = status === "cancelled";

        return (
          <button
            key={status}
            onClick={() => handleUpdate(status)}
            disabled={isActive}
            className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
              isActive
                ? isCancel
                  ? "bg-red-600 text-white"
                  : "bg-primary text-white"
                : isCancel
                  ? "border border-gray-300 text-red-600 hover:bg-red-50"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
}
