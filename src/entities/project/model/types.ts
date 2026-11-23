export interface Project {
  title: string;
  /** One plain sentence: what it is and what it does. */
  summary: string;
  /** Whose product it is: "Own product", or the employer it was built at. */
  role?: string;
  status: "Live" | "Private";
  tech: string[];
  link: string;
  image: string;
  /** Featured projects get a full plate; the rest sit in the compact table. */
  featured: boolean;
}
