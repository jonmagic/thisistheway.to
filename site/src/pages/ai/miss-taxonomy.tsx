import { AILayout } from "@/layouts/AILayout";

export function AIMissTaxonomy() {
  return (
    <AILayout
      title="Miss Taxonomy"
      subtitle="Common patterns of agent failures and how to address them"
    >
      <section>
        <p>
          Most agent failures fall into a small number of patterns. Recognizing
          the pattern helps you choose the right primitive to address it.
        </p>
      </section>

      <section>
        <h2>1. Truth-misses (Hallucinations)</h2>
        <p>
          The agent confidently invents a field, a file path, an API shape, a CLI
          flag. It sounds plausible but doesn't exist.
        </p>
        <h3>Root cause</h3>
        <p>Usually a source-of-truth access problem.</p>
        <h3>Typical fixes</h3>
        <ul>
          <li>Ensure the source-of-truth is present and discoverable</li>
          <li>Add verification that fails loudly when it guesses</li>
        </ul>
      </section>

      <section>
        <h2>2. Reactivity-misses</h2>
        <p>
          The agent writes code that compiles but doesn't work at runtime. It
          misses an implicit rule about how the system behaves.
        </p>
        <h3>Root cause</h3>
        <p>Missing constraint + missing feedback.</p>
        <h3>Typical fixes</h3>
        <ul>
          <li>Encode the rule in instructions</li>
          <li>Backstop with a test harness</li>
        </ul>
      </section>

      <section>
        <h2>3. Integration-misses</h2>
        <p>
          The agent doesn't understand what runs where: editor vs webview, server
          vs client, CI vs local, mock vs real.
        </p>
        <h3>Root cause</h3>
        <p>Observability + tool boundary problem.</p>
        <h3>Typical fixes</h3>
        <ul>
          <li>Explicit boundary documentation</li>
          <li>Tooling that makes the boundary executable (harnesses, mocks)</li>
        </ul>
      </section>

      <section>
        <h2>4. Taste-misses</h2>
        <p>
          DOM assertions pass, but the UI is weird: spacing is off, hierarchy is
          unclear, affordances are wrong.
        </p>
        <h3>Root cause</h3>
        <p>Missing eval problem.</p>
        <h3>Typical fixes</h3>
        <ul>
          <li>A rubric for "what good looks like"</li>
          <li>A visual gate (when it's worth the cost)</li>
        </ul>
      </section>

      <section>
        <h2>5. Process-misses</h2>
        <p>
          The agent claims "done" without running checks, updating docs, or
          proving behavior.
        </p>
        <h3>Root cause</h3>
        <p>Guardrails + verification problem.</p>
        <h3>Typical fixes</h3>
        <ul>
          <li>Checklists it must satisfy</li>
          <li>Automated gates it can't bypass</li>
        </ul>
      </section>
    </AILayout>
  );
}
