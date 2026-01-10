import { AILayout } from "@/layouts/AILayout";
import { Callout } from "@/components/content/Callout";
import { Section } from "@/components/content/Section";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { LoopNavigator } from "@/components/nav/LoopNavigator";

export function AIIndex() {
  return (
    <AILayout
      title="Build with AI Agents"
      subtitle="Turning misses into systemic improvements"
      isIndex
    >
      <Section id="improvement-loop">
        <h2>The Improvement Loop</h2>
        <p>
          Every agent miss is a learning opportunity. The goal isn't to prevent
          all failures—it's to build systems that learn from them.
        </p>
        <p>
          Agents don't fail because they're lazy. They fail because they can't
          see. Sometimes the information isn't present. Sometimes there's no
          feedback loop. Sometimes we gave them too much freedom.
        </p>
        <p>
          So the job isn't to write the perfect prompt. The job is to{" "}
          <strong>
            design an environment where the easiest path is the correct one
          </strong>
          .
        </p>

        <Callout variant="field-note">
          <p>
            The best teams treat agent failures like production incidents—worthy
            of postmortems and systemic fixes, not just quick patches.
          </p>
        </Callout>
      </Section>

      <Section id="the-loop">
        <h2>The Loop</h2>
        <p>When something goes wrong, the response pattern is:</p>

        <LoopNavigator />

        <ol>
          <li>
            <strong>Capture the miss</strong> — What did the agent do? What did
            reality say?
          </li>
          <li>
            <strong>Diagnose</strong> — What didn't it see? Missing data,
            constraint, feedback, or boundaries?
          </li>
          <li>
            <strong>Choose a primitive</strong> — Observability, instructions,
            tooling, guardrails, or verification?
          </li>
          <li>
            <strong>Encode as artifact</strong> — Version-controlled, repeatable,
            not just memory.
          </li>
          <li>
            <strong>Promote to gate</strong> — When it's worth enforcing, make it
            a gate.
          </li>
        </ol>

        <Callout variant="gate-candidate">
          <p>
            If you've fixed the same class of miss twice this week, it's time to
            consider making it a gate.
          </p>
        </Callout>
      </Section>

      <Section id="explore">
        <h2>Explore the Framework</h2>
        <ul>
          <li>
            <a href="/ai/primitives">The Five Levers</a> — What you can change
          </li>
          <li>
            <a href="/ai/miss-taxonomy">How Agents Fail</a> — Common failure
            patterns
          </li>
          <li>
            <a href="/ai/graduation">Tightening the Loop</a> — When guidance
            becomes enforcement
          </li>
        </ul>
      </Section>

      <RelatedLinks
        links={[
          {
            href: "https://jonmagic.com/posts/turning-agent-misses-into-systemic-improvements/",
            title: "Turning Agent Misses into Systemic Improvements",
            source: "jonmagic.com",
          },
          {
            href: "https://agentconfig.org",
            title: "Agent Config Reference",
            source: "agentconfig.org",
          },
        ]}
      />
    </AILayout>
  );
}
