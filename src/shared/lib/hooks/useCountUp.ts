import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, duration = 1300) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          observer.disconnect();
          setTimeout(() => {
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(Math.round(eased * target));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }, 600);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}
