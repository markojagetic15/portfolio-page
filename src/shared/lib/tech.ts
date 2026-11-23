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

type Colour = "" | "red" | "blue" | "white"; // "" is the default yellow brick

/**
 * The tracked parts. `match` lists every spelling (data files and display names);
 * `colour` is the part's one brick colour, used everywhere it appears.
 */
export const PARTS: { id: string; label: string; match: string[]; colour: Colour }[] = [
  { id: "react", label: "React", match: ["react"], colour: "blue" },
  { id: "next", label: "Next.js", match: ["next.js"], colour: "white" },
  { id: "vue", label: "Vue.js", match: ["vue", "vue.js"], colour: "" },
  { id: "ts", label: "TypeScript", match: ["typescript"], colour: "red" },
  { id: "graphql", label: "GraphQL", match: ["graphql"], colour: "white" },
  { id: "realtime", label: "Yjs and WebSockets", match: ["yjs", "websockets"], colour: "blue" },
  { id: "node", label: "Node.js", match: ["node.js"], colour: "" },
  { id: "nest", label: "NestJS", match: ["nest.js", "nestjs"], colour: "red" },
  { id: "pg", label: "PostgreSQL", match: ["postgres", "postgresql"], colour: "blue" },
  { id: "redis", label: "Redis", match: ["redis"], colour: "red" },
  { id: "php", label: "PHP", match: ["php"], colour: "white" },
  { id: "spring", label: "Java and Spring", match: ["spring"], colour: "" },
];

export const partOf = (name: string) => PARTS.find((p) => p.match.includes(name.toLowerCase()));

/** One brick colour per part; parts we don't track are plain white. */
export const brickColour = (name: string): Colour => partOf(name)?.colour ?? "white";

export const usesPart = (tech: string[], partId: string) => {
  const part = PARTS.find((p) => p.id === partId);
  return !!part && tech.some((t) => part.match.includes(t.toLowerCase()));
};

/** Rated skills that map onto tracked parts (the pressable ones in the parts list). */
export const SKILL_PARTS: Record<string, string[]> = {
  "React / Next.js": ["react", "next"],
  TypeScript: ["ts"],
  "Vue 3": ["vue"],
  "Node.js / NestJS": ["node", "nest"],
  PostgreSQL: ["pg"],
  "GraphQL / REST APIs": ["graphql"],
  "WebSockets / Real-time": ["realtime"],
};

export const skillColour = (label: string): Colour => {
  const id = SKILL_PARTS[label]?.[0];
  return PARTS.find((p) => p.id === id)?.colour ?? "white";
};
