"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/context/cart-context";
import { formatINR } from "@/lib/utils/format";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const router = useRouter();

  return (
    <div
      className="
        group relative w-full overflow-hidden
        rounded-xl
        bg-white

        shadow-sm shadow-black/10
        transition-all duration-300
        hover:shadow-md hover:shadow-black/10
        hover:ring-black/15
      "
    >
      {/* Image */}
      <div className="relative aspect-[4/3] m-4 rounded-lg overflow-hidden bg-neutral-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="
            object-cover
            transition-transform duration-500
            group-hover:scale-[1]
          "
        />


      </div>

      {/* Content */}
      <div className="p-6">
        <div className="pr-2">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
              {product.name}
            </h3>
            <span className="shrink-0 text-sm font-semibold text-ink">
              {formatINR(product.price)}
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            {product.description}
          </p>
        </div>

        <Button
          variant="primary"
          className="
            mt-6 w-full
            rounded-lg
            transition-transform
            active:scale-[0.98]
          "
          onClick={() => {
            addItem(product);
            router.push("/your-cart");
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
