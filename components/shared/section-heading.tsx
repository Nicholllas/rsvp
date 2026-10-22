import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  className?: string;
  inverted?: boolean;
  variant?: "default" | "panel";
};

export function SectionHeading({ eyebrow, title, className, inverted = false, variant = "default" }: SectionHeadingProps) {
  const isPanel = variant === "panel";
  const titleColor = isPanel || inverted ? "text-ivory" : "text-sage-900";
  const eyebrowColor = isPanel ? "text-batak-sand" : "text-gold";
  return (
    <div className={cn("mb-8 text-center", className)}>
      <p className={cn("mb-2 text-[11px] font-medium uppercase", isPanel ? "tracking-[0.42em]" : "tracking-[0.32em]", eyebrowColor)}>{eyebrow}</p>
      <h2 className={cn("font-serif text-4xl font-semibold uppercase leading-none tracking-wide sm:text-5xl", titleColor)}>{title}</h2>
      <span className={cn("mx-auto mt-4 block h-px", isPanel ? "w-20 bg-gradient-to-r from-transparent via-gold to-transparent" : "w-14 bg-gold/70")} />
    </div>
  );
}
