import React from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { FeatureCard } from "@/components/shared/feature-card";
import { features } from "@/lib/webdata/features";

export function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <SectionHeading
          title="Why Choose Us"
          subtitle="We are committed to delivering more than just food — it's an experience rooted in quality and care."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
