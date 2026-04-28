import { useEffect, useRef } from "react";
import styles from "./ParticleBackground.module.css";

const COUNT = 320;
const ATTRACT_DIST = 220;
const ATTRACT_FORCE = 0.14;
const SPRING = 0.0018;
const NOISE = 0.04;

interface Particle {
  x: number; y: number;
  ox: number; oy: number;
  vx: number; vy: number;
  r: number;
  dampen: number;
  baseOpacity: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const particles = useRef<Particle[]>([]);
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.current = Array.from({ length: COUNT }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        return {
          x, y, ox: x, oy: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r: Math.random() * 1.6 + 0.5,
          dampen: 0.88 + Math.random() * 0.08,
          baseOpacity: Math.random() * 0.25 + 0.08,
        };
      });
    };

    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouse.current = { x: -999, y: -999 }; };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ps = particles.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const ad2 = ATTRACT_DIST * ATTRACT_DIST;
      const hasMouse = mx > -900;

      for (const p of ps) {
        // Organic random drift
        p.vx += (Math.random() - 0.5) * NOISE;
        p.vy += (Math.random() - 0.5) * NOISE;

        // Magnetic attraction
        if (hasMouse) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < ad2 && d2 > 0) {
            const dist = Math.sqrt(d2);
            const force = ((ATTRACT_DIST - dist) / ATTRACT_DIST) * ATTRACT_FORCE;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Soft spring back to origin
        p.vx += (p.ox - p.x) * SPRING;
        p.vy += (p.oy - p.y) * SPRING;

        p.vx *= p.dampen;
        p.vy *= p.dampen;
        p.x += p.vx;
        p.y += p.vy;

        // Opacity and size react to speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const excitement = Math.min(speed * 4, 1);
        const opacity = p.baseOpacity + excitement * 0.55;
        const radius = p.r + excitement * 0.8;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(88,166,255,${opacity})`;
        ctx.fill();
      }

      raf.current = requestAnimationFrame(tick);
    };

    init();
    window.addEventListener("resize", init);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
