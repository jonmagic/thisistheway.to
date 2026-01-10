import { AILayout } from "@/layouts/AILayout";
import { Section } from "@/components/content/Section";
import { TaxonomyCard } from "@/components/cards/TaxonomyCard";
import { TaxonomyGrid } from "@/components/cards/TaxonomyGrid";

const MISS_TYPES = [
  {
    icon: "🎭",
    title: "Truth-misses (Hallucinations)",
    pattern: "Agent confidently invents things that don't exist",
    rootCause: "Source-of-truth access problem",
    symptoms: [
      "Invents API fields, file paths, or CLI flags",
      "Sounds plausible but doesn't match reality",
      "Confident tone despite being wrong",
    ],
    typicalFixes: [
      "Ensure source-of-truth is present and discoverable",
      "Add schema validation that fails loudly on unknowns",
      "Include concrete examples in instructions",
    ],
  },
  {
    icon: "⚡",
    title: "Reactivity-misses",
    pattern: "Code compiles but doesn't work at runtime",
    rootCause: "Missing constraint + missing feedback",
    symptoms: [
      "Passes type checking but fails at runtime",
      "Misses implicit rules about system behavior",
      "Works in isolation but breaks in context",
    ],
    typicalFixes: [
      "Encode runtime rules in instructions",
      "Add integration test harness",
      "Document implicit conventions explicitly",
    ],
  },
  {
    icon: "🔗",
    title: "Integration-misses",
    pattern: "Doesn't understand what runs where",
    rootCause: "Observability + tool boundary problem",
    symptoms: [
      "Confuses server vs client code",
      "Mixes up CI vs local behavior",
      "Doesn't understand mock vs real boundaries",
    ],
    typicalFixes: [
      "Explicit boundary documentation",
      "Tooling that makes boundaries executable",
      "Clear naming conventions for contexts",
    ],
  },
  {
    icon: "🎨",
    title: "Taste-misses",
    pattern: "Technically correct but aesthetically wrong",
    rootCause: "Missing eval problem",
    symptoms: [
      "DOM assertions pass but UI looks off",
      "Spacing, hierarchy, or affordances are wrong",
      "Functional but not polished",
    ],
    typicalFixes: [
      "Rubric for 'what good looks like'",
      "Visual QA gate (screenshot comparison)",
      "Design system constraints",
    ],
  },
  {
    icon: "✅",
    title: "Process-misses",
    pattern: "Claims done without actually finishing",
    rootCause: "Guardrails + verification problem",
    symptoms: [
      "Skips running tests",
      "Doesn't update related docs",
      "Claims completion prematurely",
    ],
    typicalFixes: [
      "Checklists it must satisfy",
      "Automated gates it can't bypass",
      "Definition of done in instructions",
    ],
  },
];

export function AIMissTaxonomy() {
  return (
    <AILayout
      title="Miss Taxonomy"
      subtitle="Common patterns of agent failures and how to address them"
    >
      <Section>
        <p>
          Most agent failures fall into a small number of patterns. Recognizing
          the pattern helps you choose the right primitive to address it.
        </p>
        <p>
          Click any card to see typical fixes for that pattern.
        </p>
      </Section>

      <Section id="patterns">
        <TaxonomyGrid>
          {MISS_TYPES.map((miss) => (
            <TaxonomyCard
              key={miss.title}
              icon={miss.icon}
              title={miss.title}
              pattern={miss.pattern}
              rootCause={miss.rootCause}
              symptoms={miss.symptoms}
              typicalFixes={miss.typicalFixes}
            />
          ))}
        </TaxonomyGrid>
      </Section>
    </AILayout>
  );
}
