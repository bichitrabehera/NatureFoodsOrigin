
"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { testimonials } from "@/lib/webdata/testimonials";

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const card = scrollRef.current.children[0];

    const cardWidth = card
      ? (card as HTMLElement).getBoundingClientRect().width + 24
      : 420;

    scrollRef.current.scrollBy({
      left: direction === "right" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-bg font-display">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-24 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-8 pb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-ink/40">
              From our customers
            </span>

            <h2 className="mt-4 font-display text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
              Good food speaks
              <br />
              for itself.
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous testimonials"
              className="
                flex h-10 w-10 items-center justify-center
                rounded-lg
                bg-surface
                text-ink
                ring-1 ring-black/10
                shadow-sm shadow-black/5
                transition-all duration-200
                hover:bg-ink hover:text-white
                active:scale-95
              "
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next testimonials"
              className="
                flex h-10 w-10 items-center justify-center
                rounded-lg
                bg-surface
                text-ink
                ring-1 ring-black/10
                shadow-sm shadow-black/5
                transition-all duration-200
                hover:bg-ink hover:text-white
                active:scale-95
              "
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Testimonials */}
        <div
          ref={scrollRef}
          className="
            scrollbar-hide
            -mx-6 mt-10 flex gap-6
            overflow-x-auto px-6 pb-4
            snap-x snap-mandatory
            scroll-smooth
            sm:-mx-8 sm:px-8
            lg:-mx-10 lg:px-10
          "
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="
                w-[85%] shrink-0 snap-start
                sm:w-[440px]
                lg:w-[420px]
              "
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
