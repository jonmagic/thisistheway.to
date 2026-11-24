import { hydrate, prerender as ssr } from "preact-iso";
import { App } from "./App";
import { getPageMeta, SITE_ORIGIN } from "./lib/seo";
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
export async function prerender(data?: { url?: string }) {
  const result = await ssr(<App />);
  for (const link of result.links ?? []) {
    if (new URL(link, "http://localhost").pathname.endsWith(".txt")) {
      result.links?.delete(link);
    }
  }

  const meta = getPageMeta(data?.url);
  const canonicalUrl = `${SITE_ORIGIN}${meta.canonicalPath}`;
  const imageUrl = `${SITE_ORIGIN}${meta.image}`;

  return {
    ...result,
    head: {
      lang: "en",
      title: meta.title,
      elements: new Set([
        { type: "meta", props: { name: "description", content: meta.description } },
        { type: "link", props: { rel: "canonical", href: canonicalUrl } },
        { type: "meta", props: { property: "og:site_name", content: "ThisIsTheWay.to" } },
        { type: "meta", props: { property: "og:type", content: meta.type } },
        { type: "meta", props: { property: "og:title", content: meta.ogTitle } },
        { type: "meta", props: { property: "og:description", content: meta.description } },
        { type: "meta", props: { property: "og:url", content: canonicalUrl } },
        { type: "meta", props: { property: "og:image", content: imageUrl } },
        { type: "meta", props: { property: "og:image:width", content: "1200" } },
        { type: "meta", props: { property: "og:image:height", content: "630" } },
        { type: "meta", props: { property: "og:image:alt", content: meta.imageAlt } },
        { type: "meta", props: { name: "twitter:card", content: "summary_large_image" } },
        { type: "meta", props: { name: "twitter:title", content: meta.ogTitle } },
        { type: "meta", props: { name: "twitter:description", content: meta.description } },
        { type: "meta", props: { name: "twitter:image", content: imageUrl } },
        { type: "meta", props: { name: "twitter:image:alt", content: meta.imageAlt } },
      ]),
    },
  };
}
