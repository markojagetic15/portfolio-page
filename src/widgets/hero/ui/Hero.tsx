import { EMAIL, LINKEDIN } from "../../../shared/config";
import { steps, brickColour } from "../../../shared/lib/build";
import { useSelection, litState } from "../../../shared/lib/selection";
import styles from "./Hero.module.css";

const lead = steps[0]; // proarda: step 1

// The box of parts: everything the steps are built from, in a sensible order.
const INVENTORY = ["React", "TypeScript", "Vue.js", "Next.js", "Node.js", "NestJS", "PostgreSQL", "Redis", "GraphQL", "Yjs"];

export default function Hero() {
  const { chosen } = useSelection();
  return (
    <section id="top" className={styles.hero} data-enter aria-labelledby="hero-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.left}>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.name}>Marko Jagetić</span>
            <span className={styles.desc}>Full-stack engineer in Zagreb</span>
          </h1>
          <p className={styles.lede}>
            I build web apps piece by piece, front to back: React and Vue in the browser, Node.js and NestJS behind them.
            Shipping to production since 2022.
          </p>
          <div className={styles.actions}>
            <a className="brick btn" href={`mailto:${EMAIL}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 7 9 6 9-6" />
              </svg>
              Email Marko
            </a>
            <a className="brick white btn" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>

          <div className={`panel ${styles.inventory}`}>
            <p className={styles.invHead}>Parts in the box</p>
            <ul className={styles.bricks}>
              {INVENTORY.map((p, i) => (
                <li key={p} style={{ animationDelay: `${420 + [0, 40, 70, 120, 150, 200, 220, 270, 300, 340][i]}ms` }}>
                  <span className={`brick ${brickColour(p)} ${styles.part}`}>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <svg className={styles.arrow} viewBox="0 0 120 140" aria-hidden="true">
          <path d="M6 132 C 20 70, 50 30, 98 18" fill="none" stroke="var(--ink)" strokeWidth="3" strokeDasharray="8 7" strokeLinecap="round" />
          <path d="M92 6 L 114 15 L 96 30 Z" fill="var(--ink)" />
        </svg>

        <div className={styles.step} data-state={litState(chosen, lead.tech)}>
          <span className={`numeral ${styles.no}`} aria-hidden="true">1</span>
          <a className={styles.frame} href={lead.link} target="_blank" rel="noreferrer" aria-label={`Open ${lead.title}`}>
            <img
              src={lead.image}
              alt={`${lead.title}: a shared document editor next to its product page`}
              width={1600}
              height={910}
              fetchPriority="high"
            />
          </a>
          <div className={`panel ${styles.callout}`}>
            <span className={styles.qty}>1x</span>
            <span className={`brick ${brickColour("Yjs")} ${styles.piece}`}>Yjs</span>
            <span>real-time sync</span>
          </div>
          <div className={styles.caption}>
            <h2 className={styles.stepTitle}>Step 1 <span>·</span> proarda</h2>
            <p>Docs, canvas and Kanban boards, edited live together. My own product, built and run end to end.</p>
            <a className="link" href={lead.link} target="_blank" rel="noreferrer">proarda.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}
