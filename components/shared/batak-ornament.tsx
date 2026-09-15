import { cn } from "@/lib/utils";

export function UlosBand({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("ulos-band h-[54px] w-full", className)} />;
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

export function BatakDivider({ inverted = false }: { inverted?: boolean }) {
  return (
    <div className={cn("relative h-8 overflow-hidden", inverted ? "bg-sage-900" : "bg-cream")} aria-hidden="true">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gold/35" />
      <div className={cn("absolute left-1/2 top-1/2 grid h-8 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center", inverted ? "bg-sage-900" : "bg-cream")}>
        <span className="h-3 w-3 rotate-45 border border-gold" />
      </div>
    </div>
  );
}
