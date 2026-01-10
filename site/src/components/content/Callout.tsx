import { ComponentChildren } from "preact";
import { cn } from "@/lib/utils";

type CalloutVariant = "field-note" | "case-file" | "gate-candidate";

const variantStyles: Record<
  CalloutVariant,
  { border: string; bg: string; icon: string; label: string }
> = {
  "field-note": {
    border: "border-l-blueprint-500",
    bg: "bg-blueprint-50 dark:bg-blueprint-900/20",
    icon: "📝",
    label: "Field Note",
  },
  "case-file": {
    border: "border-l-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    icon: "📁",
    label: "Case File",
  },
  "gate-candidate": {
    border: "border-l-signal-500",
    bg: "bg-signal-50 dark:bg-signal-900/20",
    icon: "🚦",
    label: "Gate Candidate",
  },
};

interface CalloutProps {
  variant: CalloutVariant;
  children: ComponentChildren;
}

/**
 * Callout component for highlighting important information
 * Three variants:
 * - field-note: General observations and tips (blueprint blue)
 * - case-file: Specific examples and case studies (amber)
 * - gate-candidate: Things that should become gates (signal green)
 */
export function Callout({ variant, children }: CalloutProps) {
  const styles = variantStyles[variant];

  return (
    <aside
      class={cn(
        "my-6 pl-5 pr-4 py-4 rounded-r-lg border-l-4",
        styles.border,
        styles.bg
      )}
    >
      <div class="flex gap-3">
        <span class="text-xl flex-shrink-0" aria-hidden="true">
          {styles.icon}
        </span>
        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            {styles.label}
          </p>
          <div class="text-sm text-slate-700 dark:text-slate-300 [&>p]:mb-2 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
