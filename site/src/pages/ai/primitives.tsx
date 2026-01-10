import { AILayout } from "@/layouts/AILayout";
import { Section } from "@/components/content/Section";
import { RelatedLinks } from "@/components/content/RelatedLinks";

export function AIPrimitives() {
  return (
    <AILayout
      title="The Five Levers"
      subtitle="What you can change to improve agent behavior"
    >
      <Section>
        <p>
          When an agent misses, the fix usually maps to one of five levers.
          Understanding these gives you a vocabulary for diagnosing problems and
          choosing interventions.
        </p>
      </Section>

      <Section id="observability">
        <h2>1. Observability</h2>
        <p>
          Can the agent see what it needs to see? This includes access to source
          files, schemas, logs, and runtime state.
        </p>
        <p>
          Most hallucinations trace back here. The agent invents an API field
          because the schema wasn't in scope. It guesses a file path because the
          directory structure wasn't visible. It fabricates a CLI flag because
          the help text wasn't accessible.
        </p>
        <p>
          The fix isn't "try harder"—it's making the source of truth
          discoverable. Put the schema in the repo. Add a manifest that lists
          valid paths. Ensure documentation is where the agent will look for it.
        </p>
        <p>
          <strong>Reach for this when:</strong> the agent confidently invents
          things that don't exist, or misses context that seems "obvious" to you.
        </p>
      </Section>

      <Section id="instructions">
        <h2>2. Instructions</h2>
        <p>
          Does the agent know what "good" looks like? Instructions encode norms,
          constraints, and conventions.
        </p>
        <p>
          This is where you capture the implicit rules that live in your head.
          "We always use named exports." "Error messages should include the
          operation that failed." "Never commit directly to main." These feel
          obvious—until the agent violates them because nobody wrote them down.
        </p>
        <p>
          Instructions work best when they're specific and scoped. A wall of
          text gets ignored. A short rule at the right moment changes behavior.
          Put instructions close to where they matter: in the repo, in the
          project config, in a skill definition.
        </p>
        <p>
          <strong>Reach for this when:</strong> the agent does something
          "wrong" that isn't technically incorrect—it just violates a norm you
          haven't articulated.
        </p>
      </Section>

      <Section id="tools">
        <h2>3. Tools</h2>
        <p>
          Can the agent take the right actions? Tools extend what the agent can
          do—fetching data, running commands, interacting with systems.
        </p>
        <p>
          Sometimes the agent knows what it needs but can't get there. It needs
          to query a database, hit an API, run a build, or check the state of a
          service. Without tools, it's forced to guess or ask you to do it
          manually.
        </p>
        <p>
          Good tools are focused and composable. They do one thing well and
          return structured output the agent can reason about. A tool that dumps
          too much data is almost as bad as no tool—the signal gets lost in
          noise.
        </p>
        <p>
          <strong>Reach for this when:</strong> the agent needs runtime
          information it can't get from static files, or when manual
          copy-paste is becoming a bottleneck.
        </p>
      </Section>

      <Section id="guardrails">
        <h2>4. Guardrails</h2>
        <p>
          What should the agent <em>not</em> do? Guardrails constrain behavior,
          preventing classes of mistakes before they happen.
        </p>
        <p>
          Freedom is expensive. An agent with unlimited scope will eventually
          wander into dangerous territory: modifying files it shouldn't touch,
          running commands with side effects, making changes that are hard to
          reverse.
        </p>
        <p>
          Guardrails work by shrinking the action space. Allowlists beat
          blocklists—it's easier to say "only touch these directories" than to
          enumerate everything that's off-limits. The best guardrails are
          invisible when you're doing the right thing and loud when you're not.
        </p>
        <p>
          <strong>Reach for this when:</strong> the agent keeps making the same
          category of mistake, or when the cost of a wrong action is high enough
          that you'd rather prevent it than detect it.
        </p>
      </Section>

      <Section id="verification">
        <h2>5. Verification / Evals</h2>
        <p>
          How does the agent know it succeeded? Verification provides feedback
          loops—tests, linters, visual checks, evals.
        </p>
        <p>
          Without verification, the agent is flying blind. It can write code
          that looks plausible, claim it's done, and move on—never knowing
          whether the change actually worked. This is how "taste-misses" and
          "process-misses" happen: technically complete, practically broken.
        </p>
        <p>
          Verification closes the loop. Tests prove behavior. Linters enforce
          style. Type checkers catch structural errors. Visual evals catch UI
          regressions. The more immediate the feedback, the better—a failure
          the agent sees during the task is worth ten it discovers later.
        </p>
        <p>
          <strong>Reach for this when:</strong> the agent claims "done" but
          the result doesn't match expectations, or when you're catching errors
          in review that should have been caught automatically.
        </p>
      </Section>

      <RelatedLinks
        links={[
          {
            href: "https://agentconfig.org",
            title: "Configuration Primitives Reference",
            source: "agentconfig.org",
          },
          {
            href: "https://jonmagic.com/posts/turning-agent-misses-into-systemic-improvements/",
            title: "Turning Agent Misses into Systemic Improvements",
            source: "jonmagic.com",
          },
        ]}
      />
    </AILayout>
  );
}
