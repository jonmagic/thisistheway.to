import { AILayout } from "@/layouts/AILayout";
import { Section } from "@/components/content/Section";
import { RelatedLinks } from "@/components/content/RelatedLinks";

export function AIPrimitives() {
  return (
    <AILayout
      title="Primitives"
      subtitle="The five knobs you can turn to improve agent behavior"
    >
      <Section>
        <p>
          When an agent misses, the fix usually maps to one of five primitives.
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
          <em>Content coming soon...</em>
        </p>
      </Section>

      <Section id="instructions">
        <h2>2. Instructions</h2>
        <p>
          Does the agent know what "good" looks like? Instructions encode norms,
          constraints, and conventions.
        </p>
        <p>
          <em>Content coming soon...</em>
        </p>
      </Section>

      <Section id="tools">
        <h2>3. Tools</h2>
        <p>
          Can the agent take the right actions? Tools extend what the agent can
          do—fetching data, running commands, interacting with systems.
        </p>
        <p>
          <em>Content coming soon...</em>
        </p>
      </Section>

      <Section id="guardrails">
        <h2>4. Guardrails</h2>
        <p>
          What should the agent <em>not</em> do? Guardrails constrain behavior,
          preventing classes of mistakes before they happen.
        </p>
        <p>
          <em>Content coming soon...</em>
        </p>
      </Section>

      <Section id="verification">
        <h2>5. Verification / Evals</h2>
        <p>
          How does the agent know it succeeded? Verification provides feedback
          loops—tests, linters, visual checks, evals.
        </p>
        <p>
          <em>Content coming soon...</em>
        </p>
      </Section>

      <RelatedLinks
        links={[
          {
            href: "https://agentconfig.org",
            title: "Configuration Primitives Reference",
            source: "agentconfig.org",
            description:
              "Where to put instructions, skills, and agent definitions across different tools.",
          },
          {
            href: "https://jonmagic.com/posts/turning-agent-misses-into-systemic-improvements/#what-i-learned",
            title: "What I Learned",
            source: "jonmagic.com",
            description:
              "Lessons from applying these primitives in practice.",
          },
        ]}
      />
    </AILayout>
  );
}
