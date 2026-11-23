import { useState } from "react";
import type { ReactNode } from "react";
import { SelectionContext } from "./selection";

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [chosen, choose] = useState<string | null>(null);
  return <SelectionContext.Provider value={{ chosen, choose }}>{children}</SelectionContext.Provider>;
}
