import { ComponentChildren } from "preact";

interface DiagramFrameProps {
  caption: string;
  children: ComponentChildren;
}

function DiagramFrame({ caption, children }: DiagramFrameProps) {
  return (
    <figure class="ce-diagram-figure">
      {children}
      <figcaption class="ce-diagram-caption">{caption}</figcaption>
    </figure>
  );
}

/**
 * Shared SVG arrow marker definitions using CSS variables so diagrams adapt to light and dark mode.
 */
function ArrowDefs({ idPrefix }: { idPrefix: string }) {
  return (
    <defs>
      <marker
        id={`${idPrefix}-arrow`}
        viewBox="0 0 10 10"
        refX="8.5"
        refY="5"
        markerWidth="6.5"
        markerHeight="6.5"
        orient="auto-start-reverse"
      >
        <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="var(--ce-muted)" />
      </marker>
      <marker
        id={`${idPrefix}-arrow-accent`}
        viewBox="0 0 10 10"
        refX="8.5"
        refY="5"
        markerWidth="6.5"
        markerHeight="6.5"
        orient="auto-start-reverse"
      >
        <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="var(--ce-accent)" />
      </marker>
      <marker
        id={`${idPrefix}-arrow-success`}
        viewBox="0 0 10 10"
        refX="8.5"
        refY="5"
        markerWidth="6.5"
        markerHeight="6.5"
        orient="auto-start-reverse"
      >
        <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="var(--ce-success)" />
      </marker>
      <marker
        id={`${idPrefix}-arrow-warn`}
        viewBox="0 0 10 10"
        refX="8.5"
        refY="5"
        markerWidth="6.5"
        markerHeight="6.5"
        orient="auto-start-reverse"
      >
        <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="var(--ce-warn)" />
      </marker>
      <marker
        id={`${idPrefix}-arrow-danger`}
        viewBox="0 0 10 10"
        refX="8.5"
        refY="5"
        markerWidth="6.5"
        markerHeight="6.5"
        orient="auto-start-reverse"
      >
        <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="var(--ce-danger)" />
      </marker>
    </defs>
  );
}

/**
 * Overview Diagram: High-level architecture of a continuous engineering system.
 */
export function OverviewArchitectureDiagram() {
  return (
    <DiagramFrame caption="A deterministic orchestrator owns the loop. Coding agents operate inside disposable worktrees, deterministic gates and a fresh-context reviewer verify every change, and durable state lives in Git and a local transactional ledger rather than chat history.">
      <svg
        role="img"
        aria-label="Architecture diagram of a continuous engineering system showing the deterministic orchestrator coordinating goal contracts, isolated worktrees, independent verification, transactional landing, and human steering backed by durable Git and ledger state."
        viewBox="0 0 760 400"
        font-family="var(--font-sans)"
      >
        <ArrowDefs idPrefix="ov" />

        {/* Outer Orchestrator Boundary */}
        <rect
          x="16"
          y="16"
          width="728"
          height="252"
          rx="14"
          fill="var(--ce-panel)"
          stroke="var(--ce-accent-border)"
          stroke-width="1.5"
          stroke-dasharray="6 4"
        />
        <text
          x="34"
          y="40"
          font-size="11"
          font-weight="700"
          letter-spacing="0.08em"
          fill="var(--ce-accent)"
          font-family="var(--font-mono)"
        >
          DETERMINISTIC ORCHESTRATOR (OWNS STATE, LEASES, WATCHDOGS &amp; LANDING)
        </text>

        {/* Step 1: Plan & Contract */}
        <rect
          x="36"
          y="64"
          width="148"
          height="92"
          rx="10"
          fill="var(--ce-page)"
          stroke="var(--ce-border-strong)"
          stroke-width="1.5"
        />
        <text x="50" y="88" font-size="10" font-weight="700" fill="var(--ce-accent)" font-family="var(--font-mono)">
          01 / CONTRACT
        </text>
        <text x="50" y="109" font-size="13" font-weight="700" fill="var(--ce-ink)">
          Pick Ready Goal
        </text>
        <text x="50" y="128" font-size="11" fill="var(--ce-body)">
          Hash goal file, claim
        </text>
        <text x="50" y="143" font-size="11" fill="var(--ce-body)">
          lease &amp; fencing token
        </text>

        {/* Arrow 1 -> 2 */}
        <line
          x1="184"
          y1="110"
          x2="216"
          y2="110"
          stroke="var(--ce-accent)"
          stroke-width="2"
          marker-end="url(#ov-arrow-accent)"
        />

        {/* Step 2: Isolated Build */}
        <rect
          x="218"
          y="64"
          width="154"
          height="92"
          rx="10"
          fill="var(--ce-accent-soft)"
          stroke="var(--ce-accent)"
          stroke-width="1.5"
        />
        <text x="232" y="88" font-size="10" font-weight="700" fill="var(--ce-accent)" font-family="var(--font-mono)">
          02 / ISOLATE
        </text>
        <text x="232" y="109" font-size="13" font-weight="700" fill="var(--ce-ink)">
          Build in Worktree
        </text>
        <text x="232" y="128" font-size="11" fill="var(--ce-body)">
          Fresh agent session
        </text>
        <text x="232" y="143" font-size="11" fill="var(--ce-body)">
          under watchdog timer
        </text>

        {/* Arrow 2 -> 3 */}
        <line
          x1="372"
          y1="110"
          x2="404"
          y2="110"
          stroke="var(--ce-accent)"
          stroke-width="2"
          marker-end="url(#ov-arrow-accent)"
        />

        {/* Step 3: Verify & Review */}
        <rect
          x="406"
          y="64"
          width="158"
          height="92"
          rx="10"
          fill="var(--ce-page)"
          stroke="var(--ce-border-strong)"
          stroke-width="1.5"
        />
        <text x="420" y="88" font-size="10" font-weight="700" fill="var(--ce-purple)" font-family="var(--font-mono)">
          03 / VERIFY
        </text>
        <text x="420" y="109" font-size="13" font-weight="700" fill="var(--ce-ink)">
          Gates + Fresh Review
        </text>
        <text x="420" y="128" font-size="11" fill="var(--ce-body)">
          Tests, lint &amp; independent
        </text>
        <text x="420" y="143" font-size="11" fill="var(--ce-body)">
          reviewer (no chat bias)
        </text>

        {/* Arrow 3 -> 4 */}
        <line
          x1="564"
          y1="110"
          x2="594"
          y2="110"
          stroke="var(--ce-success)"
          stroke-width="2"
          marker-end="url(#ov-arrow-success)"
        />

        {/* Step 4: Transactional Land */}
        <rect
          x="596"
          y="64"
          width="128"
          height="92"
          rx="10"
          fill="var(--ce-success-soft)"
          stroke="var(--ce-success-border)"
          stroke-width="1.5"
        />
        <text x="610" y="88" font-size="10" font-weight="700" fill="var(--ce-success)" font-family="var(--font-mono)">
          04 / LAND
        </text>
        <text x="610" y="109" font-size="13" font-weight="700" fill="var(--ce-ink)">
          Rebase &amp; Land
        </text>
        <text x="610" y="128" font-size="11" fill="var(--ce-body)">
          Pre-land health check
        </text>
        <text x="610" y="143" font-size="11" fill="var(--ce-body)">
          or culprit rollback
        </text>

        {/* Feedback / Retry & Steering Bar inside Orchestrator */}
        <rect
          x="36"
          y="186"
          width="326"
          height="62"
          rx="8"
          fill="var(--ce-warn-soft)"
          stroke="var(--ce-warn-border)"
          stroke-width="1.2"
        />
        <text x="50" y="208" font-size="11" font-weight="700" fill="var(--ce-warn)" font-family="var(--font-mono)">
          STUCK / FAIL RECOVERY
        </text>
        <text x="50" y="227" font-size="10.5" fill="var(--ce-body)">
          Livelock &amp; oscillation • Network park • Strategy rotation
        </text>

        <rect
          x="384"
          y="186"
          width="340"
          height="62"
          rx="8"
          fill="var(--ce-purple-soft)"
          stroke="var(--ce-purple-border)"
          stroke-width="1.2"
        />
        <text x="398" y="208" font-size="11" font-weight="700" fill="var(--ce-purple)" font-family="var(--font-mono)">
          AMBITION &amp; NON-BLOCKING HUMAN STEERING
        </text>
        <text x="398" y="227" font-size="11" fill="var(--ce-body)">
          Read-only planner • Approval queue • Self-improvement goals
        </text>

        {/* Arrows from Verify/Land back to Recovery & Steering */}
        <path
          d="M 485 156 L 485 170 L 200 170 L 200 184"
          fill="none"
          stroke="var(--ce-warn)"
          stroke-width="1.5"
          marker-end="url(#ov-arrow-warn)"
        />
        <path
          d="M 660 156 L 660 184"
          fill="none"
          stroke="var(--ce-muted)"
          stroke-width="1.5"
          marker-end="url(#ov-arrow)"
        />

        {/* Durable Backing Layer */}
        <rect
          x="16"
          y="296"
          width="354"
          height="88"
          rx="10"
          fill="var(--ce-page)"
          stroke="var(--ce-border-strong)"
          stroke-width="1.5"
        />
        <text x="34" y="320" font-size="11" font-weight="700" fill="var(--ce-ink)" font-family="var(--font-mono)">
          DURABLE SHARED STATE (GIT)
        </text>
        <text x="34" y="341" font-size="11.5" fill="var(--ce-body)">
          Goal Markdown files • Ambition doc • Commit trailers
        </text>
        <text x="34" y="360" font-size="11.5" fill="var(--ce-body)">
          Atomic remote ref leases • Pull Requests &amp; issues
        </text>

        <rect
          x="390"
          y="296"
          width="354"
          height="88"
          rx="10"
          fill="var(--ce-page)"
          stroke="var(--ce-border-strong)"
          stroke-width="1.5"
        />
        <text x="408" y="320" font-size="11" font-weight="700" fill="var(--ce-ink)" font-family="var(--font-mono)">
          LOCAL TRANSACTIONAL LEDGER + EVIDENCE
        </text>
        <text x="408" y="341" font-size="11.5" fill="var(--ce-body)">
          Leases &amp; monotonic fencing tokens • Attempt history
        </text>
        <text x="408" y="360" font-size="11.5" fill="var(--ce-body)">
          Raw command logs, diffs &amp; review verdicts per run
        </text>

        {/* Bidirectional vertical arrows to Durable Layer */}
        <line
          x1="193"
          y1="268"
          x2="193"
          y2="294"
          stroke="var(--ce-muted)"
          stroke-width="1.5"
          marker-start="url(#ov-arrow)"
          marker-end="url(#ov-arrow)"
        />
        <line
          x1="567"
          y1="268"
          x2="567"
          y2="294"
          stroke="var(--ce-muted)"
          stroke-width="1.5"
          marker-start="url(#ov-arrow)"
          marker-end="url(#ov-arrow)"
        />
      </svg>
    </DiagramFrame>
  );
}

/**
 * Chapter 1 Diagram: Durable state planes vs. ephemeral context windows.
 */
export function StatePlanesDiagram() {
  return (
    <DiagramFrame caption="Three distinct planes keep a system recoverable across crashes and restarts: shared Git holds intent and landed history, a local transactional ledger arbitrates active leases with monotonic fencing tokens, and every attempt runs inside an ephemeral worktree whose chat window can be discarded without data loss.">
      <svg
        role="img"
        aria-label="Diagram comparing Shared Git State, Local Transactional Ledger, and Ephemeral Worktree Attempts connected by content-hashed contracts, fencing tokens, and commit trailers."
        viewBox="0 0 760 360"
        font-family="var(--font-sans)"
      >
        <ArrowDefs idPrefix="st" />

        {/* Column 1: Shared Git */}
        <rect
          x="16"
          y="20"
          width="224"
          height="242"
          rx="12"
          fill="var(--ce-page)"
          stroke="var(--ce-accent)"
          stroke-width="1.5"
        />
        <rect
          x="16"
          y="20"
          width="224"
          height="36"
          rx="12"
          fill="var(--ce-accent-soft)"
        />
        <rect x="16" y="44" width="224" height="12" fill="var(--ce-accent-soft)" />
        <text x="30" y="43" font-size="10" font-weight="700" fill="var(--ce-accent)" font-family="var(--font-mono)">
          1. SHARED GIT (TRUTH)
        </text>

        <rect x="30" y="70" width="196" height="52" rx="7" fill="var(--ce-surface)" stroke="var(--ce-border)" />
        <text x="42" y="90" font-size="12" font-weight="700" fill="var(--ce-ink)">Goal Markdown Files</text>
        <text x="42" y="108" font-size="10.5" fill="var(--ce-body)">Content hash = contract ID</text>

        <rect x="30" y="134" width="196" height="52" rx="7" fill="var(--ce-surface)" stroke="var(--ce-border)" />
        <text x="42" y="154" font-size="12" font-weight="700" fill="var(--ce-ink)">Commit Trailers</text>
        <text x="42" y="172" font-size="10.5" fill="var(--ce-body)">Goal-ID + Contract-Hash</text>

        <rect x="30" y="198" width="196" height="50" rx="7" fill="var(--ce-surface)" stroke="var(--ce-border)" />
        <text x="42" y="218" font-size="12" font-weight="700" fill="var(--ce-ink)">Main Branch History</text>
        <text x="42" y="235" font-size="10.5" fill="var(--ce-body)">Survives any local wipe</text>

        {/* Column 2: Local Ledger */}
        <rect
          x="268"
          y="20"
          width="224"
          height="242"
          rx="12"
          fill="var(--ce-page)"
          stroke="var(--ce-purple-border)"
          stroke-width="1.5"
        />
        <rect
          x="268"
          y="20"
          width="224"
          height="36"
          rx="12"
          fill="var(--ce-purple-soft)"
        />
        <rect x="268" y="44" width="224" height="12" fill="var(--ce-purple-soft)" />
        <text x="282" y="43" font-size="10" font-weight="700" fill="var(--ce-purple)" font-family="var(--font-mono)">
          2. LOCAL LEDGER (TRANSIENT)
        </text>

        <rect x="282" y="70" width="196" height="52" rx="7" fill="var(--ce-surface)" stroke="var(--ce-border)" />
        <text x="294" y="90" font-size="12" font-weight="700" fill="var(--ce-ink)">Active Leases + Tokens</text>
        <text x="294" y="108" font-size="10.5" fill="var(--ce-body)">Monotonic fencing #42 &gt; #41</text>

        <rect x="282" y="134" width="196" height="52" rx="7" fill="var(--ce-surface)" stroke="var(--ce-border)" />
        <text x="294" y="154" font-size="12" font-weight="700" fill="var(--ce-ink)">Attempt &amp; Failure Memory</text>
        <text x="294" y="172" font-size="10.5" fill="var(--ce-body)">Retries, strategies, cooldowns</text>

        <rect x="282" y="198" width="196" height="50" rx="7" fill="var(--ce-surface)" stroke="var(--ce-border)" />
        <text x="294" y="218" font-size="12" font-weight="700" fill="var(--ce-ink)">Raw Evidence Directory</text>
        <text x="294" y="235" font-size="10.5" fill="var(--ce-body)">Logs, diffs &amp; verdicts per run</text>

        {/* Column 3: Ephemeral Attempt */}
        <rect
          x="520"
          y="20"
          width="224"
          height="242"
          rx="12"
          fill="var(--ce-page)"
          stroke="var(--ce-warn-border)"
          stroke-width="1.5"
          stroke-dasharray="5 3"
        />
        <rect
          x="520"
          y="20"
          width="224"
          height="36"
          rx="12"
          fill="var(--ce-warn-soft)"
        />
        <rect x="520" y="44" width="224" height="12" fill="var(--ce-warn-soft)" />
        <text x="534" y="43" font-size="10" font-weight="700" fill="var(--ce-warn)" font-family="var(--font-mono)">
          3. EPHEMERAL WORKTREE
        </text>

        <rect x="534" y="70" width="196" height="52" rx="7" fill="var(--ce-surface)" stroke="var(--ce-border)" />
        <text x="546" y="90" font-size="12" font-weight="700" fill="var(--ce-ink)">Isolated Git Worktree</text>
        <text x="546" y="108" font-size="10.5" fill="var(--ce-body)">Created fresh, deleted after run</text>

        <rect x="534" y="134" width="196" height="52" rx="7" fill="var(--ce-surface)" stroke="var(--ce-border)" />
        <text x="546" y="154" font-size="12" font-weight="700" fill="var(--ce-ink)">Agent Context Window</text>
        <text x="546" y="172" font-size="10.5" fill="var(--ce-body)">Disposable scratchpad only</text>

        <rect x="534" y="198" width="196" height="50" rx="7" fill="var(--ce-surface)" stroke="var(--ce-border)" />
        <text x="546" y="218" font-size="12" font-weight="700" fill="var(--ce-ink)">Candidate Commit</text>
        <text x="546" y="235" font-size="10.5" fill="var(--ce-body)">Must match live hash &amp; token</text>

        {/* Arrows between columns */}
        <line x1="240" y1="96" x2="266" y2="96" stroke="var(--ce-accent)" stroke-width="1.8" marker-end="url(#st-arrow-accent)" />
        <line x1="492" y1="96" x2="518" y2="96" stroke="var(--ce-accent)" stroke-width="1.8" marker-end="url(#st-arrow-accent)" />

        {/* Bottom Guard Banner */}
        <rect
          x="16"
          y="284"
          width="728"
          height="66"
          rx="10"
          fill="var(--ce-success-soft)"
          stroke="var(--ce-success-border)"
          stroke-width="1.5"
        />
        <text x="34" y="306" font-size="11" font-weight="700" fill="var(--ce-success)" font-family="var(--font-mono)">
          COMMIT-TIME GUARD: CONTRACT HASH + FENCING TOKEN CHECK
        </text>
        <text x="34" y="325" font-size="11" fill="var(--ce-body)">
          If a human edited the goal mid-flight (hash changed) or a newer attempt took over (higher token),
        </text>
        <text x="34" y="341" font-size="11" fill="var(--ce-body)">
          the stale candidate is rejected cleanly before landing.
        </text>

        <path d="M 632 262 L 632 282" fill="none" stroke="var(--ce-success)" stroke-width="1.8" marker-end="url(#st-arrow-success)" />
        <path d="M 128 284 L 128 264" fill="none" stroke="var(--ce-success)" stroke-width="1.8" marker-end="url(#st-arrow-success)" />
      </svg>
    </DiagramFrame>
  );
}

/**
 * Chapter 2 Diagram A: Verification funnel with fresh-context review.
 */
export function VerificationFunnelDiagram() {
  return (
    <DiagramFrame caption="The builder never grades its own work. Every candidate passes through deterministic gates first, then an independent reviewer that starts with a blank context window and inspects only the contract, diff, and raw gate evidence, followed by a post-rebase pre-landing health check on the exact commit that will land.">
      <svg
        role="img"
        aria-label="Verification funnel diagram showing Builder Worktree feeding Deterministic Gates, then Fresh-Context Independent Reviewer with zero builder chat history, then Rebase and Pre-Landing Health Check before merging to Main."
        viewBox="0 0 760 250"
        font-family="var(--font-sans)"
      >
        <ArrowDefs idPrefix="vf" />

        {/* Stage 1: Builder */}
        <rect x="16" y="42" width="144" height="114" rx="10" fill="var(--ce-surface)" stroke="var(--ce-border-strong)" stroke-width="1.5" />
        <text x="28" y="65" font-size="10" font-weight="700" fill="var(--ce-muted)" font-family="var(--font-mono)">STAGE 1</text>
        <text x="28" y="86" font-size="13" font-weight="700" fill="var(--ce-ink)">Builder Agent</text>
        <text x="28" y="106" font-size="11" fill="var(--ce-body)">Writes code &amp; tests</text>
        <text x="28" y="122" font-size="11" fill="var(--ce-body)">in isolated worktree</text>
        <text x="28" y="142" font-size="10" fill="var(--ce-muted)" font-family="var(--font-mono)">(context discarded)</text>

        <line x1="160" y1="99" x2="188" y2="99" stroke="var(--ce-accent)" stroke-width="2" marker-end="url(#vf-arrow-accent)" />

        {/* Stage 2: Deterministic Gates */}
        <rect x="190" y="42" width="166" height="114" rx="10" fill="var(--ce-accent-soft)" stroke="var(--ce-accent)" stroke-width="1.5" />
        <text x="202" y="65" font-size="10" font-weight="700" fill="var(--ce-accent)" font-family="var(--font-mono)">STAGE 2 / FAST</text>
        <text x="202" y="86" font-size="13" font-weight="700" fill="var(--ce-ink)">Deterministic Gates</text>
        <text x="202" y="106" font-size="11" fill="var(--ce-body)">• Unit &amp; integration tests</text>
        <text x="202" y="122" font-size="11" fill="var(--ce-body)">• Typecheck, lint, doc ratchet</text>
        <text x="202" y="138" font-size="11" fill="var(--ce-body)">• Supply-chain guardrails</text>

        <line x1="356" y1="99" x2="384" y2="99" stroke="var(--ce-accent)" stroke-width="2" marker-end="url(#vf-arrow-accent)" />

        {/* Stage 3: Independent Reviewer */}
        <rect x="386" y="42" width="176" height="114" rx="10" fill="var(--ce-purple-soft)" stroke="var(--ce-purple-border)" stroke-width="1.5" />
        <text x="398" y="65" font-size="10" font-weight="700" fill="var(--ce-purple)" font-family="var(--font-mono)">STAGE 3 / FRESH</text>
        <text x="398" y="86" font-size="13" font-weight="700" fill="var(--ce-ink)">Independent Review</text>
        <text x="398" y="106" font-size="11" fill="var(--ce-body)">Sees ONLY: goal contract,</text>
        <text x="398" y="122" font-size="11" fill="var(--ce-body)">git diff &amp; raw gate logs.</text>
        <text x="398" y="140" font-size="10.5" font-weight="600" fill="var(--ce-purple)">Zero builder chat history.</text>

        <line x1="562" y1="99" x2="590" y2="99" stroke="var(--ce-success)" stroke-width="2" marker-end="url(#vf-arrow-success)" />

        {/* Stage 4: Rebase & Land */}
        <rect x="592" y="42" width="152" height="114" rx="10" fill="var(--ce-success-soft)" stroke="var(--ce-success-border)" stroke-width="1.5" />
        <text x="604" y="65" font-size="10" font-weight="700" fill="var(--ce-success)" font-family="var(--font-mono)">STAGE 4 / EXACT</text>
        <text x="604" y="86" font-size="13" font-weight="700" fill="var(--ce-ink)">Rebase &amp; Health</text>
        <text x="604" y="106" font-size="11" fill="var(--ce-body)">Rebase onto live HEAD,</text>
        <text x="604" y="122" font-size="11" fill="var(--ce-body)">re-run health check on</text>
        <text x="604" y="138" font-size="11" fill="var(--ce-body)">exact landing commit</text>

        {/* Rejection loop along bottom */}
        <path
          d="M 273 156 L 273 206 L 88 206 L 88 158"
          fill="none"
          stroke="var(--ce-danger)"
          stroke-width="1.5"
          stroke-dasharray="5 3"
          marker-end="url(#vf-arrow-danger)"
        />
        <path
          d="M 474 156 L 474 206 L 273 206"
          fill="none"
          stroke="var(--ce-danger)"
          stroke-width="1.5"
          stroke-dasharray="5 3"
        />
        <path
          d="M 668 156 L 668 206 L 474 206"
          fill="none"
          stroke="var(--ce-danger)"
          stroke-width="1.5"
          stroke-dasharray="5 3"
        />
        <rect x="192" y="190" width="376" height="30" rx="15" fill="var(--ce-danger-soft)" stroke="var(--ce-danger-border)" />
        <text x="380" y="209" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ce-danger)">
          Any failure returns structured evidence to a fresh attempt
        </text>
      </svg>
    </DiagramFrame>
  );
}

/**
 * Chapter 2 Diagram B: Culprit-only rollback timeline.
 */
export function CulpritRollbackDiagram() {
  return (
    <DiagramFrame caption="When main goes red after concurrent or subtle regressions, culprit-only rollback reverts agent commits newest-first until health passes, then replays innocent later commits—never touching human commits.">
      <svg
        role="img"
        aria-label="Timeline showing culprit-only rollback: human commit H1 is protected, agent commits A2 and A1 are reverted newest-first until healthy, then innocent commit A2 is replayed while culprit A1 stays reverted."
        viewBox="0 0 760 276"
        font-family="var(--font-sans)"
      >
        <ArrowDefs idPrefix="rb" />

        {/* Row 1: Broken Main */}
        <text x="20" y="32" font-size="11" font-weight="700" fill="var(--ce-danger)" font-family="var(--font-mono)">
          1. MAIN HEALTH CHECK FAILS
        </text>
        <line x1="60" y1="68" x2="660" y2="68" stroke="var(--ce-border-strong)" stroke-width="2.5" />

        <circle cx="96" cy="68" r="20" fill="var(--ce-accent-soft)" stroke="var(--ce-accent)" stroke-width="2" />
        <text x="96" y="72" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ce-ink)">H1</text>
        <text x="96" y="102" text-anchor="middle" font-size="10.5" fill="var(--ce-muted)">Human (protected)</text>

        <circle cx="276" cy="68" r="20" fill="var(--ce-danger-soft)" stroke="var(--ce-danger)" stroke-width="2" />
        <text x="276" y="72" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ce-danger)">A1</text>
        <text x="276" y="102" text-anchor="middle" font-size="10.5" fill="var(--ce-danger)">Agent (hidden culprit)</text>

        <circle cx="456" cy="68" r="20" fill="var(--ce-surface)" stroke="var(--ce-border-strong)" stroke-width="2" />
        <text x="456" y="72" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ce-ink)">A2</text>
        <text x="456" y="102" text-anchor="middle" font-size="10.5" fill="var(--ce-muted)">Agent (innocent)</text>

        <rect x="572" y="50" width="166" height="36" rx="8" fill="var(--ce-danger-soft)" stroke="var(--ce-danger-border)" />
        <text x="655" y="72" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--ce-danger)">Health Check: RED</text>

        {/* Row 2: Revert newest-first */}
        <text x="20" y="142" font-size="11" font-weight="700" fill="var(--ce-warn)" font-family="var(--font-mono)">
          2. PROBE NEWEST-FIRST (STOP AT HUMAN BOUNDARY)
        </text>
        <rect x="20" y="156" width="720" height="38" rx="8" fill="var(--ce-warn-soft)" stroke="var(--ce-warn-border)" />
        <text x="36" y="179" font-size="11.5" fill="var(--ce-body)">
          Test without A2 → still RED.   Test without A2 &amp; A1 → GREEN!   Culprit identified: <tspan font-weight="700" fill="var(--ce-danger)">A1</tspan>.   H1 never touched.
        </text>

        {/* Row 3: Recovered Main */}
        <text x="20" y="222" font-size="11" font-weight="700" fill="var(--ce-success)" font-family="var(--font-mono)">
          3. REVERT CULPRIT &amp; SPARE INNOCENT COMMITS
        </text>
        <line x1="60" y1="248" x2="660" y2="248" stroke="var(--ce-success-border)" stroke-width="2.5" />

        <circle cx="96" cy="248" r="18" fill="var(--ce-accent-soft)" stroke="var(--ce-accent)" stroke-width="2" />
        <text x="96" y="252" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--ce-ink)">H1</text>

        <circle cx="236" cy="248" r="18" fill="var(--ce-danger-soft)" stroke="var(--ce-danger)" stroke-width="1.5" stroke-dasharray="4 2" />
        <text x="236" y="252" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ce-danger)">−A1</text>

        <circle cx="386" cy="248" r="18" fill="var(--ce-success-soft)" stroke="var(--ce-success)" stroke-width="2" />
        <text x="386" y="252" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--ce-success)">A2&apos;</text>

        <rect x="492" y="230" width="252" height="36" rx="8" fill="var(--ce-success-soft)" stroke="var(--ce-success-border)" />
        <text x="618" y="252" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--ce-success)">GREEN • A2 Spared • A1 Re-queued</text>
      </svg>
    </DiagramFrame>
  );
}

/**
 * Chapter 3 Diagram A: Process-group watchdog & failure classification.
 */
export function WatchdogRecoveryDiagram() {
  return (
    <DiagramFrame caption="A watchdog treats every hanging, spinning, or offline attempt differently so the system neither leaks orphan processes nor burns its retry budget on transient outages.">
      <svg
        role="img"
        aria-label="Diagram of process-group watchdog and failure classification routing to livelock abort, network-drop park without burning retries, strategy rotation, and oscillation block."
        viewBox="0 0 760 310"
        font-family="var(--font-sans)"
      >
        <ArrowDefs idPrefix="wd" />

        {/* Left: Orchestrator + Process Group */}
        <rect x="16" y="34" width="220" height="242" rx="12" fill="var(--ce-panel)" stroke="var(--ce-accent)" stroke-width="1.5" />
        <text x="30" y="58" font-size="10" font-weight="700" fill="var(--ce-accent)" font-family="var(--font-mono)">
          ISOLATED PROCESS GROUP
        </text>
        <rect x="30" y="72" width="192" height="58" rx="8" fill="var(--ce-page)" stroke="var(--ce-border-strong)" />
        <text x="42" y="94" font-size="12" font-weight="700" fill="var(--ce-ink)">Watchdog Supervisor</text>
        <text x="42" y="112" font-size="10.5" fill="var(--ce-body)">Owner-death + wall clock</text>

        <line x1="126" y1="130" x2="126" y2="154" stroke="var(--ce-accent)" stroke-width="1.8" marker-end="url(#wd-arrow-accent)" />

        <rect x="30" y="156" width="192" height="104" rx="8" fill="var(--ce-page)" stroke="var(--ce-border-strong)" stroke-dasharray="4 3" />
        <text x="42" y="178" font-size="12" font-weight="700" fill="var(--ce-ink)">Detached PGID (setsid)</text>
        <text x="42" y="198" font-size="10.5" fill="var(--ce-body)">• Coding agent process</text>
        <text x="42" y="215" font-size="10.5" fill="var(--ce-body)">• Test runners &amp; servers</text>
        <text x="42" y="232" font-size="10.5" fill="var(--ce-body)">• Grandchild daemons</text>
        <text x="42" y="250" font-size="10" font-weight="600" fill="var(--ce-danger)">SIGKILL kills entire tree</text>

        {/* Right: 4 Failure Classifications */}
        <rect x="284" y="16" width="460" height="60" rx="9" fill="var(--ce-warn-soft)" stroke="var(--ce-warn-border)" />
        <text x="300" y="38" font-size="11" font-weight="700" fill="var(--ce-warn)" font-family="var(--font-mono)">
          1. LIVELOCK (BUSY, ZERO FILE DIFF)
        </text>
        <text x="300" y="57" font-size="10.5" fill="var(--ce-body)">
          Agent keeps talking or polling without editing files → abort early &amp; rotate strategy.
        </text>

        <rect x="284" y="88" width="460" height="60" rx="9" fill="var(--ce-accent-soft)" stroke="var(--ce-accent-border)" />
        <text x="300" y="110" font-size="11" font-weight="700" fill="var(--ce-accent)" font-family="var(--font-mono)">
          2. NETWORK / PROVIDER OUTAGE
        </text>
        <text x="300" y="129" font-size="10.5" fill="var(--ce-body)">
          Park goal in waiting state with backoff — do NOT consume attempt retry budget.
        </text>

        <rect x="284" y="160" width="460" height="60" rx="9" fill="var(--ce-purple-soft)" stroke="var(--ce-purple-border)" />
        <text x="300" y="182" font-size="11" font-weight="700" fill="var(--ce-purple)" font-family="var(--font-mono)">
          3. REPEATED FAILURE SIGNATURE
        </text>
        <text x="300" y="201" font-size="10.5" fill="var(--ce-body)">
          Rotate strategy (narrow scope, switch model/prompt angle, or inspect evidence).
        </text>

        <rect x="284" y="232" width="460" height="60" rx="9" fill="var(--ce-danger-soft)" stroke="var(--ce-danger-border)" />
        <text x="300" y="254" font-size="11" font-weight="700" fill="var(--ce-danger)" font-family="var(--font-mono)">
          4. A → B → A OSCILLATION / FILE REVERSAL
        </text>
        <text x="300" y="273" font-size="10.5" fill="var(--ce-body)">
          Detect repeating diff/failure hash cycles → stop thrashing and escalate cleanly.
        </text>

        {/* Connecting branches */}
        <path d="M 236 155 L 260 155 L 260 46 L 282 46" fill="none" stroke="var(--ce-muted)" stroke-width="1.6" marker-end="url(#wd-arrow)" />
        <path d="M 260 118 L 282 118" fill="none" stroke="var(--ce-muted)" stroke-width="1.6" marker-end="url(#wd-arrow)" />
        <path d="M 260 190 L 282 190" fill="none" stroke="var(--ce-muted)" stroke-width="1.6" marker-end="url(#wd-arrow)" />
        <path d="M 260 155 L 260 262 L 282 262" fill="none" stroke="var(--ce-muted)" stroke-width="1.6" marker-end="url(#wd-arrow)" />
      </svg>
    </DiagramFrame>
  );
}

/**
 * Chapter 3 Diagram B: Unified pure scheduler state machine & liveness.
 */
export function SchedulerLivenessDiagram() {
  return (
    <DiagramFrame caption="When dispatch, dependency checks, approval waits, and planning share one pure readiness model, you can exhaustively model-check every finite state combination to guarantee no silent deadlock can hide.">
      <svg
        role="img"
        aria-label="Finite-state liveness diagram showing a single pure scheduler decision function mapping Ready, Active, Approval-Waiting, Network-Parked, Blocked, and Planning states with guaranteed progress edges."
        viewBox="0 0 760 270"
        font-family="var(--font-sans)"
      >
        <ArrowDefs idPrefix="ls" />

        {/* Center Pure Decision Box */}
        <rect x="248" y="88" width="264" height="92" rx="12" fill="var(--ce-accent-soft)" stroke="var(--ce-accent)" stroke-width="2" />
        <text x="380" y="114" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--ce-accent)" font-family="var(--font-mono)">
          ONE PURE DECISION FUNCTION
        </text>
        <text x="380" y="136" text-anchor="middle" font-size="13.5" font-weight="700" fill="var(--ce-ink)">
          nextAction(worldState)
        </text>
        <text x="380" y="158" text-anchor="middle" font-size="11" fill="var(--ce-body)">
          Exhaustively checked for dead states
        </text>

        {/* Top-left: Ready Queue */}
        <rect x="18" y="20" width="176" height="58" rx="9" fill="var(--ce-page)" stroke="var(--ce-border-strong)" stroke-width="1.4" />
        <text x="32" y="43" font-size="12" font-weight="700" fill="var(--ce-ink)">Ready Goals</text>
        <text x="32" y="61" font-size="10.5" fill="var(--ce-body)">Deps met, not leased</text>

        {/* Bottom-left: Parked / Blocked */}
        <rect x="18" y="190" width="176" height="58" rx="9" fill="var(--ce-warn-soft)" stroke="var(--ce-warn-border)" stroke-width="1.4" />
        <text x="32" y="213" font-size="12" font-weight="700" fill="var(--ce-warn)">Parked / Waiting</text>
        <text x="32" y="231" font-size="10.5" fill="var(--ce-body)">Approval, network, or deps</text>

        {/* Top-right: Dispatch Worker */}
        <rect x="566" y="20" width="176" height="58" rx="9" fill="var(--ce-success-soft)" stroke="var(--ce-success-border)" stroke-width="1.4" />
        <text x="580" y="43" font-size="12" font-weight="700" fill="var(--ce-success)">Dispatch Worker</text>
        <text x="580" y="61" font-size="10.5" fill="var(--ce-body)">If slot free &amp; ready exists</text>

        {/* Middle-right: Invoke Planner */}
        <rect x="566" y="105" width="176" height="58" rx="9" fill="var(--ce-purple-soft)" stroke="var(--ce-purple-border)" stroke-width="1.4" />
        <text x="580" y="128" font-size="12" font-weight="700" fill="var(--ce-purple)">Invoke Planner</text>
        <text x="580" y="146" font-size="10.5" fill="var(--ce-body)">If queue empty &amp; ambition open</text>

        {/* Bottom-right: Explicit Idle / Escalate */}
        <rect x="566" y="190" width="176" height="58" rx="9" fill="var(--ce-page)" stroke="var(--ce-border-strong)" stroke-width="1.4" />
        <text x="580" y="213" font-size="12" font-weight="700" fill="var(--ce-ink)">Explicit Wait / Done</text>
        <text x="580" y="231" font-size="10.5" fill="var(--ce-body)">Named wake trigger required</text>

        {/* Arrows into pure function */}
        <path d="M 194 49 L 224 49 L 224 114 L 246 114" fill="none" stroke="var(--ce-muted)" stroke-width="1.6" marker-end="url(#ls-arrow)" />
        <path d="M 194 219 L 224 219 L 224 154 L 246 154" fill="none" stroke="var(--ce-muted)" stroke-width="1.6" marker-end="url(#ls-arrow)" />

        {/* Arrows out of pure function */}
        <path d="M 512 110 L 538 110 L 538 49 L 564 49" fill="none" stroke="var(--ce-success)" stroke-width="1.8" marker-end="url(#ls-arrow-success)" />
        <line x1="512" y1="134" x2="564" y2="134" stroke="var(--ce-accent)" stroke-width="1.8" marker-end="url(#ls-arrow-accent)" />
        <path d="M 512 158 L 538 158 L 538 219 L 564 219" fill="none" stroke="var(--ce-muted)" stroke-width="1.6" marker-end="url(#ls-arrow)" />
      </svg>
    </DiagramFrame>
  );
}

/**
 * Chapter 4 Diagram: Ambition, Non-Blocking Steering & Self-Improvement.
 */
export function AmbitionSteeringDiagram() {
  return (
    <DiagramFrame caption="A read-only planner turns an ambition document and live repository history into small vertical slices. Human approvals park outside worker slots so throughput never stalls, recurring failures spawn self-improvement goals, and experiments only land when their target metric improves.">
      <svg
        role="img"
        aria-label="Diagram of the ambition, steering, and self-improvement loop showing Ambition Document feeding a Read-Only Planner, Worker Pool, Non-Blocking Human Approval Queue, Cross-Task Failure Detector, and Metric-Gated Experiments."
        viewBox="0 0 760 368"
        font-family="var(--font-sans)"
      >
        <ArrowDefs idPrefix="am" />

        {/* Left Inputs (vertically symmetric around y=166) */}
        <rect x="16" y="20" width="188" height="82" rx="10" fill="var(--ce-accent-soft)" stroke="var(--ce-accent)" stroke-width="1.5" />
        <text x="30" y="45" font-size="10.5" font-weight="700" fill="var(--ce-accent)" font-family="var(--font-mono)">HUMAN DIRECTION</text>
        <text x="30" y="66" font-size="13" font-weight="700" fill="var(--ce-ink)">Ambition Document</text>
        <text x="30" y="85" font-size="10.5" fill="var(--ce-body)">Outcomes, guardrails, taste</text>

        <rect x="16" y="125" width="188" height="82" rx="10" fill="var(--ce-surface)" stroke="var(--ce-border-strong)" stroke-width="1.4" />
        <text x="30" y="150" font-size="10.5" font-weight="700" fill="var(--ce-muted)" font-family="var(--font-mono)">LIVE REALITY</text>
        <text x="30" y="171" font-size="13" font-weight="700" fill="var(--ce-ink)">Repo + Recent History</text>
        <text x="30" y="190" font-size="10.5" fill="var(--ce-body)">Landed work, escalations</text>

        <rect x="16" y="230" width="188" height="82" rx="10" fill="var(--ce-warn-soft)" stroke="var(--ce-warn-border)" stroke-width="1.4" />
        <text x="30" y="255" font-size="10.5" font-weight="700" fill="var(--ce-warn)" font-family="var(--font-mono)">SYSTEM MEMORY</text>
        <text x="30" y="276" font-size="13" font-weight="700" fill="var(--ce-ink)">Failure Signatures</text>
        <text x="30" y="295" font-size="10.5" fill="var(--ce-body)">Recurring cross-task misses</text>

        {/* Center: Read-Only Planner (centered at y=166) */}
        <rect x="258" y="96" width="194" height="140" rx="12" fill="var(--ce-purple-soft)" stroke="var(--ce-purple-border)" stroke-width="1.6" />
        <text x="274" y="122" font-size="10.5" font-weight="700" fill="var(--ce-purple)" font-family="var(--font-mono)">READ-ONLY PLANNER</text>
        <text x="274" y="144" font-size="13" font-weight="700" fill="var(--ce-ink)">Propose Next Goals</text>
        <text x="274" y="165" font-size="11" fill="var(--ce-body)">• Next small vertical slice</text>
        <text x="274" y="183" font-size="11" fill="var(--ce-body)">• Simplify / refactor / docs</text>
        <text x="274" y="201" font-size="11" fill="var(--ce-body)">• Split escalated goals</text>
        <text x="274" y="219" font-size="11" fill="var(--ce-body)">• Spawn self-fix goals</text>

        {/* Arrows into Planner (clean, non-overlapping) */}
        <path d="M 204 61 L 231 61 L 231 132 L 256 132" fill="none" stroke="var(--ce-accent)" stroke-width="1.6" marker-end="url(#am-arrow-accent)" />
        <line x1="204" y1="166" x2="256" y2="166" stroke="var(--ce-muted)" stroke-width="1.6" marker-end="url(#am-arrow)" />
        <path d="M 204 271 L 231 271 L 231 200 L 256 200" fill="none" stroke="var(--ce-warn)" stroke-width="1.6" marker-end="url(#am-arrow-warn)" />

        {/* Right: Execution & Two Special Gates (vertically symmetric around y=166) */}
        <rect x="506" y="20" width="238" height="84" rx="10" fill="var(--ce-page)" stroke="var(--ce-border-strong)" stroke-width="1.5" />
        <text x="522" y="42" font-size="10.5" font-weight="700" fill="var(--ce-accent)" font-family="var(--font-mono)">NON-BLOCKING APPROVAL</text>
        <text x="522" y="62" font-size="13" font-weight="700" fill="var(--ce-ink)">Human Review Queue</text>
        <text x="522" y="80" font-size="10.5" fill="var(--ce-body)">Parks candidate, frees worker slot,</text>
        <text x="522" y="95" font-size="10.5" fill="var(--ce-body)">accumulates feedback on reject</text>

        <rect x="506" y="124" width="238" height="84" rx="10" fill="var(--ce-success-soft)" stroke="var(--ce-success-border)" stroke-width="1.5" />
        <text x="522" y="146" font-size="10.5" font-weight="700" fill="var(--ce-success)" font-family="var(--font-mono)">METRIC-GATED EXPERIMENTS</text>
        <text x="522" y="166" font-size="13" font-weight="700" fill="var(--ce-ink)">Keep Only Wins</text>
        <text x="522" y="184" font-size="10.5" fill="var(--ce-body)">Measure baseline vs. candidate;</text>
        <text x="522" y="199" font-size="10.5" fill="var(--ce-body)">land only if metric moves right</text>

        <rect x="506" y="228" width="238" height="84" rx="10" fill="var(--ce-surface)" stroke="var(--ce-border-strong)" stroke-width="1.4" />
        <text x="522" y="250" font-size="10.5" font-weight="700" fill="var(--ce-muted)" font-family="var(--font-mono)">CONTINUOUS WORKER POOL</text>
        <text x="522" y="270" font-size="13" font-weight="700" fill="var(--ce-ink)">Independent Parallel Slots</text>
        <text x="522" y="288" font-size="10.5" fill="var(--ce-body)">Keeps shipping ready goals while</text>
        <text x="522" y="303" font-size="10.5" fill="var(--ce-body)">other changes await human review</text>

        {/* Arrows from Planner to Right (strictly non-overlapping: up, straight, down) */}
        <path d="M 452 132 L 479 132 L 479 62 L 504 62" fill="none" stroke="var(--ce-accent)" stroke-width="1.6" marker-end="url(#am-arrow-accent)" />
        <line x1="452" y1="166" x2="504" y2="166" stroke="var(--ce-success)" stroke-width="1.6" marker-end="url(#am-arrow-success)" />
        <path d="M 452 200 L 479 200 L 479 270 L 504 270" fill="none" stroke="var(--ce-muted)" stroke-width="1.6" marker-end="url(#am-arrow)" />

        {/* Feedback return line along bottom */}
        <path
          d="M 625 312 L 625 334 L 110 334 L 110 314"
          fill="none"
          stroke="var(--ce-muted)"
          stroke-width="1.5"
          stroke-dasharray="5 3"
          marker-end="url(#am-arrow)"
        />
        <text x="368" y="354" text-anchor="middle" font-size="10.5" fill="var(--ce-muted)">
          Outcomes, human feedback &amp; failure patterns feed the next planning pass
        </text>
      </svg>
    </DiagramFrame>
  );
}

/**
 * Chapter 5 Diagram: Multiplayer & Multi-Machine Coordination with Remote Ref Leases.
 */
export function MultiplayerSyncDiagram() {
  return (
    <DiagramFrame caption="Multiple laptops share one repository without a central database: GitHub issues enter as researched single-goal PRs that activate only on human merge, machines claim work via atomic compare-and-swap Git ref leases, and landing-time trailer checks prevent duplicate work even after lease expiry.">
      <svg
        role="img"
        aria-label="Diagram of multiplayer and multi-machine coordination showing GitHub Issue to Single-Goal PR intake, Remote Git Repository holding main and atomic ref leases, two laptops racing with compare-and-swap leases, and bidirectional three-way sync."
        viewBox="0 0 760 364"
        font-family="var(--font-sans)"
      >
        <ArrowDefs idPrefix="mp" />

        {/* Top Row: Issue -> Research PR -> Human Merge -> Remote Repo */}
        <rect x="16" y="18" width="166" height="74" rx="10" fill="var(--ce-surface)" stroke="var(--ce-border-strong)" stroke-width="1.4" />
        <text x="30" y="40" font-size="10" font-weight="700" fill="var(--ce-muted)" font-family="var(--font-mono)">TEAM INTAKE</text>
        <text x="30" y="60" font-size="13" font-weight="700" fill="var(--ce-ink)">GitHub Issue</text>
        <text x="30" y="78" font-size="10.5" fill="var(--ce-body)">Rough idea or bug report</text>

        <line x1="182" y1="55" x2="210" y2="55" stroke="var(--ce-accent)" stroke-width="1.8" marker-end="url(#mp-arrow-accent)" />

        <rect x="212" y="18" width="224" height="74" rx="10" fill="var(--ce-purple-soft)" stroke="var(--ce-purple-border)" stroke-width="1.5" />
        <text x="226" y="40" font-size="10" font-weight="700" fill="var(--ce-purple)" font-family="var(--font-mono)">RESEARCHED PROPOSAL</text>
        <text x="226" y="60" font-size="13" font-weight="700" fill="var(--ce-ink)">Single-Goal Pull Request</text>
        <text x="226" y="78" font-size="10.5" fill="var(--ce-body)">Iterates on review; inactive till merge</text>

        <line x1="436" y1="55" x2="466" y2="55" stroke="var(--ce-success)" stroke-width="1.8" marker-end="url(#mp-arrow-success)" />

        {/* Remote Git Origin */}
        <rect x="468" y="18" width="276" height="114" rx="12" fill="var(--ce-accent-soft)" stroke="var(--ce-accent)" stroke-width="1.8" />
        <text x="484" y="40" font-size="10.5" font-weight="700" fill="var(--ce-accent)" font-family="var(--font-mono)">REMOTE GIT ORIGIN</text>
        <text x="484" y="62" font-size="13" font-weight="700" fill="var(--ce-ink)">Shared Main + Atomic Ref Leases</text>
        <text x="484" y="82" font-size="11" fill="var(--ce-body)">• refs/heads/main (goals + trailers)</text>
        <text x="484" y="99" font-size="11" fill="var(--ce-body)">• refs/leases/&lt;goal&gt; (CAS push + TTL)</text>
        <text x="484" y="116" font-size="11" fill="var(--ce-body)">• Deduplicated issue status comments</text>

        {/* Bottom Machines */}
        <rect x="16" y="208" width="332" height="136" rx="12" fill="var(--ce-page)" stroke="var(--ce-success-border)" stroke-width="1.6" />
        <text x="32" y="232" font-size="10.5" font-weight="700" fill="var(--ce-success)" font-family="var(--font-mono)">MACHINE A (LEASE WINNER)</text>
        <text x="32" y="254" font-size="13" font-weight="700" fill="var(--ce-ink)">Wins CAS Ref Push → Runs Goal</text>
        <text x="32" y="275" font-size="11" fill="var(--ce-body)">1. Heartbeats lease ref with clock-skew margin</text>
        <text x="32" y="293" font-size="11" fill="var(--ce-body)">2. Pulls remote via in-memory 3-way merge</text>
        <text x="32" y="311" font-size="11" fill="var(--ce-body)">3. Checks commit trailers before landing</text>
        <text x="32" y="329" font-size="11" fill="var(--ce-body)">4. Verified fast-forward-only push to origin</text>

        <rect x="412" y="208" width="332" height="136" rx="12" fill="var(--ce-page)" stroke="var(--ce-border-strong)" stroke-width="1.5" />
        <text x="428" y="232" font-size="10.5" font-weight="700" fill="var(--ce-muted)" font-family="var(--font-mono)">MACHINE B (PEER WORKSTATION)</text>
        <text x="428" y="254" font-size="13" font-weight="700" fill="var(--ce-ink)">CAS Push Rejected → Skips Goal</text>
        <text x="428" y="275" font-size="11" fill="var(--ce-body)">• Sees live lease held by Machine A</text>
        <text x="428" y="293" font-size="11" fill="var(--ce-body)">• Picks a different unleased goal instead</text>
        <text x="428" y="311" font-size="11" fill="var(--ce-body)">• Can reclaim only after TTL + skew expires</text>
        <text x="428" y="329" font-size="11" fill="var(--ce-body)">• Trailer check prevents duplicate landing</text>

        {/* Sync Arrows between Remote Origin and Machines */}
        <path
          d="M 550 132 L 550 166 L 182 166 L 182 206"
          fill="none"
          stroke="var(--ce-success)"
          stroke-width="1.8"
          marker-start="url(#mp-arrow-success)"
          marker-end="url(#mp-arrow-success)"
        />
        <rect x="224" y="151" width="270" height="28" rx="14" fill="var(--ce-success-soft)" stroke="var(--ce-success-border)" />
        <text x="359" y="169" text-anchor="middle" font-size="10.5" font-weight="600" fill="var(--ce-success)">
          CAS lease won • 3-way pull • FF push
        </text>

        <path
          d="M 642 132 L 642 206"
          fill="none"
          stroke="var(--ce-muted)"
          stroke-width="1.6"
          stroke-dasharray="5 3"
          marker-start="url(#mp-arrow)"
          marker-end="url(#mp-arrow)"
        />
        <rect x="574" y="152" width="136" height="26" rx="13" fill="var(--ce-surface)" stroke="var(--ce-border)" />
        <text x="642" y="169" text-anchor="middle" font-size="10.5" font-weight="600" fill="var(--ce-muted)">
          CAS rejected
        </text>
      </svg>
    </DiagramFrame>
  );
}
