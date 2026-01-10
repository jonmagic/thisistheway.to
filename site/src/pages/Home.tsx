export function Home() {
  return (
    <main class="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <div class="max-w-prose mx-auto px-6 py-16">
        <h1 class="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          ThisIsTheWay<span class="text-slate-400 dark:text-slate-500">.to</span>
        </h1>
        <nav class="mt-6">
          <a
            href="/ai"
            class="text-xl font-semibold text-blueprint-500 hover:text-blueprint-600 dark:text-blueprint-400 dark:hover:text-blueprint-300"
          >
            Build with AI Agents →
          </a>
        </nav>
      </div>
    </main>
  );
}
