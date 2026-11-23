import { useEffect, useMemo, useRef, useState } from "react";
import { EMAIL, LINKEDIN, OPEN_PALETTE, SECTIONS } from "../../../shared/config";
import { projects } from "../../../entities/project";
import styles from "./CommandPalette.module.css";

interface Command {
  id: string;
  label: string;
  group: string;
  hint?: string;
  action: () => void;
}

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// Opened from the keyboard many times a day: no open/close animation, by design.
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const [note, setNote] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const commands: Command[] = useMemo(
    () => [
      { id: "top", label: "Top of page", group: "Go to", action: () => go("top") },
      ...SECTIONS.map((s) => ({ id: s.id, label: s.label, group: "Go to", action: () => go(s.id) })),
      ...projects
        .filter((p) => p.link)
        .map((p) => ({ id: `p-${p.title}`, label: `Open ${p.title}`, group: "Applications", hint: "new tab", action: () => window.open(p.link, "_blank", "noopener") })),
      { id: "copy", label: "Copy email address", group: "Contact", action: () => { navigator.clipboard?.writeText(EMAIL); } },
      { id: "mail", label: "Email Marko", group: "Contact", action: () => { window.location.href = `mailto:${EMAIL}`; } },
      { id: "li", label: "Open LinkedIn", group: "Contact", hint: "new tab", action: () => window.open(LINKEDIN, "_blank", "noopener") },
    ],
    [],
  );

  const filtered = query.trim()
    ? commands.filter((c) => `${c.group} ${c.label}`.toLowerCase().includes(query.trim().toLowerCase()))
    : commands;
  const groups = [...new Set(filtered.map((c) => c.group))];

  const show = () => {
    returnFocus.current = document.activeElement as HTMLElement;
    setQuery("");
    setActiveIdx(0);
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
    returnFocus.current?.focus?.();
  };

  const execute = (cmd: Command) => {
    cmd.action();
    if (cmd.id === "copy") {
      setNote("Email address copied");
      setTimeout(() => setNote(""), 1600);
    }
    setOpen(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else show();
      } else if (e.key === "Escape" && open) {
        close();
      }
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE, show);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE, show);
    };
  });

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[activeIdx];
      if (cmd) execute(cmd);
    } else if (e.key === "Tab") {
      e.preventDefault(); // focus stays in the dialog; arrows move the selection
    }
  };

  let flat = 0;

  return (
    <>
      <div className={styles.toast} role="status" aria-live="polite" data-show={!!note || undefined}>{note}</div>
      {open && (
        <div className={styles.overlay} onMouseDown={close}>
          <div
            className={styles.palette}
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <div className={styles.inputRow}>
              <label htmlFor="palette-q" className="visuallyHidden">Search sections, projects and contact</label>
              <input
                id="palette-q"
                ref={inputRef}
                className={styles.input}
                placeholder="Go to a section, open a project…"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={filtered[activeIdx] ? `cmd-${filtered[activeIdx].id}` : undefined}
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className={styles.kbd}>Esc</kbd>
            </div>

            <div ref={listRef} id="palette-list" role="listbox" aria-label="Commands" className={styles.list}>
              {filtered.length === 0 && <p className={styles.empty}>Nothing matches “{query}”.</p>}
              {groups.map((g) => (
                <div key={g} role="group" aria-label={g}>
                  <div className={`label ${styles.group}`}>{g}</div>
                  {filtered.filter((c) => c.group === g).map((c) => {
                    const idx = flat++;
                    const active = idx === activeIdx;
                    return (
                      <div
                        key={c.id}
                        id={`cmd-${c.id}`}
                        role="option"
                        aria-selected={active}
                        data-active={active}
                        className={styles.item}
                        onMouseMove={() => setActiveIdx(idx)}
                        onClick={() => execute(c)}
                      >
                        <span>{c.label}</span>
                        {c.hint && <span className={styles.hint}>{c.hint}</span>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <span><kbd className={styles.kbd}>↑</kbd> <kbd className={styles.kbd}>↓</kbd> move</span>
              <span><kbd className={styles.kbd}>Enter</kbd> open</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
