import { AILayout } from "@/layouts/AILayout";
import { Section } from "@/components/content/Section";
import { Callout } from "@/components/content/Callout";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { GraduationRubric } from "@/components/widgets/GraduationRubric";

export function AIGraduation() {
  return (
    <AILayout title="Graduation" subtitle="When to turn advice into gates">
      <Section id="intro">
        <p>
          Not every improvement should become a gate. Gates add friction. The
          question is whether the friction is worth the protection.
        </p>
        <p>
          The goal is to find the sweet spot: enough enforcement to prevent
          repeated mistakes, not so much that it slows down legitimate work.
        </p>
      </Section>

      <Section id="rubric">
        <h2>Graduation Rubric</h2>
        <p>
          Use this rubric to evaluate whether an improvement should graduate
          from guidance to enforcement.
        </p>

        <GraduationRubric />

        <Callout variant="field-note">
          <p>
            When in doubt, start with an advisory gate (warn but don't block).
            You can always tighten it later once you've calibrated the threshold.
          </p>
        </Callout>
      </Section>

      <Section id="gate-types">
        <h2>Types of Gates</h2>

        <h3>Advisory gates</h3>
        <p>
          Warn but don't block. Good for new rules where you're still
          calibrating the threshold. The agent sees the warning, humans see it
          in logs, but work continues.
        </p>

        <h3>Blocking gates</h3>
        <p>
          Fail the build, commit, or deploy. Use for high-confidence rules with
          clear remediation. The failure message should tell you exactly what to
          fix.
        </p>

        <h3>Human-in-the-loop gates</h3>
        <p>
          Require explicit approval to proceed. Good for high-stakes changes
          where automation can flag but shouldn't decide. Examples: schema
          migrations, permission changes, dependency updates.
        </p>
      </Section>

      <Section id="implementation">
        <h2>Implementation Patterns</h2>

        <h3>Pre-commit hooks</h3>
        <p>
          Fastest feedback loop. Run linters, formatters, and quick checks
          before the commit is created. Keep these fast (&lt;5s) or developers
          will bypass them.
        </p>

        <h3>CI checks</h3>
        <p>
          More thorough validation. Run tests, build verification, and slower
          checks. Can block merge but not local commits.
        </p>

        <h3>Deploy gates</h3>
        <p>
          Final validation before production. Health checks, smoke tests, and
          approval workflows. Most important for high-stakes environments.
        </p>

        <Callout variant="gate-candidate">
          <p>
            If a check is too slow for pre-commit, move it to CI. If it's too
            slow for CI, consider whether it's really worth running on every
            change.
          </p>
        </Callout>
      </Section>

      <RelatedLinks
        links={[
          {
            href: "https://jonmagic.com/posts/turning-agent-misses-into-systemic-improvements/#what-i-learned",
            title: "What I Learned",
            source: "jonmagic.com",
            description:
              "Lessons from promoting improvements to gates in practice.",
          },
          {
            href: "/ai/miss-taxonomy",
            title: "Miss Taxonomy",
            source: "thisistheway.to",
            description:
              "Understand the failure patterns before deciding what to gate.",
          },
        ]}
      />
    </AILayout>
  );
}
