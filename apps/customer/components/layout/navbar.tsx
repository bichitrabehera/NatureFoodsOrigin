"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "@/lib/context/cart-context";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="top-0 right-0 left-0 z-50 bg-[#306D29] text-2xl transition-all duration-300">
        <div className="mx-auto px-6 py-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="text-3xl font-bold text-[#E7E1B1] md:text-5xl">
                NFO
              </span>
            </Link>

            <div className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-full bg-[#0D530E] px-3 py-2 font-bold text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/your-cart"
                className="relative flex items-center gap-2 rounded-full bg-[#0D530E] px-4 py-2 font-bold text-white transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                Cart
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#E7E1B1] text-xs font-bold text-[#0D530E]">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>

            <div className="hidden items-center justify-center gap-1 md:flex">
              <Button variant="primary" size="md">
                <Link href="/order-now" className="flex items-center gap-2">
                  Order Now
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 md:hidden">
              <Link href="/your-cart" className="relative text-white">
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-[#0D530E]">
                    {itemCount}
                  </span>
                )}
              </Link>

              <div
                onClick={() => setMobileOpen(!mobileOpen)}
                className="cursor-pointer"
              >
                {mobileOpen ? (
                  <Button variant="primary" size="md">
                    Close
                  </Button>
                ) : (
                  <Button variant="primary" size="md">
                    Menu
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-[60] bg-[#306D29] md:hidden">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between px-6 py-8">
                <span className="text-3xl font-bold text-[#E7E1B1]">
                  <Link href="/">NFO</Link>
                </span>

                <button onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" size="md">
                    Close
                  </Button>
                </button>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-4xl font-bold text-white uppercase"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/your-cart"
                  onClick={() => setMobileOpen(false)}
                  className="text-4xl font-bold text-white uppercase"
                >
                  Cart {itemCount > 0 ? `(${itemCount})` : ""}
                </Link>
                <Link
                  href="/order-now"
                  onClick={() => setMobileOpen(false)}
                  className="text-4xl font-bold text-black uppercase bg-white/70 px-6 py-3 rounded-2xl transition-colors hover:bg-white/20"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
