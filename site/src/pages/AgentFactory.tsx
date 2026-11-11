import { FactoryLayout } from "@/layouts/FactoryLayout";
import { Section } from "@/components/content/Section";

export function AgentFactory() {
  return (
    <FactoryLayout title="Practice continuous agentic engineering">
      <header class="factory-intro">
        <p class="factory-eyebrow">A practical guide</p>
        <h1>Practice continuous agentic engineering</h1>
        <p>Keep a project moving when one task or conversation ends.</p>
      </header>

      <Section id="why">
        <h2>Why keep the work going?</h2>
        <p>You have something you want to build, and you don’t have the whole thing figured out yet. You give an agent the goal and ask it to study what already exists. How much of the research, planning and building can it take from there?</p>
        <p>Keep raising the ambition as you learn what the agent can carry through. Give it a harder problem, more of the planning or the job of improving its own process. Use what it actually accomplishes to decide what to hand over next. One agent can do this, or a parent session can coordinate several when it helps.</p>
        <p>An agent can find work as well as do it. They can study existing systems, try small experiments and turn what they learn into tasks. Save their decisions, results and next steps outside the chat so a fresh session can continue. You do not need to document every next step first.</p>
        <p>As the software grows, agents can test realistic workloads and fix bottlenecks. With approved read-only access, they can use production errors and metrics to find new work. Reading that data does not give them permission to change or deploy the system.</p>
        <p>You set the goal, budget and what agents may change. Agents can continue within those limits and pause when there is no useful work or they need a decision. Start with one session and add only what helps.</p>
      </Section>

      <Section id="loop">
        <h2>What happens next?</h2>
        <div class="factory-loop">
          <ol class="factory-loop-steps" role="list">
            <li><span class="number" aria-hidden="true">01</span><div><h3>Choose</h3><p>Pick one question or task. Give it one owner.</p></div></li>
            <li><span class="number" aria-hidden="true">02</span><div><h3>Do</h3><p>Take one small step within agreed limits.</p></div></li>
            <li class="check"><span class="number" aria-hidden="true">03</span><div><h3>Check</h3><p>Check the result against agreed tests.</p></div></li>
            <li><span class="number" aria-hidden="true">04</span><div><h3>Save</h3><p>Record the result and next step outside the chat.</p></div></li>
            <li class="again"><span class="number" aria-hidden="true">05</span><div><h3>Continue</h3><p>Start the next task, or pause when work, budget or permission runs out.</p></div></li>
          </ol>
        </div>
        <p>Two accounts show what this can look like in practice: <a href="https://justin.searls.co/posts/im-just-a-meat-proxy/">@searls describes MeatProxy</a> delivering beta builds and sending decisions to a human inbox; <a href="https://www.johnnunemaker.com/dont-make-a-human-do-what-ai-is-amazing-at/">@jnunemaker describes Nunebot</a> choosing and preparing improvements while he retains the merge decision.</p>
      </Section>

      <aside class="factory-naming">
        <p><strong>Why this name?</strong> “Factory” can sound like repeating a finished design. This work also involves figuring out what to build. <a href="https://robwest.info/articles/the-agentic-software-factory-is-the-wrong-metaphor/">Rob West</a> raises the same concern. <a href="https://x.com/karpathy/status/2019137879310836075">@karpathy</a> and <a href="https://simonwillison.net/guides/agentic-engineering-patterns/what-is-agentic-engineering/">@simonw</a> use “agentic engineering” for working with coding agents while checking their work. We add “continuous” because work can carry on across tasks and sessions, with pauses when needed.</p>
      </aside>

      <Section id="chapters">
        <h2>Choose where to start</h2>
        <ul class="factory-chapter-list">
          <li><a href="/eng-loops/start">1. Start with one job</a> to turn a broad goal into a checked result.</li>
          <li><a href="/eng-loops/recovery">2. Recover the work</a> when a chat ends or a handoff fails.</li>
          <li><a href="/eng-loops/repository">3. Put the repository in charge</a> to design a controller that survives a lost chat.</li>
          <li><a href="/eng-loops/improvement">4. Improve the loop</a> to learn from mistakes, real workloads and running software.</li>
          <li><a href="/eng-loops/exploration">5. Explore another approach</a> when small fixes stop helping.</li>
        </ul>
        <p>The separate <a href="/ai">Build with AI Agents</a> guide focuses on improving agent behavior after a miss.</p>
      </Section>
    </FactoryLayout>
  );
}
