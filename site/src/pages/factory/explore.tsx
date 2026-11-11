import { FACTORY_COPY_BUTTON, FactoryLayout } from "@/layouts/FactoryLayout";

const html = String.raw`<section class="factory-intro">
<h1 id="explore">5. Explore another branch <span class="factory-status">Experimental</span></h1>
<p>Suppose the log tool still runs out of memory after small fixes. You could change how it reads records instead of patching the current reader again. Compare both approaches with the same tests and total budget.</p>
</section>
<h2 id="apply-the-idea-at-different-levels">Try another way to read logs</h2>
<div class="code-example">${FACTORY_COPY_BUTTON}<pre class="text"><code>Read and summarize logs
├── Read the whole file
│   ├── Parse then count
│   └── Count during parsing
└── Stream records
    ├── Line-oriented reader
    └── Chunked reader with line-boundary handling</code></pre></div>
<p>If reading the whole file uses too much memory, try reading records as they arrive. If splitting reads into chunks breaks records at the boundary, compare a simpler line reader before adding more patches.</p>
<section class="factory-example">
<h3>A bounded branching experiment</h3>
<p>Pick one small problem and write down the expected answer first. Start both strategies from the same tested code, inputs and machine setup. <a href="https://www.dwarkesh.com/p/the-next-paradigm">Dwarkesh Patel</a> distinguishes scoring a result from repeating an experiment reliably. Save the inputs and reset steps so you can run both approaches again.</p>
<p><strong>First, try one approach in sequence.</strong> Give it a fixed number of changes and tests. This is the baseline you compare against. Karpathy’s <a href="https://github.com/karpathy/autoresearch">autoresearch</a> is an example of testing a change, then keeping or discarding it before the next attempt.</p>
<p><strong>Then try two approaches in branches.</strong> Set the same total budget. Split it ahead of time between trying both ideas and following up on the better next question. Do not spend the full budget on each branch and then claim a fair comparison.</p>
<p>Count planning, tests, reviews and failed tries for both. Also record time, tokens and test costs where available. Use a tool to enforce spending limits if one exists. Otherwise supervise the run.</p>
<p>Both approaches must pass the same correctness tests before you compare speed or memory. Include records split across chunks, oversized records and a bad last line. If you discover a missing case, add it and retest every branch and the baseline. Use file sizes that resemble real work. Repeat noisy measurements and keep the simpler solution unless the more complex one earns its cost.</p>
<p>For each branch, save where it started, what it tried, the code revision, inputs, result and cost. Keep only distinct useful branches instead of every generated file. A losing branch is still useful evidence. Repeat the comparison with new independent runs before claiming one strategy is generally better.</p>
</section>
<section class="factory-example factory-prompt">
<h3>Copy an exploration prompt</h3>
<div class="code-example">${FACTORY_COPY_BUTTON}<pre class="text"><code>For [small problem], we tried [approach] and observed [what failed or stopped improving].

Before another patch, decide whether the problem is in the code, the way it processes data or the overall design. Name one assumption to test.

Within the remaining budget and attempt limit, choose at most two different approaches. Use the same recorded correctness tests and realistic workloads. Do not change permissions, dependencies or the tests to favor one approach.

Use separate workspaces and repeatable local inputs. Saving code does not restore a database or undo changes outside it. Name what else must be reset and avoid changes you cannot undo.

Compare with the simplest current approach under the same total budget. Save failures and costs. Continue only if the results support another attempt. Report what worked or what did not.</code></pre></div>
</section>
<p>Branching has not been shown to improve results here. Keep it only if repeated comparisons show that the extra work pays off.</p>
<h2 id="sources-and-their-limits">Further reading</h2>
<p>These papers test search ideas on other problems:</p>
<ul>
<li><a href="https://jmlr.org/papers/v13/bergstra12a.html">Random search</a> tries varied settings instead of tuning only one path.</li>
<li><a href="https://link.springer.com/chapter/10.1007/11871842_29">Monte Carlo tree search / UCT</a> balances promising paths with ones tried less often.</li>
<li><a href="https://arxiv.org/abs/1901.10995">Go-Explore</a> returns to saved states to try other paths.</li>
<li><a href="https://arxiv.org/abs/1504.04909">MAP-Elites</a> keeps good solutions that differ from one another.</li>
<li><a href="https://arxiv.org/abs/2506.13131">AlphaEvolve</a> scores candidates to choose what to try next.</li>
</ul>`;

export function FactoryExploration() {
  return <FactoryLayout title="Explore another approach"><div dangerouslySetInnerHTML={{ __html: html }} /></FactoryLayout>;
}
