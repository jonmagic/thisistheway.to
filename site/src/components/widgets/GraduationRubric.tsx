import { useSignal, useComputed } from "@preact/signals";
import { cn } from "@/lib/utils";

const RUBRIC_ITEMS = [
  {
    id: "frequency",
    label: "High frequency",
    description: "Same class of miss occurs multiple times per week",
    weight: 2,
  },
  {
    id: "blast-radius",
    label: "High blast radius",
    description: "Can corrupt data, break prod, or waste significant time",
    weight: 3,
  },
  {
    id: "ambiguity",
    label: "High ambiguity",
    description: "Humans disagree about what 'right' means unless encoded",
    weight: 2,
  },
  {
    id: "automatable",
    label: "Easy to automate",
    description: "Cheap to run locally and in CI",
    weight: 2,
  },
  {
    id: "clear-remediation",
    label: "Clear remediation",
    description: "When it fails, the fix is obvious",
    weight: 1,
  },
] as const;

/**
 * Interactive rubric for deciding whether a fix should become a gate
 * Checkbox-based scoring with real-time recommendation
 */
export function GraduationRubric() {
  const checked = useSignal<Set<string>>(new Set());

  const score = useComputed(() => {
    let total = 0;
    for (const item of RUBRIC_ITEMS) {
      if (checked.value.has(item.id)) total += item.weight;
    }
    return total;
  });

  const maxScore = RUBRIC_ITEMS.reduce((acc, item) => acc + item.weight, 0);

  const recommendation = useComputed(() => {
    const s = score.value;
    if (s >= 7)
      return {
        text: "Strong candidate for blocking gate",
        description: "This pattern is high-impact and automatable. Make it a gate.",
        color: "text-signal-600 dark:text-signal-400",
        bg: "bg-signal-50 dark:bg-signal-900/30",
        border: "border-signal-200 dark:border-signal-800",
      };
    if (s >= 4)
      return {
        text: "Consider advisory gate first",
        description: "Start with warnings, graduate to blocking after calibration.",
        color: "text-blueprint-600 dark:text-blueprint-400",
        bg: "bg-blueprint-50 dark:bg-blueprint-900/30",
        border: "border-blueprint-200 dark:border-blueprint-800",
      };
    return {
      text: "Keep as improvement task",
      description: "Address it, but enforcement overhead may not be worth it yet.",
      color: "text-slate-600 dark:text-slate-400",
      bg: "bg-slate-50 dark:bg-slate-800/50",
      border: "border-slate-200 dark:border-slate-700",
    };
  });

  const toggle = (id: string) => {
    const newSet = new Set(checked.value);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    checked.value = newSet;
  };

  return (
    <div class="my-8 p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
        Should this become a gate?
      </h3>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-6">
        Check the criteria that apply to this improvement.
      </p>

      <div class="space-y-3">
        {RUBRIC_ITEMS.map((item) => (
          <label
            key={item.id}
            class="flex items-start gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={checked.value.has(item.id)}
              onChange={() => toggle(item.id)}
              class="mt-1 w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blueprint-500 focus:ring-blueprint-500 focus:ring-offset-0 dark:bg-slate-700"
            />
            <div class="flex-1">
              <span class="text-slate-900 dark:text-white font-medium group-hover:text-blueprint-600 dark:group-hover:text-blueprint-400 transition-colors">
                {item.label}
              </span>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                {item.description}
              </p>
            </div>
            <span class="text-xs text-slate-400 dark:text-slate-500 mt-1">
              +{item.weight}
            </span>
          </label>
        ))}
      </div>

      <div
        class={cn(
          "mt-6 p-4 rounded-lg border transition-all duration-200",
          recommendation.value.bg,
          recommendation.value.border
        )}
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class={cn("font-semibold", recommendation.value.color)}>
              {recommendation.value.text}
            </p>
            <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {recommendation.value.description}
            </p>
          </div>
          <div class="text-right flex-shrink-0">
            <span class="text-3xl font-bold text-slate-900 dark:text-white">
              {score.value}
            </span>
            <span class="text-sm text-slate-500 dark:text-slate-400">
              /{maxScore}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
