import { cn } from "@/lib/utils";

const LOOP_STEPS = [
  { id: "miss", label: "Miss", description: "Capture what went wrong" },
  { id: "diagnosis", label: "Diagnosis", description: "What didn't it see?" },
  { id: "primitive", label: "Primitive", description: "Which knob to turn" },
  { id: "artifact", label: "Artifact", description: "Encode the fix" },
  { id: "gate", label: "Gate", description: "Enforce when ready" },
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
 */
export function LoopNavigator({
  currentStep,
  completedSteps = [],
  compact = false,
}: LoopNavigatorProps) {
  if (compact) {
    return (
      <ol class="space-y-1.5">
        {LOOP_STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;

          return (
            <li
              key={step.id}
              class={cn(
                "flex items-center gap-2 text-xs",
                isCurrent && "text-blueprint-500 dark:text-blueprint-400 font-medium",
                isCompleted && "text-signal-600 dark:text-signal-400",
                !isCurrent && !isCompleted && "text-slate-500 dark:text-slate-500"
              )}
            >
              <span
                class={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium",
                  isCurrent && "bg-blueprint-100 dark:bg-blueprint-900/50 text-blueprint-600 dark:text-blueprint-400",
                  isCompleted && "bg-signal-100 dark:bg-signal-900/50 text-signal-600 dark:text-signal-400",
                  !isCurrent && !isCompleted && "bg-slate-100 dark:bg-slate-800"
                )}
              >
                {isCompleted ? "✓" : index + 1}
              </span>
              {step.label}
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <nav class="my-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
      <ol class="flex items-center justify-between">
        {LOOP_STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;

          return (
            <li key={step.id} class="flex items-center flex-1 last:flex-none">
              <div class="flex flex-col items-center text-center">
                <span
                  class={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-1",
                    isCurrent && "bg-blueprint-500 text-white",
                    isCompleted && "bg-signal-500 text-white",
                    !isCurrent && !isCompleted && "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                  )}
                >
                  {isCompleted ? "✓" : index + 1}
                </span>
                <span
                  class={cn(
                    "text-xs font-medium",
                    isCurrent && "text-blueprint-600 dark:text-blueprint-400",
                    isCompleted && "text-signal-600 dark:text-signal-400",
                    !isCurrent && !isCompleted && "text-slate-600 dark:text-slate-400"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < LOOP_STEPS.length - 1 && (
                <div
                  class={cn(
                    "flex-1 h-0.5 mx-2",
                    isCompleted ? "bg-signal-300 dark:bg-signal-700" : "bg-slate-300 dark:bg-slate-600"
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
