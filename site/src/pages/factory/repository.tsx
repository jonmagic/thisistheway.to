import { FACTORY_COPY_BUTTON, FactoryLayout } from "@/layouts/FactoryLayout";

const html = String.raw`<section class="factory-intro">
<h1 id="repository">3. Put the repository in charge <span class="factory-status">Experimental</span></h1>
<p>Two agents see the same log-tool job as ready. If both start changing it, they can produce conflicting results. A controller program could give the job one owner, track what ran and recover after the original chat is gone. This is a design to build and test, not a controller you can run today.</p>
</section>
<p>Keep the goal, rules, code and checked results in the project. The original chat can still help with decisions outside the delegated mission, but it should not be the only place that knows the job's owner or next step. Agents may read code, issue text and web pages, but those sources cannot grant new permissions or change the overarching mission.</p>
<aside class="factory-note"><strong>Keep permissions outside the worker</strong> Do not give an agent the keys to publish or change the rules for accepting its own work. A Git worktree separates code files and Git indexes, but it does not hide the computer's secrets or network. Use a sandbox if the agent needs that protection.</aside>
<h2 id="make-the-operating-contract-discoverable">Write down the operating rules</h2>
<p>Use files you already have when possible.</p>
<div class="code-example">${FACTORY_COPY_BUTTON}<pre class="text"><code>AGENTS.md                  short entry point and links
docs/mission.md            outcomes, non-goals and permitted effects
docs/acceptance.md         behavior examples and required checks
docs/engineering-loop.md   work selection, recovery and stop procedure
tests/                    executable expectations
runtime work store        current assignments, claims and effect receipts</code></pre></div>
<p>The live work list does not have to live in Git. Choose a place where it survives session cleanup and can safely handle two agents trying to claim the same job. Do not let a worker rewrite the acceptance rules. Keep credentials elsewhere. Show each new agent where the rules are and check that it read them. Your personal laptop instructions will not automatically appear on a hosted service.</p>
<p><a href="https://openai.com/index/harness-engineering/">OpenAI</a> describes a short starting file that points to project documentation. <a href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents">Anthropic</a> uses progress notes across long-running agent sessions.</p>
<h2 id="separate-judgment-from-mechanics">Let agents choose, and let code enforce</h2>
<p>Agents can choose which useful job to try. The controller's ordinary code should check what jobs are ready, reserve one owner, enforce limits and record what happened.</p>
<p>A job could move through these states.</p>
<div class="code-example">${FACTORY_COPY_BUTTON}<pre class="text"><code>ready -&gt; reserved -&gt; running -&gt; result ready -&gt; accepted
                       |             |
                       +-- awaiting human / blocked / failed
uncertain dispatch or effect -&gt; reconcile old attempt -&gt; bounded retry or remain uncertain</code></pre></div>
<p>“Result ready” means the worker has something to check. “Accepted” means the agreed checks and review passed. In the supervised example, a person accepts the result. A later workflow could use an approved independent check. Decide what acceptance means before allowing work to continue on its own.</p>
<section class="factory-example">
<h3>Before starting an agent</h3>
<p>Reserve the job and save the plan to start it in one protected operation. Give this attempt its own ID. Once the agent starts, save the ID that the agent runtime gives it.</p>
<p>If starting the agent times out, check whether it actually started before trying again. An unknown result is not proof of failure.</p>
<p>Keep one owner for each change that affects shared state. With parallel agents, an existing integration owner can coordinate shared files and tests without adding another manager agent.</p>
<p>If a controller is replaced, the runtime must reject actions from the old one. A generation number helps only if the runtime checks it before a change.</p>
<p>The work store records plans, Git records code, the agent runtime shows which agents exist and the target service shows changes outside the repository. Recovery needs to check all of them.</p>
</section>
<h2 id="treat-retryable-computation-differently-from-effects">Check outside changes before retrying</h2>
<p>Repeating a read or a made-up test mostly costs time. Repeating a publish, install, payment or deployment might do it twice. Save what you intended to change and where. If the target supports an idempotency key, use it to identify repeat requests. When you lose the response, check the target before retrying. If you still cannot tell what happened, mark the job uncertain and stop.</p>
<h2 id="constrain-authority-where-it-matters">Keep important decisions with people</h2>
<p>An agent can pick a recommended option when it is already allowed. A “Recommended” label cannot grant spending, new dependencies, production access or deployment rights. Trust decisions reserved for people stay with people.</p>
<section class="factory-example">
<h3>Handle approvals, shared resources and changed code</h3>
<p><strong>Waiting for a person.</strong> Mark that job as waiting. Other allowed jobs may continue, but the waiting job must not skip the decision.</p>
<p><strong>Shared resources.</strong> Even agents in separate worktrees share CPU, memory and ports. Run heavy tests one at a time when needed. Do not trust a benchmark taken while another job is using the machine. Release a resource only after its process actually stops and cleanup finishes.</p>
<p><strong>Tests and reviews.</strong> Tie each result to the code revision it checked. If the agent's branch changes, run affected checks again. If the branch it will join has changed, check the combined code when needed. Follow repository protections. An empty check list or a submitted review is not acceptance.</p>
<p><strong>Stopping.</strong> At a budget or attempt limit, the controller must stop starting new jobs. Show the reason to the person running it and keep track of work already in progress. Recovery must work even if an agent stops before saving progress.</p>
</section>
<h2 id="prove-recovery-before-calling-it-unattended">Prove recovery before calling it unattended</h2>
<p>Start with one real job through the installed entry point. Manually starting an agent does not prove that automatic intake works. Test the real event and the account that sends it. Then try the failures you need to survive.</p>
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr>
<th>Exercise</th>
<th>Required result</th>
</tr>
</thead>
<tbody>
<tr>
<td>Controller restarts or loses context</td>
<td>It finds unfinished jobs and their owners without starting a second writer.</td>
</tr>
<tr>
<td>Response lost while starting a job or changing a service</td>
<td>Check whether the job started or the service changed. If the outcome is unknown, mark the attempt uncertain and do not retry blindly.</td>
</tr>
<tr>
<td>One job waits for a person's approval</td>
<td>Other permitted jobs continue. The waiting job stays paused until the person decides.</td>
</tr>
<tr>
<td>A job's completion event is missed</td>
<td>A real scheduled run checks the job's state and moves it forward.</td>
</tr>
<tr>
<td>Code changes or the budget runs out</td>
<td>Run relevant fresh checks before joining changed code. Start no new jobs once the budget runs out.</td>
</tr>
</tbody>
</table>
<p>Use automated tests for rules like refusing a second owner.</p>`;

export function FactoryRepository() {
  return <FactoryLayout title="Put the repository in charge"><div dangerouslySetInnerHTML={{ __html: html }} /></FactoryLayout>;
}
