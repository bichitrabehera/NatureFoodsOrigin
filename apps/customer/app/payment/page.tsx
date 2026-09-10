"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/context/cart-context";
import { createOrder } from "@/app/your-cart/actions";
import { formatINR } from "@/lib/utils/format";

interface PendingOrder {
  items: { productId: string; productName: string; quantity: number; unitPrice: number }[];
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  pincode: string;
  notes: string;
  latitude: string;
  longitude: string;      
  subtotal: number;
  gstAmount: number;
  total: number;
}

export default function PaymentPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<PendingOrder | null>(null);
  const [status, setStatus] = useState<"review" | "processing" | "success">("review");

  useEffect(() => {
    const raw = sessionStorage.getItem("nfo-pending-order");
    if (!raw) {
      router.replace("/your-cart");
      return;
    }
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount sessionStorage hydration
      setOrder(JSON.parse(raw));
    } catch {
      router.replace("/your-cart");
    }
  }, [router]);

  const handlePay = async () => {
    if (!order) return;
    setStatus("processing");

    // simulate payment processing
    await new Promise((r) => setTimeout(r, 2000));

    try {
      const result = await createOrder({
        items: order.items,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerEmail: order.customerEmail,
        address: order.address || undefined,
        pincode: order.pincode || undefined,
        notes: order.notes || undefined,
        subtotal: order.subtotal,
        latitude: order.latitude || undefined,
        longitude: order.longitude || undefined,
      });

      if (result.error) {
        setStatus("review");
        return;
      }

      setStatus("success");
      sessionStorage.removeItem("nfo-pending-order");
      clearCart();

      setTimeout(() => {
        router.push(`/order-confirmation/${result.orderNumber}`);
      }, 1500);
    } catch {
      setStatus("review");
    }
  };

  if (!order) return null;

  if (status === "success") {
    return (
      <section className="flex min-h-screen items-center font-display justify-center bg-bg">
        <div className="text-center">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-leaf" />
          <h1 className="font-display text-3xl font-black text-ink">
            Payment Successful!
          </h1>
          <p className="mt-2 text-lg text-ink/70">
            Redirecting to confirmation...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-bg py-8 md:py-12 font-display">
      <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/your-cart" className="text-ink/60 hover:text-ink">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-display text-3xl font-black text-ink">
            Review & Pay
          </h1>
        </div>

        <div className="grid gap-6">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="mb-4 font-display text-xl font-black text-ink">
              Delivery Details
            </h2>
            <div className="space-y-2 text-lg">

              <p>
                <span className="font-semibold text-ink/70">Name:</span>{" "}
                <span className="font-bold text-ink">{order.customerName}</span>
              </p>
              <p>
                <span className="font-semibold text-ink/70">Phone:</span>{" "}
                <span className="font-bold text-ink">{order.customerPhone}</span>
              </p>
              <p>
                <span className="font-semibold text-ink/70">Email:</span>{" "}
                <span className="font-bold text-ink">{order.customerEmail}</span>
              </p>
              <p>
                <span className="font-semibold text-ink/70">Address:</span>{" "}
                <span className="font-bold text-ink">
                  {order.address}
                  {order.pincode ? ` - ${order.pincode}` : ""}
                </span>
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="mb-4 font-display text-xl font-black text-ink">
              Order Summary
            </h2>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-lg">
                  <span className="text-ink/70">
                    {item.productName} x{item.quantity}
                  </span>
                  <span className="font-bold text-ink tabular-nums">
                    {formatINR(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-1 border-t-2 border-line pt-4">
              <div className="flex justify-between text-xl">
                <span className="text-ink/70">Subtotal</span>
                <span className="font-bold text-ink tabular-nums">
                  {formatINR(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-xl">
                <span className="text-ink/70">GST (5%)</span>
                <span className="font-bold text-ink tabular-nums">
                  {formatINR(order.gstAmount)}
                </span>
              </div>
              <div className="flex justify-between border-t border-line pt-2 text-xl">
                <span className="font-black text-ink">Total</span>
                <span className="font-black text-ink tabular-nums">
                  {formatINR(order.total)}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handlePay}
            disabled={status === "processing"}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-ink bg-ember px-8 py-4 text-lg font-bold text-ink transition-colors hover:bg-ink hover:text-white disabled:opacity-50"
          >
            {status === "processing" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <ShoppingBag className="h-5 w-5" />
                Pay {formatINR(order.total)}
              </>
            )}
          </button>


        </div>
      </div>
    </section>
  );
}
