"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useCart } from "@/lib/context/cart-context";
import { formatINR } from "@/lib/utils/format";
import LocationPicker from "@/components/shared/location-picker";

interface OrderForm {
  name: string;
  phone: string;
  email: string;
  address: string;
  pincode: string;
  notes: string;
  location: {
    lat: string;
    lng: string;
  } | null;
}

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

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderForm>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      pincode: "",
      notes: "",
      location: null,
    },
  });

  const handleOrder: SubmitHandler<OrderForm> = (data) => {
    if (items.length === 0) return;

    const gstAmount = subtotal * 0.05;
    const total = subtotal + gstAmount;

    const pendingOrder = {
      items: items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
      })),

      customerName: data.name,
      customerPhone: data.phone,
      customerEmail: data.email,
      address: data.address,
      pincode: data.pincode,
      notes: data.notes,

      latitude: data.location?.lat ?? "",
      longitude: data.location?.lng ?? "",

      subtotal,
      gstAmount,
      total,
    };

    sessionStorage.setItem(
      "nfo-pending-order",
      JSON.stringify(pendingOrder),
    );

    router.push("/payment");
  };

  if (items.length === 0) {
    return (
      <section className="min-h-screen bg-bg">
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-surface ring-1 ring-line">
            <ShoppingBag className="h-7 w-7 text-ink/40" />
          </div>

          <h1 className="mt-6 font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
            Your cart is empty.
          </h1>

          <p className="mt-4 max-w-md text-lg leading-7 text-ink/60">
            Looks like you haven&apos;t added anything yet. Browse our menu and
            find something you&apos;ll enjoy.
          </p>

          <Link
            href="/order-now"
            className="
              mt-8 inline-flex items-center gap-2
              rounded-xl
              bg-ink
              px-6 py-3
              text-sm font-semibold
              text-white
              transition-colors
              hover:bg-pine
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember
            "
          >
            <ArrowLeft className="h-4 w-4" />
            Browse Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-24 lg:px-10">
        {/* Header */}
        <div className="border-b border-line pb-10">
          <h1 className="font-display text-4xl font-black tracking-tight text-ink sm:text-5xl md:text-6xl">
            Your order.
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-7 text-ink/60">
            Review your items and provide your delivery details.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-ink">
                Items
              </h2>

              <span className="text-sm text-ink/50">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="
                    overflow-hidden
                    rounded-xl
                    bg-surface
                    ring-1 ring-line
                  "
                >
                  <div className="flex gap-4 p-4">
                    {/* Image */}
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={96}
                      height={96}
                      className="
                        h-24 w-24 shrink-0
                        rounded-lg
                        object-cover
                        ring-1 ring-line
                      "
                    />

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-lg font-semibold text-ink">
                        {item.product.name}
                      </h3>

                      <p className="mt-1 text-sm text-ink/50 tabular-nums">
                        {formatINR(item.product.price)} each
                      </p>

                      <p className="mt-3 text-base font-bold text-ink tabular-nums">
                        {formatINR(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between border-t border-line px-4 py-3">
                    <div className="flex items-center gap-1 rounded-lg bg-bg p-1">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1,
                          )
                        }
                        aria-label="Decrease quantity"
                        className="
                          flex h-8 w-8 items-center justify-center
                          rounded-md
                          text-ink/60
                          transition-colors
                          hover:bg-surface
                          hover:text-ink
                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember
                        "
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <span className="w-8 text-center text-sm font-semibold text-ink">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1,
                          )
                        }
                        aria-label="Increase quantity"
                        className="
                          flex h-8 w-8 items-center justify-center
                          rounded-md
                          text-ink/60
                          transition-colors
                          hover:bg-surface
                          hover:text-ink
                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember
                        "
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.product.id)}
                      aria-label={`Remove ${item.product.name}`}
                      className="
                        flex h-9 w-9 items-center justify-center
                        rounded-lg
                        text-ink/40
                        transition-colors
                        hover:bg-danger/10
                        hover:text-danger
                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember
                      "
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =========================
              RIGHT — CHECKOUT
          ========================= */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div
              className="
                rounded-xl
                bg-surface
                p-6
                ring-1 ring-line
              "
            >
              <h2 className="font-display text-2xl font-bold text-ink">
                Order summary
              </h2>

              {/* Items summary */}
              <div className="mt-6 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-start justify-between gap-4 text-sm"
                  >
                    <span className="text-ink/60">
                      {item.product.name} × {item.quantity}
                    </span>

                    <span className="shrink-0 font-semibold text-ink tabular-nums">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-6 space-y-3 border-t border-line pt-5">
                <div className="flex justify-between text-sm">
                  <span className="text-ink/60">Subtotal</span>
                  <span className="font-semibold text-ink tabular-nums">
                    {formatINR(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-ink/60">GST (5%)</span>
                  <span className="font-semibold text-ink tabular-nums">
                    {formatINR(gstAmount)}
                  </span>
                </div>

                <div className="flex justify-between border-t border-line pt-3">
                  <span className="font-bold text-ink">Total</span>

                  <span className="font-display text-xl font-black text-ink tabular-nums">
                    {formatINR(totalWithGst)}
                  </span>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(handleOrder)}
                className="mt-8 space-y-5"
              >
                {/* Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-ink"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    {...register("name", {
                      required: "Full name is required",
                      minLength: {
                        value: 2,
                        message: "Please enter your full name",
                      },
                    })}
                    className="
                      w-full rounded-lg
                      bg-surface
                      px-4 py-3
                      text-sm text-ink
                      ring-1 ring-line
                      outline-none
                      placeholder:text-ink/30
                      transition-colors
                      focus:ring-2 focus:ring-leaf
                    "
                  />

                  {errors.name && (
                    <p className="text-xs font-medium text-danger">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-semibold text-ink"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="10-digit mobile number"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: "Enter a valid 10-digit phone number",
                      },
                    })}
                    className="
                      w-full rounded-lg
                      bg-surface
                      px-4 py-3
                      text-sm text-ink
                      ring-1 ring-line
                      outline-none
                      placeholder:text-ink/30
                      transition-colors
                      focus:ring-2 focus:ring-leaf
                    "
                  />

                  {errors.phone && (
                    <p className="text-xs font-medium text-danger">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-ink"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required for your receipt",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    className="
                      w-full rounded-lg
                      bg-surface
                      px-4 py-3
                      text-sm text-ink
                      ring-1 ring-line
                      outline-none
                      placeholder:text-ink/30
                      transition-colors
                      focus:ring-2 focus:ring-leaf
                    "
                  />

                  <p className="text-xs text-ink/50">
                    Your receipt and order updates will be sent here.
                  </p>

                  {errors.email && (
                    <p className="text-xs font-medium text-danger">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label
                    htmlFor="address"
                    className="text-sm font-semibold text-ink"
                  >
                    Delivery Address
                  </label>

                  <textarea
                    id="address"
                    rows={3}
                    placeholder="House / flat, street, area"
                    {...register("address", {
                      required: "Delivery address is required",
                    })}
                    className="
                      w-full resize-none rounded-lg
                      bg-surface
                      px-4 py-3
                      text-sm text-ink
                      ring-1 ring-line
                      outline-none
                      placeholder:text-ink/30
                      transition-colors
                      focus:ring-2 focus:ring-leaf
                    "
                  />

                  {errors.address && (
                    <p className="text-xs font-medium text-danger">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* Pincode */}
                <div className="space-y-2">
                  <label
                    htmlFor="pincode"
                    className="text-sm font-semibold text-ink"
                  >
                    Pincode
                  </label>

                  <input
                    id="pincode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="560001"
                    {...register("pincode", {
                      required: "Pincode is required",
                      pattern: {
                        value: /^\d{6}$/,
                        message: "Enter a valid 6-digit pincode",
                      },
                    })}
                    className="
                      w-full rounded-lg
                      bg-surface
                      px-4 py-3
                      text-sm text-ink
                      ring-1 ring-line
                      outline-none
                      placeholder:text-ink/30
                      transition-colors
                      focus:ring-2 focus:ring-leaf
                    "
                  />

                  {errors.pincode && (
                    <p className="text-xs font-medium text-danger">
                      {errors.pincode.message}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-semibold text-ink">
                      Pin Your Location
                    </label>

                    <p className="mt-1 text-xs text-ink/50">
                      Help our delivery partner find you precisely.
                    </p>
                  </div>

                  <Controller
                    name="location"
                    control={control}
                    rules={{
                      validate: (value) =>
                        value
                          ? true
                          : "Please pin your delivery location",
                    }}
                    render={({ field }) => (
                      <LocationPicker
                        value={
                          field.value
                            ? {
                              lat: field.value.lat,
                              lng: field.value.lng,
                            }
                            : null
                        }
                        onChange={(lat, lng) => {
                          field.onChange({
                            lat,
                            lng,
                          });
                        }}
                      />
                    )}
                  />

                  {errors.location && (
                    <p className="text-xs font-medium text-danger">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <label
                    htmlFor="notes"
                    className="text-sm font-semibold text-ink"
                  >
                    Order Notes
                  </label>

                  <textarea
                    id="notes"
                    rows={3}
                    placeholder="Any special instructions? (Optional)"
                    {...register("notes")}
                    className="
                      w-full resize-none rounded-lg
                      bg-surface
                      px-4 py-3
                      text-sm text-ink
                      ring-1 ring-line
                      outline-none
                      placeholder:text-ink/30
                      transition-colors
                      focus:ring-2 focus:ring-leaf
                    "
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="
                    flex w-full items-center justify-center
                    rounded-lg
                    bg-ink
                    px-6 py-3.5
                    text-sm font-semibold
                    text-white
                    transition-colors duration-200
                    hover:bg-pine
                    active:translate-y-px
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember
                  "
                >
                  Continue to Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
