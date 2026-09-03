"use client";

import { load, type Map as MapKitMap } from "@apple/mapkit-loader";
import { useEffect, useRef, useState } from "react";

export type MapPin = {
  id: string;
  title: string;
  subtitle?: string;
  latitude: number;
  longitude: number;
};

/**
 * Renders shared places on an Apple map.
 *
 * Loaded through `@apple/mapkit-loader`, Apple's official loader, which pulls
 * MapKit JS 6 from Apple's CDN and resolves once the requested libraries are
 * ready. (This replaces `react-mapkit`, which was abandoned in 2022 and never
 * supported React 18+.)
 *
 * The token is minted server-side per request and passed in as a prop, so there
 * is no public token endpoint and no extra round trip before the map draws.
 */
export function InviteMap({ token, pins }: { token: string; pins: MapPin[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  // `pins` is a fresh array on every render, which would re-run the effect and
  // rebuild the map. Depending on its serialized form keeps that stable.
  const pinsKey = JSON.stringify(pins);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mapPins = JSON.parse(pinsKey) as MapPin[];
    let map: MapKitMap | undefined;
    let cancelled = false;

    load({ token, libraries: ["map", "annotations"] })
      .then((mapkit) => {
        // Strict Mode mounts effects twice in development; bail if the cleanup
        // already ran so we never leave an orphaned map behind.
        if (cancelled) return;

        map = new mapkit.Map(container, {
          colorScheme: mapkit.ColorScheme.Dark,
          showsMapTypeControl: false,
          showsCompass: mapkit.FeatureVisibility.Hidden,
          showsScale: mapkit.FeatureVisibility.Hidden,
          isRotationEnabled: false,
        });

        const annotations = mapPins.map(
          (pin) =>
            new mapkit.MarkerAnnotation(
              new mapkit.Coordinate(pin.latitude, pin.longitude),
              {
                title: pin.title,
                subtitle: pin.subtitle,
                color: "#2ee6a8",
                glyphColor: "#05021c",
              },
            ),
        );

        if (annotations.length === 0) return;

        map.showItems(annotations, {
          animate: false,
          padding: new mapkit.Padding({
            top: 56,
            right: 56,
            bottom: 56,
            left: 56,
          }),
          // Without a floor, a single pin zooms to maximum and loses all context.
          minimumSpan: new mapkit.CoordinateSpan(0.008, 0.008),
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      map?.destroy();
    };
  }, [token, pinsKey]);

  if (failed) {
    return (
      <div className="surface map-frame flex h-full w-full items-center justify-center rounded-2xl p-6 text-center text-sm text-muted">
        The map could not be loaded. The place details below are still accurate.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="application"
      aria-label="Map of the shared places"
      className="map-frame h-full w-full overflow-hidden rounded-2xl border border-white/10"
    />
  );
}
