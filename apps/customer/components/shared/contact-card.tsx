import React from "react";
import { LucideIcon } from "lucide-react";

interface ContactCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function ContactCard({ icon: Icon, label, value }: ContactCardProps) {
  return (
    <div className="group rounded-[28px] border-2 border-[#0D530E] bg-[#FBF5DD] p-6 transition-all duration-300">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#0D530E] bg-[#E7E1B1]">
        <Icon className="h-7 w-7 text-[#0D530E]" />
      </div>
      <p className="mb-1 text-sm font-semibold tracking-wide text-[#0D530E] uppercase">
        {label}
      </p>
      <p className="overflow-hidden text-lg leading-relaxed font-bold break-words text-[#0D530E]">
        {value}
      </p>{" "}
    </div>
  );
}
