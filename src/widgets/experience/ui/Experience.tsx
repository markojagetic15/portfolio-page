import { useState } from "react";
import { experience } from "../../../entities/experience/data";
import { useReveal } from "../../../shared/lib/hooks/useReveal";
import styles from "./Experience.module.css";

export default function Experience() {
  const [active, setActive] = useState(0);
  const job = experience[active];
  const headerRef = useReveal();
  const layoutRef = useReveal(0.08);

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.header} reveal`} ref={headerRef}>
          <span className={styles.sectionLabel}>Career</span>
          <h2 className={styles.sectionTitle}>Experience</h2>
        </div>

        <div className={`${styles.layout} reveal`} ref={layoutRef}>
          <div className={`${styles.tabs} stagger`}>
            {experience.map((e, i) => (
              <button
                key={e.company}
                className={`${styles.tab} ${active === i ? styles.tabActive : ""}`}
                onClick={() => setActive(i)}
              >
                <span className={styles.tabCompany}>{e.company}</span>
                <span className={styles.tabPeriod}>{e.period}</span>
              </button>
            ))}
          </div>

          <div className={styles.panel} key={active}>
            <div className={styles.panelHeader}>
              <div>
                <h3 className={styles.role}>{job.role}</h3>
                <p className={styles.meta}>
                  <span className={styles.company}>{job.company}</span>
                  <span className={styles.separator}>·</span>
                  <span>{job.period}</span>
                  <span className={styles.separator}>·</span>
                  <span>{job.location}</span>
                </p>
              </div>
            </div>

            <ul className={styles.highlights}>
              {job.highlights.map((h, i) => (
                <li key={i} className={styles.highlight}>
                  <span className={styles.arrow}>▸</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className={styles.techList}>
              {job.tech.map((t) => (
                <span key={t} className={styles.tech}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
