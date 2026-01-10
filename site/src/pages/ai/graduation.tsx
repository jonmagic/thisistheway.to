export function AIGraduation() {
  return (
    <main class="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <div class="max-w-prose mx-auto px-6 py-16">
        <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Graduation
        </h1>
        <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">
          When to turn advice into gates
        </p>

        <section class="mt-12">
          <h2 class="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            Graduation Criteria
          </h2>
          <p class="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            Not every improvement should become a gate. Here's how to decide
            when guidance should graduate to enforcement.
          </p>

          <div class="mt-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <p class="text-slate-600 dark:text-slate-400 italic">
              Interactive rubric widget coming soon...
            </p>
          </div>
        </section>

        <nav class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <a
            href="/ai"
            class="text-blueprint-500 hover:text-blueprint-600 dark:text-blueprint-400 dark:hover:text-blueprint-300"
          >
            ← Back to overview
          </a>
        </nav>
      </div>
    </main>
  );
}
