import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <p>© 2026 Marko Jagetić</p>
        <a className="link" href="#top">Back to top</a>
      </div>
    </footer>
  );
}
