"use client";

import { Music2, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { weddingConfig } from "@/config/wedding";
import { cn } from "@/lib/utils";

export function MusicControl({ invitationOpen }: { invitationOpen: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startFromInvitationClick = () => {
      audio.muted = false;
      void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    };

    window.addEventListener("wedding:open", startFromInvitationClick);
    return () => window.removeEventListener("wedding:open", startFromInvitationClick);
  }, []);

  useEffect(() => {
    if (!invitationOpen) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, [invitationOpen]);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.muted = false;
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  return (
    <>
      <audio ref={audioRef} src={weddingConfig.music.src} loop playsInline preload="metadata" />
      <button
        type="button"
        onClick={toggleMusic}
        className={cn("fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-white/70 bg-white/90 p-3 text-sage-900 shadow-soft backdrop-blur transition duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold", invitationOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0 pointer-events-none")}
        aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
        title={weddingConfig.music.title}
      >
        <Music2 className={cn("h-4 w-4 text-gold", isPlaying && "animate-pulse")} />
        {isPlaying ? <Pause className="h-3.5 w-3.5" fill="currentColor" /> : <Play className="h-3.5 w-3.5" fill="currentColor" />}
      </button>
    </>
  );
}
