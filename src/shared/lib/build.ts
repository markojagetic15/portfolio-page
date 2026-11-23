import { projects } from "../../entities/project";
import type { Project } from "../../entities/project";
import { techName } from "./tech";

export { brickColour } from "./tech";

/** The build order of the booklet: proarda is step 1 (in the hero). */
const ORDER = ["proarda", "Njuškalo", "Guardian", "Udomi me"];

export const steps: Project[] = ORDER.map((t) => projects.find((p) => p.title === t)!).filter(Boolean);
export const altBuilds: Project[] = projects.filter((p) => !ORDER.includes(p.title));

/** Parts of a step, marking the ones no earlier step used (the bright, new pieces). */
export function stepParts(index: number) {
  const before = new Set(steps.slice(0, index).flatMap((s) => s.tech.map((t) => techName(t))));
  return steps[index].tech.map((t) => ({ name: techName(t), isNew: !before.has(techName(t)) }));
}
