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
    <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-line transition-colors hover:ring-leaf">
      <div className="relative aspect-5/4 m-3 rounded-xl overflow-hidden bg-mist">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center gap-4">
          <h3 className="font-display text-lg font-bold tracking-tight text-ink">
            {product.name}
          </h3>
          <span className="shrink-0 text-sm font-bold text-ink tabular-nums">
            {formatINR(product.price)}
          </span>
        </div>

        <p className="mt-2 text-sm leading-6 text-ink/60">
          {product.description}
        </p>

        <Button
          variant="primary"
          className="mt-6 w-full rounded-xl"
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
