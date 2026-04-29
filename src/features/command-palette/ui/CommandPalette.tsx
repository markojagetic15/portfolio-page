import { useEffect, useRef, useState } from "react";
import styles from "./CommandPalette.module.css";

interface Command {
  id: string;
  label: string;
  group: string;
  icon: React.ReactNode;
  action: () => void;
}

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const GameIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/>
    <circle cx="15" cy="11" r="1"/><circle cx="17" cy="13" r="1"/>
    <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>
  </svg>
);

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commands: Command[] = [
    { id: "about",        label: "Go to About",        group: "Navigate", icon: <ArrowIcon />, action: () => scrollTo("about") },
    { id: "experience",   label: "Go to Experience",   group: "Navigate", icon: <ArrowIcon />, action: () => scrollTo("experience") },
    { id: "projects",     label: "Go to Projects",     group: "Navigate", icon: <ArrowIcon />, action: () => scrollTo("projects") },
    { id: "skills",       label: "Go to Skills",       group: "Navigate", icon: <ArrowIcon />, action: () => scrollTo("skills") },
    { id: "contact",      label: "Go to Contact",      group: "Navigate", icon: <ArrowIcon />, action: () => scrollTo("contact") },
    { id: "email",        label: "Copy email address", group: "Connect",  icon: <MailIcon />,  action: () => navigator.clipboard.writeText("marko.jagetic3@gmail.com") },
    { id: "linkedin",     label: "Open LinkedIn",      group: "Connect",  icon: <ExternalIcon />, action: () => window.open("https://www.linkedin.com/in/marko-jagetić", "_blank") },
    { id: "cv",           label: "Download CV",        group: "Download", icon: <DownloadIcon />, action: () => { const a = document.createElement("a"); a.href = "/cv.pdf"; a.download = ""; a.click(); } },
    { id: "maze",         label: "Play Gravity Maze",  group: "Fun",      icon: <GameIcon />,     action: () => scrollTo("game") },
  ];

  const filtered = query.trim()
    ? commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands;

  const groups = [...new Set(filtered.map(c => c.group))];

  const execute = (cmd: Command) => {
    cmd.action();
    setOpen(false);
    setQuery("");
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(o => !o);
        setQuery("");
        setActiveIdx(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => { setActiveIdx(0); }, [query]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      const cmd = filtered[activeIdx];
      if (cmd) execute(cmd);
    }
  };

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-active="true"]`) as HTMLElement;
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  if (!open) return null;

  let flatIdx = 0;

  return (
    <div className={styles.overlay} onClick={() => setOpen(false)}>
      <div className={styles.palette} onClick={e => e.stopPropagation()} onKeyDown={onKeyDown}>
        <div className={styles.inputWrap}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            className={styles.input}
            placeholder="Search commands..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <kbd className={styles.esc}>esc</kbd>
        </div>

        <ul ref={listRef} className={styles.list}>
          {filtered.length === 0 && (
            <li className={styles.empty}>No results for "{query}"</li>
          )}
          {groups.map(group => (
            <li key={group}>
              <div className={styles.group}>{group}</div>
              <ul>
                {filtered.filter(c => c.group === group).map(cmd => {
                  const idx = flatIdx++;
                  return (
                    <li key={cmd.id}>
                      <button
                        className={`${styles.item} ${activeIdx === idx ? styles.itemActive : ""}`}
                        data-active={activeIdx === idx}
                        onMouseEnter={() => setActiveIdx(idx)}
                        onClick={() => execute(cmd)}
                      >
                        <span className={styles.itemIcon}>{cmd.icon}</span>
                        {cmd.label}
                        {cmd.group === "Connect" || cmd.group === "Navigate"
                          ? <span className={styles.itemArrow}>↵</span>
                          : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
