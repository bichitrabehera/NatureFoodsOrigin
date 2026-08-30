import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Testimonial } from "@/lib/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div
      className="
        group flex h-full w-full flex-col
        rounded-xl
        bg-surface
        p-6
        ring-1 ring-black/10
        shadow-sm shadow-black/5
        transition-all duration-300
        hover:-translate-y-0.5
        hover:shadow-md hover:shadow-black/10
      "
    >
      {/* Rating */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-sun text-sun"
          />
        ))}
      </div>

      {/* Review */}
      <div className="flex-1 py-8">
        <span className="font-display text-5xl leading-none text-ink/15">
          “
        </span>

        <p className="mt-2 text-lg leading-8 text-ink/75">
          {testimonial.review}
        </p>
      </div>

      {/* Customer */}
      <div className="flex items-center gap-3 border-t border-line pt-5">
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={44}
          height={44}
          className="
            h-11 w-11 rounded-lg
            object-cover
            ring-1 ring-black/10
          "
        />

        <div>
          <h4 className="text-sm font-semibold text-ink">
            {testimonial.name}
          </h4>

          <p className="mt-0.5 text-xs text-ink/50">
            Verified customer
          </p>
        </div>
      </div>
    </div>
  );
}
