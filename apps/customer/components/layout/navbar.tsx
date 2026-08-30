"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "@/lib/context/cart-context";



export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();

  const mobileLinkClass =
    "text-3xl font-bold text-white uppercase transition-colors hover:text-ember focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember";

  return (
    <>
      <nav
        className={`sticky top-0 z-50  bg-green-800 transition-all duration-300 font-display`}
      >
        <div className="mx-auto flex items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
          >
            <span className=" text-2xl font-bold text-white">
              Nature Food Origin
            </span>
          </Link>



          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/your-cart"
              className="relative rounded-full border border-white/20 px-4 py-2 font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-sun text-xs font-bold text-ink">
                  {itemCount}
                </span>
              )}
            </Link>
            <Button variant="primary" size="md">
              <Link
                href="/order-now"
                className="flex items-center gap-2"
              >
                Order Now
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="/your-cart"
              aria-label="View cart"
              className="relative rounded-2xl p-2 text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-sun text-xs font-bold text-ink">
                  {itemCount}
                </span>
              )}
            </Link>


          </div>
        </div>
      </nav>


    </>
  );
}
