import { useReadingProgress } from "@/lib/hooks/useReadingProgress";

/**
 * Reading progress bar - fixed at top of viewport
 * Shows how far down the page the user has scrolled
 */
export function ReadingProgress() {
  const progress = useReadingProgress();

  return (
    <div
      class="fixed top-0 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-800 z-50"
      role="progressbar"
      aria-valuenow={progress.value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        class="h-full bg-blueprint-500 transition-all duration-150 ease-out"
        style={{ width: `${progress.value}%` }}
      />
    </div>
  );
}
