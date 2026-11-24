export interface PageMeta {
  title: string;
  ogTitle: string;
  description: string;
  image: string;
  imageAlt: string;
  type: "website" | "article";
  canonicalPath: string;
}

export const SITE_ORIGIN = "https://thisistheway.to";

const DEFAULT_META: PageMeta = {
  title: "ThisIsTheWay.to",
  ogTitle: "ThisIsTheWay.to",
  description:
    "Opinionated architectural guides to building with AI agents and continuous software engines.",
  image: "/og/home.png",
  imageAlt:
    "ThisIsTheWay.to — Practical guides to building with AI agents and continuous software engines",
  type: "website",
  canonicalPath: "/",
};

const ROUTE_META: Record<string, PageMeta> = {
  "/": DEFAULT_META,
  "/ai": {
    title: "Build with AI Agents | ThisIsTheWay.to",
    ogTitle: "Build with AI Agents",
    description:
      "Turning agent misses into systemic improvements—observability, instructions, tooling, guardrails, and verification gates.",
    image: "/og/ai.png",
    imageAlt: "Build with AI Agents — Turning agent misses into systemic improvements",
    type: "article",
    canonicalPath: "/ai",
  },
  "/ai/primitives": {
    title: "The Five Levers | Build with AI Agents | ThisIsTheWay.to",
    ogTitle: "The Five Levers — Build with AI Agents",
    description:
      "Observability, instructions, tooling, guardrails, and verification: the five levers you can change after an agent miss.",
    image: "/og/ai.png",
    imageAlt: "The Five Levers — Build with AI Agents",
    type: "article",
    canonicalPath: "/ai/primitives",
  },
  "/ai/miss-taxonomy": {
    title: "How Agents Fail | Build with AI Agents | ThisIsTheWay.to",
    ogTitle: "How Agents Fail — Build with AI Agents",
    description:
      "A practical taxonomy of why coding agents miss and which systemic fix addresses each root cause.",
    image: "/og/ai.png",
    imageAlt: "How Agents Fail — Build with AI Agents",
    type: "article",
    canonicalPath: "/ai/miss-taxonomy",
  },
  "/ai/graduation": {
    title: "Tightening the Loop | Build with AI Agents | ThisIsTheWay.to",
    ogTitle: "Tightening the Loop — Build with AI Agents",
    description:
      "When lightweight guidance should graduate into automated repo gates and verification checks.",
    image: "/og/ai.png",
    imageAlt: "Tightening the Loop — Build with AI Agents",
    type: "article",
    canonicalPath: "/ai/graduation",
  },
  "/engine": {
    title: "Build a Continuous Software Engine | ThisIsTheWay.to",
    ogTitle: "How to Build Your Own Continuous Software Engine",
    description:
      "Stop trying to make an AI finish a giant task in one prompt. Wrap fresh coding agent sessions inside deterministic state, independent verification, liveness recovery, and Git-native coordination.",
    image: "/og/engine.png",
    imageAlt:
      "How to Build Your Own Continuous Software Engine — 01 Contract, 02 Isolate, 03 Verify, 04 Land",
    type: "article",
    canonicalPath: "/engine",
  },
  "/engine/state-and-contracts": {
    title: "1. State & Contracts Outside the Context Window | ThisIsTheWay.to",
    ogTitle: "1. State & Contracts Outside the Context Window",
    description:
      "Replace ephemeral chat history with content-hashed Markdown goal contracts, disposable Git worktrees, commit trailers, raw evidence logs, and monotonic fencing tokens.",
    image: "/og/engine-state.png",
    imageAlt: "Chapter 01: State & Contracts Outside the Context Window",
    type: "article",
    canonicalPath: "/engine/state-and-contracts",
  },
  "/engine/verification-and-landing": {
    title: "2. Independent Verification & Transactional Landing | ThisIsTheWay.to",
    ogTitle: "2. Independent Verification & Transactional Landing",
    description:
      "Separate building from judging using deterministic gates, fresh-context independent review, rebase-then-verify checks, and automatic culprit-only rollback.",
    image: "/og/engine-verify.png",
    imageAlt: "Chapter 02: Independent Verification & Transactional Landing",
    type: "article",
    canonicalPath: "/engine/verification-and-landing",
  },
  "/engine/liveness-and-recovery": {
    title: "3. Never Getting Stuck: Watchdogs, Recovery & Liveness | ThisIsTheWay.to",
    ogTitle: "3. Never Getting Stuck: Watchdogs, Recovery & Liveness",
    description:
      "Treat stuckness as a first-class engineering problem with process-group watchdogs, livelock detection, network parking, oscillation guards, and exhaustive finite-state liveness.",
    image: "/og/engine-liveness.png",
    imageAlt: "Chapter 03: Never Getting Stuck: Watchdogs, Recovery & Liveness",
    type: "article",
    canonicalPath: "/engine/liveness-and-recovery",
  },
  "/engine/ambition-and-steering": {
    title: "4. Ambition, Self-Improvement & Human Steering | ThisIsTheWay.to",
    ogTitle: "4. Ambition, Self-Improvement & Human Steering",
    description:
      "Unify Intent, Just-in-Time Decomposition, Tiered Admission (auto vs. human-gated), non-blocking approval parking, recurring-failure repairs, and metric-gated experiments.",
    image: "/og/engine-ambition.png",
    imageAlt: "Chapter 04: Ambition, Self-Improvement & Human Steering",
    type: "article",
    canonicalPath: "/engine/ambition-and-steering",
  },
  "/engine/multiplayer-coordination": {
    title: "5. Multiplayer & Multi-Machine Coordination | ThisIsTheWay.to",
    ogTitle: "5. Multiplayer & Multi-Machine Coordination",
    description:
      "Share a continuous software engine across teammates and laptops with pluggable admission transports, bidirectional 3-way sync, atomic remote Git ref leases, and landing-time trailer deduplication.",
    image: "/og/engine-multiplayer.png",
    imageAlt: "Chapter 05: Multiplayer & Multi-Machine Coordination",
    type: "article",
    canonicalPath: "/engine/multiplayer-coordination",
  },
};

const LEGACY_REDIRECT_PREFIX = /^\/(?:eng-loops|eng-loop|factory)(?:\/|$)/;

export function getPageMeta(rawUrl?: string): PageMeta {
  const normalized = (rawUrl ?? "/").replace(/\/+$/, "") || "/";
  if (LEGACY_REDIRECT_PREFIX.test(normalized)) {
    return ROUTE_META["/engine"]!;
  }
  return ROUTE_META[normalized] ?? DEFAULT_META;
}
