import React from "react";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-neutral-200 bg-[#FBF5DD] transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-4/2.5 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500"
        />

        {/* Price Badge */}
        <div className="absolute top-4 right-4 rounded-xl border border-neutral-200 bg-[#E7E1B1] px-5 py-2 font-black text-[#000000] shadow-[4px_4px_0px_#0D530E]">
          Rs {product.price}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 p-6">
        <div>
          <h3 className="text-3xl font-black text-[#000000]">{product.name}</h3>

          <p className="mt-3 text-xl text-lg leading-relaxed text-[#000000]">
            {product.description}
          </p>
        </div>

        <Button
          variant="primary"
          className="w-full rounded-xl border text-black border-[#0D530E] text-2xl font-bold shadow-[4px_4px_0px_#0D530E] transition-all"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
