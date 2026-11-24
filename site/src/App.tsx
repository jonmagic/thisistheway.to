import { LocationProvider, Router, Route } from "preact-iso";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { AIIndex } from "@/pages/ai/index";
import { AIPrimitives } from "@/pages/ai/primitives";
import { AIMissTaxonomy } from "@/pages/ai/miss-taxonomy";
import { AIGraduation } from "@/pages/ai/graduation";
import { EngineIndex } from "@/pages/engine/index";
import { StateAndContractsPage } from "@/pages/engine/state-and-contracts";
import { VerificationAndLandingPage } from "@/pages/engine/verification-and-landing";
import { LivenessAndRecoveryPage } from "@/pages/engine/liveness-and-recovery";
import { AmbitionAndSteeringPage } from "@/pages/engine/ambition-and-steering";
import { MultiplayerCoordinationPage } from "@/pages/engine/multiplayer-coordination";
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
        <Route path="/engine" component={EngineIndex} />
        <Route path="/engine/state-and-contracts" component={StateAndContractsPage} />
        <Route path="/engine/verification-and-landing" component={VerificationAndLandingPage} />
        <Route path="/engine/liveness-and-recovery" component={LivenessAndRecoveryPage} />
        <Route path="/engine/ambition-and-steering" component={AmbitionAndSteeringPage} />
        <Route path="/engine/multiplayer-coordination" component={MultiplayerCoordinationPage} />
        <Route path="/eng-loops" component={GuideRedirect} />
        <Route path="/eng-loops/start" component={GuideRedirect} />
        <Route path="/eng-loops/recovery" component={GuideRedirect} />
        <Route path="/eng-loops/repository" component={GuideRedirect} />
        <Route path="/eng-loops/improvement" component={GuideRedirect} />
        <Route path="/eng-loops/exploration" component={GuideRedirect} />
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
