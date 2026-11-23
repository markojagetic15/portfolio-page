import { projects } from "../../../entities/project";
import { SpecTable } from "../../../shared/ui/SpecTable";
import { stackLine } from "../../../shared/lib/tech";
import styles from "./Applications.module.css";

// proarda leads the hero, so the plates start with the next featured project.
const plates = projects.filter((p) => p.featured).slice(1);
const others = projects.filter((p) => !p.featured);

const hostOf = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export default function Applications() {
  return (
    <section id="applications" className="section" aria-labelledby="applications-title">
      <div className="wrap">
        <div className="sectionHead split">
          <h2 id="applications-title">Applications</h2>
          <p>Products of my own and work for employers, each with its stack and whether you can open it.</p>
        </div>

        <ul className={styles.plates}>
          {plates.map((p) => {
            const picture = (
              <img src={p.image} alt={`${p.title} interface`} width={1600} height={800} decoding="async" />
            );
            return (
              <li key={p.title} className={`split ${styles.plate}`}>
                <div className={styles.spec}>
                  <h3 className={styles.name}>{p.title}</h3>
                  <p className={styles.summary}>{p.summary}</p>
                  <SpecTable
                    rows={[
                      ["Stack", stackLine(p.tech)],
                      ["Built", p.role ?? "—"],
                      [
                        "Status",
                        p.link ? (
                          <a className="link" href={p.link} target="_blank" rel="noreferrer">
                            {p.status} at {hostOf(p.link)}
                          </a>
                        ) : (
                          "Private, no public access"
                        ),
                      ],
                    ]}
                  />
                </div>
                {p.link ? (
                  <a className={styles.frame} href={p.link} target="_blank" rel="noreferrer" aria-label={`Open ${p.title}`}>
                    {picture}
                  </a>
                ) : (
                  <div className={styles.frame}>{picture}</div>
                )}
              </li>
            );
          })}
        </ul>

        <h3 className={styles.otherHead}>Other applications</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col" className="label">Project</th>
              <th scope="col" className="label">What it is</th>
              <th scope="col" className="label">Stack</th>
              <th scope="col" className="label">Link</th>
            </tr>
          </thead>
          <tbody>
            {others.map((p) => (
              <tr key={p.title}>
                <th scope="row">{p.title}</th>
                <td>{p.summary}</td>
                <td className={styles.stack}>{stackLine(p.tech)}</td>
                <td>
                  {p.link ? (
                    <a className="link" href={p.link} target="_blank" rel="noreferrer">{hostOf(p.link)}</a>
                  ) : (
                    <span className={styles.private}>Private</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
