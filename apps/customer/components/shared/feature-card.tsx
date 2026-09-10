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
  emphasis?: boolean;
}

export function FeatureCard({ feature, emphasis = false }: FeatureCardProps) {
  const Icon = iconMap[feature.icon] || Leaf;

  const titleWords = feature.title.split(" ");
  const accentWord = titleWords[0];
  const restWords = titleWords.slice(1).join(" ");

  return (
    <div
      className={`h-full rounded-2xl bg-surface ring-1 ring-line transition-colors hover:ring-leaf ${
        emphasis ? "p-8 md:p-10" : "p-6 md:p-7"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-leaf" strokeWidth={2.5} />
        <h3
          className={`font-display font-black text-ink ${
            emphasis ? "text-3xl md:text-4xl" : "text-xl"
          }`}
        >
          <span className="text-ember">{accentWord}</span>
          {restWords ? ` ${restWords}` : ""}
        </h3>
      </div>

      <p className="mt-3 text-ink/70 leading-relaxed">{feature.description}</p>
    </div>
  );
}
