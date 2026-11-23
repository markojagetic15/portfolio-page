import { useRef, useState } from "react";
import { projects } from "../../../entities/project";
import { experience } from "../../../entities/experience";
import { skills } from "../../../entities/skill";
import { PINS, usesPin } from "../../../shared/lib/tech";
import styles from "./Characteristics.module.css";

// Which pins each rated skill row belongs to (for the cross-highlight).
const SKILL_PINS: Record<string, string[]> = {
  "React / Next.js": ["react", "next"],
  TypeScript: ["ts"],
  "Vue 3": ["vue"],
  "Node.js / NestJS": ["node", "nest"],
  PostgreSQL: ["pg"],
  "GraphQL / REST APIs": ["graphql"],
  "WebSockets / Real-time": ["realtime"],
};

// IC numbering: pins 1–6 run down the left side, 7–12 run up the right side.
const left = PINS.slice(0, 6);
const right = PINS.slice(6).reverse();
const pinNumber = (id: string) => PINS.findIndex((p) => p.id === id) + 1;

export default function Characteristics() {
  const [selected, setSelected] = useState("react");
  const [preview, setPreview] = useState<string | null>(null);
  const active = preview ?? selected;
  const activePin = PINS.find((p) => p.id === active)!;
  const pinRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const usedIn = [
    ...projects.filter((p) => usesPin(p.tech, active)).map((p) => ({ key: `p:${p.title}`, name: p.title, note: p.role ?? p.status })),
    ...experience.filter((e) => usesPin(e.tech, active)).map((e) => ({ key: `e:${e.company}`, name: e.company, note: e.period })),
  ];

  // Arrow keys walk the pins like the package: up/down along a side, left/right across.
  const onKeyDown = (e: React.KeyboardEvent, id: string) => {
    const side = left.some((p) => p.id === id) ? left : right;
    const other = side === left ? right : left;
    const idx = side.findIndex((p) => p.id === id);
    let next: string | undefined;
    if (e.key === "ArrowDown") next = side[Math.min(idx + 1, side.length - 1)].id;
    else if (e.key === "ArrowUp") next = side[Math.max(idx - 1, 0)].id;
    else if (e.key === "ArrowLeft" || e.key === "ArrowRight") next = other[idx].id;
    if (next) {
      e.preventDefault();
      setSelected(next);
      pinRefs.current[next]?.focus();
    }
  };

  const pin = (p: (typeof PINS)[number], side: "l" | "r") => (
    <li key={p.id}>
      <button
        type="button"
        ref={(el) => { pinRefs.current[p.id] = el; }}
        className={styles.pin}
        data-side={side}
        aria-pressed={selected === p.id}
        data-active={active === p.id || undefined}
        tabIndex={selected === p.id ? 0 : -1}
        onClick={() => setSelected(p.id)}
        onPointerEnter={(e) => e.pointerType === "mouse" && setPreview(p.id)}
        onPointerLeave={() => setPreview(null)}
        onKeyDown={(e) => onKeyDown(e, p.id)}
      >
        <span className={styles.pinLabel}>{p.label}</span>
        <span className={styles.lead} aria-hidden="true" />
        <span className={styles.pinNo} aria-hidden="true">{pinNumber(p.id)}</span>
      </button>
    </li>
  );

  return (
    <section id="characteristics" className="section" aria-labelledby="characteristics-title">
      <div className="wrap">
        <div className="sectionHead split">
          <h2 id="characteristics-title">Characteristics</h2>
          <p>The stack as a pinout. Pick a pin to see the products and companies where it ran in production.</p>
        </div>

        <div className={`split ${styles.grid}`}>
          <div className={styles.ratings}>
            <p className={styles.ratingsHead}>
              Rated level <span>self-assessed, out of 100</span>
            </p>
            <ul className={styles.scale}>
              {skills.map((s) => {
                const lit = SKILL_PINS[s.label]?.includes(active);
                return (
                  <li key={s.label} className={styles.rating} data-lit={lit || undefined}>
                    <span className={styles.skill}>{s.label}</span>
                    <span
                      className={styles.track}
                      role="meter"
                      aria-label={s.label}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={s.level}
                    >
                      <span className={styles.fill} style={{ width: `${s.level}%` }} />
                    </span>
                    <span className={styles.value}>{s.level}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.pinout}>
            <div className={styles.package}>
              <ul className={styles.side} aria-label="Pins 1 to 6">{left.map((p) => pin(p, "l"))}</ul>
              <div className={styles.body} aria-hidden="true">
                <span className={styles.notch} />
                <span className={styles.part}>MJ-01</span>
                <span className={styles.bodyPin}>
                  Pin {pinNumber(active)}
                </span>
                <span className={styles.bodyLabel}>{activePin.label}</span>
              </div>
              <ul className={styles.side} aria-label="Pins 7 to 12">{right.map((p) => pin(p, "r"))}</ul>
            </div>

            <div className={styles.readout} aria-live="polite">
              <p className="label">
                {activePin.label}: used in {usedIn.length} {usedIn.length === 1 ? "place" : "places"}
              </p>
              <ul>
                {usedIn.map((u) => (
                  <li key={u.key}>
                    <span>{u.name}</span>
                    <span className={styles.note}>{u.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
