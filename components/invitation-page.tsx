"use client";

import { useState } from "react";

import { ClosingSection } from "@/components/sections/closing-section";
import { CoupleSection } from "@/components/sections/couple-section";
import { EventSection } from "@/components/sections/event-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { GiftSection } from "@/components/sections/gift-section";
import { HeroSection } from "@/components/sections/hero-section";
import { OpeningCover } from "@/components/sections/opening-cover";
import { QuoteSection } from "@/components/sections/quote-section";
import { RsvpSection } from "@/components/sections/rsvp-section";
import { StorySection } from "@/components/sections/story-section";
import { MusicControl } from "@/components/shared/music-control";
import { BatakDivider } from "@/components/shared/batak-ornament";

export function InvitationPage({ guestName }: { guestName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <OpeningCover guestName={guestName} isOpen={isOpen} onOpen={() => setIsOpen(true)} />
      <main aria-hidden={!isOpen} className="overflow-hidden bg-cream">
        <HeroSection active={isOpen} />
        <QuoteSection />
        <BatakDivider inverted />
        <CoupleSection />
        <StorySection />
        <BatakDivider />
        <EventSection />
        <GallerySection />
        <BatakDivider />
        <RsvpSection initialName={guestName === "Bapak/Ibu/Saudara/i" ? "" : guestName} />
        <GiftSection />
        <ClosingSection />
      </main>
      <MusicControl invitationOpen={isOpen} />
    </>
  );
}
