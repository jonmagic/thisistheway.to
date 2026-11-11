import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: "#app",
        previewMiddlewareEnabled: true,
        additionalPrerenderRoutes: [
          "/404",
          ...["/factory", "/eng-loop"].flatMap((base) =>
            ["", "/start", "/recovery", "/repository", "/improvement", "/exploration"].map((suffix) => `${base}${suffix}`)
          ),
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
