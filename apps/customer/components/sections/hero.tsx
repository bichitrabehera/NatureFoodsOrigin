"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="overflow-hidden bg-pine text-white pt-16 pb-20 md:pt-24 md:pb-28">
      <motion.div
        className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 grid items-center gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div>
          <h1 className="font-display text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
            Good food, straight from nature.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
            Wholesome meals crafted with fresh, locally sourced ingredients and
            prepared daily with care.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button variant="primary" size="lg">
              <Link href="/order-now">Order Now</Link>
            </Button>
            <Link
              href="/#menu"
              className="text-white/80 underline decoration-ember decoration-2 underline-offset-8 hover:text-white font-semibold"
            >
              Browse the menu
            </Link>
          </div>
        </div>

        <div className="lg:pl-12 lg:border-l lg:border-white/15">
          <Image
            src="/images/hero.png"
            alt="Fresh, wholesome meal from Nature Food Origin"
            width={700}
            height={700}
            priority
            className="w-full h-auto rounded-2xl "
          />
        </div>
      </motion.div>
    </section>
  );
}
