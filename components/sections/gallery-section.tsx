"use client";

import { Expand } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { usePhotoSwapOnView } from "@/components/layout/use-photo-swap";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";

export function GallerySection() {
  const [activeImage, setActiveImage] = useState<(typeof weddingConfig.gallery)[number] | null>(null);
  const photoRef = usePhotoSwapOnView({ src: "/images/alin-richard/01.jpg", alt: "Galeri foto pernikahan" });

  return (
    <section ref={photoRef as React.RefObject<HTMLElement>} id="gallery" className="relative overflow-hidden text-ivory">
      <div className="panel-shell">
        <SectionHeading eyebrow="Captured moments" title="Galeri Kami" variant="panel" />
        <div className="grid auto-rows-[180px] grid-cols-1 gap-3 sm:grid-cols-2 sm:auto-rows-[220px] lg:grid-cols-2">
          {weddingConfig.gallery.map((image, index) => (
            <Reveal key={image.src} className={cn("h-full", image.className)} delay={index * 0.06}>
              <button
                type="button"
                onClick={() => setActiveImage(image)}
                className="group relative h-full w-full overflow-hidden rounded-2xl border border-gold/20 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                aria-label={`Perbesar: ${image.alt}`}
              >
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-batak-ink/0 transition group-hover:bg-batak-ink/20" />
                <span className="absolute bottom-4 right-4 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white/90 text-batak-ink opacity-0 shadow-sm transition group-hover:translate-y-0 group-hover:opacity-100">
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
