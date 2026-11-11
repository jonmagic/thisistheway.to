import { LocationProvider, Router, Route } from "preact-iso";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { AIIndex } from "@/pages/ai/index";
import { AIPrimitives } from "@/pages/ai/primitives";
import { AIMissTaxonomy } from "@/pages/ai/miss-taxonomy";
import { AIGraduation } from "@/pages/ai/graduation";
import { AgentFactory } from "@/pages/AgentFactory";
import { FactoryStart } from "@/pages/factory/start";
import { FactoryRecovery } from "@/pages/factory/recover";
import { FactoryRepository } from "@/pages/factory/repository";
import { FactoryImprovement } from "@/pages/factory/improve";
import { FactoryExploration } from "@/pages/factory/explore";
import { GuideRedirect } from "@/pages/GuideRedirect";

export function App() {
  return (
    <LocationProvider>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/ai" component={AIIndex} />
        <Route path="/ai/primitives" component={AIPrimitives} />
        <Route path="/ai/miss-taxonomy" component={AIMissTaxonomy} />
        <Route path="/ai/graduation" component={AIGraduation} />
        <Route path="/eng-loops" component={AgentFactory} />
        <Route path="/eng-loops/start" component={FactoryStart} />
        <Route path="/eng-loops/recovery" component={FactoryRecovery} />
        <Route path="/eng-loops/repository" component={FactoryRepository} />
        <Route path="/eng-loops/improvement" component={FactoryImprovement} />
        <Route path="/eng-loops/exploration" component={FactoryExploration} />
        <Route path="/factory" component={GuideRedirect} />
        <Route path="/factory/start" component={GuideRedirect} />
        <Route path="/factory/recovery" component={GuideRedirect} />
        <Route path="/factory/repository" component={GuideRedirect} />
        <Route path="/factory/improvement" component={GuideRedirect} />
        <Route path="/factory/exploration" component={GuideRedirect} />
        <Route path="/eng-loop" component={GuideRedirect} />
        <Route path="/eng-loop/start" component={GuideRedirect} />
        <Route path="/eng-loop/recovery" component={GuideRedirect} />
        <Route path="/eng-loop/repository" component={GuideRedirect} />
        <Route path="/eng-loop/improvement" component={GuideRedirect} />
        <Route path="/eng-loop/exploration" component={GuideRedirect} />
        <Route default component={NotFound} />
      </Router>
    </LocationProvider>
  );
}
