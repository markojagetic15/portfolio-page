import { useEffect, useRef } from "react";
import styles from "./Cursor.module.css";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    let mouseX = -200, mouseY = -200;
    let dotX = -200, dotY = -200;
    let ringX = -200, ringY = -200;
    let dotScale = 1, targetDotScale = 1;
    let ringScale = 1, targetRingScale = 1;
    let visible = false;
    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        dotX = mouseX; dotY = mouseY;
        ringX = mouseX; ringY = mouseY;
        visible = true;
      }
    };

    // Event delegation — no need to re-bind on DOM changes
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) targetRingScale = 1.8;
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) targetRingScale = 1;
    };
    const onDown = () => { targetDotScale = 0.5; targetRingScale = 0.75; };
    const onUp = () => { targetDotScale = 1; targetRingScale = 1; };

    const tick = () => {
      dotX = lerp(dotX, mouseX, 0.8);
      dotY = lerp(dotY, mouseY, 0.8);
      ringX = lerp(ringX, mouseX, 0.1);
      ringY = lerp(ringY, mouseY, 0.1);
      dotScale = lerp(dotScale, targetDotScale, 0.2);
      ringScale = lerp(ringScale, targetRingScale, 0.12);

      if (dotRef.current) {
        dotRef.current.style.opacity = visible ? "1" : "0";
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) scale(${dotScale})`;
      }
      if (ringRef.current) {
        ringRef.current.style.opacity = visible ? "0.9" : "0";
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) scale(${ringScale})`;
      }

      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </>
  );
}
