import { useReveal } from "../../../shared/lib/hooks/useReveal";
import styles from "./Skills.module.css";

const categories = [
  {
    label: "Frontend",
    techs: ["React", "Next.js", "Vue 3", "TypeScript", "JavaScript", "Tailwind CSS", "Material UI", "D3.js"],
  },
  {
    label: "Backend",
    techs: ["Node.js", "NestJS", "REST APIs", "GraphQL", "WebSockets", "JWT / OAuth"],
  },
  {
    label: "Database",
    techs: ["PostgreSQL", "MongoDB", "TypeORM", "Redis"],
  },
  {
    label: "Tooling",
    techs: ["Vite", "Webpack", "Docker", "Git", "Storybook", "Figma"],
  },
  {
    label: "Architecture",
    techs: ["Feature-Sliced Design", "Atomic Design", "DDD", "A/B Testing"],
  },
];

export default function Skills() {
  const headerRef = useReveal();
  const gridRef = useReveal(0.08);

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.header} reveal`} ref={headerRef}>
          <span className={styles.sectionLabel}>Toolkit</span>
          <h2 className={styles.sectionTitle}>Skills</h2>
        </div>

        <div className={`${styles.grid} reveal`} ref={gridRef}>
          {categories.map((cat) => (
            <div key={cat.label} className={styles.category}>
              <span className={styles.catLabel}>{cat.label}</span>
              <div className={styles.tags}>
                {cat.techs.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
