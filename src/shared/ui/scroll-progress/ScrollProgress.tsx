import { useEffect, useRef } from "react";
import styles from "./ScrollProgress.module.css";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const scale = total > 0 ? window.scrollY / total : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${scale})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.track}>
      <div className={styles.bar} ref={barRef} />
    </div>
  );
}
