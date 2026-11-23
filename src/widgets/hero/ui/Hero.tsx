import { projects } from "../../../entities/project";
import { EMAIL, LINKEDIN } from "../../../shared/config";
import { SpecTable } from "../../../shared/ui/SpecTable";
import { stackLine } from "../../../shared/lib/tech";
import styles from "./Hero.module.css";

const lead = projects[0]; // proarda: the typical application

const features = [
  "Full-stack web apps: React, Vue and Next.js in the browser, Node.js and NestJS behind them.",
  "Real-time collaboration: CRDT editing with Yjs, WebSockets, live cursors.",
  "Shipping production software since February 2022, from startups to a national tax platform.",
  "Now at Njuškalo, moving Croatia's largest classifieds site from PHP to Vue.js.",
];

export default function Hero() {
  return (
    <section id="top" className={styles.hero} data-enter aria-labelledby="hero-title">
      <div className="wrap">
        <div className={styles.block}>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.name}>Marko Jagetić</span>
            <span className={styles.desc}>Full-stack engineer in Zagreb</span>
          </h1>
          <dl className={styles.meta}>
            <div><dt>Datasheet</dt><dd>MJ-01</dd></div>
            <div><dt>Revised</dt><dd>Nov 2026</dd></div>
            <div><dt>Location</dt><dd>Zagreb, Croatia</dd></div>
            <div><dt>In production</dt><dd>Since 2022</dd></div>
          </dl>
        </div>

        <div className={`split ${styles.body}`}>
          <div className={styles.features}>
            <p className={styles.colHead}>Features</p>
            <ul className={`bullets ${styles.list}`}>
              {features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <div className={styles.actions}>
              <a className="btn btnPrimary" href={`mailto:${EMAIL}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" /><path d="m3 7 9 6 9-6" />
                </svg>
                Email Marko
              </a>
              <a className="btn btnGhost" href={LINKEDIN} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>

          <div className={styles.application}>
            <p className={styles.colHead}>Typical application</p>
            <a className={styles.frame} href={lead.link} target="_blank" rel="noreferrer" aria-label={`Open ${lead.title}`}>
              <img
                src={lead.image}
                alt={`${lead.title}: a shared document editor next to its product page`}
                width={1600}
                height={910}
                fetchPriority="high"
              />
            </a>
            <SpecTable
              columns={4}
              rows={[
                ["Product", <a className="link" href={lead.link} target="_blank" rel="noreferrer">{lead.title}</a>],
                ["Function", "Docs, canvas and Kanban boards, edited live together"],
                ["Stack", stackLine(lead.tech)],
                ["Status", `${lead.status}, ${lead.role?.toLowerCase()}`],
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
