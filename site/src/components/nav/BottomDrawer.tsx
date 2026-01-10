import { useSignal } from "@preact/signals";
import { useLocation } from "preact-iso";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/ai", label: "Overview" },
  { href: "/ai/primitives", label: "The Five Levers" },
  { href: "/ai/miss-taxonomy", label: "How Agents Fail" },
  { href: "/ai/graduation", label: "Tightening the Loop" },
];

const LOOP_STEPS = [
  { id: "miss", label: "Miss", description: "Capture what went wrong" },
  { id: "diagnosis", label: "Diagnosis", description: "What didn't it see?" },
  { id: "primitive", label: "Primitive", description: "Which lever to pull" },
  { id: "artifact", label: "Artifact", description: "Encode the fix" },
  { id: "gate", label: "Gate", description: "Enforce when ready" },
];

/**
 * Mobile bottom drawer navigation
 * Shows a floating button that expands to reveal navigation
 * Only visible on mobile (lg:hidden)
 */
export function BottomDrawer() {
  const isOpen = useSignal(false);
  const { path } = useLocation();

  return (
    <div class="lg:hidden">
      {/* Floating action button */}
      <button
        type="button"
        onClick={() => (isOpen.value = !isOpen.value)}
        class={cn(
          "fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full shadow-lg",
          "bg-blueprint-500 text-white",
          "flex items-center justify-center",
          "transition-transform duration-200",
          isOpen.value && "rotate-45"
        )}
        aria-label={isOpen.value ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen.value}
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {/* Backdrop */}
      {isOpen.value && (
        <div
          class="fixed inset-0 bg-black/30 z-40"
          onClick={() => (isOpen.value = false)}
        />
      )}

      {/* Drawer panel */}
      <div
        class={cn(
          "fixed bottom-0 left-0 right-0 z-40",
          "bg-white dark:bg-slate-900",
          "border-t border-slate-200 dark:border-slate-700",
          "rounded-t-2xl shadow-xl",
          "transform transition-transform duration-300 ease-out",
          isOpen.value ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Handle */}
        <div class="flex justify-center py-3">
          <div class="w-12 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>

        <div class="px-6 pb-8 max-h-[70vh] overflow-y-auto">
          {/* Section navigation */}
          <nav class="mb-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              In this section
            </p>
            <ul class="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = path === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => (isOpen.value = false)}
                      class={cn(
                        "block py-2 px-3 rounded-lg transition-colors",
                        isActive
                          ? "bg-blueprint-50 dark:bg-blueprint-900/30 text-blueprint-600 dark:text-blueprint-400 font-medium"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* The Loop */}
          <div class="pt-6 border-t border-slate-200 dark:border-slate-700">
            <p class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              The Loop
            </p>
            <ol class="space-y-2">
              {LOOP_STEPS.map((step, index) => (
                <li key={step.id} class="flex items-start gap-3">
                  <span class="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-400 flex-shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <p class="text-sm font-medium text-slate-900 dark:text-white">
                      {step.label}
                    </p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
