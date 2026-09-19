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
    private: false
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
    private: false
  },
  {
    title: "Udomi me",
    description:
      "Udomi Me connects animals in need with people who care. Find your new best friend today — completely free.",
    tech: ["React", "Nest.JS", "Postgres", "Typescript"],
    link: "https://udomi-me.com/",
    gradient: "linear-gradient(135deg, #06b6d4, #14b8a6)",
    category: "Real-time",
    image: "/udomi-me.png",
    private: false,
    wip: true
  },
  {
    title: "HOPS",
    description:
      "The mission of HOPS is to manage the electricity system of the Republic of Croatia, transmit electricity, and maintain, develop, and build the transmission network in order to provide reliable supply to users at minimal costs and with care for environmental preservation.",
    tech: ["Vue.js", "C#", "Postgres", "Typescript"],
    link: "https://www.hops.hr/",
    gradient: "linear-gradient(135deg, #06b6d4, #14b8a6)",
    category: "Real-time",
    image: "/hops.png",
    private: false,
  },
  {
    title: "K-Drive",
    description:
      "K-Drive is a website for a car service, showcasing services offered and providing an easy way for customers to get in touch.",
    tech: ["React", "TypeScript", "SCSS"],
    link: "https://k-drive-autoservis.onrender.com/",
    gradient: "linear-gradient(135deg, #f97316, #ef4444)",
    category: "React",
    image: "/k-drive.png",
    private: false,
  },
  {
    title: "AMS",
    description:
      "The Asset Management System (AMS) is a comprehensive web application that offers companies a detailed view of their assets, facilitates task and staff management, and provides real-time updates for efficient operations.",
    tech: ["React", "TypeScript", "Node.js"],
    link: "",
    gradient: "linear-gradient(135deg, #f97316, #ef4444)",
    category: "React",
    image: "/ams.png",
    private: true,
  },
  {
    title: "Guardian",
    description:
      "Guardian is a solution for fraud detection which offers both real-time and near real time fraud detection together with rich visual presentation of entities and relationships between them which enables risk analysts to detect and manage fraudulent entities and events with ease.",
    tech: ["React", "TypeScript", "Spring"],
    link: "",
    gradient: "linear-gradient(135deg, #f97316, #ef4444)",
    category: "React",
    image: "/guardian.png",
    private: true,
  },
  {
    title: "Njuškalo",
    description:
      "Njuškalo is Croatia's largest classifieds marketplace. Led the modernization of core platform modules by migrating a legacy PHP monolith to Vue.js, and engineered a revamped, flexible delivery management system supporting new shipping and logistics methods for millions of active users.",
    tech: ["Vue.js", "PHP", "Twig"],
    link: "https://njuskalo.hr",
    gradient: "linear-gradient(135deg, #f97316, #ef4444)",
    category: "Vue.js",
    image: "/njuskalo.png",
    private: false,
  },
];
