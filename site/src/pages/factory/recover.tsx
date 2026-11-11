import { FACTORY_COPY_BUTTON, FactoryLayout } from "@/layouts/FactoryLayout";

const html = String.raw`<section class="factory-intro">
<h1 id="recover">2. Survive context loss and missed handoffs</h1>
<p>A fresh session opens the log-tool project to continue a job. The old chat is gone. Before starting anything, it needs to find who owns the job, which code was checked and what still needs your decision.</p>
</section>
<p>Some tools compress a long chat into a short summary. This is called compaction. A summary might keep the task but lose why you rejected an approach or refused a permission. The saved work record gives the fresh session something to check against the actual code and running agents.</p>
<h2 id="keep-three-kinds-of-information-separate">Keep three kinds of information separate</h2>
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr>
<th>Information</th>
<th>Where to keep it</th>
</tr>
</thead>
<tbody>
<tr>
<td>Stable policy</td>
<td>Short project instructions with the goal, permissions and required checks</td>
</tr>
<tr>
<td>Current state</td>
<td>One short record of the current job, its owner, code revision, blocker and next step</td>
</tr>
<tr>
<td>Evidence and history</td>
<td>Saved results and decisions that the current record links to</td>
</tr>
</tbody>
</table>
<p>For one agent working at a time, a Markdown file may be enough. The agent can maintain its own work list as it learns. Keep the record and past attempts somewhere that survives a discarded code change or a deleted session. An untracked file in a temporary worktree can disappear with that worktree. A file alone cannot stop two agents from claiming the same job. The next chapter covers that problem.</p>
<div class="code-example">${FACTORY_COPY_BUTTON}<pre class="text"><code>Task: Count invalid log records
Owner: current implementation session
Base: actual starting commit
Result revision: actual commit, or explicitly uncommitted changes
State: awaiting acceptance
Evidence: command, exact input, output and result location
Decision: blank lines are ignored, unknown levels are invalid
Work source: location of discovered questions, work list and prerequisites
Acceptance policy: human checkpoint for this example
Acceptance destination: current supervised conversation (or policy-owned evaluator if authorized)
Human-only decision destination: current supervised conversation
Next action: run the independent acceptance examples</code></pre></div>
<p>Replace the placeholders with real job IDs, code revisions and results. Update the record when a job changes state.</p>
<h2 id="give-the-parent-less-to-hold">Give the parent less to hold</h2>
<p>Keep the goal, priorities and current owner in the main project record. Let an agent handle the detailed code investigation for its job, then report what changed and where to find the test results. A fresh session can use that report to choose the next step without the old chat transcript.</p>
<p>Reuse a worker when its existing context helps with the same task. Start fresh for unrelated work.</p>
<p><a href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents">Anthropic describes</a> ways to manage a long chat, including summaries and saved notes. <a href="https://simonwillison.net/guides/agentic-engineering-patterns/subagents/">@simonw explains</a> how a separate agent can keep a noisy investigation out of the main conversation.</p>
<section class="factory-example">
<h3>Copy a fresh-context recovery prompt</h3>
<div class="code-example">${FACTORY_COPY_BUTTON}<pre class="text"><code>Resume [project] from its saved instructions and work record. Do not read the previous chat unless you need a specific missing decision.

Check the repository, current code revision, uncommitted changes, existing agents, pending tests and reviews, and resources in use. Compare the work record with Git and the actual running agents before acting. A saved summary does not prove that a change outside the repository happened.

Continue valid existing work. Do not start a replacement just because a session is idle, its chat is unavailable or a deadline passed. If you cannot tell who owns the job, leave it paused until you can check.

Find the next small allowed step and its owner. Stay within the saved permissions and budget. Ask when a decision would change either of them.</code></pre></div>
<p>Try this in a fresh session before depending on it. Make sure a new chat can find the job and continue it. Some tools tie child agents or schedules to the old chat. Check that you can take over before closing it.</p>
</section>
<h2 id="add-one-bounded-wakeup">Add one bounded wakeup</h2>
<p>Use job-completion and review events when your tools provide them. A timer can also check for missed handoffs. Each wake should compare what the record says with what actually happened before starting more work. This check is called reconciliation.</p>
<p>Find out whether the timer wakes the same agent or starts a new one. Check whether two runs can overlap. For now, keep one owner. If a timer could start another writer, stay supervised until a real lock or exclusive claim is in place. The <a href="/eng-loops/repository">repository chapter</a> shows why a prompt alone cannot enforce that rule.</p>
<section class="factory-example">
<h3>Copy a scheduled reconciliation prompt</h3>
<div class="code-example">${FACTORY_COPY_BUTTON}<pre class="text"><code>Run one bounded reconciliation of [project].

Read the current rules and work record. Check who actually owns each job, what finished, what decisions are waiting and what resources are in use. If this check or the job is already running, do not start a copy.

Move existing work forward before taking a new job. Send it to its owner. A message in a queue is not proof that work started. A started job is not proof that it passed its checks. Accept a checked result only under the human or automated rule we agreed on.

If there is no work to continue, choose a ready job from the work list. If no job is ready and research is allowed, check one small question within the remaining budget. Save what you found, even if the answer is no or unclear. Do not invent a problem to stay busy.

Save what changed or exactly what you are waiting for, then stop. Do not wait forever, restart an agent just because time passed or add another timer to repair this one.

Report a useful result, a new blocker or a decision I need to make. Stay quiet when nothing changed.</code></pre></div>
</section>
<h2 id="know-what-the-timer-cannot-fix">Know what the timer cannot fix</h2>
<p>A manual run tests the prompt, not the schedule. Watch a real scheduled run start, then check whether it can recover a missed handoff while the original chat is idle. Have something outside the scheduler check that it is still running. Otherwise a person must check it. Local work also needs the host and app to stay available. Hosted timers can miss runs too, as <a href="https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule">GitHub's Actions documentation</a> explains.</p>`;

export function FactoryRecovery() {
  return <FactoryLayout title="Recover the work"><div dangerouslySetInnerHTML={{ __html: html }} /></FactoryLayout>;
}
