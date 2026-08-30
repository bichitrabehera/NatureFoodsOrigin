"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="overflow-hidden bg-green-800 pt-10 pb-20 md:min-h-screen font-display">
      <div className="mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          <h1 className="font-display inline-block pb-4 text-5xl leading-none font-bold text-white sm:text-6xl md:pb-6 md:text-7xl">
            Nature Food
            <br />
            Origin
          </h1>

          {/* CTA */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.25,
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            <Button variant="primary" size="lg">
              <Link href="/order-now" className="flex items-center gap-2">
                Order Now
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Hero Content */}
        <div className="mx-auto mt-16 flex max-w-6xl flex-col-reverse items-center gap-12 lg:mt-12 lg:flex-row-reverse lg:gap-20">
          {/* Description */}
          <motion.div
            className="flex flex-1 items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            <p className="max-w-2xl text-center text-xl leading-relaxed text-white/80 md:text-4xl md:leading-11">
              Discover wholesome meals crafted with fresh, locally sourced
              ingredients and prepared daily with care. From nourishing bowls to
              refreshing juices, every bite celebrates the goodness of nature
              while delivering exceptional taste.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            className="flex flex-1 justify-center"
            initial={{
              opacity: 0,
              scale: 0.8,
              rotate: -5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              delay: 0.35,
              duration: 0.9,
              ease: "easeOut",
            }}
          >
            <Image
              src="/images/hero.png"
              alt="Nature Food"
              width={700}
              height={700}
              priority
              className="h-auto w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
