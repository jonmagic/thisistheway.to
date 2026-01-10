import { useSignal } from "@preact/signals";
import { cn } from "@/lib/utils";

const LOOP_STEPS = [
  {
    id: "miss",
    label: "Miss",
    description: "Capture what went wrong",
    detail:
      "What did the agent do? What did it claim? What did reality say? Be specific—vague descriptions lead to vague fixes.",
    questions: [
      "What was the expected behavior?",
      "What actually happened?",
      "Can you reproduce it?",
    ],
  },
  {
    id: "diagnosis",
    label: "Diagnosis",
    description: "What didn't it see?",
    detail:
      "The agent missed because something was invisible to it. Figure out what: missing data, missing constraint, missing feedback, or missing boundaries.",
    questions: [
      "Was the source of truth accessible?",
      "Did it know what 'good' looks like?",
      "Was there a way to verify correctness?",
    ],
  },
  {
    id: "primitive",
    label: "Primitive",
    description: "Which lever to pull",
    detail:
      "Map the diagnosis to a primitive: observability, instructions, tools, guardrails, or verification. Pick the smallest fix that closes the gap.",
    questions: [
      "Is this an observability problem?",
      "Is this an instructions problem?",
      "Is this a verification problem?",
    ],
  },
  {
    id: "artifact",
    label: "Artifact",
    description: "Encode the fix",
    detail:
      "Turn the fix into something version-controlled and repeatable. Not a memory, not a habit—an artifact that future-you won't have to remember.",
    questions: [
      "Can this be a file in the repo?",
      "Will it survive team changes?",
      "Is it discoverable by the agent?",
    ],
  },
  {
    id: "gate",
    label: "Gate",
    description: "Enforce when ready",
    detail:
      "When a fix is high-value and automatable, promote it from guidance to enforcement. Start advisory, graduate to blocking.",
    questions: [
      "Is this worth enforcing?",
      "Can it run in CI?",
      "Is the failure message actionable?",
    ],
  },
] as const;

type StepId = (typeof LOOP_STEPS)[number]["id"];

interface LoopNavigatorProps {
  /** Currently active step */
  currentStep?: StepId;
  /** Steps that have been completed */
  completedSteps?: StepId[];
  /** Compact mode for sidebar display */
  compact?: boolean;
}

/**
 * Visual stepper showing the improvement loop:
 * Miss → Diagnosis → Primitive → Artifact → Gate
 * Click any step to expand details about that stage.
 */
export function LoopNavigator({
  currentStep,
  completedSteps = [],
  compact = false,
}: LoopNavigatorProps) {
  const expandedStep = useSignal<StepId | null>(null);

  if (compact) {
    return (
      <ol class="space-y-1">
        {LOOP_STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;

          return (
            <li key={step.id} class="group relative">
              <div
                class={cn(
                  "flex items-center gap-2 text-xs py-0.5 cursor-default",
                  isCurrent &&
                    "text-blueprint-500 dark:text-blueprint-400 font-medium",
                  isCompleted && "text-signal-600 dark:text-signal-400",
                  !isCurrent &&
                    !isCompleted &&
                    "text-slate-500 dark:text-slate-500"
                )}
              >
                <span
                  class={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium transition-all",
                    "group-hover:ring-2 group-hover:ring-blueprint-300 dark:group-hover:ring-blueprint-600",
                    isCurrent &&
                      "bg-blueprint-100 dark:bg-blueprint-900/50 text-blueprint-600 dark:text-blueprint-400",
                    isCompleted &&
                      "bg-signal-100 dark:bg-signal-900/50 text-signal-600 dark:text-signal-400",
                    !isCurrent &&
                      !isCompleted &&
                      "bg-slate-100 dark:bg-slate-800"
                  )}
                >
                  {isCompleted ? "✓" : index + 1}
                </span>
                <span class="group-hover:text-blueprint-500 dark:group-hover:text-blueprint-400 transition-colors">
                  {step.label}
                </span>
              </div>
              {/* Tooltip on hover */}
              <div class="absolute left-0 bottom-full mb-2 w-56 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 pointer-events-none">
                <p class="text-xs font-semibold text-slate-900 dark:text-white mb-1">
                  {step.label}
                </p>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <nav class="my-8 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div class="bg-slate-50 dark:bg-slate-800/50">
        <div class="pt-9 pb-1">
          <ol class="relative m-0 p-0 list-none h-14">
            <div
              class="absolute h-px bg-slate-300 dark:bg-slate-600"
              style={{
                top: "14px",
                left: "calc(16.6667% + 14px)",
                right: "calc(16.6667% + 14px)",
              }}
              aria-hidden="true"
            />

            {LOOP_STEPS.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = currentStep === step.id;
              const isExpanded = expandedStep.value === step.id;

              // Index 0..4 => centers at 1/6..5/6
              const leftPct = ((index + 1) / 6) * 100;

              return (
                <li
                  key={step.id}
                  class="absolute"
                  style={{
                    left: `${leftPct}%`,
                    top: 0,
                    transform: "translateX(-50%)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      (expandedStep.value =
                        expandedStep.value === step.id ? null : step.id)
                    }
                    class="flex flex-col items-center gap-2 group"
                  >
                    <span
                      class={cn(
                        "relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold transition-all",
                        "group-hover:ring-2 group-hover:ring-blueprint-300 dark:group-hover:ring-blueprint-600",
                        isExpanded &&
                          "ring-2 ring-blueprint-500 dark:ring-blueprint-400",
                        isCurrent && "bg-blueprint-500 text-white",
                        isCompleted && "bg-signal-500 text-white",
                        !isCurrent &&
                          !isCompleted &&
                          "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                      )}
                    >
                      {isCompleted ? "✓" : index + 1}
                    </span>
                    <span
                      class={cn(
                        "text-sm font-semibold whitespace-nowrap text-center leading-none transition-colors",
                        isExpanded &&
                          "text-blueprint-600 dark:text-blueprint-400",
                        isCurrent &&
                          !isExpanded &&
                          "text-blueprint-600 dark:text-blueprint-400",
                        isCompleted &&
                          !isExpanded &&
                          "text-signal-600 dark:text-signal-400",
                        !isCurrent &&
                          !isCompleted &&
                          !isExpanded &&
                          "text-slate-600 dark:text-slate-400 group-hover:text-blueprint-600 dark:group-hover:text-blueprint-400"
                      )}
                    >
                      {step.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Expanded detail panel */}
      {expandedStep.value && (
        <div class="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          {LOOP_STEPS.filter((s) => s.id === expandedStep.value).map((step) => (
            <div key={step.id}>
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h4 class="font-semibold text-slate-900 dark:text-white">
                    {step.label}
                  </h4>
                  <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {step.detail}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => (expandedStep.value = null)}
                  class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div class="mt-4">
                <p class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Key Questions
                </p>
                <ul class="space-y-1">
                  {step.questions.map((q) => (
                    <li
                      key={q}
                      class="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2"
                    >
                      <span class="text-blueprint-500">?</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
