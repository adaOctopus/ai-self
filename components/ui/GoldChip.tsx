import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  colorful?: boolean;
};

export function GoldChip({ children, className, colorful = false }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        colorful
          ? "bg-emerald-100 text-emerald-950 ring-1 ring-emerald-400/70"
          : "bg-[var(--cadmus-chip-bg)] text-[var(--cadmus-gold)] border border-[var(--cadmus-border)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
