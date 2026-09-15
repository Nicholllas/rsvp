"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import { useRef } from "react";

import { GorgaMark } from "@/components/shared/batak-ornament";
import { SectionHeading } from "@/components/shared/section-heading";
import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 75%", "end 70%"] });
  const lineScale = useTransform(scrollYProgress, [0, 0.92], [0, 1]);

  return (
    <section ref={sectionRef} id="story" className="batak-pattern-dark relative overflow-hidden text-ivory">
      <div className="absolute -left-24 top-28 h-64 w-64 rounded-full border border-gold/10" />
      <div className="absolute -right-32 bottom-24 h-80 w-80 rounded-full border border-gold/10" />
      <div className="section-shell relative max-w-4xl">
        <GorgaMark className="mx-auto mb-5 text-gold/75" />
        <SectionHeading eyebrow="Sebuah kisah" title="Our Story" inverted />
        <p className="mx-auto -mt-2 mb-12 max-w-lg text-center text-sm leading-relaxed text-ivory/65">
          Perjalanan yang tumbuh perlahan, dibuka satu halaman demi satu halaman.
        </p>

        <div className="relative mx-auto max-w-2xl">
          <div className="absolute bottom-8 left-[17px] top-8 w-px bg-white/15 sm:left-1/2" />
          <motion.div
            className="absolute bottom-8 left-[17px] top-8 w-px origin-top bg-gradient-to-b from-gold via-ivory/80 to-gold sm:left-1/2"
            style={{ scaleY: reduceMotion ? 1 : lineScale }}
          />

          {weddingConfig.story.map((item, index) => (
            <motion.article
              key={item.year}
              className="relative mb-9 grid grid-cols-[36px_1fr] gap-4 last:mb-0 sm:grid-cols-[1fr_52px_1fr] sm:gap-6"
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.38 }}
              variants={{
                hidden: { opacity: 0, y: 48 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <motion.div
                className="relative z-10 col-start-1 row-start-1 mt-7 grid h-9 w-9 place-items-center rounded-full border border-gold/65 bg-sage-900 text-gold shadow-lg sm:col-start-2 sm:mx-auto"
                variants={{
                  hidden: { scale: 0, rotate: -45 },
                  visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 180, damping: 16, delay: 0.15 } },
                }}
              >
                <Heart className="h-3.5 w-3.5" fill="currentColor" />
              </motion.div>

              <motion.div
                className={cn(
                  "relative col-start-2 row-start-1 overflow-hidden rounded-3xl border border-white/60 bg-ivory p-6 text-sage-900 shadow-soft sm:p-7",
                  index % 2 === 0 ? "sm:col-start-1 sm:text-right" : "sm:col-start-3 sm:text-left",
                )}
                variants={{
                  hidden: { clipPath: "inset(0 0 100% 0 round 1.5rem)", rotateX: -7 },
                  visible: { clipPath: "inset(0 0 0% 0 round 1.5rem)", rotateX: 0, transition: { duration: 0.82, delay: 0.08, ease: [0.76, 0, 0.24, 1] } },
                }}
              >
                <div className="absolute inset-x-0 top-0 h-2 bg-gorga bg-repeat-x [background-size:27px_20px]" />
                <span className={cn("pointer-events-none absolute -top-3 font-serif text-8xl font-semibold text-sage-500/[0.06]", index % 2 === 0 ? "left-4 sm:left-auto sm:right-4" : "right-4")}>{item.year.slice(-2)}</span>
                <p className="relative text-[10px] font-semibold uppercase tracking-[0.27em] text-gold">{item.year}</p>
                <h3 className="relative mt-2 font-serif text-2xl font-semibold">{item.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-sage-700/75">{item.description}</p>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
