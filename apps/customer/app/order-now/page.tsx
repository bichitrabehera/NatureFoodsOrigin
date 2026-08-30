
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import { products, categories } from "@/lib/webdata/products";
import { useCart } from "@/lib/context/cart-context";
import { formatINR } from "@/lib/utils/format";

export default function OrderNowPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { addItem, items } = useCart();

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const getItemQuantity = (productId: string) =>
    items.find((item) => item.product.id === productId)?.quantity ?? 0;

  return (
    <section className="min-h-screen bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-24 lg:px-10">
        {/* Header */}
        <div className="border-b border-line pb-10">
          <span className="text-sm font-semibold uppercase tracking-widest text-ink/40">
            Fresh from our kitchen
          </span>

          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
              Choose your
              <br />
              next meal.
            </h1>

            <p className="max-w-md text-base leading-7 text-ink/60 md:text-lg">
              Fresh, handcrafted meals made with carefully selected ingredients
              and delivered straight to you.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={active}
                className={`
                  shrink-0 rounded-lg px-4 py-2
                  text-sm font-semibold capitalize
                  transition-all duration-200
                  ${active
                    ? "bg-ink text-white shadow-sm"
                    : "bg-surface text-ink/60 ring-1 ring-black/10 hover:text-ink"
                  }
                `}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => {
            const qty = getItemQuantity(product.id);

            return (
              <article
                key={product.id}
                className="
                  group overflow-hidden
                  rounded-xl
                  bg-surface
                  ring-1 ring-black/10
                  shadow-sm shadow-black/5
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:shadow-md hover:shadow-black/10
                "
              >
                {/* Image */}
                <div className="relative aspect-[4/3] m-3 rounded-lg overflow-hidden bg-neutral-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="
                      object-cover
                      transition-transform duration-500
                    "
                  />

                  {/* Cart Quantity */}
                  {qty > 0 && (
                    <div
                      className="
                        absolute right-4 top-4
                        rounded-lg
                        bg-white
                        px-3 py-2
                        text-xs font-semibold
                        text-ink
                        shadow-sm shadow-black/10
                        ring-1 ring-black/10
                      "
                    >
                      {qty} in cart
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                      {product.name}
                    </h2>

                    <span className="shrink-0 text-sm font-semibold text-ink">
                      {formatINR(product.price)}
                    </span>
                  </div>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-ink/60">
                    {product.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => addItem(product)}
                    className="
                      mt-6 flex w-full items-center justify-center gap-2
                      rounded-lg
                      bg-ink
                      px-4 py-3
                      text-sm font-semibold
                      text-white
                      transition-all duration-200
                      hover:-translate-y-0.5
                      hover:shadow-md
                      active:translate-y-0
                      active:scale-[0.98]
                    "
                  >
                    <ShoppingCart className="h-4 w-4" />

                    {qty > 0 ? "Add Another" : "Add to Cart"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-10 rounded-xl bg-surface p-12 text-center ring-1 ring-black/10">
            <p className="text-lg font-semibold text-ink">
              No dishes found.
            </p>

            <p className="mt-2 text-sm text-ink/50">
              Try selecting another category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
