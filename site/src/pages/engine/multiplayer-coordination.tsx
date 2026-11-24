import { EngineLayout } from "@/layouts/EngineLayout";
import { Section } from "@/components/content/Section";
import { MultiplayerSyncDiagram } from "@/components/diagrams/ContinuousDiagrams";

export function MultiplayerCoordinationPage() {
  return (
    <EngineLayout title="5. Multiplayer & Multi-Machine Coordination">
      <header class="ce-intro">
        <p class="ce-eyebrow">Chapter 05 • Teams &amp; Multiple Machines</p>
        <h1>Multiplayer &amp; Multi-Machine Coordination</h1>
        <p>
          Eventually you want more than one laptop running the engine—or a whole team feeding goals into the same repository alongside human commits. You do not need to deploy a distributed coordinator service to get there; Git already gives you the primitives you need.
        </p>
      </header>

      <Section id="git-native-multiplayer">
        <h2>Sharing One Repository Across Humans and Machines</h2>
        <p>
          Because Chapter 1 put goal contracts and landed trailers in Git rather than a private database, multiplayer starts from a massive advantage: teammates and multiple machines already share the same source of truth. Humans can push ordinary commits to <code>main</code> at any moment, and every engine instance rebases safely onto teammate work before landing.
        </p>
        <p>
          To scale cleanly from one workstation to a team, add three coordination layers on top of the remote Git host: issue-to-PR intake, bidirectional remote sync, and atomic remote ref leases.
        </p>

        <MultiplayerSyncDiagram />
      </Section>

      <Section id="issue-to-pr-intake">
        <h2>Turning Rough Issues into Researched Single-Goal PRs</h2>
        <p>
          Teammates should not have to hand-craft perfect goal contracts to feed the engine. Let anyone file an ordinary GitHub issue describing a rough bug, idea, or pain point.
        </p>
        <p>
          An intake pass picks up labeled issues, researches the codebase, and opens a <strong>single-goal Pull Request</strong> that adds only the proposed Markdown goal contract—not speculative code changes.
        </p>
        <ul>
          <li><strong>Review before execution.</strong> Teammates review the scope, acceptance criteria, and non-goals on the PR. If someone leaves review comments, the intake agent updates the goal contract on that PR branch.</li>
          <li><strong>Merge is the activation switch.</strong> The engine ignores unmerged goal PRs. Only after a human merges the PR onto <code>main</code> does the goal become eligible for autonomous execution.</li>
          <li><strong>Deduplicated issue updates.</strong> As the goal moves through execution, escalation, or landing, post concise status notices back to the originating issue—keyed by run or event markers so multiple machines or retries never spam duplicate comments.</li>
        </ul>
      </Section>

      <Section id="bidirectional-sync">
        <h2>Bidirectional Remote Sync Without Dirtying Checkouts</h2>
        <p>
          When multiple laptops or teammates push to <code>main</code>, local engine instances must pull remote commits continuously and push landed goals promptly—without breaking a human’s active working tree or rewriting shared history.
        </p>
        <div class="ce-grid-2">
          <div class="ce-card">
            <h3 class="ce-card-title">In-Memory 3-Way Merge Pull</h3>
            <p>
              Fetch remote updates and reconcile local refs using Git’s in-memory merge machinery (or a dedicated sync worktree) rather than mutating the user’s checked-out working directory. If remote and local diverged cleanly on unrelated files, converge without touching the human’s editor.
            </p>
          </div>
          <div class="ce-card">
            <h3 class="ce-card-title">Verified Fast-Forward-Only Push</h3>
            <p>
              Never force-push shared branches. Before pushing a landed goal, fetch, rebase onto remote HEAD if needed, re-run the pre-landing health check on the rebased commit, and push with fast-forward-only semantics. If another machine beat you by a second, retry the rebase-and-verify loop cleanly.
            </p>
          </div>
        </div>
      </Section>

      <Section id="atomic-ref-leases">
        <h2>Atomic Remote Git Ref Leases</h2>
        <p>
          Running the engine on two laptops (say, your desktop and a cloud workstation) introduces a classic distributed-systems race: both machines see the same ready goal on <code>main</code> and start burning tokens building it simultaneously.
        </p>
        <p>
          You can solve this with zero external lock servers by using <strong>atomic compare-and-swap pushes to dedicated Git refs</strong> (for example, <code>refs/leases/&lt;goal-id&gt;</code>) storing a tiny commit or blob payload containing the owner machine ID, lease expiry timestamp, and contract hash:
        </p>
        <ol>
          <li><strong>Acquire with compare-and-swap (CAS).</strong> Push the new lease ref with an expected old OID of all-zeros (creating a new ref) or the exact OID of an expired lease you just inspected. Git’s remote server enforces atomicity: if two machines push simultaneously, exactly one succeeds and the other is rejected immediately.</li>
          <li><strong>Heartbeat with a TTL and clock-skew margin.</strong> While a worker runs, periodically CAS-update its lease ref to extend the expiration timestamp. Any other machine considering reclaiming an expired lease must wait until <code>expiry + clock_skew_margin</code> has passed so slightly drifted laptop clocks never steal a live lease.</li>
          <li><strong>Release cleanly on exit.</strong> Delete the lease ref via CAS matching your own OID when the attempt finishes or parks, so peers can pick up retries without waiting for the TTL.</li>
        </ol>

        <div class="ce-failure-box">
          <p class="ce-box-label">Failure Mode Prevented: Double Landing After Lease Expiry</p>
          <p>
            Leases are an optimization to prevent wasted work, never a substitute for landing safety. Suppose Machine A loses Wi-Fi for twenty minutes, its remote lease expires, Machine B reclaims and lands the goal, and then Machine A reconnects and tries to land its copy. Because every landed commit carries structured <strong>commit trailers</strong> (Chapter 1), Machine A fetches remote <code>main</code> inside its landing critical section, sees the goal’s contract hash already landed in Git history, discards its duplicate work cleanly, and never double-lands.
          </p>
        </div>

        <details class="ce-disclosure">
          <summary>Why remote ref leases instead of committing lock files to main?</summary>
          <div class="ce-disclosure-body">
            <p>
              Committing lock files to <code>main</code> pollutes project history with noisy acquire/heartbeat/release commits, triggers CI pipelines unnecessarily, and forces constant rebasing for human teammates. Dedicated non-branch refs live cleanly in Git’s ref namespace, support native compare-and-swap pushes, and stay completely invisible in normal branch history and pull requests.
            </p>
          </div>
        </details>
      </Section>

      <div class="ce-checkpoint">
        <p class="ce-box-label">How to Know You Built It Right</p>
        <ul>
          <li>Filing a rough issue opens a single-goal PR that iterates on human review feedback and never executes until a human merges it.</li>
          <li>Starting two machines against the same ready goal causes one to win the CAS remote ref push while the other skips immediately to a different goal.</li>
          <li>Killing the winning machine allows a peer to reclaim the goal automatically after TTL plus clock-skew margin—and if the original machine later wakes up with a finished branch, landing-time commit trailer deduplication prevents duplicate work from landing.</li>
          <li>Every sync push is strictly fast-forward-only, and human commits pushed concurrently to <code>main</code> are preserved intact.</li>
        </ul>
      </div>
    </EngineLayout>
  );
}
