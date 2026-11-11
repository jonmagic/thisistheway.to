import { FactoryLayout } from "@/layouts/FactoryLayout";

const html = String.raw`<section class="factory-intro">
<h1 id="improve">4. Improve the engineering loop</h1>
<p>Suppose the log tool counts small files correctly but runs out of memory on a large one. Check what the tool needs to handle, then find out whether the problem is in the code, the tests or how the job was planned.</p>
</section>
<p>Agents can miss information before they write code too. In <a href="https://jonmagic.com/posts/turning-agent-misses-into-systemic-improvements/">one example</a>, an agent made up a GraphQL field that did not exist. Giving it the actual schema and checking its query fixed the problem better than saying “be careful.” When an agent misses something, ask what information it needed and which check could have caught the mistake.</p>
<h2 id="turn-a-miss-into-a-small-experiment">Turn a miss into a small experiment</h2>
<p>Save what the agent tried and what happened. Check its assumption. Make one small change, try the same path again and keep the change only if it helps.</p>
<p>For a process change, read what was delivered and accepted, what was rejected or reopened, and where work stalled. Choose one small improvement to the agent workflow, then check whether it helps on the next run. Keep that separate from changes to the product itself. <a href="https://justin.searls.co/posts/im-just-a-meat-proxy/#daily-retrospectives">@searls describes this retrospective practice</a>.</p>
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr>
<th>Observed problem</th>
<th>A targeted correction</th>
</tr>
</thead>
<tbody>
<tr>
<td>Agent guesses an API field</td>
<td>Make the schema discoverable and validate the query</td>
</tr>
<tr>
<td>Two writers take the same task</td>
<td>Give the job one owner before starting either agent</td>
</tr>
<tr>
<td>Agent repeats a failed investigation</td>
<td>Save what it already tried and which code it checked</td>
</tr>
<tr>
<td>Benchmark changes while other checks run</td>
<td>Measure when other heavy work is stopped and mark the earlier result unusable</td>
</tr>
<tr>
<td>Instructions contradict one another</td>
<td>Remove stale copies and establish one current rule</td>
</tr>
</tbody>
</table>
<p>An outage might need a limited retry. A wrong assumption might need a new test. Agents can investigate their own mistakes, revise smaller goals and try changes to tools or instructions. They cannot change the overarching mission or protected requirements, weaken required checks, widen their permissions or raise their own budget.</p>
<p>Keep instructions close to the work they affect. Put module rules by the module, project rules in project instructions and reusable steps in skills. Remove stale instructions and review changes that affect other contributors.</p>
<h2 id="measure-the-whole-job">Measure the whole job</h2>
<p>First check whether the log tool gives the right answer on real-sized inputs. Then measure how long the whole command takes and how much memory it uses. Have agents inspect the application workloads you allow. They can measure file sizes, busy periods and the speed or cost users need, then propose tests that resemble those workloads.</p>
<p>Current traffic tells you what happens today, not what the tool must handle next year. Mark future growth as a guess until the mission sets a target or evidence supports one. Ask the person who set the goal when a tradeoff changes the budget, promised behavior or user experience beyond what the mission allows. If small files already meet the goal, do not optimize for huge files without a reason. When one subgoal passes its checks, the agent can choose another useful job or research question within the remaining budget.</p>
<p>For the agent workflow, count accepted results and the total time and cost of research, failed tries and reviews. Notice where a person repeatedly has to repair work. Adding agents can slow everything down if they all wait on the same tests or integration owner.</p>
<section class="factory-example">
<h3>Example: improve memory without cheating</h3>
<p>Suppose the log-summary tool reads the entire input before counting. Its small fixtures pass, but memory rises with file size.</p>
<p>First measure the current version with made-up files that match expected sizes. Save the code revision and test setup. The agent can set a memory target from the file sizes the tool needs to handle and write down the expected counts before changing code. Include bad records and final totals in the checks.</p>
<p>Try reading one record at a time. Memory still depends on the biggest record held in memory, so decide what to do when a record is too large. Test records split across read chunks, oversized records and a bad last line. Compare the complete command, including input and output, under the same conditions. Keep slow and failed runs. A fast parser alone does not mean a fast tool.</p>
<p>Keep the checks separate from the code being changed. If someone finds a missing test, add it and rerun every version, including the original. Do not keep a faulty test just to make comparisons easier. <a href="https://www.anthropic.com/research/harness-design-long-running-apps">Anthropic discusses</a> separating generated code from its evaluation, though a separate evaluator can still be wrong.</p>
</section>
<h2 id="learn-from-the-running-product">Learn from the running product <span class="factory-status">Experimental</span></h2>
<p>Production feedback has not been tested with the log-tool example. If you grant read-only access to errors and performance data from a running tool, agents can find problems worth fixing. Compare what users see with internal logs and measurements, as <a href="https://sre.google/sre-book/monitoring-distributed-systems/">Google's SRE guide</a> describes. Do not create an agent for every alert or copy sensitive logs into public notes or tests.</p>
<p>A useful issue report includes the build identity, relevant logs, app state and a way back to the affected screen, as in <a href="https://justin.searls.co/posts/im-just-a-meat-proxy/#1-in-app-issue-reporting">@searls’s in-app reporting example</a>. Match the evidence to the failure: an interaction may need a recording with consent and redaction, while a logic error needs a reproducible test.</p>
<ol>
<li>Group similar errors and start with the ones that hurt users most.</li>
<li>Reproduce one problem with made-up or approved redacted data. Record it if you cannot reproduce it.</li>
<li>Research and try a small fix within the existing budget and permissions.</li>
<li>Check the fix against agreed tests and workloads that resemble real use.</li>
<li>Use the existing release approval process. Reading errors does not grant permission to deploy.</li>
<li>After a separately approved release, watch whether the fix helped and whether it needs to be rolled back. Save the result and next task.</li>
</ol>
<p>If you separately authorize automated releases, agents can follow the existing release rules. Those rules need limits enforced outside the agent, a way to stop it and a rollback plan. A <a href="https://sre.google/workbook/canarying-releases/">canary release</a> exposes only a small group first and compares results with the old version. It still needs an approved decision to continue.</p>
<h2 id="know-when-to-stop-or-change-direction">Know when to stop or change direction</h2>
<p>An empty work list may mean the goal is done, a job is blocked or another question needs research. Check which. If research is allowed, try one new question and record what happened, even when it found nothing. Do not invent bugs or demand a quota of findings.</p>`;

export function FactoryImprovement() {
  return <FactoryLayout title="Improve the loop"><div dangerouslySetInnerHTML={{ __html: html }} /></FactoryLayout>;
}
