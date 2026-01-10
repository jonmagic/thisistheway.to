import { AILayout } from "@/layouts/AILayout";

export function AIIndex() {
  return (
    <AILayout
      title="Building with AI Agents"
      subtitle="Turning misses into systemic improvements"
    >
      <section>
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
          <strong>design an environment where the easiest path is the correct one</strong>.
        </p>
      </section>

      <section>
        <h2>The Loop</h2>
        <p>When something goes wrong, the response pattern is:</p>
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
      </section>

      <section>
        <h2>Explore the Framework</h2>
        <ul>
          <li>
            <a href="/ai/primitives">Primitives</a> — The five knobs you can turn
          </li>
          <li>
            <a href="/ai/miss-taxonomy">Miss Taxonomy</a> — Common failure patterns
          </li>
          <li>
            <a href="/ai/graduation">Graduation</a> — When guidance becomes enforcement
          </li>
        </ul>
      </section>
    </AILayout>
  );
}
