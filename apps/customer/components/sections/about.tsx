import React from "react";
import { SectionHeading } from "@/components/sections/section-heading";

export function About() {
  return (
    <section className="bg-bg font-display">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-24 lg:px-10">
        {/* Intro */}
        <div className="max-w-4xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-ink/50">
            Our Story
          </span>

          <h2 className="mt-5 max-w-3xl font-display text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Every great meal begins with a story.
          </h2>
        </div>

        {/* Story */}
        <div className="mt-16 grid gap-10  pt-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-ink/40">
              Where it began
            </p>
          </div>

          <div className="space-y-7">
            <p className="text-xl leading-relaxed text-ink/75 md:text-2xl">
              Nature Food Origin began in the heart of{" "}
              <strong className="font-semibold text-ink">Bengaluru</strong>,
              where every meal was prepared with one simple promise—to serve
              fresh, honest food that people could trust.
            </p>

            <p className="text-xl leading-relaxed text-ink/75 md:text-2xl">
              What started as a small kitchen serving families, students, and
              workers quickly became a place where customers returned not just
              for the taste, but for the{" "}
              <strong className="font-semibold text-ink">
                care in every meal.
              </strong>
            </p>

            <p className="text-xl leading-relaxed text-ink/75 md:text-2xl">
              As our community grew, so did our dream. To serve more people
              without compromising quality, we built a modern{" "}
              <strong className="font-semibold text-ink">
                cloud kitchen
              </strong>
              , combining traditional recipes with efficient preparation and
              fast delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
