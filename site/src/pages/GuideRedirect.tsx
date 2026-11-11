import { useEffect } from "preact/hooks";
import { useLocation } from "preact-iso";

const oldGuidePath = /^\/(?:factory|eng-loop)(?=\/|$)/;

export function GuideRedirect() {
  const { path } = useLocation();
  const destination = path.replace(oldGuidePath, "/eng-loops");

  useEffect(() => {
    const url = new URL(window.location.href);
    url.pathname = url.pathname.replace(oldGuidePath, "/eng-loops");
    window.location.replace(url.href);
  }, [path]);

  return <main>This guide moved to <a href={destination}>Practice continuous agentic engineering</a>.</main>;
}
