import { projects } from "../../../entities/project";
import { experience } from "../../../entities/experience";
import { skills } from "../../../entities/skill";
import { SKILL_PARTS, skillColour, usesPart } from "../../../shared/lib/tech";
import { useSelection } from "../../../shared/lib/selection";
import styles from "./Parts.module.css";

const DEFAULT = "React / Next.js";

export default function Parts() {
  const { chosen, choose } = useSelection();
  const active = chosen ?? DEFAULT;
  const ids = SKILL_PARTS[active] ?? [];
  const uses = (tech: string[]) => ids.some((id) => usesPart(tech, id));

  const builds = projects.filter((p) => uses(p.tech));
  const atWork = experience.filter((e) => uses(e.tech));

  return (
    <section id="parts" className="section" aria-labelledby="parts-title">
      <div className="wrap">
        <div className="sectionHead">
          <h2 id="parts-title">Parts list</h2>
          <p>How well I know each part, rated by me out of 100. Choose a part to see where I used it; the steps above light up too.</p>
        </div>

        <div className={styles.grid}>
          <ul className={`panel ${styles.list}`}>
            {skills.map((s) => {
              const tracked = s.label in SKILL_PARTS;
              const body = (
                <>
                  <span className={styles.name}>{s.label}</span>
                  <span className={styles.value}>{s.level}</span>
                </>
              );
              return (
                <li key={s.label} className={styles.row}>
                  <div className={styles.track} style={{ "--level": `${s.level}%` } as React.CSSProperties}>
                    {tracked ? (
                      <button
                        type="button"
                        className={`brick ${skillColour(s.label)} ${styles.bar}`}
                        aria-pressed={active === s.label}
                        onClick={() => choose(s.label)}
                        aria-label={`${s.label}, ${s.level} out of 100. Show where it was used`}
                      >
                        {body}
                      </button>
                    ) : (
                      <span className={`${styles.bar} ${styles.flat}`} aria-label={`${s.label}, ${s.level} out of 100`}>{body}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className={`panel ${styles.readout}`} aria-live="polite">
            <p className={styles.readHead}>Where {active} went in</p>
            <p className={styles.count}>
              <span className="numeral">{builds.length}</span>
              <span>{builds.length === 1 ? "build" : "builds"}</span>
            </p>
            <ul className={styles.uses}>
              {builds.map((p) => (
                <li key={p.title}><span>{p.title}</span><span className={styles.note}>{p.role ?? p.status}</span></li>
              ))}
            </ul>
            {atWork.length > 0 && (
              <>
                <p className={styles.subHead}>At work</p>
                <ul className={styles.uses}>
                  {atWork.map((e) => (
                    <li key={e.company}><span>{e.company}</span><span className={styles.note}>{e.period}</span></li>
                  ))}
                </ul>
              </>
            )}
            <div className={styles.readActions}>
              <a className="link" href="#steps">See it in the steps</a>
              {chosen && <button type="button" className="link" onClick={() => choose(null)}>Clear</button>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
