import { useState, useEffect, useRef } from "react";
import MagneticButton from "../../../shared/ui/magnetic-button/MagneticButton";
import styles from "./Nav.module.css";

const links = ["About", "Experience", "Projects", "Skills", "Contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.toLowerCase()))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActive(id.charAt(0).toUpperCase() + id.slice(1));
          }
        });
      },
      { threshold: 0, rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Sliding indicator
  useEffect(() => {
    if (!listRef.current || !indicatorRef.current || !active) return;
    const idx = links.indexOf(active);
    if (idx === -1) return;
    const buttons = listRef.current.querySelectorAll("button");
    const btn = buttons[idx] as HTMLElement;
    if (!btn) return;
    const listRect = listRef.current.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    Object.assign(indicatorRef.current.style, {
      left: `${btnRect.left - listRect.left}px`,
      width: `${btnRect.width}px`,
      opacity: "1",
    });
  }, [active]);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <div
          className={styles.logo}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className={styles.logoBracket}>&lt;</span>
          <span className={styles.logoName}>MJ</span>
          <span className={styles.logoBracket}>/&gt;</span>
        </div>

        <ul className={styles.links} ref={listRef}>
          <span ref={indicatorRef} className={styles.indicator} />
          {links.map((l) => (
            <li key={l}>
              <button
                className={`${styles.link} ${active === l ? styles.linkActive : ""}`}
                onClick={() => scrollTo(l)}
              >
                {l}
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.navRight}>
          <div className={styles.kbdHint}>
            <kbd className={styles.kbd}>⌘</kbd>
            <kbd className={styles.kbd}>K</kbd>
          </div>
          <MagneticButton>
            <a href="mailto:marko.jagetic3@gmail.com" className={styles.cta}>
              Hire me
            </a>
          </MagneticButton>
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        <ul className={styles.mobileLinks}>
          {links.map((l) => (
            <li key={l}>
              <button
                className={`${styles.mobileLink} ${active === l ? styles.mobileLinkActive : ""}`}
                onClick={() => scrollTo(l)}
              >
                {l}
              </button>
            </li>
          ))}
        </ul>
        <a href="mailto:marko.jagetic3@gmail.com" className={styles.mobileCta}>
          Hire me
        </a>
      </div>
    </>
  );
}
