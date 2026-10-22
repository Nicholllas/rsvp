"use client";

import { useEffect, useRef } from "react";

import { usePhotoSwap, type PhotoEntry } from "@/components/layout/split-layout";

/**
 * Hook that swaps the sticky photo when a section enters the center of the viewport.
 * Uses IntersectionObserver with rootMargin targeting the center band.
 */
export function usePhotoSwapOnView(photo: PhotoEntry) {
  const ref = useRef<HTMLElement>(null);
  const setActivePhoto = usePhotoSwap();

  useEffect(() => {
    const el = ref.current;
    if (!el || !setActivePhoto) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
            setActivePhoto(photo);
          }
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.15, 0.5] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [photo, setActivePhoto]);

  return ref;
}
