import { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";
import { useLocation } from "preact-iso";
import { Footer } from "@/components/Footer";
import { ReadingProgress } from "@/components/nav/ReadingProgress";
import { cn } from "@/lib/utils";

export const ENGINE_CHAPTERS = [
  {
    href: "/engine/state-and-contracts",
    num: "01",
    label: "1. State & Contracts",
    fullTitle: "State & Contracts Outside the Context Window",
    shortLabel: "1. State",
    summary:
      "Replace ephemeral chat history with content-hashed Markdown goal contracts, isolated Git worktrees, durable commit trailers, raw evidence logs, and a local transactional ledger.",
  },
  {
    href: "/engine/verification-and-landing",
    num: "02",
    label: "2. Verification & Landing",
    fullTitle: "Independent Verification & Transactional Landing",
    shortLabel: "2. Verify",
    summary:
      "Separate building from judging using deterministic gates, fresh-context independent review, rebase-then-verify landing checks, and culprit-only rollback that spares innocent commits.",
  },
  {
    href: "/engine/liveness-and-recovery",
    num: "03",
    label: "3. Never Getting Stuck",
    fullTitle: "Never Getting Stuck: Watchdogs, Recovery & Liveness",
    shortLabel: "3. Liveness",
    summary:
      "Treat stuckness as a first-class engineering problem with process-group watchdogs, livelock detection, network parking, oscillation guards, and exhaustive finite-state liveness checks.",
  },
  {
    href: "/engine/ambition-and-steering",
    num: "04",
    label: "4. Ambition & Steering",
    fullTitle: "Ambition, Self-Improvement & Human Steering",
    shortLabel: "4. Ambition",
    summary:
      "Keep ambitious work moving without babysitting via non-blocking approval queues, a read-only planner guided by an ambition document, recurring failure self-improvement, and metric-gated experiments.",
  },
  {
    href: "/engine/multiplayer-coordination",
    num: "05",
    label: "5. Multiplayer & Sync",
    fullTitle: "Multiplayer & Multi-Machine Coordination",
    shortLabel: "5. Multiplayer",
    summary:
      "Share an engine across teammates and machines with issue-to-PR intake, bidirectional remote sync, atomic remote Git ref leases, and landing-time trailer deduplication.",
  },
] as const;

interface EngineLayoutProps {
  title: string;
  isOverview?: boolean;
  children: ComponentChildren;
}

export function EngineLayout({
  title,
  isOverview = false,
  children,
}: EngineLayoutProps) {
  const { path } = useLocation();
  const chapterIndex = ENGINE_CHAPTERS.findIndex((c) => c.href === path);
  const previousChapter =
    chapterIndex === 0
      ? { href: "/engine", label: "Overview" }
      : chapterIndex > 0
      ? ENGINE_CHAPTERS[chapterIndex - 1]
      : undefined;
  const nextChapter =
    isOverview
      ? ENGINE_CHAPTERS[0]
      : chapterIndex >= 0
      ? ENGINE_CHAPTERS[chapterIndex + 1]
      : undefined;

  useEffect(() => {
    document.title = isOverview
      ? "Build a Continuous Software Engine | ThisIsTheWay.to"
      : `${title} | Continuous Software Engine | ThisIsTheWay.to`;
  }, [title, isOverview]);

  return (
    <div class="ce-guide min-h-screen transition-colors">
      <ReadingProgress />
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12">
          <main class="min-w-0 py-12 lg:py-16">
            <nav
              aria-label="Site navigation"
              class="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm"
            >
              <a
                href="/"
                class="text-blueprint-500 hover:underline dark:text-blueprint-400"
              >
                ← ThisIsTheWay.to
              </a>
              <a
                href="/ai"
                class="text-slate-600 hover:text-blueprint-500 hover:underline dark:text-slate-400 dark:hover:text-blueprint-400"
              >
                Build with AI Agents
              </a>
            </nav>

            {!isOverview && (
              <header class="mb-6">
                <a
                  href="/engine"
                  class="text-sm font-semibold text-blueprint-600 hover:underline dark:text-blueprint-400"
                >
                  Build a Continuous Software Engine
                </a>
              </header>
            )}

            <nav
              aria-label="Continuous software engine chapters"
              class="mb-8 flex flex-wrap gap-x-4 gap-y-2 border-b border-slate-200 pb-4 text-sm dark:border-slate-700 lg:hidden"
            >
              <a
                href="/engine"
                aria-current={path === "/engine" ? "page" : undefined}
                class={cn(
                  "rounded px-1.5 py-0.5 transition-colors",
                  path === "/engine"
                    ? "bg-blueprint-50 font-semibold text-blueprint-600 dark:bg-blueprint-900/40 dark:text-blueprint-400"
                    : "text-slate-600 hover:text-blueprint-500 dark:text-slate-400 dark:hover:text-blueprint-400"
                )}
              >
                Overview
              </a>
              {ENGINE_CHAPTERS.map(({ href, shortLabel }) => (
                <a
                  key={href}
                  href={href}
                  aria-current={path === href ? "page" : undefined}
                  class={cn(
                    "rounded px-1.5 py-0.5 transition-colors",
                    path === href
                      ? "bg-blueprint-50 font-semibold text-blueprint-600 dark:bg-blueprint-900/40 dark:text-blueprint-400"
                      : "text-slate-600 hover:text-blueprint-500 dark:text-slate-400 dark:hover:text-blueprint-400"
                  )}
                >
                  {shortLabel}
                </a>
              ))}
            </nav>

            <article class="prose-container ce-article">{children}</article>

            {(previousChapter || nextChapter) && (
              <nav
                aria-label="Continue guide"
                class="mt-12 flex flex-wrap justify-between gap-4 border-t border-slate-200 pt-6 text-sm dark:border-slate-700"
              >
                {previousChapter ? (
                  <a
                    href={previousChapter.href}
                    class="font-semibold text-blueprint-600 hover:underline dark:text-blueprint-400"
                  >
                    ← Previous: {previousChapter.label}
                  </a>
                ) : (
                  <span />
                )}
                {nextChapter && (
                  <a
                    href={nextChapter.href}
                    class="font-semibold text-blueprint-600 hover:underline dark:text-blueprint-400"
                  >
                    Next: {nextChapter.label} →
                  </a>
                )}
              </nav>
            )}

            <Footer llmsTxtPath="/engine/llms.txt" />
          </main>

          <aside class="hidden lg:block">
            <nav
              aria-label="Continuous software engine chapters"
              class="sticky top-4 py-16 text-sm"
            >
              <p class="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                The Guide
              </p>
              <a
                href="/engine"
                aria-current={path === "/engine" ? "page" : undefined}
                class={cn(
                  "mb-3 block rounded px-2 py-1 transition-colors",
                  path === "/engine"
                    ? "bg-blueprint-50 font-semibold text-blueprint-600 dark:bg-blueprint-900/40 dark:text-blueprint-400"
                    : "text-slate-600 hover:text-blueprint-500 dark:text-slate-400 dark:hover:text-blueprint-400"
                )}
              >
                Overview &amp; Ethos
              </a>
              <ol class="space-y-1.5">
                {ENGINE_CHAPTERS.map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      aria-current={path === href ? "page" : undefined}
                      class={cn(
                        "block rounded px-2 py-1 transition-colors",
                        path === href
                          ? "bg-blueprint-50 font-semibold text-blueprint-600 dark:bg-blueprint-900/40 dark:text-blueprint-400"
                          : "text-slate-600 hover:text-blueprint-500 dark:text-slate-400 dark:hover:text-blueprint-400"
                      )}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}
