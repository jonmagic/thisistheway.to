export function Home() {
  return (
    <main class="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <div class="max-w-prose mx-auto px-6 py-16">
        <h1 class="text-4xl font-bold tracking-tight text-blueprint-500 dark:text-blueprint-400">
          This Is The Way
        </h1>
        <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">
          To build the future.
        </p>
        <nav class="mt-8">
          <a
            href="/ai"
            class="text-blueprint-500 hover:text-blueprint-600 dark:text-blueprint-400 dark:hover:text-blueprint-300 underline"
          >
            Building with AI Agents →
          </a>
        </nav>
      </div>
    </main>
  );
}
