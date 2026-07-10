import { useEffect, useRef, useCallback, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DEFAULT_CENTER: [number, number] = [12.9716, 77.5946];
const DEFAULT_ZOOM = 12;
const MARKER_ZOOM = 15;

function getIcon() {
  return new L.DivIcon({
    html: `
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 1px 3px rgba(0,0,0,0.4))">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#16a34a"/>
        <circle cx="12" cy="9" r="3" fill="white"/>
      </svg>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

export default function LocationPickerInner({
  value,
  onChange,
}: {
  value?: { lat: string; lng: string } | null;
  onChange: (lat: string, lng: string) => void;
}) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [detecting, setDetecting] = useState(false);

  const placeMarker = useCallback(
    (lat: number, lng: number) => {
      if (!mapRef.current) return;
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng], {
          icon: getIcon(),
          draggable: true,
        }).addTo(mapRef.current);
        markerRef.current.on("dragend", () => {
          const pos = markerRef.current!.getLatLng();
          onChange(pos.lat.toFixed(7), pos.lng.toFixed(7));
        });
      }
      mapRef.current.setView([lat, lng], MARKER_ZOOM, { animate: true });
      onChange(lat.toFixed(7), lng.toFixed(7));
    },
    [onChange],
  );

  const detectLocation = () => {
    if (!navigator.geolocation) return;
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        placeMarker(pos.coords.latitude, pos.coords.longitude);
        setDetecting(false);
      },
      () => {
        setDetecting(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  useEffect(() => {
    if (containerRef.current && !mapRef.current) {
      const map = L.map(containerRef.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      map.on("click", (e: L.LeafletMouseEvent) => {
        placeMarker(e.latlng.lat, e.latlng.lng);
      });

      map.invalidateSize();
      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [placeMarker]);

  useEffect(() => {
    if (value?.lat && value?.lng && mapRef.current && !markerRef.current) {
      const lat = Number(value.lat);
      const lng = Number(value.lng);
      if (!isNaN(lat) && !isNaN(lng)) {
        markerRef.current = L.marker([lat, lng], {
          icon: getIcon(),
          draggable: true,
        }).addTo(mapRef.current);
        markerRef.current.on("dragend", () => {
          const pos = markerRef.current!.getLatLng();
          onChange(pos.lat.toFixed(7), pos.lng.toFixed(7));
        });
        mapRef.current.setView([lat, lng], MARKER_ZOOM);
      }
    }
  }, [value, onChange]);

  return (
    <div>
      <button
        type="button"
        onClick={detectLocation}
        disabled={detecting}
        className="mb-2 flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </svg>
        {detecting ? "Detecting..." : "Detect my location"}
      </button>
      <div
        ref={containerRef}
        className="h-64 w-full rounded-xl border border-gray-300"
      />
      <p className="mt-1 text-xs text-gray-500">
        Click the map to pin your delivery location * — drag to adjust
      </p>
    </div>
  );
}
