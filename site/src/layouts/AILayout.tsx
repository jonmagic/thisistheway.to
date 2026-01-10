import { ComponentChildren } from "preact";

interface AILayoutProps {
  children: ComponentChildren;
  title: string;
  subtitle?: string;
}

/**
 * Layout wrapper for all /ai/* pages
 * - Two-column grid on desktop: content + right rail
 * - Single column on mobile
 * - Sticky right rail navigation
 */
export function AILayout({ children, title, subtitle }: AILayoutProps) {
  return (
    <div class="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      {/* Main container */}
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
          {/* Main content area */}
          <main class="py-12 lg:py-16">
            <header class="mb-10">
              <a
                href="/"
                class="text-sm text-slate-500 dark:text-slate-400 hover:text-blueprint-500 dark:hover:text-blueprint-400 mb-4 inline-block"
              >
                ← thisistheway.to
              </a>
              <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                {title}
              </h1>
              {subtitle && (
                <p class="mt-3 text-lg text-slate-600 dark:text-slate-400">
                  {subtitle}
                </p>
              )}
            </header>

            <article class="prose-container">{children}</article>
          </main>

          {/* Right rail - hidden on mobile */}
          <aside class="hidden lg:block">
            <nav class="sticky top-8 py-16">
              <p class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                In this section
              </p>
              <ul class="space-y-2 text-sm">
                <li>
                  <a
                    href="/ai"
                    class="text-slate-600 hover:text-blueprint-500 dark:text-slate-400 dark:hover:text-blueprint-400"
                  >
                    Overview
                  </a>
                </li>
                <li>
                  <a
                    href="/ai/primitives"
                    class="text-slate-600 hover:text-blueprint-500 dark:text-slate-400 dark:hover:text-blueprint-400"
                  >
                    Primitives
                  </a>
                </li>
                <li>
                  <a
                    href="/ai/miss-taxonomy"
                    class="text-slate-600 hover:text-blueprint-500 dark:text-slate-400 dark:hover:text-blueprint-400"
                  >
                    Miss Taxonomy
                  </a>
                </li>
                <li>
                  <a
                    href="/ai/graduation"
                    class="text-slate-600 hover:text-blueprint-500 dark:text-slate-400 dark:hover:text-blueprint-400"
                  >
                    Graduation
                  </a>
                </li>
              </ul>

              <div class="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                <p class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  The Loop
                </p>
                <ol class="text-xs space-y-1.5 text-slate-500 dark:text-slate-500">
                  <li class="flex items-center gap-2">
                    <span class="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px]">
                      1
                    </span>
                    Miss
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px]">
                      2
                    </span>
                    Diagnosis
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px]">
                      3
                    </span>
                    Primitive
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px]">
                      4
                    </span>
                    Artifact
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px]">
                      5
                    </span>
                    Gate
                  </li>
                </ol>
              </div>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}
