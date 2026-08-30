import React from "react";
import { ProductCard } from "@/components/shared/product-card";
import { products } from "@/lib/webdata/products";

export function FeaturedMenu() {
  return (
    <section id="menu" className="bg-bg font-display">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-24 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-6  pb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-ink/40">
              Our Menu
            </span>

            <h2 className="mt-4 font-display text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
              Made fresh.
              <br />
              Made for you.
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-ink/60 md:pb-1 md:text-lg">
            Handpicked favorites crafted with fresh ingredients and honest
            flavors. Simple food, made with care.
          </p>
        </div>

        {/* Products */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
