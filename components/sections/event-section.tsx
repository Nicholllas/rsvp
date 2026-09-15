import { CalendarPlus, Clock3, MapPin } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { weddingConfig, type WeddingEvent } from "@/config/wedding";
import { cn, formatIndonesianDate } from "@/lib/utils";

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  return (
    <Reveal className="glass-card overflow-hidden rounded-3xl" delay={index * 0.1}>
      <div className="p-6 text-center sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Rangkaian Acara</p>
        <h3 className="mt-3 font-serif text-4xl font-semibold text-sage-900">{event.title}</h3>
        <div className="mx-auto my-6 h-px w-12 bg-gold/60" />
        <div className="space-y-3 text-sm text-sage-700/80">
          <p className="flex items-center justify-center gap-2"><CalendarPlus className="h-4 w-4 text-gold" /> {formatIndonesianDate(event.date)}</p>
          <p className="flex items-center justify-center gap-2"><Clock3 className="h-4 w-4 text-gold" /> {event.time}</p>
          <p className="flex items-start justify-center gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><span><strong className="block text-sage-900">{event.venue}</strong>{event.address}</span></p>
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          <a className={buttonVariants({ size: "sm" })} href={event.mapsUrl} target="_blank" rel="noreferrer"><MapPin className="mr-1.5 h-3.5 w-3.5" /> Lihat Lokasi</a>
          <a className={cn(buttonVariants({ variant: "outline", size: "sm" }))} href={`/api/calendar?event=${event.id}`}><CalendarPlus className="mr-1.5 h-3.5 w-3.5" /> Tambah ke Kalender</a>
        </div>
      </div>
      {index === 0 && (
        <iframe
          src={event.mapsEmbedUrl}
          title={`Peta ${event.venue}`}
          className="h-52 w-full border-0 grayscale-[35%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
    </Reveal>
  );
}

export function EventSection() {
  return (
    <section id="event" className="batak-pattern-light relative overflow-hidden">
      <div className="section-shell">
        <SectionHeading eyebrow="Save the moment" title="Detail Acara" />
        <div className="grid gap-6 md:grid-cols-2">
          {weddingConfig.events.map((event, index) => <EventCard key={event.id} event={event} index={index} />)}
        </div>
      </div>
    </section>
  );
}
