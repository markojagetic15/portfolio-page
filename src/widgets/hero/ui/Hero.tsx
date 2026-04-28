import { useEffect, useRef, useState } from "react";
import { useCountUp } from "../../../shared/lib/hooks/useCountUp";
import styles from "./Hero.module.css";

const ROLES = [
  "Senior Full-Stack Engineer",
  "React & Vue Specialist",
  "Node.js & NestJS Builder",
  "API & Database Architect",
];

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

export default function Hero() {
  const cursorRef = useRef<HTMLSpanElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  const [displayText, setDisplayText] = useState("");
  const [toast, setToast] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const typeState = useRef({ roleIdx: 0, charIdx: 0, deleting: false });

  const years = useCountUp(5);
  const projs = useCountUp(15);
  const companies = useCountUp(3);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    let visible = true;
    const interval = setInterval(() => {
      visible = !visible;
      cursor.style.opacity = visible ? "1" : "0";
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const s = typeState.current;
      const current = ROLES[s.roleIdx % ROLES.length];
      if (!s.deleting) {
        if (s.charIdx < current.length) {
          s.charIdx++;
          setDisplayText(current.slice(0, s.charIdx));
          timer = setTimeout(tick, 75);
        } else {
          timer = setTimeout(() => { s.deleting = true; tick(); }, 2400);
        }
      } else {
        if (s.charIdx > 0) {
          s.charIdx--;
          setDisplayText(current.slice(0, s.charIdx));
          timer = setTimeout(tick, 42);
        } else {
          s.deleting = false;
          s.roleIdx++;
          timer = setTimeout(tick, 320);
        }
      }
    };
    timer = setTimeout(tick, 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 40;
      const y = (clientY / innerHeight - 0.5) * 40;
      if (blob1Ref.current) blob1Ref.current.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
      if (blob2Ref.current) blob2Ref.current.style.transform = `translate(${-x * 0.4}px, ${-y * 0.4}px)`;
    };
    hero.addEventListener("mousemove", onMove);
    return () => hero.removeEventListener("mousemove", onMove);
  }, []);

  const copyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText("marko.jagetic3@gmail.com");
      setToast(true);
      setTimeout(() => setToast(false), 2200);
    } catch {
      window.location.href = "mailto:marko.jagetic3@gmail.com";
    }
  };

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.blob1} ref={blob1Ref} />
      <div className={styles.blob2} ref={blob2Ref} />
      <div className={styles.blob3} />
      <div className={styles.grid} />

      <div className={styles.content}>
        <div className={styles.badgeWrap}>
          <button
            className={styles.badge}
            onClick={() => setStatusOpen(o => !o)}
          >
            <span className={styles.dot} />
            Available for contract work
          </button>

          {statusOpen && (
            <div className={styles.statusPopover}>
              <div className={styles.statusRow}>
                <span className={styles.statusLabel}>Location</span>
                <span className={styles.statusVal}>Zagreb, Croatia (UTC+1)</span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.statusLabel}>Availability</span>
                <span className={styles.statusVal}>Immediately</span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.statusLabel}>Work type</span>
                <span className={styles.statusVal}>Remote · B2B contract</span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.statusLabel}>Response</span>
                <span className={styles.statusVal}>&lt; 24 hours</span>
              </div>
              <a
                href="mailto:marko.jagetic3@gmail.com"
                className={styles.statusCta}
                onClick={() => setStatusOpen(false)}
              >
                Send a message
              </a>
            </div>
          )}
        </div>

        <h1 className={styles.name}>Marko Jagetić</h1>

        <h2 className={styles.title}>
          {displayText}
          <span ref={cursorRef} className={styles.cursor}>|</span>
        </h2>

        <p className={styles.bio}>
          I build scalable, high-performance web applications across the full stack, focused on clean architecture, developer
          experience, and shipping products that actually work at scale.
        </p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum} ref={years.ref as React.RefObject<HTMLSpanElement>}>{years.value}+</span>
            <span className={styles.statLabel}>Years exp.</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum} ref={projs.ref as React.RefObject<HTMLSpanElement>}>{projs.value}+</span>
            <span className={styles.statLabel}>Projects</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum} ref={companies.ref as React.RefObject<HTMLSpanElement>}>{companies.value}</span>
            <span className={styles.statLabel}>Companies</span>
          </div>
        </div>

        <div className={styles.actions}>
          <a
            href="#projects"
            className={styles.btnPrimary}
            onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            View projects
          </a>
          <a href="/cv.pdf" download className={styles.btnGhost}>
            <DownloadIcon />
            Download CV
          </a>
          <a
            href="#contact"
            className={styles.btnGhost}
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            Get in touch
          </a>
        </div>

        <div className={styles.socials}>
          <a href="#" className={styles.social} onClick={copyEmail} title="Click to copy">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            marko.jagetic3@gmail.com
          </a>
          <span className={styles.socialDivider}>·</span>
          <a href="https://www.linkedin.com/in/marko-jagetić" target="_blank" rel="noreferrer" className={styles.social}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span>scroll</span>
      </div>

      <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`}>
        Email copied to clipboard
      </div>
    </section>
  );
}
