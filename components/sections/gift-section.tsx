"use client";

import { Check, Copy, Gift } from "lucide-react";
import { useState } from "react";

import { usePhotoSwapOnView } from "@/components/layout/use-photo-swap";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { weddingConfig } from "@/config/wedding";

export function GiftSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const photoRef = usePhotoSwapOnView({ src: "/images/alin-richard/07.jpg", alt: "Foto penutup pernikahan" });

  async function copyAccount(accountNumber: string) {
    await navigator.clipboard.writeText(accountNumber);
    setCopied(accountNumber);
    window.setTimeout(() => setCopied(null), 1800);
  }

  return (
    <section ref={photoRef as React.RefObject<HTMLElement>} id="gift" className="relative overflow-hidden text-ivory">
      <div className="panel-shell max-w-3xl">
        <SectionHeading eyebrow="Tanda kasih" title="Amplop Digital" variant="panel" />
        <p className="mx-auto mb-9 max-w-xl text-center text-sm leading-relaxed text-ivory/65">
          Doa restu Anda sudah lebih dari cukup. Namun jika ingin mengirimkan tanda kasih, dapat melalui rekening berikut.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {weddingConfig.gifts.map((gift, index) => (
            <Reveal key={gift.accountNumber} className="rounded-3xl border border-gold/20 bg-batak-ink/40 p-6 backdrop-blur-sm" delay={index * 0.08}>
              <Gift className="h-6 w-6 text-gold" strokeWidth={1.5} />
              <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-ivory/55">{gift.bank}</p>
              <p className="mt-2 font-serif text-2xl font-semibold tracking-wide text-ivory">{gift.accountNumber}</p>
              <p className="mt-1 text-xs text-ivory/60">a.n. {gift.accountName}</p>
              <Button variant="outline" size="sm" className="mt-5 border-gold/30 text-ivory hover:bg-gold/10" onClick={() => copyAccount(gift.accountNumber)}>
                {copied === gift.accountNumber ? <Check className="mr-1.5 h-3.5 w-3.5" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
                {copied === gift.accountNumber ? "Tersalin" : "Salin Nomor"}
              </Button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
