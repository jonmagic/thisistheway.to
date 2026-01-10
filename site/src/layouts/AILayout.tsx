import { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";
import { useLocation } from "preact-iso";
import { cn } from "@/lib/utils";
import { ReadingProgress } from "@/components/nav/ReadingProgress";
import { LoopNavigator } from "@/components/nav/LoopNavigator";
import { BottomDrawer } from "@/components/nav/BottomDrawer";
import { Footer } from "@/components/Footer";

interface AILayoutProps {
  children: ComponentChildren;
  title: string;
  subtitle?: string;
  /** If true, this is the section index page (no section subtitle shown) */
  isIndex?: boolean;
}

const NAV_ITEMS = [
  { href: "/ai", label: "Overview" },
  { href: "/ai/primitives", label: "The Five Levers" },
  { href: "/ai/miss-taxonomy", label: "How Agents Fail" },
  { href: "/ai/graduation", label: "Tightening the Loop" },
];

/**
 * Layout wrapper for all /ai/* pages
 * - Two-column grid on desktop: content + right rail
 * - Single column on mobile
 * - Sticky right rail navigation
 * - Reading progress bar
 */
export function AILayout({ children, title, subtitle, isIndex = false }: AILayoutProps) {
  const { path } = useLocation();

  useEffect(() => {
    document.title = isIndex
      ? "ThisIsTheWay.to AI"
      : `${title} | ThisIsTheWay.to AI`;
  }, [title, isIndex]);

  return (
    <div class="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <ReadingProgress />

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
                ← ThisIsTheWay.to
              </a>
              <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Build with AI Agents
              </h1>
              {!isIndex && (
                <h2 class="mt-2 text-xl sm:text-2xl font-semibold text-blueprint-500 dark:text-blueprint-400">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p class="mt-3 text-lg text-slate-600 dark:text-slate-400">
                  {subtitle}
                </p>
              )}
            </header>

            <article class="prose-container">{children}</article>

            <Footer />
          </main>

          {/* Right rail - hidden on mobile */}
          <aside class="hidden lg:block">
            <nav class="sticky top-4 py-16">
              <p class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                In this section
              </p>
              <ul class="space-y-2 text-sm">
                {NAV_ITEMS.map((item) => {
                  const isActive = path === item.href;
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        class={cn(
                          "block transition-colors",
                          isActive
                            ? "text-blueprint-500 dark:text-blueprint-400 font-medium"
                            : "text-slate-600 hover:text-blueprint-500 dark:text-slate-400 dark:hover:text-blueprint-400"
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div class="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                <p class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  The Loop
                </p>
                <LoopNavigator compact />
              </div>
            </nav>
          </aside>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      <BottomDrawer />
    </div>
  );
}
