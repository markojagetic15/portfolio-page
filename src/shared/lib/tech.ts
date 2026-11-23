const DISPLAY: Record<string, string> = {
  "nest.js": "NestJS",
  postgres: "PostgreSQL",
  typescript: "TypeScript",
  vue: "Vue.js",
  wordpress: "WordPress",
};

/** Consistent display names for the stack strings in the data files. */
export const techName = (t: string) => DISPLAY[t.toLowerCase()] ?? t;

export const stackLine = (tech: string[]) => tech.map(techName).join(" · ");

/** Pins of the stack pinout. `match` lists the data-file spellings it covers. */
export const PINS: { id: string; label: string; match: string[] }[] = [
  { id: "react", label: "React", match: ["react"] },
  { id: "next", label: "Next.js", match: ["next.js"] },
  { id: "vue", label: "Vue.js", match: ["vue", "vue.js"] },
  { id: "ts", label: "TypeScript", match: ["typescript"] },
  { id: "graphql", label: "GraphQL", match: ["graphql"] },
  { id: "realtime", label: "Yjs, WebSockets", match: ["yjs", "websockets"] },
  { id: "node", label: "Node.js", match: ["node.js"] },
  { id: "nest", label: "NestJS", match: ["nest.js"] },
  { id: "pg", label: "PostgreSQL", match: ["postgres"] },
  { id: "redis", label: "Redis", match: ["redis"] },
  { id: "php", label: "PHP", match: ["php"] },
  { id: "spring", label: "Java, Spring", match: ["spring"] },
];

export const usesPin = (tech: string[], pinId: string) => {
  const pin = PINS.find((p) => p.id === pinId);
  if (!pin) return false;
  return tech.some((t) => pin.match.includes(t.toLowerCase()));
};
