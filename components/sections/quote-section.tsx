import { Quote } from "lucide-react";

import { usePhotoSwapOnView } from "@/components/layout/use-photo-swap";
import { GorgaMark } from "@/components/shared/batak-ornament";
import { Reveal } from "@/components/shared/reveal";
import { weddingConfig } from "@/config/wedding";

export function QuoteSection() {
  const photoRef = usePhotoSwapOnView({ src: "/images/alin-richard/cover.jpg", alt: "Alin dan Richard dalam busana adat Batak" });

  return (
    <section ref={photoRef as React.RefObject<HTMLElement>} id="quote" className="relative text-ivory">
      <div className="panel-shell max-w-3xl text-center">
        <Reveal>
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.42em] text-batak-sand">Horas</p>
          <GorgaMark className="mx-auto mb-6 text-gold/80" />
          <Quote className="mx-auto h-8 w-8 text-gold" strokeWidth={1.25} />
          <blockquote className="mt-7 font-serif text-2xl font-medium leading-relaxed italic sm:text-3xl">
            &ldquo;{weddingConfig.quote.text}&rdquo;
          </blockquote>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.22em] text-gold">{weddingConfig.quote.source}</p>
        </Reveal>
      </div>
    </section>
  );
}
