import { render } from "preact";
import { App } from "./App";
import "./index.css";

const container = document.getElementById("app");
if (container) {
  render(<App />, container);
}

// Keep dark mode class in sync with system preference changes
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
mediaQuery.addEventListener("change", (e) => {
  document.documentElement.classList.toggle("dark", e.matches);
});
