import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, className, inverted = false }: { eyebrow: string; title: string; className?: string; inverted?: boolean }) {
  return (
    <div className={cn("mb-8 text-center", className)}>
      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.32em] text-gold">{eyebrow}</p>
      <h2 className={cn("font-serif text-4xl font-semibold leading-none sm:text-5xl", inverted ? "text-ivory" : "text-sage-900")}>{title}</h2>
      <span className="mx-auto mt-4 block h-px w-14 bg-gold/70" />
    </div>
  );
}
