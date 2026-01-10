import { AILayout } from "@/layouts/AILayout";

export function AIGraduation() {
  return (
    <AILayout
      title="Graduation"
      subtitle="When to turn advice into gates"
    >
      <section>
        <p>
          Not every improvement should become a gate. Gates add friction. The
          question is whether the friction is worth the protection.
        </p>
      </section>

      <section>
        <h2>Graduation Criteria</h2>
        <p>A fix should graduate from guidance to enforcement when:</p>
        <ul>
          <li>
            <strong>High frequency</strong> — You've debugged the same class of
            issue multiple times recently
          </li>
          <li>
            <strong>High blast radius</strong> — The miss can corrupt data, break
            prod, or waste significant time
          </li>
          <li>
            <strong>High ambiguity</strong> — Humans disagree about what "right"
            means unless it's encoded
          </li>
          <li>
            <strong>Easy to automate</strong> — It's cheap to run locally and in
            CI
          </li>
        </ul>
        <p>If a fix hits 2+ of these criteria, it wants enforcement.</p>
      </section>

      <section>
        <h2>Types of Gates</h2>
        <h3>Advisory gates</h3>
        <p>
          Warn but don't block. Good for new rules where you're still calibrating
          the threshold.
        </p>
        <h3>Blocking gates</h3>
        <p>
          Fail the build/commit/deploy. Use for high-confidence rules with clear
          remediation.
        </p>
        <h3>Human-in-the-loop gates</h3>
        <p>
          Require explicit approval. Good for high-stakes changes where
          automation can flag but shouldn't decide.
        </p>
      </section>

      <section>
        <h2>Graduation Rubric</h2>
        <p>
          <em>Interactive rubric widget coming soon...</em>
        </p>
      </section>
    </AILayout>
  );
}
