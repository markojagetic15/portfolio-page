import MagneticButton from "../../../shared/ui/magnetic-button/MagneticButton";
import styles from "./Footer.module.css";

const EmailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 15l-6-6-6 6"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <MagneticButton strength={0.25}>
            <div
              className={styles.logo}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span className={styles.logoBracket}>&lt;</span>
              <span className={styles.logoName}>MJ</span>
              <span className={styles.logoBracket}>/&gt;</span>
            </div>
          </MagneticButton>

          <div className={styles.socials}>
            <MagneticButton strength={0.45}>
              <a href="mailto:marko.jagetic3@gmail.com" className={styles.social} aria-label="Email">
                <EmailIcon />
              </a>
            </MagneticButton>
            <MagneticButton strength={0.45}>
              <a href="https://www.linkedin.com/in/marko-jagetić" target="_blank" rel="noreferrer" className={styles.social} aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            </MagneticButton>
          </div>

          <MagneticButton strength={0.3}>
            <button
              className={styles.backToTop}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
            >
              <ArrowUpIcon />
              Back to top
            </button>
          </MagneticButton>
        </div>

        <div className={styles.bottom}>
          <p className={styles.text}>
            Designed & built by <span className={styles.name}>Marko Jagetić</span>
          </p>
          <p className={styles.copy}>© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
