import React from "react";
import { ProductCard } from "@/components/shared/product-card";
import { products } from "@/lib/webdata/products";

export function FeaturedMenu() {
  return (
    <section id="menu" className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-4xl font-black tracking-tight text-ink sm:text-5xl md:text-6xl">
            Made fresh.
            <br />
            Made for you.
          </h2>

          <p className="max-w-md text-ink/60">
            Handpicked favorites crafted with fresh ingredients and honest
            flavors. Simple food, made with care.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
