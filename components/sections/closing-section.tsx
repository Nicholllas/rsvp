import { Heart } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { GorgaMark, UlosBand } from "@/components/shared/batak-ornament";
import { weddingConfig } from "@/config/wedding";

export function ClosingSection() {
  return (
    <footer className="relative overflow-hidden bg-sage-900 px-5 py-20 text-center text-ivory sm:py-28">
      <UlosBand className="absolute inset-x-0 top-0" />
      <div className="absolute inset-0 bg-grain opacity-20" />
      <Reveal className="relative mx-auto max-w-2xl">
        <GorgaMark className="mx-auto mb-5 text-gold" />
        <Heart className="mx-auto h-7 w-7 text-gold" fill="currentColor" strokeWidth={1.5} />
        <p className="mt-7 text-sm leading-relaxed text-ivory/70">{weddingConfig.closingMessage}</p>
        <p className="mt-7 font-serif text-5xl font-semibold sm:text-6xl">{weddingConfig.couple.shortNames}</p>
        <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-gold">Horas · Sampai jumpa di hari bahagia kami</p>
        <div className="mx-auto mt-12 h-px w-12 bg-gold/45" />
        <p className="mt-5 text-[10px] text-ivory/40">Made with love · 2027</p>
      </Reveal>
    </footer>
  );
}
