import { cn } from "@/lib/utils";

export function UlosBand({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("ulos-band w-full", className)} />;
}

export function GorgaMark({ className }: { className?: string }) {
  return (
    <svg className={cn("h-10 w-20", className)} viewBox="0 0 120 52" fill="none" aria-hidden="true">
      <path d="M3 26c13-27 37-27 50-7 4 6 5 14 7 22 2-8 3-16 7-22 13-20 37-20 50 7-13 27-37 27-50 7-4-6-5-14-7-22-2 8-3 16-7 22-13 20-37 20-50-7Z" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M17 26c8-13 20-13 28-4 3 4 5 9 8 15M103 26c-8-13-20-13-28-4-3 4-5 9-8 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="60" cy="26" r="5" fill="currentColor"/>
    </svg>
  );
}

export function BatakDivider({ inverted = false, variant = "default" }: { inverted?: boolean; variant?: "default" | "panel" }) {
  const bgColor = variant === "panel" ? "bg-transparent" : inverted ? "bg-sage-900" : "bg-cream";
  return (
    <div className={cn("relative flex h-12 items-center justify-center overflow-hidden", bgColor)} aria-hidden="true">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className={cn("relative z-10 flex items-center gap-2 px-3", bgColor)}>
        <span className="h-2 w-2 rotate-45 border border-gold/70" />
        <GorgaMark className="h-6 w-12 text-gold/60" />
        <span className="h-2 w-2 rotate-45 border border-gold/70" />
      </div>
    </div>
  );
}
