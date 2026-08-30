import React from "react";
import { FeatureCard } from "@/components/shared/feature-card";
import { features } from "@/lib/webdata/features";

export function WhyChooseUs() {
  return (
    <section className="bg-bg font-display">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-24 lg:px-10">
        {/* Header */}
        <div className="grid gap-6 e pb-10 md:grid-cols-[1fr_0.7fr] md:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-ink/40">
              Why us
            </span>

            <h2 className="mt-4 max-w-2xl font-display text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
              Good food.
              <br />
              No compromises.
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-ink/60 md:text-lg">
            More than just food. Everything we do is built around quality,
            freshness, and the people we serve.
          </p>
        </div>

        {/* Features */}
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={feature.id} className="bg-surface">
              <FeatureCard feature={feature} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
