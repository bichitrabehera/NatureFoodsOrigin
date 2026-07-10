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
      className={`group ${tilt} rounded-[28px] border-2 border-[#0D530E] bg-[#FBF5DD] p-6 transition-all duration-300 hover:-translate-y-2 hover:rotate-0 `}
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-[#0D530E] bg-[#E7E1B1] shadow-[2px_2px_0px_#0D530E] transition-all duration-300 group-hover:scale-110">
        <Icon className="h-10 w-10 text-[#0D530E]" strokeWidth={2.5} />
      </div>

      <h3 className="mb-4 text-3xl font-black text-[#0D530E]">{feature.title}</h3>

      <p className="text-lg leading-relaxed text-[#0D530E]">
        {feature.description}
      </p>
    </div>
  );
}
