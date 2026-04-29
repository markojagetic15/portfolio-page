import { useReveal } from "../../../shared/lib/hooks/useReveal";
import styles from "./About.module.css";

const values = [
  { label: "Performance-obsessed", desc: "TTI, bundle size, render cost" },
  { label: "Architecture-first", desc: "Feature-Sliced Design, Atomic Design" },
  { label: "Remote-first", desc: "async-friendly, always over-communicating" },
];

export default function About() {
  const headerRef = useReveal();
  const leftRef = useReveal(0.08);
  const rightRef = useReveal(0.08);

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.header} reveal`} ref={headerRef}>
          <span className={styles.sectionLabel}>About</span>
          <h2 className={styles.sectionTitle}>A bit about me</h2>
        </div>

        <div className={styles.layout}>
          <div className={`${styles.text} reveal`} ref={leftRef}>
            <p className={styles.paragraph}>
              I've worked across startups and established companies, from architecting
              e-learning platforms and real-time collaboration tools to modernizing
              enterprise-scale tax systems. I care deeply about clean architecture, type safety,
              and shipping things that actually work at scale.
            </p>
            <ul className={styles.values}>
              {values.map((v) => (
                <li key={v.label} className={styles.value}>
                  <span className={styles.valueLabel}>{v.label}</span>
                  <span className={styles.valueSep}>—</span>
                  <span className={styles.valueDesc}>{v.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles.photoWrap} reveal`} ref={rightRef}>
            <div className={styles.photoGlow} />
            <div className={styles.photo}>
              <img src='/photo.jpeg' alt="Marko Jagetić" />
              <div className={styles.photoOverlay} />
            </div>
            <div className={styles.photoStatus}>
              <span className={styles.statusDot} />
              <span className={styles.statusText}>Available for new projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
