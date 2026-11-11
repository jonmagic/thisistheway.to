import { FACTORY_COPY_BUTTON, FactoryLayout } from "@/layouts/FactoryLayout";

const html = String.raw`<section class="factory-intro">
<p class="factory-eyebrow">Start here</p>
<h1 id="start">1. Start with one agent</h1>
<p>Give an agent a goal that feels a little too big. Ask it to learn from an existing system and come back with one question it can test. A big goal gives the small experiment a purpose, and its result helps the agent decide what to try next.</p>
</section>
<h2 id="a-running-example">Try it with a log tool</h2>
<p>Imagine a command-line tool that counts <code>info</code>, <code>warn</code> and <code>error</code> lines in a log file. It reports invalid lines and should eventually handle large files without loading them all into memory. For now, use made-up logs. There is no need for production data or deployment access.</p>
<p>Give the agent a broad goal like “Make a dependable log-processing tool for my applications.” Let it inspect applications and reference systems you approve. It can ask whether logs arrive as files or streams, what to do with bad input and how large the files get. Those are questions to research, not a list of features it must build.</p>
<p>Within the budget you approve, let the agent set a stop condition for each question. It should record what it checked, what it learned and why it stopped. “We do not know yet” is a useful result too.</p>
<table>
<thead><tr><th>Question</th><th>Small experiment</th><th>What to record</th></tr></thead>
<tbody>
<tr><td>Do bad lines affect the counts?</td><td>Try one made-up file. Compare the output with an approved example or a reference.</td><td>Record the result, any disagreement or what is still unknown. Build a counts task if the need is real.</td></tr>
<tr><td>Must memory stay low?</td><td>Measure files like the ones your applications use. Stop at the agreed budget.</td><td>Record the sizes tested.</td></tr>
</tbody>
</table>
<p>The agent can start by getting the counts right while other questions stay open. Later findings may change what it does next.</p>
<h2 id="who-does-what">Who does what?</h2>
<dl class="factory-ownership">
<div class="factory-ownership-row"><dt>Who chooses the work</dt><dd class="factory-agent"><strong>Agents</strong> Study existing systems. Set smaller goals, create and prioritize tasks, and decide how to carry them out. Test the results, return to research when needed, and save the plan and findings so another session can continue.</dd><dd class="factory-human"><strong>You</strong> Set the larger goal and share the context you have. Explain any limits on spending or what the agent may change. Steer when you want to, and handle decisions that only you can make.</dd></div>
</dl>
<p>When a decision needs you, ask one clear question with the evidence needed to answer it and a recommendation, as in <a href="https://justin.searls.co/posts/im-just-a-meat-proxy/#3-the-meatbag-in-the-loop">@searls’s decision inbox</a>. An interactive prototype may help when the question is how an interaction feels. Other allowed work can continue while that decision waits.</p>
<h2 id="what-the-engineering-loop-needs">What the engineering loop needs</h2>
<table class="factory-primitives">
<colgroup>
<col style="width: 25%" />
<col style="width: 75%" />
</colgroup>
<thead>
<tr>
<th>What you need</th>
<th>Start with</th>
</tr>
</thead>
<tbody>
<tr>
<td>Agent runtime</td>
<td>An agent that can call tools in a workspace you allow, with a record of what it did</td>
</tr>
<tr>
<td>Saved context</td>
<td>Project instructions and a short record of the current job that survives a lost chat</td>
</tr>
<tr>
<td>Feedback</td>
<td>A test, a repeatable example, a measurement or a person who knows what counts as success</td>
</tr>
<tr>
<td>Work list</td>
<td>Questions and needs the agent discovers, with notes on what must happen first</td>
</tr>
<tr>
<td>Continuation</td>
<td>The agent chooses the next job or research question. A timer can wake it later, once ownership and recovery work.</td>
</tr>
<tr>
<td>Boundaries</td>
<td>Allowed actions, a budget and a way to stop. A person handles decisions outside those limits.</td>
</tr>
</tbody>
</table>
<p>Before an agent continues unattended, approve an acceptance rule with independent checks or human review, and confirm that ownership and recovery work. Its own success claim or a test it weakened does not count.</p>
<p>For the first counts job, the agent can derive test cases from the stated behavior and made-up log example before changing code. It should save the expected output separately and must not rewrite it to make the code pass. If research cannot settle what the tool should do, ask you instead of guessing.</p>
<div class="code-example">${FACTORY_COPY_BUTTON}<pre class="text"><code>Input, one record per line:
{&quot;level&quot;:&quot;info&quot;,&quot;message&quot;:&quot;started&quot;}
{&quot;level&quot;:&quot;warn&quot;,&quot;message&quot;:&quot;slow response&quot;}
{&quot;level&quot;:&quot;info&quot;,&quot;message&quot;:&quot;ready&quot;}
this is not JSON

Expected output:
{&quot;info&quot;:2,&quot;warn&quot;:1,&quot;error&quot;:0,&quot;invalid&quot;:1}</code></pre></div>
<p>The agent also needs to check an empty file, a blank line and an unknown level. In this example, ignore blank lines. Count a nonblank line as invalid unless it is a JSON object with <code>info</code>, <code>warn</code> or <code>error</code> as its <code>level</code>. End the report with a newline.</p>
<section class="factory-example factory-prompt">
<h3>Copy a mission-level prompt</h3>
<p>Fill in your goal, use cases and limits. You do not need a research plan or a backlog.</p>
<div class="code-example">${FACTORY_COPY_BUTTON}<pre class="text"><code>Help me build [project] toward [ambitious useful goal]. These are the real use cases and priorities I know: [context]. You may inspect [authorized reference systems and sources] in [authorized workspace].

Within [approved work, permissions, budget, attempt limit and forbidden actions], investigate what is needed. Name each research question. For each small experiment, record what you checked, your stop condition and what you found, including negative or inconclusive results. Keep observed needs separate from assumptions and proposals. Set smaller goals and maintain a short ordered work list. Revise both as you learn. Record why a job matters and what it depends on. Do not invent features or plan the whole project before delivering value.

Choose the next useful question or ready feature task and give it one owner. Decide how to do it. Derive task-level checks from evidence and protected requirements before changing code. Do one small step and check the result. Add tests when you find a gap, but do not weaken protected checks or change expected results to make your code pass. Save the code revision, test results, decisions, blockers and next step somewhere that survives this chat. Do not treat your own success claim as acceptance.

If the acceptance rule is unclear or no independent check or review is authorized, propose a rule and bring the first result here for me to check. Once I approve a rule, continue work you can undo within the mission, permissions, remaining budget and checking rule. After each result passes the approved check, choose another task or return to research. Continue until the larger goal is met, a limit is reached or a decision outside your authority is needed. Ask me before changing the overarching mission, protected requirements or acceptance rule, your permissions or the budget. Bring product decisions you cannot settle from approved evidence and human-only trust decisions to me. Do not install dependencies, access production data, publish, merge or deploy without separate permission.

If the tools cannot enforce a limit, say so and wait for me to supervise before continuing unattended. Do not add another agent that can change the same work, or a timer, until one owner and recovery are proven. Return what happened, what remains unclear and what to do next.</code></pre></div>
</section>
<h2 id="check-the-work-before-increasing-autonomy">Check the work before continuing</h2>
<p>Run the tool against the example and inspect the output. Try an empty file, an unknown level and a valid JSON value that is not an object. Passing tests makes the result ready for the agreed acceptance step.</p>
<p>Code and tests written by the same agent can share the same mistake. Write down expected behavior before changing code. The agent can add missing task checks, but cannot move the expected answer to fit its code. Use a separate check when the consequences warrant it, and try the result yourself if you want. A second agent can help spot mistakes, but its opinion is not proof.</p>
<p>After a fix, review the fix and the behavior it affects, not the entire project from scratch each time. Set a limit on follow-up review; if material problems remain at that limit, bring them to a person rather than chasing every nit or overlooking an integration effect. <a href="https://www.johnnunemaker.com/dont-make-a-human-do-what-ai-is-amazing-at/">@jnunemaker’s Nunebot account</a> links a <a href="https://github.com/flippercloud/flipper/pull/1075">merged two-file UTF-8 fix</a> with a regression test; its PR records a failing-before/passing-after check and a built-gem check in a clean environment.</p>
<h2 id="next-job">Choose the next ready job</h2>
<p>Suppose the agent finds that your applications use large files and input from <code>stdin</code> (the command's standard input). It could keep this short work list. The last two jobs can start once the counts pass the mission's acceptance rule. Keep one active job until ownership and recovery work.</p>
<table>
<thead><tr><th>Order</th><th>Job</th><th>Prerequisite</th><th>State after first acceptance</th></tr></thead>
<tbody>
<tr><td>1</td><td>Count valid and invalid records correctly</td><td>None</td><td>Accepted</td></tr>
<tr><td>2</td><td>Stream large files without loading the whole file</td><td>Counts accepted</td><td>Ready</td></tr>
<tr><td>3</td><td>Accept input from stdin</td><td>Counts accepted</td><td>Ready</td></tr>
</tbody>
</table>
<p>The agent can set a memory goal from the file sizes it finds, choose a streaming approach and test it with made-up files of relevant sizes. If the result reveals another question, it can return to research or reorder these jobs. Ask you when a choice falls outside the mission or needs product judgment the agent cannot get from evidence.</p>
<p>Reuse saved findings and tend existing PRs before opening more work. When useful findings or ready jobs run low, a deeper audit can find the next question. The agent can still pursue new research within the mission rather than waiting for a human-managed backlog.</p>
<section class="factory-example factory-prompt">
<h3>Copy a supervised next-job prompt</h3>
<p>Use this if you want to start and check each job yourself.</p>
<div class="code-example">${FACTORY_COPY_BUTTON}<pre class="text"><code>The previous result is accepted. Read the work list, research findings and current-work record. Choose the most useful allowed job whose earlier work is accepted. If no job is ready, choose one small research question. Stay within the remaining budget and attempt limit.

Keep at most one active or unaccepted job. If another agent owns it or you cannot tell what happened to its last attempt, check that first. If a job is blocked, save why and consider another allowed question within the goal. Do one small step with the existing tools and permissions. Check the result against expectations agreed before the change. Do not broaden access, install dependencies, publish or deploy.

Save the question or job, owner, code revision, checks, result and next step. Mark the result ready for review, not accepted. Report what you checked or exactly what is blocking you here. Stop for my acceptance. Do not start a timer or another agent that can change the same work.</code></pre></div>
</section>
<p>Per-job review is optional. With an approved independent checking rule and working ownership and recovery, an agent can choose the next job or research question itself within the mission, permissions and remaining budget.</p>
<p><a href="https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/">Simon Willison’s red/green TDD guide</a> explains why observing the initial failure matters. <a href="https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2">Stripe’s Minions write-up</a> shows a larger system combining agent decisions with ordinary program steps and bounded repair loops.</p>`;

export function FactoryStart() {
  return <FactoryLayout title="Start with one job"><div dangerouslySetInnerHTML={{ __html: html }} /></FactoryLayout>;
}
