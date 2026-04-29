import { useReveal } from "../../../shared/lib/hooks/useReveal";
import styles from "./About.module.css";

const values = [
  "Performance-obsessed — TTI, bundle size, render cost",
  "Architecture-first — Feature-Sliced Design, Atomic Design",
  "Remote-first, async-friendly, always over-communicating",
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
                <li key={v} className={styles.value}>
                  <span className={styles.valueDot} />
                  {v}
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles.photoWrap} reveal`} ref={rightRef}>
            <div className={styles.photo}>
              <img src='/portfolio-page/photo.jpeg' alt="Marko Jagetić" />
            </div>
            <div className={styles.photoBorder} />
          </div>
        </div>
      </div>
    </section>
  );
}
