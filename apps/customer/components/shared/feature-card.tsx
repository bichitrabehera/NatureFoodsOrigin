import React from "react";
import { Leaf, Truck, ShieldCheck, Star } from "lucide-react";
import { Feature } from "@/lib/types";

const iconMap: Record<string, React.ElementType> = {
  Leaf,
  Truck,
  ShieldCheck,
  Star,
};

const cardTilts = ["-rotate-2", "rotate-2", "-rotate-1", "rotate-3"];

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = iconMap[feature.icon] || Leaf;
  const tilt = cardTilts[index % cardTilts.length];

  return (
    <div
      className={`rounded-xl border border-neutral-200 bg-[#FBF5DD] p-4 transition-all duration-300 hover:-translate-y-2 hover:rotate-0 `}
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#0D530E] bg-[#E7E1B1] shadow-[2px_2px_0px_#0D530E] transition-all duration-300 group-hover:scale-110">
        <Icon className="h-6 w-6 text-[#0D530E]" strokeWidth={2.5} />
      </div>

      <h3 className="mb-4 text-3xl font-black text-[#0D530E]">{feature.title}</h3>

      <p className="text-lg leading-relaxed text-[#0D530E]">
        {feature.description}
      </p>
    </div>
  );
}
