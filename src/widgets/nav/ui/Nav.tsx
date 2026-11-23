import { useEffect, useState } from "react";
import { EMAIL, SECTIONS, openPalette } from "../../../shared/config";
import styles from "./Nav.module.css";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <header className={styles.nav}>
      <div className={`wrap ${styles.inner}`}>
        <a href="#top" className={styles.mark} aria-label="Marko Jagetić, back to top">
          <span className={styles.chip} aria-hidden="true">MJ</span>
          <span className={styles.markText}>Marko Jagetić</span>
        </a>

        <nav aria-label="Sections" className={styles.links}>
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={styles.navLink}>
              {s.label}
            </a>
          ))}
        </nav>

        <button type="button" className={styles.search} onClick={openPalette} aria-label="Open the command menu">
          <span>Index</span>
          <kbd className={styles.kbd}>{isMac ? "⌘" : "Ctrl"} K</kbd>
        </button>

        <a className={`btn btnPrimary ${styles.cta}`} href={`mailto:${EMAIL}`}>Email Marko</a>

        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={menuOpen}
          aria-controls="phone-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <div id="phone-menu" className={styles.sheet} data-open={menuOpen} hidden={!menuOpen}>
        <nav aria-label="Sections" className="wrap">
          <ul>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} onClick={() => setMenuOpen(false)}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
