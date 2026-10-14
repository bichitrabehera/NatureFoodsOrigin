import React from "react";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/webdata/testimonials";

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return (first + last).toUpperCase();
}

export function Testimonials() {
  return (
    <section className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-4xl font-black tracking-tight text-ink sm:text-5xl md:text-6xl">
            Good food speaks
            <br />
            for itself.
          </h2>

          <p className="max-w-md text-ink/60">
            Real words from the people we serve every day.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="border-l-2 border-pine pl-6 md:pl-8"
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-sun text-sun" />
                ))}
              </div>

              <p className="mt-3 font-display text-xl font-bold leading-snug text-ink md:text-3xl">
                {testimonial.review}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pine text-sm font-bold text-white">
                  {initialsOf(testimonial.name)}
                </div>
                <span className="font-bold text-ink">{testimonial.name}</span>
                <span className="text-ink/60">·</span>
                <span className="text-ink/60">Bengaluru</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
