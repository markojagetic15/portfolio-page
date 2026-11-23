import { experience } from "../../../entities/experience";
import { stackLine } from "../../../shared/lib/tech";
import styles from "./History.module.css";

// Oldest first, so the staircase climbs left to right to today.
const climb = [...experience].reverse();
const COLOURS = ["blue", "white", "", "red"];

export default function History() {
  return (
    <section id="history" className="section" aria-labelledby="history-title">
      <div className="wrap">
        <div className="sectionHead">
          <h2 id="history-title">Build history</h2>
          <p>Four companies since February 2022, all in Zagreb, each step built on the one before.</p>
        </div>

        <ol className={styles.stairs}>
          {climb.map((e, i) => (
            <li key={e.company} className={styles.stair} style={{ "--rise": i } as React.CSSProperties} data-now={i === climb.length - 1 || undefined}>
              <div className={`brick ${COLOURS[i]} ${styles.block}`}>
                <span className={styles.dates}>{e.period}</span>
                <h3 className={styles.company}>{e.company}</h3>
              </div>
              <div className={`panel ${styles.card}`}>
                <p className={styles.role}>{e.role}</p>
                <ul className={styles.list}>
                  {e.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
                <p className={styles.stack}>{stackLine(e.tech)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
