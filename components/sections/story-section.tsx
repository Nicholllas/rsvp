"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HeartHandshake, Infinity, MessageCircleHeart, MoonStar, Sparkles, type LucideIcon } from "lucide-react";
import { useRef, useCallback } from "react";

import { usePhotoSwapOnView } from "@/components/layout/use-photo-swap";
import { GorgaMark } from "@/components/shared/batak-ornament";
import { SectionHeading } from "@/components/shared/section-heading";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";

const STORY_ICONS: LucideIcon[] = [Sparkles, MoonStar, MessageCircleHeart, HeartHandshake, Infinity];

export function StorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 75%", "end 70%"] });
  const lineScale = useTransform(scrollYProgress, [0, 0.92], [0, 1]);
  const photoRef = usePhotoSwapOnView({ src: "/images/alin-richard/groom.jpg", alt: "Foto mempelai pria Richard" });

  const setRef = useCallback((node: HTMLElement | null) => {
    sectionRef.current = node;
    if (photoRef) {
      // photoRef is a RefObject — assign via a mutable cast
      (photoRef as React.MutableRefObject<HTMLElement | null>).current = node;
    }
  }, [photoRef]);

  return (
    <section ref={setRef} id="story" className="relative overflow-hidden text-ivory">
      <div className="absolute -left-24 top-28 h-64 w-64 rounded-full border border-gold/10" />
      <div className="absolute -right-32 bottom-24 h-80 w-80 rounded-full border border-gold/10" />
      <div className="panel-shell relative max-w-4xl">
        <GorgaMark className="mx-auto mb-5 text-gold/75" />
        <SectionHeading eyebrow="Sebuah kisah" title="Our Story" variant="panel" />
        <p className="mx-auto -mt-2 mb-12 max-w-lg text-center text-sm leading-relaxed text-ivory/65">
          Kami bertemu tanpa rencana, sempat kehilangan kabar, lalu menemukan jalan kembali. Ini bab-bab kecil yang membawa kami sampai ke hari ini.
        </p>

        <div className="relative mx-auto max-w-xl">
          <div className="absolute bottom-6 left-[17px] top-6 w-px bg-white/15" />
          <motion.div
            className="absolute bottom-6 left-[17px] top-6 w-px origin-top bg-gradient-to-b from-gold via-ivory/80 to-gold"
            style={{ scaleY: reduceMotion ? 1 : lineScale }}
          />

          {weddingConfig.story.map((item, index) => {
            const Icon = STORY_ICONS[index % STORY_ICONS.length];
            const isLast = index === weddingConfig.story.length - 1;
            const chapter = String(index + 1).padStart(2, "0");

            return (
              <motion.article
                key={item.id}
                className="relative mb-6 grid grid-cols-[36px_1fr] gap-4 last:mb-0 sm:mb-7 sm:gap-5"
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "visible"}
                viewport={{ once: true, amount: 0.38 }}
                variants={{
                  hidden: { opacity: 0, y: 48 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <motion.div
                  className="relative z-10 mt-6 grid h-9 w-9 place-items-center self-start rounded-full border border-gold/65 bg-batak-deep text-gold shadow-lg"
                  variants={{
                    hidden: { scale: 0, rotate: -45 },
                    visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 180, damping: 16, delay: 0.15 } },
                  }}
                >
                  <Icon className="h-4 w-4" />
                </motion.div>
                <span aria-hidden className="absolute left-9 top-[42px] h-px w-4 bg-gradient-to-r from-gold/45 to-transparent" />

                <motion.div
                  className={cn(
                    "relative overflow-hidden rounded-3xl border p-6 text-ivory shadow-soft backdrop-blur-sm transition-colors duration-500 hover:border-gold/45 sm:p-7",
                    isLast ? "border-gold/40 bg-batak-ink/60" : "border-gold/25 bg-batak-ink/50",
                  )}
                  variants={{
                    hidden: { clipPath: "inset(0 0 100% 0 round 1.5rem)", rotateX: -7 },
                    visible: { clipPath: "inset(0 0 0% 0 round 1.5rem)", rotateX: 0, transition: { duration: 0.82, delay: 0.08, ease: [0.76, 0, 0.24, 1] } },
                  }}
                >
                  <div className="absolute inset-x-0 top-0 h-5 bg-gorga bg-repeat-x [background-size:auto_100%]" />
                  <div className="relative flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                    <span className="whitespace-nowrap">{item.date}</span>
                    <span className="h-px w-5 shrink-0 bg-gold/50" />
                    <span className="whitespace-nowrap text-gold/60">Bab {chapter}</span>
                  </div>
                  <h3 className="relative mt-2 font-serif text-2xl font-semibold">{item.title}</h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-ivory/70">{item.description}</p>
                  <p className="relative mt-4 border-t border-gold/15 pt-4 font-serif text-base italic leading-snug text-batak-sand">
                    “{item.highlight}”
                  </p>
                </motion.div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="relative mx-auto mt-14 max-w-xl text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <GorgaMark className="mx-auto mb-4 text-gold/50" />
          <p className="font-serif text-xl italic leading-relaxed text-ivory/80 sm:text-2xl">
            “Dari sebuah perkenalan biasa di antara rak toko, Tuhan menumbuhkan sesuatu yang kami bawa sampai ke hari ini.”
          </p>
          <span className="mx-auto mt-5 block h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
