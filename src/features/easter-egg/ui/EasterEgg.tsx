import { useEffect, useRef, useState } from "react";
import { EMAIL } from "../../../shared/config";
import styles from "./EasterEgg.module.css";

const COLORS = ["#e2231a", "#ffcd00", "#9dd3f3", "#ffffff", "#e2231a", "#ffcd00"];

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  speed: number;
  size: number;
}

export default function EasterEgg() {
  const [visible, setVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const typedRef = useRef("");
  const idRef = useRef(0);

  const trigger = () => {
    const newParticles: Particle[] = Array.from({ length: 28 }, () => ({
      id: idRef.current++,
      x: 50 + (Math.random() - 0.5) * 10,
      y: 50 + (Math.random() - 0.5) * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      angle: Math.random() * 360,
      speed: 60 + Math.random() * 120,
      size: 6 + Math.random() * 8,
    }));
    setParticles(newParticles);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      setParticles([]);
    }, 3200);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      typedRef.current = (typedRef.current + e.key).slice(-6).toLowerCase();
      if (typedRef.current === "hireme") {
        typedRef.current = "";
        trigger();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.overlay} onClick={() => setVisible(false)}>
      {particles.map(p => (
        <div
          key={p.id}
          className={styles.particle}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.color,
            width: p.size,
            height: p.size,
            "--angle": `${p.angle}deg`,
            "--speed": `${p.speed}vmin`,
          } as React.CSSProperties}
        />
      ))}
      <div className={styles.message} role="dialog" aria-label="Easter egg">
        <h2 className={styles.title}>You typed “hire me”.</h2>
        <p className={styles.sub}>Noted. The right place for that is an email.</p>
        <a href={`mailto:${EMAIL}`} className="brick btn" onClick={(e) => e.stopPropagation()}>
          Email Marko
        </a>
        <span className={styles.hint}>Click anywhere to close</span>
      </div>
    </div>
  );
}
