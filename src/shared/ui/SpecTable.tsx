import type { ReactNode } from "react";
import styles from "./SpecTable.module.css";

/** Two-column datasheet spec table: condensed label, value. */
export function SpecTable({ rows, columns = 1 }: { rows: [string, ReactNode][]; columns?: 1 | 2 | 4 }) {
  return (
    <dl className={`${styles.table} ${columns === 2 ? styles.two : columns === 4 ? styles.four : ""}`}>
      {rows.map(([k, v]) => (
        <div key={k} className={styles.row}>
          <dt className="label">{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
