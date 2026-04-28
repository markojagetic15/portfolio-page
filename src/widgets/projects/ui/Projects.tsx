import { useReveal } from "../../../shared/lib/hooks/useReveal";
import styles from "./Projects.module.css";

export default function Projects() {
  const headerRef = useReveal();

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.header} reveal`} ref={headerRef}>
          <span className={styles.sectionLabel}>Work</span>
          <h2 className={styles.sectionTitle}>Projects</h2>
          <p className={styles.sectionSub}>A selection of things I've built.</p>
        </div>

        <div className={styles.placeholder}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-subtle)" }}>
            <rect x="3" y="3" width="18" height="18" rx="3"/>
            <path d="M3 9h18M9 21V9"/>
          </svg>
          <p>Projects coming soon</p>
        </div>
      </div>
    </section>
  );
}

/*
import { useState } from "react";
import { projects } from "../../../entities/project/data";

const FILTERS = ["All", "React", "Next.js", "Vue", "Real-time"];

const ExternalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const onTiltMove = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rx = ((y - rect.height / 2) / rect.height) * -10;
  const ry = ((x - rect.width / 2) / rect.width) * 10;
  card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(12px)`;
  card.style.transition = "transform 0.05s linear";
};

const onTiltLeave = (e) => {
  const card = e.currentTarget;
  card.style.transform = "";
  card.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
};

// Filters:
// {FILTERS.map(f => (
//   <button key={f} className={...} onClick={() => setFilter(f)}>{f}</button>
// ))}

// Grid:
// {visible.map((project) => (
//   <article key={project.title} ...>
//     ...
//   </article>
// ))}
*/
