"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/context/cart-context";
import { createOrder } from "@/app/your-cart/actions";

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
      <section className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600" />
          <h1 className="text-3xl font-black text-[#0D530E]">Payment Successful!</h1>
          <p className="mt-2 text-lg text-[#0D530E]/70">Redirecting to confirmation...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-background py-8 md:py-12">
      <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/your-cart" className="text-[#0D530E]/60 hover:text-[#0D530E]">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-black text-[#0D530E]">Review & Pay</h1>
        </div>

        <div className="grid gap-6">
          <div className="rounded-2xl border-2 border-[#0D530E] bg-[#FBF5DD] p-6">
            <h2 className="mb-4 text-2xl font-black text-[#0D530E]">Delivery Details</h2>
            <div className="space-y-2 text-xl">
              <p><span className="font-semibold">Name:</span> {order.customerName}</p>
              <p><span className="font-semibold">Phone:</span> {order.customerPhone}</p>
              <p><span className="font-semibold">Email:</span> {order.customerEmail}</p>
              <p><span className="font-semibold">Address:</span> {order.address}{order.pincode ? ` - ${order.pincode}` : ""}</p>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-[#0D530E] bg-[#FBF5DD] p-6">
            <h2 className="mb-4 text-2xl font-black text-[#0D530E]">Order Summary</h2>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-xl">
                  <span className="text-[#0D530E]/70">{item.productName} x{item.quantity}</span>
                  <span className="font-bold text-[#0D530E]">Rs {(item.unitPrice * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-1 border-t-2 border-[#0D530E]/20 pt-4">
              <div className="flex justify-between text-xl">
                <span className="text-[#0D530E]/70">Subtotal</span>
                <span className="font-bold text-[#0D530E]">Rs {order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl">
                <span className="text-[#0D530E]/70">GST (5%)</span>
                <span className="font-bold text-[#0D530E]">Rs {order.gstAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-[#0D530E]/20 pt-2 text-xl">
                <span className="font-black text-[#0D530E]">Total</span>
                <span className="font-black text-primary">Rs {order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handlePay}
            disabled={status === "processing"}
            className="bg-primary flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#0D530E] px-8 py-4 text-xl font-bold text-white shadow-[4px_4px_0px_#0D530E] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-50"
          >
            {status === "processing" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <ShoppingBag className="h-5 w-5" />
                Pay Rs {order.total.toFixed(2)}
              </>
            )}
          </button>

          <p className="text-center text-sm text-[#0D530E]/50">
            This is a simulated payment. No real charge will be made.
          </p>
        </div>
      </div>
    </section>
  );
}
