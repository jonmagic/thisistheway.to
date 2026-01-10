export function NotFound() {
  return (
    <main class="min-h-screen bg-white dark:bg-slate-900 transition-colors flex items-center justify-center">
      <div class="text-center px-6">
        <h1 class="text-6xl font-bold text-slate-300 dark:text-slate-700">
          404
        </h1>
        <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Page not found
        </p>
        <a
          href="/"
          class="mt-6 inline-block text-blueprint-500 hover:text-blueprint-600 dark:text-blueprint-400 dark:hover:text-blueprint-300 underline"
        >
          ← Back home
        </a>
      </div>
    </main>
  );
}
