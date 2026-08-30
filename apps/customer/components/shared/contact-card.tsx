import React from "react";
import { LucideIcon } from "lucide-react";

interface ContactCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function ContactCard({ icon: Icon, label, value }: ContactCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf/15">
        <Icon className="h-7 w-7 text-leaf" />
      </div>
      <p className="mb-1 text-sm font-semibold tracking-wide text-ink/60 uppercase">
        {label}
      </p>
      <p className="text-lg leading-relaxed font-bold text-ink whitespace-pre-line break-words">
        {value}
      </p>
    </div>
  );
}