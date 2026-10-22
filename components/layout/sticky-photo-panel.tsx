"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { useActivePhoto } from "@/components/layout/split-layout";
import { UlosBand } from "@/components/shared/batak-ornament";

const EMBER_PARTICLES = [
  { left: "12%", top: "30%", delay: 0, duration: 5.2 },
  { left: "82%", top: "22%", delay: 0.6, duration: 4.6 },
  { left: "68%", top: "68%", delay: 1.2, duration: 5.8 },
  { left: "28%", top: "72%", delay: 0.3, duration: 4.2 },
  { left: "50%", top: "45%", delay: 0.9, duration: 6.0 },
];

export function StickyPhotoPanel() {
  const activePhoto = useActivePhoto();
  const reduceMotion = useReducedMotion();

  return (
    <aside
      className="relative hidden h-screen overflow-hidden lg:sticky lg:top-0 lg:block"
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activePhoto?.src}
          className="absolute inset-0"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={activePhoto?.src ?? "/images/alin-richard/cover.jpg"}
            alt={activePhoto?.alt ?? ""}
            fill
            sizes="50vw"
            className="object-cover object-[50%_30%]"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Batak gradient overlay — lighter to show photo */}
      <div className="absolute inset-0 bg-gradient-to-br from-batak-ink/35 via-batak-deep/25 to-batak-ink/60" />
      <div className="absolute inset-0 bg-grain opacity-10" />

      {/* Ember particles */}
      {!reduceMotion && (
        <>
          {EMBER_PARTICLES.map((particle) => (
            <motion.span
              key={`${particle.left}-${particle.top}`}
              className="absolute h-1.5 w-1.5 rotate-45 rounded-[1px] bg-gold/55"
              style={{ left: particle.left, top: particle.top }}
              animate={{ y: [0, -22, 0], x: [0, 6, 0], opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </>
      )}

      {/* Ulos bands top & bottom — tinggi mengikuti --ulos-band-height agar motif utuh */}
      <UlosBand className="absolute inset-x-0 top-0 z-10" />
      <UlosBand className="absolute inset-x-0 bottom-0 z-10 rotate-180" />

      {/* Gorga watermark center */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={reduceMotion ? {} : { opacity: [0.08, 0.15, 0.08], scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="h-20 w-40 text-gold" viewBox="0 0 120 52" fill="none">
          <path d="M3 26c13-27 37-27 50-7 4 6 5 14 7 22 2-8 3-16 7-22 13-20 37-20 50 7-13 27-37 27-50 7-4-6-5-14-7-22-2 8-3 16-7 22-13 20-37 20-50-7Z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M17 26c8-13 20-13 28-4 3 4 5 9 8 15M103 26c-8-13-20-13-28-4-3 4-5 9-8 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="60" cy="26" r="5" fill="currentColor" />
        </svg>
      </motion.div>
    </aside>
  );
}
