import { useEffect, useRef } from "react";
import styles from "./MagneticButton.module.css";

interface Props {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticButton({ children, className, strength = 0.38 }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    const onMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      inner.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    };

    const onLeave = () => {
      inner.style.transform = "";
    };

    wrapper.addEventListener("mousemove", onMove);
    wrapper.addEventListener("mouseleave", onLeave);
    return () => {
      wrapper.removeEventListener("mousemove", onMove);
      wrapper.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div ref={innerRef} className={`${styles.inner} ${className ?? ""}`}>
        {children}
      </div>
    </div>
  );
}
