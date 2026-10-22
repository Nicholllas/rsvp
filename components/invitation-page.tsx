"use client";

import { useState } from "react";

import { SplitLayout } from "@/components/layout/split-layout";
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
      <main aria-hidden={!isOpen} className="overflow-x-clip bg-batak-ink lg:bg-cream">
        <SplitLayout>
          <HeroSection active={isOpen} />
          <QuoteSection />
          <BatakDivider inverted variant="panel" />
          <CoupleSection />
          <StorySection />
          <BatakDivider variant="panel" />
          <EventSection />
          <GallerySection />
          <BatakDivider variant="panel" />
          <RsvpSection initialName={guestName === "Bapak/Ibu/Saudara/i" ? "" : guestName} />
          <GiftSection />
          <ClosingSection />
        </SplitLayout>
      </main>
      <MusicControl invitationOpen={isOpen} />
    </>
  );
}
