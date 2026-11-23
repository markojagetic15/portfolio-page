import { experience } from "../../../entities/experience";
import { stackLine } from "../../../shared/lib/tech";
import styles from "./History.module.css";

export default function History() {
  return (
    <section id="history" className="section" aria-labelledby="history-title">
      <div className="wrap">
        <div className="sectionHead split">
          <h2 id="history-title">Revision history</h2>
          <p>Four companies since February 2022, all in Zagreb. The newest revision is on top.</p>
        </div>

        <ol className={styles.revs}>
          <li className={styles.head} aria-hidden="true">
            <span className="label">Rev</span>
            <span className="label">Dates</span>
            <span className="label">Company and role</span>
            <span className="label">Changes</span>
          </li>
          {experience.map((e, i) => (
            <li key={e.company} className={styles.rev} data-current={i === 0 || undefined}>
              <span className={styles.letter} aria-label={`Revision ${e.rev}`}>{e.rev}</span>
              <span className={styles.dates}>{e.period}</span>
              <div className={styles.who}>
                <h3>{e.company}</h3>
                <p>{e.role}</p>
                <p className={styles.stack}>{stackLine(e.tech)}</p>
              </div>
              <ul className={`bullets ${styles.changes}`}>
                {e.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
