"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MailOpen, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

import { GorgaMark, UlosBand } from "@/components/shared/batak-ornament";
import { Button } from "@/components/ui/button";
import { weddingConfig } from "@/config/wedding";

const OPENING_EXIT_DELAY_SECONDS = 1.45;
const OPENING_EXIT_DURATION_SECONDS = 1.05;
const OPENING_TOTAL_MS = 2600;

export function OpeningCover({ guestName, isOpen, onOpen }: { guestName: string; isOpen: boolean; onOpen: () => void }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyTouchAction = document.body.style.touchAction;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousOverscroll = document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";

    const unlockTimer = isOpen
      ? window.setTimeout(() => {
          document.body.style.overflow = previousBodyOverflow;
          document.body.style.touchAction = previousBodyTouchAction;
          document.documentElement.style.overflow = previousHtmlOverflow;
          document.documentElement.style.overscrollBehavior = previousOverscroll;
        }, reduceMotion ? 180 : OPENING_TOTAL_MS)
      : undefined;

    return () => {
      if (unlockTimer) window.clearTimeout(unlockTimer);
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.documentElement.style.overscrollBehavior = previousOverscroll;
    };
  }, [isOpen, reduceMotion]);

  function handleOpen() {
    window.scrollTo({ top: 0, behavior: "auto" });
    onOpen();
    window.dispatchEvent(new Event("wedding:open"));
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-batak-ink px-5 text-center text-ivory"
      initial={false}
      animate={isOpen ? { clipPath: "inset(0 0 100% 0)", opacity: 0.98 } : { clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      transition={{
        duration: reduceMotion ? 0.15 : OPENING_EXIT_DURATION_SECONDS,
        delay: isOpen && !reduceMotion ? OPENING_EXIT_DELAY_SECONDS : 0,
        ease: [0.76, 0, 0.24, 1],
      }}
      style={{ pointerEvents: isOpen ? "none" : "auto" }}
      aria-label="Sampul undangan"
    >
      <motion.div className="absolute inset-0" animate={isOpen ? { scale: 1.09, y: -14 } : { scale: 1, y: 0 }} transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}>
        <Image src="/images/cover-batak.svg" alt="" fill priority sizes="100vw" className="object-cover opacity-90" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-batak-ink/40 via-batak-deep/10 to-batak-ink/80" />
      <div className="absolute inset-0 bg-grain opacity-20" />
      <UlosBand className="absolute inset-x-0 top-0 z-10 shadow-lg" />
      <UlosBand className="absolute inset-x-0 bottom-0 z-10 rotate-180 shadow-lg" />

      {["left-7 top-[24%]", "right-8 top-[33%]", "left-10 bottom-[22%]", "right-12 bottom-[18%]"].map((position, index) => (
        <span key={position} className={`absolute h-1.5 w-1.5 rotate-45 bg-gold/60 ${position}`} style={{ animation: `ember-float ${3.5 + index * 0.6}s ease-in-out ${index * 0.3}s infinite` }} />
      ))}

      <motion.div
        className="relative w-full max-w-sm rounded-[2.5rem] border border-white/15 bg-batak-ink/40 px-6 py-8 shadow-2xl backdrop-blur-[3px]"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={isOpen ? { opacity: 0, y: -24, scale: 0.96 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: isOpen ? 0.45 : 0.8, delay: isOpen ? 0 : 0.15 }}
      >
        <GorgaMark className="mx-auto mb-4 text-gold" />
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold">The Wedding of</p>
        <h1 className="mt-4 font-serif text-5xl font-semibold leading-none sm:text-6xl">{weddingConfig.couple.shortNames}</h1>
        <p className="mt-4 text-xs tracking-[0.25em] text-ivory/70">26 · 06 · 2027</p>

        <div className="relative mx-auto my-7 h-24 w-40 [perspective:800px]">
          <div className="absolute inset-x-0 bottom-0 h-20 rounded-lg border border-gold/35 bg-[#e8dfcc] shadow-2xl" />
          <motion.div
            className="absolute inset-x-0 top-1 h-20 origin-top rounded-t-lg bg-[#d8bd8a] [clip-path:polygon(0_0,100%_0,50%_100%)]"
            animate={isOpen ? { rotateX: 175 } : { rotateX: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute bottom-0 left-0 h-20 w-full rounded-b-lg bg-[#f2ead9] [clip-path:polygon(0_0,50%_55%,100%_0,100%_100%,0_100%)]" />
          <div className="absolute bottom-7 left-1/2 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-batak-red font-serif text-xs text-white shadow-md">A·R</div>
        </div>

        <div className="mb-6">
          <p className="text-xs text-ivory/60">Kepada Yth.</p>
          <p className="mt-1 text-base font-medium">{guestName}</p>
        </div>

        <Button onClick={handleOpen} className="bg-gold text-batak-ink hover:bg-[#cfb578]" aria-label="Buka undangan pernikahan">
          <MailOpen className="mr-2 h-4 w-4" /> Buka Undangan
        </Button>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-20 grid place-items-center"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={isOpen && !reduceMotion ? { opacity: [0, 1, 1, 0], scale: [0.92, 1, 1, 1.035] } : { opacity: 0, scale: 0.92 }}
        transition={{
          duration: 1.55,
          delay: isOpen && !reduceMotion ? 0.15 : 0,
          times: [0, 0.2, 0.78, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="rounded-full border border-gold/50 bg-batak-ink/70 px-9 py-6 backdrop-blur-sm">
          <Sparkles className="mx-auto mb-1 h-4 w-4 text-gold" />
          <p className="font-serif text-4xl italic text-ivory">Horas!</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
