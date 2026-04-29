import type { Project } from "../model/types";

export const projects: Project[] = [
  {
    title: "Dwell Optimal",
    description:
      "DWELLoptimal is a pioneering real estate technology company dedicated to creating secure, integrated work and living solutions for remote workers.",
    tech: ["Next.js", "TypeScript", "Postgres", "Mapbox", "MUI"],
    link: "https://www.dwelloptimal.com/",
    gradient: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    category: "Next.js",
    image: "/dwell-optimal.png",
  },
  {
    title: "Omni Academy",
    description:
      "It is a community of students and people with the same interests who want to learn together, develop, socialize, travel, help each other, share experiences, and support for an easier life.",
    tech: ["jQuery", "Wordpress", "SCSS", "PHP"],
    link: "https://oa.hr/",
    gradient: "linear-gradient(135deg, #06b6d4, #14b8a6)",
    category: "Real-time",
    image: "/oa.png",
  },
];
