"use client";

import { useActionState } from "react";
import { sendReceipt } from "../../actions";

export function SendReceiptButton({ orderId }: { orderId: number }) {
  const [state, action, pending] = useActionState(
    async (_prev: unknown) => sendReceipt(orderId),
    null,
  );

  return (
    <div>
      <form action={action}>
        <button
          type="submit"
          disabled={pending}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
        >
          {pending ? "Sending..." : "Send Receipt"}
        </button>
      </form>
      {state && "success" in state && (
        <p className="mt-1 text-xs text-green-600">Receipt sent!</p>
      )}
      {state && "error" in state && (
        <p className="mt-1 text-xs text-red-500">{state.error}</p>
      )}
    </div>
  );
}
