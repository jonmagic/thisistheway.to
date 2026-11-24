import { EngineLayout } from "@/layouts/EngineLayout";
import { Section } from "@/components/content/Section";
import { AmbitionSteeringDiagram } from "@/components/diagrams/ContinuousDiagrams";

export function AmbitionAndSteeringPage() {
  return (
    <EngineLayout title="4. Ambition, Self-Improvement & Human Steering">
      <header class="ce-intro">
        <p class="ce-eyebrow">Chapter 04 • Direction &amp; Compounding</p>
        <h1>Ambition, Self-Improvement &amp; Human Steering</h1>
        <p>
          A reliable loop that only drains a static human-written checklist quickly runs dry. To keep making genuinely useful progress without 24/7 babysitting, pair human taste and non-blocking approvals with a read-only planner, recurring-failure self-improvement, and metric-gated experiments.
        </p>
      </header>

      <Section id="ambition-loop">
        <h2>Steering Without Babysitting</h2>
        <p>
          Humans are best at setting direction, defining taste, catching product tradeoffs, and approving high-risk changes. They are worst at acting as a synchronous message bus every fifteen minutes. The engine should absorb high-level direction once, keep shipping small verified slices on its own, and ask for human judgment asynchronously without stalling everything else.
        </p>

        <AmbitionSteeringDiagram />
      </Section>

      <Section id="non-blocking-approvals">
        <h2>Non-Blocking Human Approval Parking</h2>
        <p>
          Some goals deserve a human eyes-on decision before landing—a schema migration, a public API change, a UI redesign, or a risky security boundary. The mistake most early systems make is blocking a worker slot (or the entire loop) while waiting for that human click.
        </p>
        <p>
          Instead, park approval-gated candidates in a <strong>non-blocking approval queue</strong>:
        </p>
        <ul>
          <li>Once deterministic gates and fresh-context review pass, snapshot the candidate commit and evidence, mark the goal <code>awaiting-approval</code>, and <strong>immediately release the worker slot</strong> so the engine keeps shipping independent ready goals.</li>
          <li>When the human reviews the parked change, they can approve (triggering transactional rebase-and-land) or reject with plain-English feedback.</li>
          <li><strong>Accumulate human feedback across rejections.</strong> Do not overwrite the previous note on the second rejection—keep the ordered trail of human guidance attached to the goal so the next attempt fixes the new concern without accidentally undoing what the human asked for earlier.</li>
        </ul>
      </Section>

      <Section id="ambition-and-planner">
        <h2>The Ambition Document &amp; Read-Only Planner</h2>
        <p>
          To keep work flowing after the immediate queue drains, check a concise <strong>Ambition Document</strong> into the repository. Unlike a giant upfront specification, it states the desired end-user outcomes, architectural guardrails, non-goals, and what “good” looks like right now.
        </p>
        <p>
          When ready goals run low, the orchestrator invokes a <strong>read-only planner</strong>—an agent session that cannot edit source code directly, only inspect the repository, recent landed history, and open escalations to propose the next small goal contracts.
        </p>

        <div class="ce-grid-2">
          <div class="ce-card">
            <h3 class="ce-card-title">Small Vertical Slices</h3>
            <p>
              Propose one end-to-end usable increment at a time rather than ten speculative foundation layers. Real feedback from landing slice one shapes slice two.
            </p>
          </div>
          <div class="ce-card">
            <h3 class="ce-card-title">Scheduled Simplification &amp; Docs</h3>
            <p>
              After several feature slices land, the planner can propose a refactoring, deletion, or documentation pass so complexity does not quietly compound.
            </p>
          </div>
          <div class="ce-card">
            <h3 class="ce-card-title">Splitting Escalated Goals</h3>
            <p>
              When a goal fails repeatedly because it was too big or ambiguous, the planner reads the failure evidence and splits it into smaller, verifiable sub-goals instead of retrying the same failing shape.
            </p>
          </div>
          <div class="ce-card">
            <h3 class="ce-card-title">Explicit Stop Conditions</h3>
            <p>
              If the ambition is satisfied—or the next meaningful step requires a product call only a human can make—the planner stops cleanly instead of inventing busywork.
            </p>
          </div>
        </div>

        <div class="ce-failure-box">
          <p class="ce-box-label">Failure Mode Prevented: Endless Busywork &amp; Scope Drift</p>
          <p>
            An unconstrained planner left running overnight will cheerfully invent micro-optimizations and speculative abstractions nobody asked for. Constrain the planner with explicit anti-goals in the Ambition Document, a cap on unlanded queued goals, and permission to return “no useful next goal.”
          </p>
        </div>
      </Section>

      <Section id="self-improvement-and-metrics">
        <h2>Self-Improvement &amp; Metric-Gated Experiments</h2>
        <p>
          Two advanced loops turn a steady engine into a compounding one:
        </p>

        <h3>1. Cross-Task Failure Signatures → Self-Improvement Goals</h3>
        <p>
          Every time a gate or reviewer rejects an attempt, normalize the failure into a compact <strong>failure signature</strong> (for example: flaky fixture timeout, missing migration step, undocumented CLI option, or recurring type pattern). Watch for the same signature appearing across <em>different</em> goals.
        </p>
        <p>
          When a pattern crosses a threshold (say, two or three distinct goals hitting the same friction), the engine automatically spawns a dedicated <strong>self-improvement goal</strong>—fixing the flaky test helper, adding a targeted lint rule, or clarifying the repo instructions—so future goals stop paying the same tax.
        </p>

        <h3>2. Metric-Gated Experiments</h3>
        <p>
          Some goals are not boolean pass/fail features—they are hypotheses about performance, bundle size, memory usage, or accuracy. Attach a deterministic measurement command and a target direction (lower latency, higher recall, smaller footprint) directly to the goal contract.
        </p>
        <p>
          Before landing, the orchestrator measures the baseline on <code>main</code> and measures the candidate commit under the same conditions. Even if every unit test passes and the reviewer likes the diff, <strong>the experiment lands only when the measured number actually moves in the right direction</strong> (beyond noise). Otherwise, the change is discarded cleanly and the negative result is recorded as evidence so the planner tries a different hypothesis next.
        </p>

        <details class="ce-disclosure">
          <summary>Why record discarded experiments instead of deleting all trace of them?</summary>
          <div class="ce-disclosure-body">
            <p>
              Without a compact record of failed hypotheses and their measured numbers, a fresh planner session will propose the exact same seemingly clever optimization again next week. Recording “tried caching X, p95 stayed flat at 42ms, discarded” keeps exploration moving forward.
            </p>
          </div>
        </details>
      </Section>

      <div class="ce-checkpoint">
        <p class="ce-box-label">How to Know You Built It Right</p>
        <ul>
          <li>Parking a high-risk goal for human approval immediately frees its worker slot, and independent goals keep landing while it waits.</li>
          <li>Rejecting an approval candidate twice with different feedback delivers both pieces of feedback in order to the next attempt.</li>
          <li>When the same failure signature recurs across multiple independent goals, a single deduplicated self-improvement goal is proposed to fix the root cause.</li>
          <li>A metric-gated experiment that passes all tests but fails to improve its target benchmark is automatically discarded rather than landed.</li>
        </ul>
      </div>
    </EngineLayout>
  );
}
