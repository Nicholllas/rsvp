"use client";

import { Check, Copy, Gift } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { weddingConfig } from "@/config/wedding";

export function GiftSection() {
  const [copied, setCopied] = useState<string | null>(null);

  async function copyAccount(accountNumber: string) {
    await navigator.clipboard.writeText(accountNumber);
    setCopied(accountNumber);
    window.setTimeout(() => setCopied(null), 1800);
  }

  return (
    <section id="gift" className="batak-pattern-light relative overflow-hidden">
      <div className="section-shell max-w-3xl">
        <SectionHeading eyebrow="Tanda kasih" title="Amplop Digital" />
        <p className="mx-auto mb-9 max-w-xl text-center text-sm leading-relaxed text-sage-700/75">
          Doa restu Anda sudah lebih dari cukup. Namun jika ingin mengirimkan tanda kasih, dapat melalui rekening berikut.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {weddingConfig.gifts.map((gift, index) => (
            <Reveal key={gift.accountNumber} className="glass-card rounded-3xl p-6" delay={index * 0.08}>
              <Gift className="h-6 w-6 text-gold" strokeWidth={1.5} />
              <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-sage-700/60">{gift.bank}</p>
              <p className="mt-2 font-serif text-2xl font-semibold tracking-wide text-sage-900">{gift.accountNumber}</p>
              <p className="mt-1 text-xs text-sage-700/70">a.n. {gift.accountName}</p>
              <Button variant="outline" size="sm" className="mt-5" onClick={() => copyAccount(gift.accountNumber)}>
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
