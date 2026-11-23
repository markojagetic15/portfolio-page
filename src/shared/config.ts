/** Opens the command palette from anywhere (nav button, phone menu). */
export const OPEN_PALETTE = "jagetic:open-palette";
export const openPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE));

export const EMAIL = "marko.jagetic3@gmail.com";
export const LINKEDIN = "https://www.linkedin.com/in/marko-jageti%C4%87";

export const SECTIONS = [
  { id: "steps", label: "Steps" },
  { id: "history", label: "History" },
  { id: "parts", label: "Parts" },
  { id: "contact", label: "Contact" },
] as const;
