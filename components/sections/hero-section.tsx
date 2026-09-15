"use client";

import { motion } from "framer-motion";
import { CalendarHeart, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { GorgaMark, UlosBand } from "@/components/shared/batak-ornament";
import { weddingConfig } from "@/config/wedding";
import { formatIndonesianDate } from "@/lib/utils";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(): TimeLeft {
  const distance = Math.max(0, new Date(weddingConfig.weddingDate).getTime() - Date.now());
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

export function HeroSection({ active }: { active: boolean }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-batak-ink px-5 py-24 text-center text-ivory">
      <Image src="/images/cover-batak.svg" alt="" fill priority sizes="100vw" className="object-cover opacity-35 md:hidden" />
      <Image src="/images/cover-batak-wide.svg" alt="" fill priority sizes="100vw" className="hidden object-cover opacity-35 md:block" />
      <div className="absolute inset-0 bg-gradient-to-b from-batak-ink/70 via-batak-deep/65 to-batak-ink/95" />
      <div className="absolute inset-0 bg-grain opacity-25" />
      <UlosBand className="absolute inset-x-0 top-0 z-10" />
      <motion.div className="absolute left-[8%] top-[22%] h-3 w-3 rotate-45 border border-gold/45" animate={{ y: [0, -14, 0], rotate: [45, 70, 45] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-[18%] right-[9%] h-2 w-2 rotate-45 bg-batak-red" animate={{ y: [0, 12, 0], rotate: [45, 20, 45] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div
        className="relative mx-auto w-full max-w-[620px] rounded-[10rem_10rem_2.5rem_2.5rem] border border-gold/30 px-3 pb-10 pt-16 sm:px-10 sm:pb-14 sm:pt-20"
        initial={false}
        animate={active ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.9, delay: active ? 1.42 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <GorgaMark className="mx-auto mb-5 text-gold" />
        <div className="mx-auto mb-5 grid h-11 w-11 place-items-center rounded-full border border-gold/35 text-gold">
          <CalendarHeart className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-gold">Marulaon adat · Save the date</p>
        <h1 className="my-6 font-serif text-[clamp(4rem,14vw,7rem)] font-semibold leading-[0.78] tracking-tight text-ivory">
          <motion.span className="block" initial={false} animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }} transition={{ duration: 0.72, delay: active ? 1.62 : 0 }}>{weddingConfig.couple.bride.nickname}</motion.span>
          <motion.span className="my-3 block text-[0.48em] font-medium italic text-gold" initial={false} animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }} transition={{ duration: 0.55, delay: active ? 1.76 : 0 }}>&</motion.span>
          <motion.span className="block" initial={false} animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }} transition={{ duration: 0.72, delay: active ? 1.62 : 0 }}>{weddingConfig.couple.groom.nickname}</motion.span>
        </h1>
        <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-ivory/75">
          {formatIndonesianDate(weddingConfig.weddingDate)}
        </p>

        <div className="mx-auto mt-9 grid w-full max-w-md grid-cols-[repeat(4,minmax(0,1fr))] gap-1.5 sm:gap-4" aria-label="Hitung mundur hari pernikahan">
          {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
            <div key={unit} className="min-w-0 overflow-hidden rounded-2xl border border-gold/20 bg-batak-ink/45 px-1 py-3.5 shadow-sm backdrop-blur-sm sm:px-2">
              <span className="block font-serif text-2xl font-semibold tabular-nums text-ivory sm:text-3xl">
                {String(timeLeft?.[unit] ?? 0).padStart(2, "0")}
              </span>
              <span className="mt-1 block text-[8px] uppercase tracking-[0.18em] text-gold/80">
                {{ days: "Hari", hours: "Jam", minutes: "Menit", seconds: "Detik" }[unit]}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
      <a href="#quote" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold/70" aria-label="Lanjut ke isi undangan">
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
