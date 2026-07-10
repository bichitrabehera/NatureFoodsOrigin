import React from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { ProductCard } from "@/components/shared/product-card";
import { products } from "@/lib/webdata/products";

export function FeaturedMenu() {
  return (
    <section id="menu" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <SectionHeading
          title="Our Signature Dishes"
          subtitle="Handpicked favorites crafted with the freshest ingredients — each dish a celebration of natural flavors."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-20">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
