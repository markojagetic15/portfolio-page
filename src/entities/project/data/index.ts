import type { Project } from "../model/types";

export const projects: Project[] = [
  {
    title: "NomadDesk",
    description:
      "A remote work hub for digital nomads — find co-working spaces, check live seat availability, and book day passes. Built with real-time updates and an offline-first PWA architecture.",
    tech: ["Next.js", "TypeScript", "Supabase", "Mapbox", "Tailwind CSS"],
    link: "#",
    repo: "#",
    gradient: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    category: "Next.js",
  },
  {
    title: "Codebeam",
    description:
      "Collaborative live coding environment with syntax-highlighted real-time editing, voice chat, and AI-powered code review. Think Figma, but for pair programming sessions.",
    tech: ["React", "WebRTC", "WebSockets", "Monaco Editor", "Node.js"],
    link: "#",
    repo: "#",
    gradient: "linear-gradient(135deg, #06b6d4, #14b8a6)",
    category: "Real-time",
  },
  {
    title: "Ledgr",
    description:
      "Personal finance dashboard with bank-sync, AI-powered spending insights, and goal tracking. Visualizes complex financial data through clean, interactive charts.",
    tech: ["React", "TypeScript", "D3.js", "Plaid API", "PostgreSQL"],
    link: "#",
    repo: "#",
    gradient: "linear-gradient(135deg, #10b981, #22c55e)",
    category: "React",
  },
  {
    title: "Patchwork CMS",
    description:
      "Headless CMS with a visual drag-and-drop page builder, multi-tenant support, and a GraphQL content API. Designed for agencies managing dozens of client sites.",
    tech: ["Vue 3", "GraphQL", "TypeScript", "Node.js", "Redis"],
    link: "#",
    repo: "#",
    gradient: "linear-gradient(135deg, #f97316, #f43f5e)",
    category: "Vue",
  },
];
