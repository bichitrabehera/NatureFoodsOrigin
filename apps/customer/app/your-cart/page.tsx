"use client";

import React, { useState } from "react";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/context/cart-context";
import { SectionHeading } from "@/components/sections/section-heading";
import LocationPicker from "@/components/shared/location-picker";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    gstAmount,
    totalWithGst,
  } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pincode: "",
    notes: "",
    latitude: "",
    longitude: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const missing: string[] = [];
    if (!form.name) missing.push("Full Name");
    if (!form.phone) missing.push("Phone Number");
    if (!form.email) missing.push("Email (required for receipt)");
    if (!form.address) missing.push("Delivery Address");
    if (!form.pincode) missing.push("Pincode");
    if (!form.latitude || !form.longitude)
      missing.push("Pin your location on the map");

    if (missing.length > 0) {
      setError(`Please fill in: ${missing.join(", ")}`);
      return;
    }

    const gstAmount = subtotal * 0.05;
    const total = subtotal + gstAmount;

    const pendingOrder = {
      items: items.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        quantity: i.quantity,
        unitPrice: i.product.price,
      })),
      customerName: form.name,
      customerPhone: form.phone,
      customerEmail: form.email,
      address: form.address,
      pincode: form.pincode,
      notes: form.notes,
      latitude: form.latitude,
      longitude: form.longitude,
      subtotal,
      gstAmount,
      total,
    };

    sessionStorage.setItem("nfo-pending-order", JSON.stringify(pendingOrder));
    router.push("/payment");
  };

  if (items.length === 0) {
    return (
      <section className="bg-background min-h-screen py-12 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-8 lg:px-10">
          <ShoppingBag className="mx-auto mb-6 h-20 w-20 text-[#0D530E]/30" />
          <h2 className="mb-4 text-4xl font-black text-[#0D530E]">
            Your cart is empty
          </h2>
          <p className="mb-8 text-xl text-[#0D530E]/70">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link
            href="/order-now"
            className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-full px-8 py-3 text-lg font-bold text-white transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
            Browse Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background min-h-screen py-8 md:py-12">
      {" "}
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <SectionHeading title="Your Cart" />

        <div className="grid gap-8 lg:grid-cols-2">
          {" "}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="rounded-2xl border-2 border-[#0D530E] bg-[#FBF5DD] p-4"
              >
                <div className="flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-24 w-24 flex-shrink-0 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-xl font-black text-[#0D530E]">
                      {item.product.name}
                    </h3>

                    <p className="mt-1 text-lg text-[#0D530E]/70">
                      ₹{item.product.price} each
                    </p>

                    <p className="text-primary mt-2 text-lg font-bold">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="mt-4 flex items-center justify-between border-t border-[#0D530E]/15 pt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0D530E] text-[#0D530E] transition hover:bg-[#0D530E] hover:text-white"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <span className="w-8 text-center text-lg font-bold text-[#0D530E]">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0D530E] text-[#0D530E] transition hover:bg-[#0D530E] hover:text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-red-500 text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border-2 border-[#0D530E] bg-[#FBF5DD] p-6">
            <h3 className="mb-6 text-2xl font-black text-[#0D530E]">
              Order Summary
            </h3>

            <div className="mb-6 space-y-2">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between text-xl"
                >
                  <span className="text-[#0D530E]/70">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="font-bold text-[#0D530E]">
                    Rs {(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mb-8 space-y-2 border-t-2 border-[#0D530E]/20 pt-4">
              <div className="flex justify-between text-xl">
                <span className="text-[#0D530E]/70">Subtotal</span>
                <span className="font-bold text-[#0D530E]">
                  Rs {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xl">
                <span className="text-[#0D530E]/70">GST (5%)</span>
                <span className="font-bold text-[#0D530E]">
                  Rs {gstAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#0D530E]/20 pt-2 text-xl">
                <span className="font-black text-[#0D530E]">Total</span>
                <span className="text-primary font-black">
                  Rs {totalWithGst.toFixed(2)}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-lg font-bold text-[#0D530E]"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="focus:border-primary w-full rounded-xl border-2 border-[#0D530E] bg-white px-4 py-3 text-base text-[#0D530E] transition-all outline-none"
                />
              </div>

              {/* Phone + Email */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-lg font-bold text-[#0D530E]"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="focus:border-primary w-full rounded-xl border-2 border-[#0D530E] bg-white px-4 py-3 text-base text-[#0D530E] transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-lg font-bold text-[#0D530E]"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="focus:border-primary w-full rounded-xl border-2 border-[#0D530E] bg-white px-4 py-3 text-base text-[#0D530E] transition-all outline-none"
                  />
                  <p className="text-xs text-[#0D530E]/60">
                    Your receipt and order updates will be sent here.
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label
                  htmlFor="address"
                  className="text-lg font-bold text-[#0D530E]"
                >
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="focus:border-primary w-full rounded-xl border-2 border-[#0D530E] bg-white px-4 py-3 text-base text-[#0D530E] transition-all outline-none"
                />
              </div>

              {/* Pincode */}
              <div className="space-y-2">
                <label
                  htmlFor="pincode"
                  className="text-lg font-bold text-[#0D530E]"
                >
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  id="pincode"
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  className="focus:border-primary w-full rounded-xl border-2 border-[#0D530E] bg-white px-4 py-3 text-base text-[#0D530E] transition-all outline-none"
                />
              </div>

              {/* Location */}
              <div className="space-y-3">
                <label className="text-lg font-bold text-[#0D530E]">
                  Pin Your Location <span className="text-red-500">*</span>
                </label>

                <LocationPicker
                  value={
                    form.latitude && form.longitude
                      ? {
                          lat: form.latitude,
                          lng: form.longitude,
                        }
                      : null
                  }
                  onChange={(lat, lng) =>
                    setForm((prev) => ({
                      ...prev,
                      latitude: lat,
                      longitude: lng,
                    }))
                  }
                />

                <p className="text-md text-[#0D530E]/60">
                  This helps our delivery partner find your exact location.
                </p>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label
                  htmlFor="notes"
                  className="text-lg font-bold text-[#0D530E]"
                >
                  Order Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Any special instructions? (Optional)"
                  className="focus:border-primary w-full resize-none rounded-xl border-2 border-[#0D530E] bg-white px-4 py-3 text-base text-[#0D530E] transition-all outline-none"
                />
              </div>

              {error && (
                <p className="text-lg font-semibold text-red-500">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="bg-primary w-full rounded-xl border-2 border-[#0D530E] px-8 py-4 text-xl font-bold text-white shadow-[4px_4px_0px_#0D530E] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-50"
              >
                {submitting ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
