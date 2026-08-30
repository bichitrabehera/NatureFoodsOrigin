import React from "react";
import { Leaf, Truck, ShieldCheck, Star } from "lucide-react";
import { Feature } from "@/lib/types";

const iconMap: Record<string, React.ElementType> = {
  Leaf,
  Truck,
  ShieldCheck,
  Star,
};

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = iconMap[feature.icon] || Leaf;

  return (
    <div className="  bg-surface p-6 transition-colors">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf/15">
        <Icon className="h-6 w-6 text-leaf" strokeWidth={2.5} />
      </div>

      <h3 className="font-display mb-4 text-2xl font-black text-ink">
        {feature.title}
      </h3>

      <p className="text-lg leading-relaxed text-ink/70">
        {feature.description}
      </p>
    </div>
  );
}
