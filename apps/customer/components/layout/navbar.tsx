"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "@/lib/context/cart-context";

const navLinks = [
  { label: "Home", href: "/" },
  // { label: "Menu", href: "/#menu" },
  { label: "Order Now", href: "/order-now" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const { itemCount } = useCart();

  useEffect(() => {
    if (mobileOpen) {
      firstLinkRef.current?.focus();
    }
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="bg-pine font-display">
      <div className="mx-auto max-w-7xl px-6 py-3 sm:px-8 lg:px-10">


        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
          >
            <span className="text-2xl font-bold text-white">
              Nature Food Origin
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-semibold text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/your-cart"
              className="relative rounded-2xl p-2 text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-sun text-xs font-bold text-ink">
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

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-2xl text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

      </div>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="border-t border-white/15 bg-pine md:hidden"
        >
          <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-10">
            <nav className="flex flex-col">
              {navLinks.map((link, index) =>
              (
                <Link
                  key={link.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={closeMobile}
                  className="flex py-3 items-center border-white/10 text-3xl font-bold text-white transition-colors hover:text-ember focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
                >
                  {link.label}
                </Link>
              )
              )}
             
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
