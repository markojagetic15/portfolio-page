import type { Experience } from "../model/types";

// Newest first. `rev` is the datasheet revision letter for the history table.
export const experience: Experience[] = [
  {
    rev: "D",
    company: "Njuškalo",
    role: "Software Engineer",
    period: "Mar 2026 – now",
    location: "Zagreb",
    highlights: [
      "Leading the move of core platform modules from a PHP monolith to Vue.js.",
      "Built the new delivery management system with additional shipping methods.",
      "Incremental rollouts with zero downtime for millions of users.",
    ],
    tech: ["Vue.js", "PHP", "TypeScript"],
  },
  {
    rev: "C",
    company: "True North",
    role: "Software Engineer",
    period: "Aug 2024 – Mar 2026",
    location: "Zagreb",
    highlights: [
      "Introduced TypeScript into a React and Java tax-fraud platform; production defects fell about 30%.",
      "Server-side caching made API responses 40% faster.",
      "Lead front-end developer and mentor on government tax and pension systems.",
    ],
    tech: ["React", "TypeScript", "Vue", "GraphQL", "Storybook"],
  },
  {
    rev: "B",
    company: "Valere Margins",
    role: "Software Engineer",
    period: "Feb 2023 – Sep 2024",
    location: "Zagreb",
    highlights: [
      "Built a corporate travel booking platform from scratch in Next.js and GraphQL.",
      "Real-time productivity suite with WebSocket chat and conflict-free document editing.",
      "Time to Interactive improved by more than 25% through code-splitting and lazy loading.",
    ],
    tech: ["Next.js", "TypeScript", "GraphQL", "WebSockets", "Material UI"],
  },
  {
    rev: "A",
    company: "AsyncLabs",
    role: "Software Engineer",
    period: "Feb 2022 – Feb 2023",
    location: "Zagreb",
    highlights: [
      "Sole front-end architect of an e-learning marketplace with thousands of active users.",
      "Payment gateway and internal API integrations with no critical incidents after launch.",
      "Analytics and A/B testing for the sign-up funnel.",
    ],
    tech: ["React", "TypeScript", "REST APIs"],
  },
];
