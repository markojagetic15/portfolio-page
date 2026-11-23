import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap split ${styles.inner}`}>
        <p>
          © 2026 Marko Jagetić
          <span className={styles.doc}>Datasheet MJ-01, revised November 2026</span>
        </p>
        <p><a className="link" href="#top">Back to top</a></p>
      </div>
    </footer>
  );
}
