import { createContext, useContext } from "react";
import { SKILL_PARTS, usesPart } from "./tech";

/** The part chosen in the parts list; null until the visitor chooses one. */
export type Selection = { chosen: string | null; choose: (skill: string | null) => void };

export const SelectionContext = createContext<Selection>({ chosen: null, choose: () => {} });

export const useSelection = () => useContext(SelectionContext);

/** "lit" when the chosen part is in this stack, "dim" when it isn't, undefined when nothing is chosen. */
export function litState(chosen: string | null, tech: string[]): "lit" | "dim" | undefined {
  if (!chosen) return undefined;
  const ids = SKILL_PARTS[chosen] ?? [];
  return ids.some((id) => usesPart(tech, id)) ? "lit" : "dim";
}
