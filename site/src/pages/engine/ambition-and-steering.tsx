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
          A reliable loop that only drains a static human-written checklist quickly runs dry—and one that asks a human to approve every tiny subtask turns you right back into a babysitter. Unify direction, complicated requirements, and human oversight into one clean pipeline: <strong>Intent → Just-in-Time Decomposition → Admission Policy → Verified Execution</strong>.
        </p>
      </header>

      <Section id="unified-steering">
        <h2>One Unified Steering Pipeline</h2>
        <p>
          Humans are best at setting direction, approving broad objectives, defining taste, and judging high-risk boundaries. They are worst at acting as a synchronous ticket-splitter every fifteen minutes.
        </p>
        <p>
          Instead of inventing separate ad-hoc workflows for roadmaps, complicated specs, escalated failures, and tech-debt cleanup, route every kind of intent through the same four-stage pipeline:
        </p>

        <AmbitionSteeringDiagram />
      </Section>

      <Section id="jit-decomposition">
        <h2>Handling Complicated Requirements with Just-in-Time Decomposition</h2>
        <p>
          Big, complicated requirements break coding agents when handed over as one giant goal—and break teams when expanded upfront into twenty speculative tickets that go stale after the first day of real implementation.
        </p>
        <p>
          Solve both problems by <strong>approving the objective once and decomposing it just-in-time</strong>. Capture broad direction in an <strong>Ambition Document</strong> or an approved objective spec (outcomes, architectural guardrails, non-goals, and what “good” looks like). When ready goals run low, the orchestrator invokes a <strong>read-only decomposer</strong> (a planner session that cannot edit source code directly) to inspect the live repository, recent landed commits, and open escalations, and propose only the <strong>next 1–2 small vertical slices</strong>.
        </p>

        <div class="ce-grid-2">
          <div class="ce-card">
            <h3 class="ce-card-title">Slice 1 Informs Slice 2</h3>
            <p>
              Ship one end-to-end usable slice first, land it, and let the decomposer read what Slice 1 actually discovered—real interfaces, edge cases, and test results—before proposing Slice 2.
            </p>
          </div>
          <div class="ce-card">
            <h3 class="ce-card-title">Autonomous Within an Objective</h3>
            <p>
              Once a human approves the overarching objective, the engine decomposes and ships bounded vertical slices autonomously without interrupting a human on every step.
            </p>
          </div>
          <div class="ce-card">
            <h3 class="ce-card-title">Simplification &amp; Doc Passes</h3>
            <p>
              Between feature slices, the same read-only decomposer proposes targeted refactoring, deletion, or documentation updates so complexity does not quietly compound.
            </p>
          </div>
          <div class="ce-card">
            <h3 class="ce-card-title">Splitting Escalated Goals</h3>
            <p>
              When a goal stalls or fails repeatedly because it was too large or ambiguous, the decomposer reads the failure evidence and splits it into smaller, verifiable sub-goals instead of retrying the same failing shape.
            </p>
          </div>
        </div>

        <div class="ce-failure-box">
          <p class="ce-box-label">Failure Mode Prevented: Stale Big Plans &amp; Endless Busywork</p>
          <p>
            Planning twenty tasks upfront guarantees half of them will encode outdated assumptions by task three; leaving a planner unconstrained overnight invites speculative abstractions nobody asked for. Cap unlanded queued slices to one or two at a time, record explicit non-goals in the objective, and give the decomposer permission to stop cleanly when the objective is satisfied or a product call requires a human.
          </p>
        </div>
      </Section>

      <Section id="tiered-admission">
        <h2>Tiered Admission Policy (Divorced from Transport)</h2>
        <p>
          Deciding <em>whether a proposed goal may run</em> is a policy decision, not a transport detail. Separate your <strong>admission policy</strong> cleanly from wherever work enters the repository (CLI, design doc, pull request, or issue tracker—covered in Chapter 5) and define two clear admission tiers:
        </p>

        <table>
          <thead>
            <tr>
              <th>Admission Tier</th>
              <th>What Belongs Here</th>
              <th>How It Enters Execution</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Autonomous (<code>auto</code>)</strong></td>
              <td>Bounded slices derived from an already-approved objective, simplifications, doc passes, and recurring-failure repairs.</td>
              <td>Enters the execution queue directly after automated contract validation and an independent spec-check pass—zero human bottleneck per slice.</td>
            </tr>
            <tr>
              <td><strong>Human-Gated</strong></td>
              <td>New ambiguous requests, unapproved objectives, scope shifts outside guardrails, or changes touching protected/high-risk boundaries.</td>
              <td>Pauses at a human review surface before execution (whatever transport your team uses) until a human clarifies or approves the intent.</td>
            </tr>
          </tbody>
        </table>

        <h3>Non-Blocking Approval Parking for High-Risk Landings</h3>
        <p>
          Some goals are safe to implement autonomously once admitted, yet still deserve a human eyes-on decision before touching <code>main</code>—a schema migration, a public API break, or a security boundary. Never freeze a worker slot while waiting for that human click:
        </p>
        <ul>
          <li>Once deterministic gates and fresh-context review pass, snapshot the candidate commit and evidence, mark the goal <code>awaiting-approval</code>, and <strong>immediately release the worker slot</strong> so the engine keeps shipping independent ready slices.</li>
          <li>When a human reviews the parked change, approving triggers transactional rebase-and-land; rejecting records plain-English feedback and returns the goal for a fresh attempt.</li>
          <li><strong>Accumulate human feedback across rejections.</strong> Preserve the ordered trail of human notes across rounds rather than overwriting the previous rejection, so the next attempt fixes the new concern without undoing earlier guidance.</li>
        </ul>
      </Section>

      <Section id="self-improvement-and-metrics">
        <h2>Self-Improvement &amp; Metric-Gated Experiments</h2>
        <p>
          Two compounding feedback loops plug directly into the same decomposition and admission pipeline:
        </p>

        <h3>1. Cross-Task Failure Signatures → Auto-Admitted Repair Goals</h3>
        <p>
          Every time a gate or reviewer rejects an attempt, normalize the failure into a compact <strong>failure signature</strong> (such as a flaky test fixture, missing migration step, undocumented flag, or recurring type trap). Watch for the same signature recurring across <em>different</em> goals.
        </p>
        <p>
          When a pattern crosses a threshold, the decomposer spawns a dedicated <strong>self-improvement goal</strong>—fixing the flaky helper, adding a targeted lint rule, or tightening repo instructions—which enters through the <code>auto</code> admission tier so future slices stop paying the same tax.
        </p>

        <h3>2. Metric-Gated Experiments</h3>
        <p>
          Some goals are hypotheses about latency, bundle size, memory usage, or accuracy rather than boolean feature checks. Attach a deterministic measurement command and target direction directly to the goal contract.
        </p>
        <p>
          Before landing, the orchestrator measures baseline <code>main</code> and the candidate commit under identical conditions. Even if all unit tests and code review pass, <strong>the experiment lands only when the measured number moves in the right direction</strong> beyond noise. Otherwise, the change is discarded cleanly and the negative measurement is saved so the decomposer explores a different hypothesis next.
        </p>

        <details class="ce-disclosure">
          <summary>Why record discarded experiments instead of deleting all trace of them?</summary>
          <div class="ce-disclosure-body">
            <p>
              Without a compact record of failed hypotheses and their measured numbers, a fresh decomposer session will propose the exact same seemingly clever optimization again next week. Recording “tried caching X, p95 stayed flat at 42ms, discarded” keeps exploration moving forward.
            </p>
          </div>
        </details>
      </Section>

      <div class="ce-checkpoint">
        <p class="ce-box-label">How to Know You Built It Right</p>
        <ul>
          <li>Approving one broad objective lets the decomposer ship Slice 1, read what changed, and propose Slice 2 under the <code>auto</code> admission tier without asking a human to approve every individual slice.</li>
          <li>Ambiguous new requests or scope shifts automatically route to the human-gated admission tier instead of running unreviewed.</li>
          <li>Parking a high-risk landing for human approval immediately frees its worker slot, and rejecting twice preserves both rounds of feedback in order.</li>
          <li>Recurring cross-task failure signatures spawn a single deduplicated repair goal, and metric-gated experiments that fail to beat baseline are discarded cleanly.</li>
        </ul>
      </div>
    </EngineLayout>
  );
}
