import { cn } from "@/lib/utils";

export function LoadingDots({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex gap-1.5 items-center text-[var(--cadmus-gold)]",
        className,
      )}
      aria-label="Loading"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-typing" />
      <span
        className="h-1.5 w-1.5 rounded-full bg-current animate-typing"
        style={{ animationDelay: "0.2s" }}
      />
      <span
        className="h-1.5 w-1.5 rounded-full bg-current animate-typing"
        style={{ animationDelay: "0.4s" }}
      />
    </span>
  );
}
