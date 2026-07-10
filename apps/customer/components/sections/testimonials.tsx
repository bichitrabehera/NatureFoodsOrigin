"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const cardWidth = 420;

    scrollRef.current.scrollBy({
      left: direction === "right" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-center">
          <SectionHeading
            title="What Our Customers Say"
            subtitle="Hear from the people who eat with us every day."
          />

          <div className="flex items-center gap-4 self-center lg:self-auto">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous testimonials"
              className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#0D530E] bg-[#E7E1B1] shadow-[4px_4px_0px_#0D530E] transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[2px] hover:shadow-none active:scale-95"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={() => scroll("right")}
              aria-label="Next testimonials"
              className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#0D530E] bg-[#E7E1B1] shadow-[4px_4px_0px_#0D530E] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:scale-95"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth pb-4"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-[90%] shrink-0 snap-start sm:w-[500px] lg:w-[420px]"
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
