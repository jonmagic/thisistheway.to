import { useSignal, useComputed } from "@preact/signals";
import { useEffect } from "preact/hooks";

/**
 * Hook that tracks reading progress through the page
 * Returns a value from 0 to 100 representing percentage scrolled
 */
export function useReadingProgress() {
  const scrollY = useSignal(0);
  const documentHeight = useSignal(0);
  const windowHeight = useSignal(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateProgress = () => {
      scrollY.value = window.scrollY;
      documentHeight.value = document.documentElement.scrollHeight;
      windowHeight.value = window.innerHeight;
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const progress = useComputed(() => {
    const maxScroll = documentHeight.value - windowHeight.value;
    if (maxScroll <= 0) return 0;
    return Math.min(100, Math.max(0, (scrollY.value / maxScroll) * 100));
  });

  return progress;
}
