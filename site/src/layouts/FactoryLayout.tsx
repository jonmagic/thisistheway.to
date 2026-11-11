import { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";
import { useLocation } from "preact-iso";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

export const FACTORY_CHAPTERS = [
  { href: "/eng-loops/start", label: "1. Start with one job", shortLabel: "1. Start" },
  { href: "/eng-loops/recovery", label: "2. Recover the work", shortLabel: "2. Recover" },
  { href: "/eng-loops/repository", label: "3. Put the repository in charge", shortLabel: "3. Repository" },
  { href: "/eng-loops/improvement", label: "4. Improve the loop", shortLabel: "4. Improve" },
  { href: "/eng-loops/exploration", label: "5. Explore another approach", shortLabel: "5. Explore" },
] as const;

interface FactoryLayoutProps {
  title: string;
  children: ComponentChildren;
}

export const FACTORY_COPY_BUTTON = `<button type="button" class="copy-code" aria-label="Copy code example"><svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></svg><span class="copy-feedback" aria-live="polite"></span></button>`;

const copyFeedbackTimers = new WeakMap<HTMLButtonElement, number>();

function showCopyFeedback(button: HTMLButtonElement, feedback: HTMLElement, message: string, state: "copied" | "error") {
  window.clearTimeout(copyFeedbackTimers.get(button));
  feedback.textContent = message;
  button.dataset.state = state;
  button.setAttribute("aria-label", state === "copied" ? "Copy code example, copied" : message);
  copyFeedbackTimers.set(button, window.setTimeout(() => {
    feedback.textContent = "";
    delete button.dataset.state;
    button.setAttribute("aria-label", "Copy code example");
    copyFeedbackTimers.delete(button);
  }, state === "copied" ? 2000 : 6000));
}

export function FactoryLayout({ title, children }: FactoryLayoutProps) {
  const { path } = useLocation();
  const chapterIndex = FACTORY_CHAPTERS.findIndex((chapter) => chapter.href === path);
  const previousChapter = chapterIndex === 0
    ? { href: "/eng-loops", label: "Overview" }
    : FACTORY_CHAPTERS[chapterIndex - 1];
  const nextChapter = FACTORY_CHAPTERS[chapterIndex + 1];

  useEffect(() => {
    document.title = `${title} | ThisIsTheWay.to`;

  }, [title]);

  const copyCode = async (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>(".copy-code");
    if (!button) return;

    const code = button.parentElement?.querySelector("code");
    const feedback = button.querySelector<HTMLElement>(".copy-feedback");
    if (!feedback) {
      button.textContent = "Code unavailable";
      button.dataset.state = "error";
      button.setAttribute("aria-label", "Code unavailable");
      return;
    }
    if (!code) {
      showCopyFeedback(button, feedback, "Code unavailable", "error");
      return;
    }

    try {
      await navigator.clipboard.writeText(code.textContent ?? "");
      showCopyFeedback(button, feedback, "Copied", "copied");
    } catch {
      showCopyFeedback(button, feedback, "Copy failed. Select the text instead", "error");
    }
  };

  const chapters = () => (
    <ol class="space-y-2">
      {FACTORY_CHAPTERS.map(({ href, label }) => (
        <li key={href}>
          <a
            href={href}
            aria-current={path === href ? "page" : undefined}
            class={cn(
              "block hover:text-blueprint-500 dark:hover:text-blueprint-400",
              path === href
                ? "font-semibold text-blueprint-600 dark:text-blueprint-400"
                : "text-slate-600 dark:text-slate-400"
            )}
          >
            {label}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <div class="factory-guide min-h-screen transition-colors">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12">
          <main class="min-w-0 py-12 lg:py-16">
            <nav aria-label="Site navigation" class="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a href="/" class="text-blueprint-500 hover:underline dark:text-blueprint-400">← ThisIsTheWay.to</a>
              <a href="/ai" class="text-slate-600 hover:underline dark:text-slate-400">Build with AI Agents</a>
            </nav>
            {title !== "Practice continuous agentic engineering" && (
              <header class="mb-8">
                <a href="/eng-loops" class="text-sm font-semibold text-blueprint-600 hover:underline dark:text-blueprint-400">
                  Practice continuous agentic engineering
                </a>
              </header>
            )}
            <nav aria-label="Practice continuous agentic engineering chapters" class="mb-8 flex flex-wrap gap-x-4 gap-y-2 border-b border-slate-200 pb-4 text-sm dark:border-slate-700 lg:hidden">
              <a
                href="/eng-loops"
                aria-current={path === "/eng-loops" ? "page" : undefined}
                class={path === "/eng-loops" ? "font-semibold text-blueprint-600 dark:text-blueprint-400" : "text-slate-600 dark:text-slate-400"}
              >
                Overview
              </a>
              {FACTORY_CHAPTERS.map(({ href, shortLabel }) => (
                <a
                  key={href}
                  href={href}
                  aria-current={path === href ? "page" : undefined}
                  class={path === href ? "font-semibold text-blueprint-600 dark:text-blueprint-400" : "text-slate-600 dark:text-slate-400"}
                >
                  {shortLabel}
                </a>
              ))}
            </nav>
            <article class="prose-container factory-article" onClick={copyCode}>
              {children}
            </article>
            {(previousChapter || nextChapter) && (
              <nav aria-label="Continue guide" class="mt-12 flex flex-wrap justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-700">
                {previousChapter && (
                  <a href={previousChapter.href} class="font-semibold text-blueprint-600 hover:underline dark:text-blueprint-400">
                    ← Previous: {previousChapter.label}
                  </a>
                )}
                {nextChapter && (
                  <a href={nextChapter.href} class="font-semibold text-blueprint-600 hover:underline dark:text-blueprint-400">
                    Next: {nextChapter.label} →
                  </a>
                )}
              </nav>
            )}
            <Footer llmsTxtPath="/eng-loops/llms.txt" />
          </main>
          <aside class="hidden lg:block">
            <nav aria-label="Practice continuous agentic engineering chapters" class="sticky top-4 py-16 text-sm">
              <a href="/eng-loops" aria-current={path === "/eng-loops" ? "page" : undefined} class={cn("mb-5 block hover:underline", path === "/eng-loops" ? "font-semibold text-blueprint-600 dark:text-blueprint-400" : "text-slate-600 dark:text-slate-400")}>
                Overview
              </a>
              {chapters()}
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}
