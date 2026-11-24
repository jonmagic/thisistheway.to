import { EngineLayout } from "@/layouts/EngineLayout";
import { Section } from "@/components/content/Section";
import { StatePlanesDiagram } from "@/components/diagrams/ContinuousDiagrams";

export function StateAndContractsPage() {
  return (
    <EngineLayout title="1. State & Contracts Outside the Context Window">
      <header class="ce-intro">
        <p class="ce-eyebrow">Chapter 01 • Durable Foundations</p>
        <h1>State &amp; Contracts Outside the Context Window</h1>
        <p>
          A coding agent’s context window is working memory, not a database. Before you automate a single retry or parallel worker, move intent, isolation, ownership, and proof onto disk and into Git.
        </p>
      </header>

      <Section id="why-context-fails">
        <h2>Why Context Windows Are Ephemeral</h2>
        <p>
          In an interactive chat, it is tempting to keep the specification, progress notes, and decision history inside the conversation. The moment your engine runs continuously—across retries, machine restarts, or parallel workers—chat memory breaks down. Context windows fill up, get compacted, or vanish when a process crashes. Two workers cannot share a chat transcript safely, and a human cannot edit a requirement mid-flight by editing a message from forty minutes ago.
        </p>
        <p>
          The fix is to split your engine into three clean planes: <strong>shared Git state</strong> for durable truth, a <strong>local transactional ledger</strong> for fast coordination on one machine, and <strong>ephemeral Git worktrees</strong> where agents can do messy work and be discarded cleanly.
        </p>

        <StatePlanesDiagram />
      </Section>

      <Section id="goal-contracts">
        <h2>Markdown Goal Files with Content-Hashed Contracts</h2>
        <p>
          Represent each unit of work as a plain Markdown file checked into the repository—say under a dedicated goals directory. Keep the format readable by both humans and tools: a small metadata header (identifier, prerequisites, risk tier, optional metric) followed by plain-English intent, scope boundaries, and acceptance criteria.
        </p>
        <p>
          The critical trick is treating the <strong>content hash of the goal file</strong> as the immutable contract identifier for any running attempt. When the orchestrator starts an attempt, it hashes the exact bytes of the goal file and binds that hash to the worker’s lease.
        </p>

        <div class="ce-failure-box">
          <p class="ce-box-label">Failure Mode Prevented: Stale Work Landing Over Edited Intent</p>
          <p>
            You kick off a goal, then realize five minutes later that a constraint is wrong and edit the Markdown file on <code>main</code>. Without contract hashing, the in-flight worker finishes building the old specification and lands outdated code right after your edit. With content-hashed contracts, the orchestrator checks the live file hash before landing, sees the mismatch, marks the old attempt <strong>superseded</strong>, discards its branch, and dispatches a fresh attempt against the new contract.
          </p>
        </div>

        <details class="ce-disclosure">
          <summary>What belongs in a goal contract vs. what stays out?</summary>
          <div class="ce-disclosure-body">
            <p>
              Include what must be true when the goal finishes: the observable behavior, explicit non-goals, any prerequisite goal IDs, and the verification command or acceptance check.
            </p>
            <p>
              Leave out transient execution state like retry counts, worker PIDs, or timestamps. Putting mutable runtime noise inside goal files creates endless merge conflicts between teammates and pollutes Git history.
            </p>
          </div>
        </details>
      </Section>

      <Section id="worktrees-and-trailers">
        <h2>Disposable Git Worktrees &amp; Commit Trailers</h2>
        <p>
          Never let an autonomous agent edit your primary checkout. For every attempt, create an isolated Git worktree checked out at the current target commit, run the agent inside that directory, and delete the worktree once the attempt lands or fails.
        </p>
        <p>
          Isolation buys you three guarantees immediately: parallel workers cannot clobber each other’s untracked files, a failed experiment leaves zero debris on your working branch, and a human can keep using their main checkout without fighting the engine over staged files.
        </p>
        <p>
          When an attempt succeeds and lands on the target branch, stamp the commit message with structured <strong>Git commit trailers</strong>—plain <code>Key: value</code> lines at the bottom of the commit message recording the goal identifier, the exact contract hash that was satisfied, and the run identifier.
        </p>

        <div class="ce-grid-2">
          <div class="ce-card">
            <h3 class="ce-card-title">Why trailers beat status files</h3>
            <p>
              A separate JSON status file can drift from actual Git history after a revert, cherry-pick, or crash. Trailers travel atomically with the commit itself: if the commit is on <code>main</code>, the goal landed; if the commit was reverted, the history shows that too.
            </p>
          </div>
          <div class="ce-card">
            <h3 class="ce-card-title">Rebuilding from scratch</h3>
            <p>
              If you delete your entire local database and restart the engine, scanning commit trailers on <code>main</code> tells the orchestrator exactly which goal contracts have already landed so it never blindly re-runs finished work.
            </p>
          </div>
        </div>
      </Section>

      <Section id="evidence-and-ledger">
        <h2>Raw Evidence Directories &amp; the Local Transactional Ledger</h2>
        <p>
          Every attempt should write its raw artifacts to a dedicated, append-only evidence directory outside Git: the exact contract snapshot, the full git diff, verbatim stdout/stderr from every test or lint command, and the independent reviewer’s verdict. Never rely solely on an agent’s summary of what happened—store the raw logs so both humans and later retry passes can inspect ground truth.
        </p>
        <p>
          Alongside the evidence directory, maintain a small <strong>local transactional ledger</strong> (for example, a single embedded database file in write-ahead-log mode). Keep the boundary between the ledger and Git razor-sharp:
        </p>

        <table>
          <thead>
            <tr>
              <th>Concern</th>
              <th>Shared Git State</th>
              <th>Local Transactional Ledger</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Goal intent &amp; acceptance</td>
              <td>Authoritative (Markdown files)</td>
              <td>Cached index + content hash only</td>
            </tr>
            <tr>
              <td>Did a goal land?</td>
              <td>Authoritative (commit trailers on branch)</td>
              <td>Derived mirror, rebuilt on startup</td>
            </tr>
            <tr>
              <td>Who owns an active attempt?</td>
              <td>Optional remote ref lease (Ch. 5)</td>
              <td>Authoritative local lease + expiry</td>
            </tr>
            <tr>
              <td>Stale-writer protection</td>
              <td>Re-check contract hash at landing</td>
              <td>Monotonic fencing token per lease</td>
            </tr>
            <tr>
              <td>Retries, cooldowns &amp; evidence paths</td>
              <td>Never committed to repo</td>
              <td>Authoritative local operational history</td>
            </tr>
          </tbody>
        </table>

        <h3>Why Monotonic Fencing Tokens Matter</h3>
        <p>
          Suppose Attempt 1 stalls on a slow disk or sleeping laptop, its lease expires, and the orchestrator starts Attempt 2. Five minutes later, Attempt 1 wakes up and tries to report success or land its branch. A simple boolean lock cannot tell whether a late writer still owns the lease.
        </p>
        <p>
          Give every lease acquisition a strictly increasing integer—a <strong>monotonic fencing token</strong> (token 41 for Attempt 1, token 42 for Attempt 2). Every ledger write and every landing step must prove its token is still the highest token issued for that goal. Attempt 1 presents token 41, the orchestrator sees token 42 is active, and Attempt 1’s zombie write is rejected atomically.
        </p>

        <details class="ce-disclosure">
          <summary>What happens when you wipe the local ledger?</summary>
          <div class="ce-disclosure-body">
            <p>
              Treat the local ledger as reconstructible operational state. On startup, reconcile the ledger against Git: scan goal files for current contract hashes, scan branch commit trailers for already-landed contracts, and prune any orphaned worktrees whose leases no longer exist. You may lose retry counters from a wiped disk, but you never lose truth about what shipped.
            </p>
          </div>
        </details>
      </Section>

      <div class="ce-checkpoint">
        <p class="ce-box-label">How to Know You Built It Right</p>
        <ul>
          <li>You can kill the engine mid-run, delete the local ledger, restart it, and it recognizes every previously landed goal solely from Git commit trailers without re-running them.</li>
          <li>Editing a goal Markdown file while an attempt is running causes the stale attempt to be rejected as superseded before it can touch the target branch.</li>
          <li>An expired worker attempting to commit or update state with an older fencing token is refused deterministically.</li>
          <li>Every finished or failed run leaves a single inspectable folder containing raw gate logs, the exact diff, and the contract hash that produced it.</li>
        </ul>
      </div>
    </EngineLayout>
  );
}
