import styles from "./Grain.module.css";

export default function Grain() {
  return (
    <>
      <svg style={{ position: "fixed", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          <filter id="grain-filter" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" />
          </filter>
        </defs>
      </svg>
      <div className={styles.grain} />
    </>
  );
}
