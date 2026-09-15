"use client";

import { Expand } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";

export function GallerySection() {
  const [activeImage, setActiveImage] = useState<(typeof weddingConfig.gallery)[number] | null>(null);

  return (
    <section id="gallery" className="batak-pattern-light relative overflow-hidden">
      <div className="section-shell">
        <SectionHeading eyebrow="Captured moments" title="Galeri Kami" />
        <div className="grid auto-rows-[220px] grid-cols-1 gap-3 sm:grid-cols-2 sm:auto-rows-[260px] lg:grid-cols-3">
          {weddingConfig.gallery.map((image, index) => (
            <Reveal key={image.src} className={cn("h-full", image.className)} delay={index * 0.06}>
              <button
                type="button"
                onClick={() => setActiveImage(image)}
                className="group relative h-full w-full overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                aria-label={`Perbesar: ${image.alt}`}
              >
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-sage-900/0 transition group-hover:bg-sage-900/15" />
                <span className="absolute bottom-4 right-4 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white/90 text-sage-900 opacity-0 shadow-sm transition group-hover:translate-y-0 group-hover:opacity-100">
                  <Expand className="h-4 w-4" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(activeImage)} onOpenChange={(open) => !open && setActiveImage(null)}>
        <DialogContent>
          {activeImage && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={activeImage.src} alt={activeImage.alt} fill sizes="90vw" className="object-cover" priority />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
