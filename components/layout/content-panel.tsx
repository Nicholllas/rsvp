"use client";

import { useEffect, useRef, type PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export function ContentPanel({ children, className }: PropsWithChildren<{ className?: string }>) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Selaraskan fase tile pita ::before/::after dengan pita panel foto kiri.
  // Tile = tinggi band × (72/54); pita kiri mulai dari x=0, jadi band kanan wajib
  // di-geser sejauh (posisiX kolom mod lebarTile) agar motif menyambung di tengah.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const applyPhase = () => {
      const bandHeight = parseFloat(getComputedStyle(el, "::before").height) || 36;
      const tileWidth = bandHeight * (72 / 54);
      const left = Math.round(el.getBoundingClientRect().left) || 0;
      el.style.setProperty("--band-offset-x", `${left % tileWidth}px`);
    };
    applyPhase();
    window.addEventListener("resize", applyPhase);
    return () => window.removeEventListener("resize", applyPhase);
  }, []);

  return (
    <div
      ref={panelRef}
      className={cn(
        "panel-dark relative border-t border-gold/25 bg-batak-ink/95 backdrop-blur-sm",
        "lg:border-l lg:border-gold/25",
        "before:absolute before:inset-x-0 before:top-0 before:h-[var(--ulos-band-height)] before:bg-gorga before:bg-repeat-x before:opacity-90 before:[background-size:auto_100%] before:[background-position:var(--band-offset-x,0px)_0px] before:content-['']",
        "after:absolute after:inset-x-0 after:bottom-0 after:h-[var(--ulos-band-height)] after:bg-gorga after:bg-repeat-x after:opacity-70 after:[background-size:auto_100%] after:[background-position:var(--band-offset-x,0px)_0px] after:content-['']",
        className,
      )}
    >
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
