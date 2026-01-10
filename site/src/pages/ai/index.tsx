export function AIIndex() {
  return (
    <main class="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <div class="max-w-prose mx-auto px-6 py-16">
        <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Building with AI Agents
        </h1>
        <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Turning misses into systemic improvements
        </p>

        <section class="mt-12">
          <h2 class="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            The Improvement Loop
          </h2>
          <p class="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            Every agent miss is a learning opportunity. The goal isn't to
            prevent all failures—it's to build systems that learn from them.
          </p>
          <p class="mt-4 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            Content coming soon...
          </p>
        </section>

        <nav class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Explore the framework:
          </p>
          <ul class="space-y-2">
            <li>
              <a
                href="/ai/primitives"
                class="text-blueprint-500 hover:text-blueprint-600 dark:text-blueprint-400 dark:hover:text-blueprint-300"
              >
                Primitives →
              </a>
            </li>
            <li>
              <a
                href="/ai/miss-taxonomy"
                class="text-blueprint-500 hover:text-blueprint-600 dark:text-blueprint-400 dark:hover:text-blueprint-300"
              >
                Miss Taxonomy →
              </a>
            </li>
            <li>
              <a
                href="/ai/graduation"
                class="text-blueprint-500 hover:text-blueprint-600 dark:text-blueprint-400 dark:hover:text-blueprint-300"
              >
                Graduation →
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
