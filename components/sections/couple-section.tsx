"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Instagram } from "lucide-react";
import Image from "next/image";

import { usePhotoSwapOnView } from "@/components/layout/use-photo-swap";
import { GorgaMark } from "@/components/shared/batak-ornament";
import { SectionHeading } from "@/components/shared/section-heading";
import { weddingConfig } from "@/config/wedding";

function PersonCard({ person, role, index }: {
  person: typeof weddingConfig.couple.bride | typeof weddingConfig.couple.groom;
  role: string;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const delay = index * 0.16;

  return (
    <motion.article
      className="relative text-center"
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.32 }}
      variants={{
        hidden: { opacity: 0, y: 42 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      <motion.div
        className="relative mx-auto aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-[9rem_9rem_2rem_2rem] border-4 border-gold/30 shadow-soft"
        variants={{
          hidden: { clipPath: "inset(0 0 100% 0 round 9rem 9rem 2rem 2rem)" },
          visible: { clipPath: "inset(0 0 0% 0 round 9rem 9rem 2rem 2rem)", transition: { duration: 0.95, delay: delay + 0.08, ease: [0.76, 0, 0.24, 1] } },
        }}
      >
        <motion.div
          className="absolute inset-0"
          variants={{
            hidden: { scale: 1.14 },
            visible: { scale: 1, transition: { duration: 1.2, delay: delay + 0.08, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <Image
            src={person.image}
            alt={`Foto ${person.name}`}
            fill
            sizes="(max-width: 640px) 80vw, 280px"
            className="object-cover"
            style={{ objectPosition: person.imagePosition }}
          />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-batak-ink/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-5 bg-gorga bg-repeat-x opacity-95 [background-size:auto_100%]" />
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 14 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.58, delay: delay + 0.42 } },
        }}
      >
        <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.3em] text-gold">{role}</p>
        <h3 className="mt-2 font-serif text-xl font-semibold leading-tight text-ivory sm:text-2xl lg:text-[1.75rem]">{person.name}</h3>
        <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p className="mt-3 text-sm text-ivory/65">{person.description}</p>
        <p className="mx-auto mt-1 max-w-sm text-xs font-medium leading-relaxed text-ivory/80 sm:text-sm">{person.parents}</p>
        {person.instagramHandle && (
          <a href={person.instagram} target="_blank" rel="noreferrer" className="mx-auto mt-4 inline-flex items-center gap-2 text-xs text-batak-sand transition hover:text-gold" aria-label={`Instagram @${person.instagramHandle}`}>
            <Instagram className="h-4 w-4" /> @{person.instagramHandle}
          </a>
        )}
      </motion.div>
    </motion.article>
  );
}

export function CoupleSection() {
  const photoRef = usePhotoSwapOnView({ src: "/images/alin-richard/06.jpg", alt: "Alin dan Richard dalam busana adat Batak" });

  return (
    <section ref={photoRef as React.RefObject<HTMLElement>} id="couple" className="relative overflow-hidden text-ivory">
      <div className="panel-shell relative">
        <GorgaMark className="mx-auto mb-5 text-gold/55" />
        <SectionHeading eyebrow="Dengan memohon rahmat-Nya" title="Mempelai" variant="panel" />
        <p className="mx-auto mb-12 max-w-xl text-center text-sm leading-relaxed text-ivory/65">
          Dengan penuh syukur dan restu keluarga besar, kami mengundang Anda untuk menjadi bagian dari awal perjalanan baru kami dalam hangatnya sukacita Batak.
        </p>
        <div className="grid gap-10 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-6">
          <PersonCard person={weddingConfig.couple.bride} role="Mempelai Wanita" index={0} />
          <motion.div className="hidden font-serif text-4xl italic text-gold sm:block" initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.28 }}>&</motion.div>
          <PersonCard person={weddingConfig.couple.groom} role="Mempelai Pria" index={1} />
        </div>
      </div>
    </section>
  );
}
