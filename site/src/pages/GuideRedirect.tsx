import { useEffect } from "preact/hooks";
import { useLocation } from "preact-iso";

const DESTINATION = "/engine";

export function GuideRedirect() {
  const { path } = useLocation();

  useEffect(() => {
    const url = new URL(window.location.href);
    url.pathname = DESTINATION;
    window.location.replace(url.href);
  }, [path]);

  return (
    <main class="min-h-screen bg-white dark:bg-slate-900 p-8 text-slate-700 dark:text-slate-300">
      This guide moved to{" "}
      <a
        href={DESTINATION}
        class="font-semibold text-blueprint-500 underline dark:text-blueprint-400"
      >
        Build a Continuous Software Engine
      </a>
      .
    </main>
  );
}
