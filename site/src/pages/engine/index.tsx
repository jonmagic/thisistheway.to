import { EngineLayout, ENGINE_CHAPTERS } from "@/layouts/EngineLayout";
import { Section } from "@/components/content/Section";
import { OverviewArchitectureDiagram } from "@/components/diagrams/ContinuousDiagrams";

export function EngineIndex() {
  return (
    <EngineLayout title="Build a Continuous Software Engine" isOverview>
      <header class="ce-intro">
        <p class="ce-eyebrow">Conceptual Architecture Guide</p>
        <h1>How to Build Your Own Continuous Software Engine</h1>
        <p>
          Stop trying to make an AI finish a giant task in one great prompt. Build a deterministic engine around coding agents so your repository makes continuous, verified progress while you focus on direction and taste.
        </p>
        <p>
          For the story behind the repeated attempts and lessons that shaped this guide, read{" "}
          <a href="https://jonmagic.com/posts/trying-over-and-over-to-build-a-continuous-software-machine/">
            Trying Over and Over to Build a Continuous Software Machine
          </a>
          .
        </p>
      </header>

      <Section id="the-shift">
        <h2>From Prompting to Building an Engine</h2>
        <p>
          Most engineers move through three stages when working with coding models. Each stage takes reliability out of fragile, one-off chats and puts it into durable machinery you can inspect, test, and trust.
        </p>

        <div class="ce-shift-strip">
          <div class="ce-shift-card">
            <span class="ce-shift-era">Stage 1</span>
            <h3>Prompt Engineering</h3>
            <p>Craft a better single message and hope the model produces working code in one shot.</p>
          </div>
          <div class="ce-shift-card">
            <span class="ce-shift-era">Stage 2</span>
            <h3>Agent Engineering</h3>
            <p>Give the model tools in a chat loop and supervise it step by step until one task finishes.</p>
          </div>
          <div class="ce-shift-card ce-shift-active">
            <span class="ce-shift-era">Stage 3</span>
            <h3>Engine Architecture</h3>
            <p>Wrap fresh agent sessions inside deterministic state, verification, recovery, and steering primitives.</p>
          </div>
        </div>

        <p>
          Why call it an <strong>engine</strong> instead of a factory? A factory optimizes for stamping out identical copies of the same widget. Software work is the opposite: every bug fix, vertical slice, refactor, and experiment is unique. You want the consistency, speed, and safety of a reliable machine—without pretending software development is an assembly line.
        </p>
        <p>
          The key insight is counterintuitive: <strong>making an AI system more autonomous requires making the loop around it less magical and more boring.</strong> Coding agents excel at reading a codebase, implementing a focused change, and diagnosing a failing test. They are terrible at being their own scheduler, lock manager, process supervisor, or sole judge of their own work. Deterministic code should own the loop and its hard checks, while judging intent belongs to a fresh-context independent reviewer—or a human.
        </p>
        <p>
          This guide teaches the core primitives of a continuous software engine conceptually—no framework lock-in and no giant code dumps. Scan this overview in a minute to grasp the whole machine, then dive into each chapter to learn how to build each primitive, what breaks when you skip it, and how to verify you built it right.
        </p>
      </Section>

      <Section id="core-ethos">
        <h2>Core Ethos</h2>
        <p>
          Every architectural decision in this guide flows from six principles. When you hit a design tradeoff while building your own engine, come back to these six rules.
        </p>

        <ol class="ce-ethos-list">
          <li>
            <div>
              <strong>The deterministic orchestrator owns the loop.</strong>
              Ordinary software controls state transitions, leases, timeouts, retries, and landing. Language models do bounded creative and analytical work inside that shell.
            </div>
          </li>
          <li>
            <div>
              <strong>Design for failure first.</strong>
              Expect processes to hang, networks to drop, models to oscillate, and merges to conflict. An unattended engine is defined by how cleanly it recovers, not by its happy path.
            </div>
          </li>
          <li>
            <div>
              <strong>Non-blocking over blocking.</strong>
              Waiting for a human decision, an offline network, or a flaky dependency must never freeze unrelated ready work or hold a worker slot hostage.
            </div>
          </li>
          <li>
            <div>
              <strong>Favor focus over features.</strong>
              Keep goals small, single-purpose, and independently verifiable. Small slices land cleanly, isolate blame when something breaks, and stay easy for humans to review.
            </div>
          </li>
          <li>
            <div>
              <strong>Git and files over chat history.</strong>
              Treat every agent context window as disposable RAM. Intent, contracts, landed outcomes, and coordination belong in version-controlled files and Git history.
            </div>
          </li>
          <li>
            <div>
              <strong>Approachable, human-readable evidence.</strong>
              Store raw command output, diffs, review verdicts, and rollback reasons as plain files a tired engineer can open and trust in thirty seconds.
            </div>
          </li>
        </ol>
      </Section>

      <Section id="architecture">
        <h2>How the Engine Runs</h2>
        <p>
          At altitude, the engine is a deterministic pipeline backed by two durable stores. Shared Git holds the source of truth—approved objectives, goal contracts, and landed commits—while a local transactional ledger tracks transient leases, attempt counters, and raw run evidence. Broad intent enters through just-in-time decomposition and tiered admission so bounded slices run autonomously while ambiguous or high-risk boundaries pause cleanly for human judgment.
        </p>

        <OverviewArchitectureDiagram />

        <details class="ce-disclosure">
          <summary>Why not let one long-lived agent session run the whole loop?</summary>
          <div class="ce-disclosure-body">
            <p>
              Long-lived chat sessions accumulate stale assumptions, silently drift from edited requirements, and lose track of background processes when a context window compacts or a client disconnects. Worse, the same session that wrote a shortcut is primed to rationalize that shortcut during self-review.
            </p>
            <p>
              When a deterministic orchestrator fires up short-lived, single-purpose sessions in fresh worktrees, every attempt starts clean, every failure leaves inspectable evidence on disk, and every judgment happens with zero attachment to how hard the builder tried.
            </p>
          </div>
        </details>
      </Section>

      <Section id="primitives">
        <h2>The Five Core Primitives</h2>
        <p>
          Build these five primitives in order. Each chapter starts with the simplest mental model, highlights the concrete failure modes it prevents, and finishes with a verification checklist.
        </p>

        <ol class="ce-chapter-cards">
          {ENGINE_CHAPTERS.map((chapter) => (
            <li key={chapter.href}>
              <a href={chapter.href} class="ce-chapter-card">
                <span class="ce-chapter-num">Chapter {chapter.num}</span>
                <span class="ce-chapter-title">{chapter.fullTitle} →</span>
                <span class="ce-chapter-desc">{chapter.summary}</span>
              </a>
            </li>
          ))}
        </ol>

        <p>
          Looking for how to turn individual agent misses into better instructions, tools, and repo-level gates? Pair this guide with <a href="/ai">Build with AI Agents</a>.
        </p>
      </Section>
    </EngineLayout>
  );
}
