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
          Eventually you want more than one laptop running the engine—or a whole team feeding goals into the same repository alongside human commits. You do not need a central coordinator database or a single hard-wired ticketing workflow to get there; Git already gives you the shared primitives you need.
        </p>
      </header>

      <Section id="git-native-multiplayer">
        <h2>Sharing One Repository Across Humans and Machines</h2>
        <p>
          Because Chapter 1 put goal contracts and landed trailers in Git rather than a private database, multiplayer starts from a major advantage: teammates and multiple machines already share the same source of truth. Humans can push ordinary commits to <code>main</code> at any moment, and every engine instance rebases safely onto teammate work before landing.
        </p>
        <p>
          To scale cleanly from one workstation to a team, add three coordination layers on top of the remote Git host: pluggable admission transports, bidirectional remote sync, and atomic remote ref leases.
        </p>

        <MultiplayerSyncDiagram />
      </Section>

      <Section id="pluggable-intake">
        <h2>Pluggable Admission Transports (Keep Policy Out of Your Host)</h2>
        <p>
          Keep the engine’s core completely agnostic about <em>where</em> teammates propose work. Every collaborative workflow—whether a CLI command, a design-doc pull request, a Slack command, or an issue tracker—should act as a thin <strong>pluggable intake adapter</strong> that writes a standard Markdown goal or objective contract into the same Git queue governed by Chapter 4’s admission policy.
        </p>

        <div class="ce-grid-2">
          <div class="ce-card">
            <h3 class="ce-card-title">Pattern: Ticket → Researched Proposal PR</h3>
            <p>
              One popular implementation of the <strong>human-gated</strong> tier: an adapter reads a rough ticket or issue, researches the codebase, and opens a proposal PR containing only the objective or goal contract—iterating on review comments and activating work only once a human merges it.
            </p>
          </div>
          <div class="ce-card">
            <h3 class="ce-card-title">Other Valid Transports</h3>
            <p>
              Another team might commit an approved objective directly via CLI, merge an RFC Markdown file, or sync from an internal tracker. Because Git holds the contract, swapping or combining adapters never touches the orchestrator core.
            </p>
          </div>
        </div>

        <ul>
          <li><strong>Approve the objective, not every slice.</strong> Even when a team uses proposal PRs for new ambiguous requests, merge the <em>objective</em> once and let Chapter 4’s just-in-time decomposer auto-admit the bounded vertical slices underneath it—instead of forcing teammates to rubber-stamp ten tiny PRs for one feature.</li>
          <li><strong>Deduplicated status callbacks.</strong> If an intake adapter mirrors lifecycle notices (started, escalated, landed) back to an external ticket or thread, key every callback by run or event marker so retries and multiple peer machines never post duplicate updates.</li>
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
          <li>Teammates can feed work through any intake adapter (CLI, design doc PR, or issue tracker) into the exact same Git contract queue without modifying the orchestrator core.</li>
          <li>Human-gated proposals iterate on feedback and remain inactive until admitted, while slices under an already-approved objective run autonomously without per-slice approval drag.</li>
          <li>Starting two machines against the same ready goal causes one to win the CAS remote ref push while the other skips immediately to a different goal.</li>
          <li>Killing the winning machine lets a peer reclaim after TTL plus clock-skew margin—and if the original machine wakes up later, landing-time trailer deduplication prevents duplicate work from landing on a strictly fast-forward-only remote branch.</li>
        </ul>
      </div>
    </EngineLayout>
  );
}
