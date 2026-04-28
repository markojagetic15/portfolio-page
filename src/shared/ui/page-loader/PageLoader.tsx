import { useEffect, useState } from "react";
import styles from "./PageLoader.module.css";

export default function PageLoader() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"), 700);
    const t2 = setTimeout(() => setPhase("done"), 1150);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`${styles.overlay} ${phase === "out" ? styles.out : ""}`}>
      <div className={styles.logo}>
        <span className={styles.bracket}>&lt;</span>
        <span className={styles.initials}>MJ</span>
        <span className={styles.bracket}>/&gt;</span>
      </div>
      <div className={styles.progressTrack}>
        <div className={styles.progressBar} />
      </div>
    </div>
  );
}
