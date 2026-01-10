import { hydrate, prerender as ssr } from "preact-iso";
import { App } from "./App";
import "./index.css";

// Client-side hydration
hydrate(<App />);

// Keep dark mode class in sync with system preference changes
if (typeof window !== "undefined") {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", (e) => {
    document.documentElement.classList.toggle("dark", e.matches);
  });
}

// Export prerender function for build-time static site generation
// This is called by @preact/preset-vite during the build process
export async function prerender() {
  return await ssr(<App />);
}
