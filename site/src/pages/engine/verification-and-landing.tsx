import { EngineLayout } from "@/layouts/EngineLayout";
import { Section } from "@/components/content/Section";
import {
  VerificationFunnelDiagram,
  CulpritRollbackDiagram,
} from "@/components/diagrams/ContinuousDiagrams";

export function VerificationAndLandingPage() {
  return (
    <EngineLayout title="2. Independent Verification & Transactional Landing">
      <header class="ce-intro">
        <p class="ce-eyebrow">Chapter 02 • Trust &amp; Safety</p>
        <h1>Independent Verification &amp; Transactional Landing</h1>
        <p>
          An agent that writes code and grades its own homework will eventually rationalize a broken shortcut. Safe continuous progress depends on separating building from judging, verifying the exact commit that lands, and recovering cleanly when a subtle regression slips through.
        </p>
      </header>

      <Section id="separation-of-powers">
        <h2>Why Builders Cannot Grade Their Own Work</h2>
        <p>
          When a coding agent spends twenty turns fighting a tricky test failure, its context window becomes full of sunk cost. By turn twenty-one, weakening an assertion, skipping a flaky test, or narrowing a requirement feels locally reasonable inside that conversation. Even an honest agent suffers from confirmation bias: it checks the edge cases it already thought of and misses the ones it never noticed.
        </p>
        <p>
          Structure verification as a strict funnel with three independent layers: fast deterministic gates, a fresh-context reviewer that has never seen the builder’s chat, and a post-rebase pre-landing health check.
        </p>

        <VerificationFunnelDiagram />
      </Section>

      <Section id="deterministic-gates">
        <h2>Layer 1: Deterministic Gates Run First</h2>
        <p>
          Before spending tokens on an AI reviewer or asking a human to look at anything, run cheap, objective checks owned by the orchestrator—not volunteered by the agent. A gate passes only when the orchestrator executes the command itself in the candidate worktree and observes exit code zero.
        </p>

        <div class="ce-grid-2">
          <div class="ce-card">
            <h3 class="ce-card-title">Correctness &amp; Static Checks</h3>
            <p>
              Unit tests, targeted integration tests, typechecking, linting, and build compilation. Fail fast so obvious breakage never reaches review.
            </p>
          </div>
          <div class="ce-card">
            <h3 class="ce-card-title">Documentation Ratchets</h3>
            <p>
              Check that public APIs, CLI flags, or architecture docs changed alongside behavior—or at minimum that doc-staleness metrics never regress worse than the baseline.
            </p>
          </div>
          <div class="ce-card">
            <h3 class="ce-card-title">Supply-Chain Guardrails</h3>
            <p>
              Block unapproved dependency additions, lockfile tampering, unexpected network calls during tests, or secret patterns before code ever leaves the worktree.
            </p>
          </div>
          <div class="ce-card">
            <h3 class="ce-card-title">Protected Test Integrity</h3>
            <p>
              Flag or reject diffs that delete existing tests, add skip annotations, or loosen assertions unless the goal contract explicitly authorizes changing that behavior.
            </p>
          </div>
        </div>
      </Section>

      <Section id="fresh-context-review">
        <h2>Layer 2: The Fresh-Context Independent Reviewer</h2>
        <p>
          Deterministic checks catch syntax errors, type mismatches, and covered regressions, but they cannot tell whether an implementation actually honors the spirit of the goal contract or quietly over-engineers a simple module. That requires judgment—and judgment must be isolated from the builder.
        </p>
        <p>
          Spawn a completely separate reviewer session with a blank context window. Give it only three inputs:
        </p>
        <ol>
          <li><strong>The original goal contract</strong> (the exact content-hashed Markdown file).</li>
          <li><strong>The candidate diff</strong> (and read-only access to the worktree to inspect surrounding code).</li>
          <li><strong>Raw gate evidence</strong> (which checks ran and what they output, not the builder’s claims).</li>
        </ol>
        <p>
          Crucially, <strong>never pass the builder’s conversation transcript to the reviewer</strong>. Without seeing the builder’s struggles or excuses, the reviewer evaluates only what actually exists in the diff. Ask it to return a structured verdict—approve or request changes—with concrete, file-and-line findings tied to the contract or real defects.
        </p>

        <div class="ce-failure-box">
          <p class="ce-box-label">Failure Mode Prevented: Review Nitpick Loops</p>
          <p>
            An unconstrained reviewer can invent stylistic nitpicks forever, burning retries on healthy code. Instruct the reviewer to block only on contract violations, real bugs, safety issues, or missing verification—and cap review rounds so repeated disagreement escalates cleanly instead of looping indefinitely.
          </p>
        </div>
      </Section>

      <Section id="transactional-landing">
        <h2>Layer 3: Rebase &amp; Verify the Exact Landing Commit</h2>
        <p>
          Passing tests on an hour-old base commit does not prove the change is safe to land. While your worker was busy, another worker or a human teammate may have modified a shared interface, renamed a helper, or tightened a schema.
        </p>
        <p>
          Treat landing as a short critical section protected by a landing lock:
        </p>
        <ol>
          <li>Re-verify the live contract hash and fencing token (Chapter 1).</li>
          <li>Rebase the candidate commit onto the live target branch HEAD.</li>
          <li>If rebasing produces a conflict, abort landing and return the conflict to a fresh attempt—never guess blindly inside the landing critical section.</li>
          <li>Run the <strong>pre-landing health check</strong> on that exact rebased commit tree.</li>
          <li>Fast-forward the target branch pointer atomically only if the health check passes.</li>
        </ol>

        <details class="ce-disclosure">
          <summary>Why fast-forward rebase instead of merge commits?</summary>
          <div class="ce-disclosure-body">
            <p>
              Linear history makes every single landed goal a discrete, inspectable commit (or small contiguous range) stamped with its commit trailers. That linearity is what makes automated bisection and culprit-only rollback simple and predictable when something goes wrong later.
            </p>
          </div>
        </details>
      </Section>

      <Section id="culprit-rollback">
        <h2>Automatic Culprit-Only Rollback</h2>
        <p>
          Even with strict pre-landing checks, regressions still happen: a flaky test passes once and fails consistently afterward, an expensive integration suite runs asynchronously after landing, or two independently green changes interact badly.
        </p>
        <p>
          The naive response is to reset the branch back to the last known good commit. That throws away every innocent goal that landed after the bad one—and worse, risks wiping out commits pushed by humans.
        </p>
        <p>
          Instead, build <strong>culprit-only rollback</strong>:
        </p>

        <CulpritRollbackDiagram />

        <ol>
          <li><strong>Identify the safe boundary.</strong> Walk backward from HEAD inspecting commit trailers. Stop immediately at any commit without an engine landing trailer—<strong>never revert a human commit</strong>.</li>
          <li><strong>Probe newest-first until healthy.</strong> In an isolated worktree, revert candidate engine commits one by one from newest to oldest until the health check turns green. The commit whose removal flips the suite from red to green is the culprit.</li>
          <li><strong>Replay and spare innocent commits.</strong> Starting from the state right before the culprit, cherry-pick all newer innocent engine commits back on top, re-run the health check, and advance the target branch using clean revert/replay history.</li>
          <li><strong>Record and re-queue the culprit.</strong> Attach the failing health-check evidence to the culprit goal so the next attempt knows exactly why its previous landing broke <code>main</code>.</li>
        </ol>

        <details class="ce-disclosure">
          <summary>What if a human commit broke main, or no single revert restores health?</summary>
          <div class="ce-disclosure-body">
            <p>
              If the health check is still red once you reach a human commit—or if replaying an innocent commit conflicts with removing the culprit—do not thrash or force-revert human work. Pause new landings, record the exact failing commit range and evidence, and escalate clearly to a human operator.
            </p>
          </div>
        </details>
      </Section>

      <div class="ce-checkpoint">
        <p class="ce-box-label">How to Know You Built It Right</p>
        <ul>
          <li>A deliberate bug or weakened test inserted by a builder is caught either by deterministic gates or by the fresh-context reviewer before reaching the landing lock.</li>
          <li>If <code>main</code> moves ahead with an incompatible change while a worker is building, the post-rebase health check catches the semantic conflict before the branch pointer advances.</li>
          <li>Injecting a failing engine commit followed by an innocent engine commit triggers culprit-only rollback: the bad commit is reverted and re-queued, the innocent commit survives on <code>main</code>, and any preceding human commit is untouched.</li>
        </ul>
      </div>
    </EngineLayout>
  );
}
