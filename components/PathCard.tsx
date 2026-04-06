import { cn } from "@/lib/utils";
import { GoldChip } from "@/components/ui/GoldChip";

type Props = {
  icon: React.ReactNode;
  chip: string;
  title: string;
  description: string;
  cta: string;
  onSelect: () => void;
  colorful?: boolean;
};

export function PathCard({
  icon,
  chip,
  title,
  description,
  cta,
  onSelect,
  colorful = false,
}: Props) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-xl border border-[var(--cadmus-border)] bg-[var(--cadmus-surface)] p-6 shadow-sm transition animate-fade-in",
        colorful ? "hover:border-emerald-400/80" : "hover:border-[var(--cadmus-gold)]/50",
        "min-h-[280px]",
      )}
    >
      <div
        className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--cadmus-surface-raised)]",
          colorful ? "text-emerald-700" : "text-[var(--cadmus-gold)]",
        )}
      >
        {icon}
      </div>
      <GoldChip colorful={colorful}>{chip}</GoldChip>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--cadmus-text)]">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--cadmus-muted)]">
        {description}
      </p>
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "no-print mt-6 inline-flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cadmus-gold)]",
          colorful
            ? "bg-emerald-600 text-white hover:bg-emerald-700"
            : "bg-[var(--cadmus-gold)] text-[#080808] hover:bg-[var(--cadmus-gold-light)]",
        )}
      >
        {cta}
      </button>
    </article>
  );
}
