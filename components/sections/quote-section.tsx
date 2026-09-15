import { Quote } from "lucide-react";

import { GorgaMark } from "@/components/shared/batak-ornament";
import { Reveal } from "@/components/shared/reveal";
import { weddingConfig } from "@/config/wedding";

export function QuoteSection() {
  return (
    <section id="quote" className="bg-sage-900 text-ivory">
      <div className="section-shell max-w-3xl text-center">
        <Reveal>
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.42em] text-gold">Horas</p>
          <GorgaMark className="mx-auto mb-6 text-gold/80" />
          <Quote className="mx-auto h-8 w-8 text-gold" strokeWidth={1.25} />
          <blockquote className="mt-7 font-serif text-2xl font-medium leading-relaxed sm:text-3xl">
            “{weddingConfig.quote.text}”
          </blockquote>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.22em] text-gold">{weddingConfig.quote.source}</p>
        </Reveal>
      </div>
    </section>
  );
}
