import { EngineLayout } from "@/layouts/EngineLayout";
import { Section } from "@/components/content/Section";
import {
  WatchdogRecoveryDiagram,
  SchedulerLivenessDiagram,
} from "@/components/diagrams/ContinuousDiagrams";

export function LivenessAndRecoveryPage() {
  return (
    <EngineLayout title="3. Never Getting Stuck: Watchdogs, Recovery & Liveness">
      <header class="ce-intro">
        <p class="ce-eyebrow">Chapter 03 • Resilience &amp; Liveness</p>
        <h1>Never Getting Stuck: Watchdogs, Recovery &amp; Liveness</h1>
        <p>
          Most naive agent loops do not fail with a clean crash—they silently freeze at 2 a.m. Treat stuckness as a first-class engineering problem across processes, retries, networks, and the scheduler state machine itself.
        </p>
      </header>

      <Section id="process-watchdogs">
        <h2>Detached Process-Group Watchdogs &amp; Orphan Cleanup</h2>
        <p>
          A coding agent rarely runs as a single process. It launches test runners, compilers, headless browsers, and local dev servers. If the agent times out—or if the orchestrator itself receives <code>SIGKILL</code> or crashes—killing only the direct child PID leaves orphaned grandchildren holding file locks, open ports, and gigabytes of RAM.
        </p>
        <p>
          Run every attempt inside its own <strong>detached process group</strong> (via <code>setsid</code> or platform process-group isolation) supervised by a lightweight watchdog that watches both a wall-clock timeout and an <strong>owner-death signal</strong> (such as a parent-death pipe or kernel notification). When a timeout fires or the orchestrator disappears, the watchdog sends termination signals to the <em>entire negative process group ID</em>, guaranteeing that grandchildren die cleanly too.
        </p>

        <WatchdogRecoveryDiagram />
      </Section>

      <Section id="classifying-stuckness">
        <h2>Distinguishing Livelock, Network Drops, and Thrashing</h2>
        <p>
          A wall-clock timeout is a blunt instrument. Before you burn through a goal’s retry budget—or wait thirty minutes for a hopeless run—classify why an attempt is not making progress:
        </p>

        <div class="ce-grid-2">
          <div class="ce-card">
            <h3 class="ce-card-title">Livelock Detection</h3>
            <p>
              The agent stays busy—emitting tokens, re-reading files, or polling commands—yet produces zero meaningful file changes over a sustained window. Abort early instead of paying for twenty minutes of circular narration.
            </p>
          </div>
          <div class="ce-card">
            <h3 class="ce-card-title">Network-Drop Parking</h3>
            <p>
              Model API errors, DNS drops, or laptop sleep are environment outages, not code bugs. Park the goal in a waiting state with exponential backoff <strong>without decrementing its retry budget</strong> so an overnight Wi-Fi hiccup never permanently escalates healthy goals.
            </p>
          </div>
          <div class="ce-card">
            <h3 class="ce-card-title">Strategy Rotation Across Retries</h3>
            <p>
              Retrying the exact same prompt with the exact same framing usually reproduces the exact same failure. Rotate strategy on each retry: feed the concise failure signature first, narrow the allowed scope, switch to a diagnostic pass, or change model tier.
            </p>
          </div>
          <div class="ce-card">
            <h3 class="ce-card-title">Oscillation &amp; File-Reversal Guards</h3>
            <p>
              Track hashes of candidate diffs and failure signatures across attempts. If Attempt 3 produces the same state or reverts the same lines that Attempt 1 tried (an <code>A → B → A</code> cycle), stop thrashing immediately and escalate to the planner or a human.
            </p>
          </div>
        </div>

        <div class="ce-failure-box">
          <p class="ce-box-label">Failure Mode Prevented: Silent Retry-Budget Burn</p>
          <p>
            If your engine treats a temporary API 503 the same as a failing unit test, a ten-minute provider outage will burn through every ready goal’s retries and leave your entire backlog marked failed by morning. Separate transient infrastructure errors (park and wait) from deterministic task failures (consume a retry and rotate strategy).
          </p>
        </div>
      </Section>

      <Section id="unified-scheduler-liveness">
        <h2>The Hard Lesson on Scheduler Deadlocks</h2>
        <p>
          Even after you harden worker processes and retries, the nastiest hangs hide inside the orchestrator’s own scheduling logic. They happen when readiness rules are scattered across four different places: the dispatcher thinks a goal is blocked on a dependency, the approval queue thinks a slot is occupied, the backoff timer thinks a goal is parked, and the planner thinks active work is still running. Everyone waits for someone else, and the engine sits silently idle forever with zero error messages.
        </p>
        <p>
          The cure is architectural simplicity backed by verification:
        </p>
        <ol>
          <li>
            <strong>Unify readiness into one pure decision function.</strong> Collect a snapshot of world state—ready goals, active leases, dependency states, parked approvals, network cooldowns, and planner eligibility—and feed it to a single pure function that returns the next concrete action (dispatch, invoke planner, wait on a named timer/event, or complete).
          </li>
          <li>
            <strong>Require every wait state to name its wake trigger.</strong> The scheduler must never return “do nothing” unless either all work is terminal or an explicit wake condition exists (a running lease, a backoff deadline, a pending human approval, or an incoming sync poll).
          </li>
          <li>
            <strong>Verify exhaustive finite-state liveness.</strong> Because the decision function is pure and operates over a small finite set of state flags, write a test that enumerates <em>every reachable combination of states</em>—every mix of ready, blocked, leased, approval-waiting, network-parked, and escalated goals—and asserts that no non-terminal state can ever fall into a silent dead end.
          </li>
        </ol>

        <SchedulerLivenessDiagram />

        <details class="ce-disclosure">
          <summary>Why exhaustive finite-state testing beats ad-hoc unit tests for schedulers</summary>
          <div class="ce-disclosure-body">
            <p>
              Hand-written scheduler tests almost always check the transitions you already thought of. Deadlocks live in the awkward four-way corners: for instance, Goal A is waiting for human approval, Goal B depends on Goal A, Goal C is network-parked, and the ambition document still has room for Goal D—should the planner run or stay quiet?
            </p>
            <p>
              When readiness lives in one pure model, checking thousands of finite state combinations takes milliseconds in your ordinary test suite and catches every silent deadlock the moment you add a new state flag.
            </p>
          </div>
        </details>
      </Section>

      <div class="ce-checkpoint">
        <p class="ce-box-label">How to Know You Built It Right</p>
        <ul>
          <li>Sending <code>SIGKILL</code> to the orchestrator during an active run leaves zero orphaned test runners or dev servers alive a second later.</li>
          <li>Disconnecting the network mid-run parks active goals and resumes them cleanly once connectivity returns, with zero retries burned.</li>
          <li>A mocked attempt that alternates between two broken diffs triggers the <code>A → B → A</code> oscillation guard and escalates instead of looping until budget exhaustion.</li>
          <li>An automated finite-state liveness test checks every reachable combination of scheduler flags and proves zero silent dead states exist.</li>
        </ul>
      </div>
    </EngineLayout>
  );
}
