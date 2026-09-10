"use client";

import dynamic from "next/dynamic";

const LocationPickerInner = dynamic(
  () => import("./location-picker-inner"),
  {
    ssr: false, loading: () => (
      <div className="flex h-64 w-full items-center justify-center rounded-xl border border-line bg-surface">
        <p className="text-sm text-ink/70">Loading Bangalore map...</p>
      </div>
    )
  },
);

export default function LocationPicker(props: {
  value?: { lat: string; lng: string } | null;
  onChange: (lat: string, lng: string) => void;
}) {
  return <LocationPickerInner {...props} />;
}
