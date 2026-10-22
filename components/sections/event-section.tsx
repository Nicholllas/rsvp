"use client";

import { CalendarPlus, Clock3, MapPin } from "lucide-react";

import { usePhotoSwapOnView } from "@/components/layout/use-photo-swap";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { weddingConfig, type WeddingEvent } from "@/config/wedding";
import { cn, formatIndonesianDate } from "@/lib/utils";

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const dateObj = new Date(event.date);
  const dayNum = dateObj.toLocaleDateString("id-ID", { day: "numeric", timeZone: "Asia/Jakarta" });
  const monthShort = dateObj.toLocaleDateString("id-ID", { month: "short", timeZone: "Asia/Jakarta" });
  const yearNum = dateObj.toLocaleDateString("id-ID", { year: "numeric", timeZone: "Asia/Jakarta" });
  const weekdayShort = dateObj.toLocaleDateString("id-ID", { weekday: "long", timeZone: "Asia/Jakarta" });

  return (
    <Reveal className="relative overflow-hidden rounded-3xl border border-gold/20 bg-batak-ink/40 backdrop-blur-sm" delay={index * 0.1}>
      <div className="absolute inset-x-0 top-0 h-5 bg-gorga bg-repeat-x [background-size:auto_100%]" />
      <div className="flex flex-col items-stretch gap-4 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
        {/* Left: serif date number */}
        <div className="flex shrink-0 flex-col items-center text-center sm:w-28">
          <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-batak-sand">{weekdayShort}</p>
          <p className="font-serif text-6xl font-semibold leading-none text-ivory sm:text-7xl">{dayNum}</p>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-gold">{monthShort} {yearNum}</p>
        </div>

        {/* Divider */}
        <div className="hidden h-20 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent sm:block" />

        {/* Right: event details */}
        <div className="flex-1 text-center sm:text-left">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Rangkaian Acara</p>
          <h3 className="mt-2 font-serif text-3xl font-semibold text-ivory">{event.title}</h3>
          <div className="mx-auto mb-5 mt-4 h-px w-12 bg-gold/50 sm:mx-0" />
          <div className="space-y-2.5 text-sm text-ivory/75">
            <p className="flex items-center justify-center gap-2 sm:justify-start">
              <CalendarPlus className="h-4 w-4 shrink-0 text-gold" />
              {formatIndonesianDate(event.date)}
            </p>
            <p className="flex items-center justify-center gap-2 sm:justify-start">
              <Clock3 className="h-4 w-4 shrink-0 text-gold" />
              {event.time}
            </p>
            <p className="flex items-start justify-center gap-2 sm:justify-start">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                <strong className="block text-ivory">{event.venue}</strong>
                {event.address}
              </span>
            </p>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
            <a
              className={cn(
                buttonVariants({ size: "sm" }),
                "border-gold/30 text-ivory hover:bg-gold/10",
              )}
              href={event.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin className="mr-1.5 h-3.5 w-3.5" /> Lihat Lokasi
            </a>
            <a
              data-slot="outline"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "border-gold/30 text-ivory hover:bg-gold/10",
              )}
              href={`/api/calendar?event=${event.id}`}
            >
              <CalendarPlus className="mr-1.5 h-3.5 w-3.5" /> Tambah ke Kalender
            </a>
          </div>
        </div>
      </div>

      {index === 0 && (
        <iframe
          src={event.mapsEmbedUrl}
          title={`Peta ${event.venue}`}
          className="h-48 w-full border-0 border-t border-gold/20 grayscale-[35%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
    </Reveal>
  );
}

export function EventSection() {
  const photoRef = usePhotoSwapOnView({ src: "/images/alin-richard/04.jpg", alt: "Foto lokasi acara pernikahan" });

  return (
    <section ref={photoRef as React.RefObject<HTMLElement>} id="event" className="relative overflow-hidden text-ivory">
      <div className="panel-shell">
        <SectionHeading eyebrow="Save the moment" title="Detail Acara" variant="panel" />
        <div className="grid gap-6">
          {weddingConfig.events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
