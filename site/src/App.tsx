import { LocationProvider, Router, Route } from "preact-iso";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { AIIndex } from "@/pages/ai/index";
import { AIPrimitives } from "@/pages/ai/primitives";
import { AIMissTaxonomy } from "@/pages/ai/miss-taxonomy";
import { AIGraduation } from "@/pages/ai/graduation";

export function App() {
  return (
    <LocationProvider>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/ai" component={AIIndex} />
        <Route path="/ai/primitives" component={AIPrimitives} />
        <Route path="/ai/miss-taxonomy" component={AIMissTaxonomy} />
        <Route path="/ai/graduation" component={AIGraduation} />
        <Route default component={NotFound} />
      </Router>
    </LocationProvider>
  );
}
