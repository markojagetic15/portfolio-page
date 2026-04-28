import type { Experience } from "../model/types";

export const experience: Experience[] = [
  {
    company: "True North",
    role: "Software Engineer",
    period: "Aug 2024 – Present",
    location: "Zagreb",
    highlights: [
      "Modernized enterprise-scale tax fraud detection platform by introducing TypeScript into a legacy React + Java codebase, reducing production defects by ~30%",
      "Implemented strategic server-side caching achieving 40% faster API response times",
      "Lead Front-End Developer & Technical Mentor for government tax tracking and pension management systems",
      "Architected Feature-Sliced Design + Atomic Design patterns across multiple applications",
    ],
    tech: ["React", "TypeScript", "Vue", "GraphQL", "Storybook"],
  },
  {
    company: "Valere Margins",
    role: "Software Engineer",
    period: "Feb 2023 – Sep 2024",
    location: "Zagreb",
    highlights: [
      "Built and launched a corporate travel booking platform from scratch using Next.js, TypeScript, GraphQL, and Material UI",
      "Developed a real-time collaborative productivity suite with WebSocket live chat and conflict-free document editing",
      "Improved Time to Interactive (TTI) by 25%+ through Vite bundling, code-splitting, and lazy loading",
    ],
    tech: ["Next.js", "TypeScript", "GraphQL", "WebSockets", "Material UI"],
  },
  {
    company: "AsyncLabs",
    role: "Software Engineer",
    period: "Feb 2022 – Feb 2023",
    location: "Zagreb",
    highlights: [
      "Sole front-end architect for an e-learning marketplace serving thousands of active users",
      "Integrated internal APIs and third-party payment gateways with zero critical post-launch incidents",
      "Implemented analytics and A/B testing infrastructure to optimize user conversion funnels",
    ],
    tech: ["React", "TypeScript", "REST APIs", "A/B Testing"],
  },
];
