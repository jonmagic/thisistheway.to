import { useSignal } from "@preact/signals";
import { cn } from "@/lib/utils";

interface TaxonomyCardProps {
  title: string;
  pattern: string;
  rootCause: string;
  symptoms: string[];
  typicalFixes: string[];
  icon: string;
}

/**
 * Expandable card for displaying miss taxonomy patterns
 * Click to expand and see typical fixes
 */
export function TaxonomyCard({
  title,
  pattern,
  rootCause,
  symptoms,
  typicalFixes,
  icon,
}: TaxonomyCardProps) {
  const expanded = useSignal(false);

  return (
    <article
      class={cn(
        "group rounded-xl border-2 p-5 cursor-pointer transition-all duration-200",
        "border-slate-200 dark:border-slate-700",
        "hover:border-blueprint-300 dark:hover:border-blueprint-600",
        expanded.value &&
          "border-blueprint-500 dark:border-blueprint-400 bg-blueprint-50/50 dark:bg-blueprint-900/20"
      )}
      onClick={() => (expanded.value = !expanded.value)}
    >
      <header class="flex items-start gap-4">
        <span class="text-3xl flex-shrink-0" aria-hidden="true">
          {icon}
        </span>
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
          <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {pattern}
          </p>
        </div>
        <span
          class={cn(
            "text-slate-400 transition-transform duration-200 flex-shrink-0",
            expanded.value && "rotate-180"
          )}
          aria-hidden="true"
        >
          ▼
        </span>
      </header>

      <div class="mt-4">
        <p class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Symptoms
        </p>
        <ul class="space-y-1">
          {symptoms.map((s) => (
            <li
              key={s}
              class="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      {expanded.value && (
        <div class="mt-5 pt-5 border-t border-slate-200 dark:border-slate-700 space-y-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Root Cause
            </p>
            <p class="text-sm text-slate-700 dark:text-slate-300">{rootCause}</p>
          </div>

          <div>
            <p class="text-xs font-semibold uppercase tracking-wider text-blueprint-600 dark:text-blueprint-400 mb-2">
              Typical Fixes
            </p>
            <ul class="space-y-2">
              {typicalFixes.map((fix) => (
                <li
                  key={fix}
                  class="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2"
                >
                  <span class="text-signal-500 flex-shrink-0">→</span>
                  {fix}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </article>
  );
}
