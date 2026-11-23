import { useRef, useState } from "react";
import { steps, altBuilds, stepParts, brickColour } from "../../../shared/lib/build";
import { techName } from "../../../shared/lib/tech";
import { useSelection, litState } from "../../../shared/lib/selection";
import styles from "./Steps.module.css";

const hostOf = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function AltBuilds() {
  const { chosen } = useSelection();
  const track = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    // Read the current page from the scroll position, so fast repeated clicks never use a stale index.
    const w = (el.children[0] as HTMLElement)?.offsetWidth ?? 1;
    const current = Math.round(el.scrollLeft / (w + 24));
    const next = Math.max(0, Math.min(altBuilds.length - 1, current + dir));
    (el.children[next] as HTMLElement)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setPage(next);
  };

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const w = (el.children[0] as HTMLElement)?.offsetWidth ?? 1;
    setPage(Math.round(el.scrollLeft / (w + 24)));
  };

  return (
    <div className={styles.altWrap}>
      <div className={styles.altHead}>
        <div>
          <h3>Alternate builds</h3>
          <p>Other projects made from the same parts. Flip through them.</p>
        </div>
        <div className={styles.flip}>
          <button type="button" className="brick white" onClick={() => go(-1)} disabled={page === 0} aria-label="Previous build"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg></button>
          <span className={styles.pageNo} aria-live="polite">{page + 1} / {altBuilds.length}</span>
          <button type="button" className="brick white" onClick={() => go(1)} disabled={page === altBuilds.length - 1} aria-label="Next build"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
        </div>
      </div>
      <ul className={styles.alts} ref={track} onScroll={onScroll} tabIndex={0} aria-label="Alternate builds">
        {altBuilds.map((p) => (
          <li key={p.title} className={`panel ${styles.alt}`} data-state={litState(chosen, p.tech)}>
            <div className={styles.thumb}>
              <img src={p.image} alt={`${p.title} interface`} width={1600} height={800} decoding="async" />
            </div>
            <div className={styles.altBody}>
              <h4>{p.title}</h4>
              <p>{p.summary}</p>
              <ul className={styles.altParts}>
                {p.tech.map((t) => (
                  <li key={t}><span className={`brick ${brickColour(techName(t))} ${styles.part}`}>{techName(t)}</span></li>
                ))}
              </ul>
              {p.link ? (
                <a className="link" href={p.link} target="_blank" rel="noreferrer">{hostOf(p.link)}</a>
              ) : (
                <span className={styles.private}>Private, no public access</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Steps() {
  const { chosen } = useSelection();
  return (
    <section id="steps" className="section" aria-labelledby="steps-title">
      <div className="wrap">
        <div className="sectionHead">
          <h2 id="steps-title">Build steps</h2>
          <p>Each step is something I shipped. Parts new to a step are bright; parts already used in an earlier step are greyed out.</p>
        </div>

        <ol className={styles.steps}>
          {steps.slice(1).map((p, i) => {
            const n = i + 2;
            const parts = stepParts(n - 1);
            const picture = <img src={p.image} alt={`${p.title} interface`} width={1600} height={800} decoding="async" />;
            return (
              <li key={p.title} className={`panel ${styles.step}`} data-flip={n % 2 === 1 || undefined} data-state={litState(chosen, p.tech)}>
                <div className={styles.text}>
                  <span className={`numeral ${styles.no}`} aria-hidden="true">{n}</span>
                  <h3 className={styles.title}>
                    <span className="visuallyHidden">Step {n}: </span>{p.title}
                  </h3>
                  <p className={styles.role}>{p.role}</p>
                  <p className={styles.summary}>{p.summary}</p>
                  <p className={styles.partsHead}>Parts for this step</p>
                  <ul className={styles.parts}>
                    {parts.map((part) => (
                      <li key={part.name}>
                        <span className={`brick ${part.isNew ? brickColour(part.name) : "ghost"} ${styles.part}`}>
                          {part.name}
                          <span className="visuallyHidden">{part.isNew ? " (new in this step)" : " (used in an earlier step)"}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  {parts.every((x) => !x.isNew) && <p className={styles.note}>Built only from parts already in the box.</p>}
                  <p className={styles.status}>
                    {p.link ? (
                      <a className="link" href={p.link} target="_blank" rel="noreferrer">{hostOf(p.link)}</a>
                    ) : (
                      <span className={styles.private}>Private, no public access</span>
                    )}
                  </p>
                </div>
                {p.link ? (
                  <a className={styles.frame} href={p.link} target="_blank" rel="noreferrer" aria-label={`Open ${p.title}`}>{picture}</a>
                ) : (
                  <div className={styles.frame}>{picture}</div>
                )}
              </li>
            );
          })}
        </ol>

        <AltBuilds />
      </div>
    </section>
  );
}
