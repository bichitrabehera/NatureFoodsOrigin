"use client";

import React, { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { products, categories } from "@/lib/webdata/products";
import { useCart } from "@/lib/context/cart-context";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/section-heading";

export default function OrderNowPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { addItem, items } = useCart();

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const getItemQuantity = (productId: string) =>
    items.find((i) => i.product.id === productId)?.quantity || 0;

  return (
    <section className="bg-background min-h-screen py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <SectionHeading
          title="Order Now"
          subtitle="Choose from our menu of fresh, handcrafted meals."
        />

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-6 py-2 text-lg font-bold capitalize transition-all ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "bg-[#E7E1B1] text-[#0D530E] hover:bg-primary hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => {
            const qty = getItemQuantity(product.id);
            return (
              <div
                key={product.id}
                className="group overflow-hidden rounded-2xl border-2 border-[#0D530E] bg-[#FBF5DD] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {qty > 0 && (
                    <div className="absolute top-4 right-4 rounded-full bg-primary px-3 py-1 text-sm font-bold text-white">
                      {qty} in cart
                    </div>
                  )}
                </div>

                <div className="space-y-4 p-6">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="text-2xl font-black text-[#0D530E]">
                        {product.name}
                      </h3>
                      <span className="text-xl font-bold text-primary">
                        Rs {product.price}
                      </span>
                    </div>
                    <p className="mt-2 text-base leading-relaxed text-[#0D530E]/70">
                      {product.description}
                    </p>
                  </div>

                  <button
                    onClick={() => addItem(product)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#0D530E] bg-primary px-4 py-3 text-lg font-bold text-white shadow-[3px_3px_0px_#0D530E] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {qty > 0 ? "Add Another" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
