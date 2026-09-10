import React from "react";
import { FeatureCard } from "@/components/shared/feature-card";
import { features } from "@/lib/webdata/features";

export function WhyChooseUs() {

  return (
    <section className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-4xl font-black tracking-tight text-ink sm:text-5xl md:text-6xl">
            Good food.
            <br />
            No compromises.
          </h2>

          <p className="max-w-md text-ink/60">
            More than just food. Everything we do is built around quality,
            freshness, and the people we serve.
          </p>
        </div>

        <div className="">


          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-4">
            {features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
