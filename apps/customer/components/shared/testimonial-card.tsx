import React from "react";
import { Quote } from "lucide-react";
import { Testimonial } from "@/lib/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="group h-full w-full rounded-[28px] border-2 border-[#0D530E] bg-[#FBF5DD] p-6 transition-all duration-300 ">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#0D530E] bg-[#E7E1B1] shadow-[4px_4px_0px_#0D530E]">
        <Quote className="h-7 w-7 text-[#0D530E]" />
      </div>

      <p className="mb-8 text-xl leading-relaxed text-[#0D530E] italic">
        "{testimonial.review}"
      </p>

      <div className="flex items-center gap-4 border-t-2 border-[#0D530E] pt-6">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          loading="lazy"
          className="h-16 w-16 rounded-full border-2 border-[#0D530E] object-cover"
        />

        <h4 className="text-xl font-black text-[#0D530E]">{testimonial.name}</h4>
      </div>
    </div>
  );
}
