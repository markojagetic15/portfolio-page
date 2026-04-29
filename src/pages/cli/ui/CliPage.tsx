import { useState, useEffect, useRef, useCallback } from "react";
import Cursor from "../../../shared/ui/cursor/Cursor";
import ParticleBackground from "../../../shared/ui/particle-background/ParticleBackground";
import styles from "./CliPage.module.css";

type LineType = "welcome" | "prompt" | "output" | "error" | "dim" | "accent" | "green" | "yellow" | "blank";

interface Line {
  type: LineType;
  text: string;
}

const PROMPT_USER = "visitor";
const PROMPT_HOST = "jagetic.com";

const WELCOME_LINES: Line[] = [
  { type: "accent", text: "┌─────────────────────────────────────────────────────┐" },
  { type: "accent", text: "│                                                     │" },
  { type: "accent", text: "│   Welcome to Marko's interactive portfolio CLI      │" },
  { type: "accent", text: "│   Type  help  to see available commands             │" },
  { type: "accent", text: "│                                                     │" },
  { type: "accent", text: "└─────────────────────────────────────────────────────┘" },
  { type: "blank", text: "" },
  { type: "dim", text: "  Marko Jagetić — Senior Full-Stack Engineer · Zagreb, Croatia" },
  { type: "dim", text: "  5+ years · 15+ projects · React · TypeScript · Node.js" },
  { type: "blank", text: "" },
];

const FS: Record<string, string[]> = {
  "~": ["about.txt", "resume.pdf", "contact.txt", "projects/", "skills.txt"],
  "~/projects": ["NomadDesk", "Codebeam", "Ledgr", "PatchworkCMS"],
};

const COMMANDS: Record<string, (args: string[], cwd: string, setCwd: (d: string) => void, navigate: () => void) => Line[]> = {
  help: () => [
    { type: "yellow", text: "Available commands:" },
    { type: "blank", text: "" },
    { type: "output", text: "  whoami            Short bio" },
    { type: "output", text: "  ls                List files in current directory" },
    { type: "output", text: "  ls projects       List all projects" },
    { type: "output", text: "  ls skills         List all skills" },
    { type: "output", text: "  cat about         Read about me" },
    { type: "output", text: "  cat resume        Work experience" },
    { type: "output", text: "  cat contact       Contact information" },
    { type: "output", text: "  open <name>       Open a project (try: open NomadDesk)" },
    { type: "output", text: "  cd projects       Change to projects directory" },
    { type: "output", text: "  cd ~              Go home" },
    { type: "output", text: "  pwd               Print working directory" },
    { type: "output", text: "  date              Current date" },
    { type: "output", text: "  uname -a          System information" },
    { type: "output", text: "  echo <text>       Echo text" },
    { type: "output", text: "  history           Command history" },
    { type: "output", text: "  clear             Clear the terminal" },
    { type: "output", text: "  exit              Return to portfolio" },
    { type: "blank", text: "" },
    { type: "dim", text: "  Tip: Tab to autocomplete · ↑↓ arrows for history" },
  ],

  whoami: () => [
    { type: "green", text: "Marko Jagetić" },
    { type: "blank", text: "" },
    { type: "output", text: "  Senior Full-Stack Engineer based in Zagreb, Croatia." },
    { type: "output", text: "  5+ years building scalable web applications across startups" },
    { type: "output", text: "  and enterprise environments." },
    { type: "blank", text: "" },
    { type: "dim", text: "  Currently:  Software Engineer @ True North" },
    { type: "dim", text: "  Stack:      React · TypeScript · Node.js · GraphQL" },
    { type: "dim", text: "  Arch:       Feature-Sliced Design · Atomic Design · DDD" },
    { type: "dim", text: "  Status:     Available for contract work · Remote · B2B" },
  ],

  ls: (_, cwd) => {
    const entries = FS[cwd] ?? FS["~"];
    return [
      { type: "blank", text: "" },
      ...entries.map((e) => ({
        type: (e.endsWith("/") ? "accent" : "output") as LineType,
        text: `  ${e}`,
      })),
      { type: "blank", text: "" },
    ];
  },

  pwd: (_, cwd) => [
    { type: "output", text: `/home/${PROMPT_USER}${cwd.replace("~", "")}` },
  ],

  cd: (args, cwd, setCwd) => {
    const target = args[0] ?? "~";
    if (target === "~" || target === "/") {
      setCwd("~");
      return [{ type: "dim", text: `  → ~/` }];
    }
    if (target === "projects" || target === "~/projects") {
      setCwd("~/projects");
      return [{ type: "dim", text: `  → ~/projects/` }];
    }
    if (target === ".." && cwd === "~/projects") {
      setCwd("~");
      return [{ type: "dim", text: `  → ~/` }];
    }
    return [{ type: "error", text: `  cd: ${target}: No such directory` }];
  },

  cat: (args) => {
    const file = (args[0] ?? "").replace(".txt", "").replace(".pdf", "").toLowerCase();

    if (file === "about") return [
      { type: "yellow", text: "about.txt" },
      { type: "blank", text: "" },
      { type: "output", text: "  I've worked across startups and established companies — from" },
      { type: "output", text: "  architecting e-learning platforms and real-time collaboration" },
      { type: "output", text: "  tools to modernizing enterprise-scale tax systems." },
      { type: "blank", text: "" },
      { type: "output", text: "  I care deeply about clean architecture, type safety, and" },
      { type: "output", text: "  shipping things that actually work at scale." },
      { type: "blank", text: "" },
      { type: "green", text: "  Values:" },
      { type: "dim", text: "  • Performance-obsessed — TTI, bundle size, render cost" },
      { type: "dim", text: "  • Architecture-first — Feature-Sliced Design, Atomic Design" },
      { type: "dim", text: "  • Remote-first, async-friendly, always over-communicating" },
    ];

    if (file === "resume") return [
      { type: "yellow", text: "resume.pdf" },
      { type: "blank", text: "" },
      { type: "green", text: "  True North  ·  Software Engineer  ·  Aug 2024 – Present" },
      { type: "dim", text: "  ▸ Modernized enterprise tax fraud detection platform with TypeScript" },
      { type: "dim", text: "    reducing production defects by ~30%" },
      { type: "dim", text: "  ▸ 40% faster API response times via strategic server-side caching" },
      { type: "dim", text: "  ▸ Lead FE Developer for government tax & pension systems" },
      { type: "dim", text: "  ▸ Architected FSD + Atomic Design across multiple applications" },
      { type: "dim", text: "  Stack: React · TypeScript · Vue · GraphQL · Storybook" },
      { type: "blank", text: "" },
      { type: "green", text: "  Valere Margins  ·  Software Engineer  ·  Feb 2023 – Sep 2024" },
      { type: "dim", text: "  ▸ Built corporate travel booking platform from scratch" },
      { type: "dim", text: "  ▸ Real-time collaborative productivity suite with WebSocket live chat" },
      { type: "dim", text: "  ▸ Improved TTI by 25%+ via Vite bundling and code-splitting" },
      { type: "dim", text: "  Stack: Next.js · TypeScript · GraphQL · WebSockets · Material UI" },
      { type: "blank", text: "" },
      { type: "green", text: "  AsyncLabs  ·  Software Engineer  ·  Feb 2022 – Feb 2023" },
      { type: "dim", text: "  ▸ Sole front-end architect for e-learning marketplace (1000s of users)" },
      { type: "dim", text: "  ▸ Integrated payment gateways with zero critical post-launch incidents" },
      { type: "dim", text: "  ▸ Analytics & A/B testing infrastructure for conversion optimization" },
      { type: "dim", text: "  Stack: React · TypeScript · REST APIs · A/B Testing" },
      { type: "blank", text: "" },
      { type: "accent", text: "  Download full CV: jagetic.com/cv.pdf" },
    ];

    if (file === "contact") return [
      { type: "yellow", text: "contact.txt" },
      { type: "blank", text: "" },
      { type: "output", text: "  Email:      marko.jagetic3@gmail.com" },
      { type: "output", text: "  LinkedIn:   linkedin.com/in/marko-jagetić" },
      { type: "output", text: "  Location:   Zagreb, Croatia (UTC+1)" },
      { type: "output", text: "  Timezone:   Available 09:00–18:00 CET" },
      { type: "output", text: "  Response:   < 24 hours" },
      { type: "blank", text: "" },
      { type: "green", text: "  Status:     Available for contract · Remote · B2B" },
    ];

    if (file === "skills") return COMMANDS["ls skills"]([], "~", () => {}, () => {});

    return [{ type: "error", text: `  cat: ${args[0] ?? "(null)"}: No such file or directory` }];
  },

  contact: () => COMMANDS["cat"](["contact"], "~", () => {}, () => {}),

  open: (args) => {
    const target = args.join(" ").toLowerCase().replace(/\s/g, "");
    const links: Record<string, string> = {
      nomaddesk: "https://github.com",
      codebeam: "https://github.com",
      ledgr: "https://github.com",
      patchworkcms: "https://github.com",
    };
    const url = links[target];
    if (url) {
      setTimeout(() => window.open(url, "_blank"), 100);
      return [
        { type: "green", text: `  Opening ${args.join(" ")}...` },
        { type: "dim", text: `  URL: ${url}` },
      ];
    }
    return [
      { type: "error", text: `  open: ${args.join(" ") || "(null)"}: Project not found` },
      { type: "dim", text: "  Try: open NomadDesk · open Codebeam · open Ledgr · open PatchworkCMS" },
    ];
  },

  date: () => [
    { type: "output", text: `  ${new Date().toUTCString()}` },
  ],

  "uname -a": () => [
    { type: "output", text: "  Browser 1.0 jagetic.com WebKit #portfolio SMP React/19.2 TypeScript/6 x86_64 GNU/Vite" },
  ],

  uname: (args) => {
    if (args.includes("-a")) return COMMANDS["uname -a"]([], "~", () => {}, () => {});
    return [{ type: "output", text: "  Browser" }];
  },

  echo: (args) => [
    { type: "output", text: `  ${args.join(" ")}` },
  ],

  "ls projects": () => [
    { type: "yellow", text: "~/projects/" },
    { type: "blank", text: "" },
    { type: "accent", text: "  NomadDesk      Remote work hub — co-working spaces & live availability" },
    { type: "accent", text: "  Codebeam       Collaborative live coding with AI-powered code review" },
    { type: "accent", text: "  Ledgr          Personal finance dashboard with AI spending insights" },
    { type: "accent", text: "  PatchworkCMS   Headless CMS with visual drag-and-drop page builder" },
    { type: "blank", text: "" },
    { type: "dim", text: "  Type 'open <name>' to open a project" },
  ],

  "ls skills": () => [
    { type: "yellow", text: "skills.txt" },
    { type: "blank", text: "" },
    { type: "green", text: "  Frontend" },
    { type: "dim", text: "    React  Next.js  Vue 3  TypeScript  JavaScript  Tailwind CSS  Material UI  D3.js" },
    { type: "blank", text: "" },
    { type: "green", text: "  Backend" },
    { type: "dim", text: "    Node.js  NestJS  REST APIs  GraphQL  WebSockets  JWT / OAuth" },
    { type: "blank", text: "" },
    { type: "green", text: "  Database" },
    { type: "dim", text: "    PostgreSQL  MongoDB  TypeORM  Redis" },
    { type: "blank", text: "" },
    { type: "green", text: "  Tooling" },
    { type: "dim", text: "    Vite  Webpack  Docker  Git  Storybook  Figma" },
    { type: "blank", text: "" },
    { type: "green", text: "  Architecture" },
    { type: "dim", text: "    Feature-Sliced Design  Atomic Design  DDD  A/B Testing" },
  ],

  clear: () => [],
  cls: () => [],

  exit: (_args, _cwd, _setCwd, navigate) => {
    setTimeout(navigate, 100);
    return [{ type: "dim", text: "  Returning to portfolio..." }];
  },

  back: (_args, _cwd, _setCwd, navigate) => {
    setTimeout(navigate, 100);
    return [{ type: "dim", text: "  Returning to portfolio..." }];
  },
};

const TOP_LEVEL_COMMANDS = [
  "back", "cat", "cd", "clear", "cls", "contact", "date",
  "echo", "exit", "help", "history", "ls", "open", "pwd",
  "uname", "whoami",
];

const ARG_COMPLETIONS: Record<string, string[]> = {
  cat:  ["about", "contact", "resume", "skills"],
  cd:   ["..", "projects", "~"],
  ls:   ["projects", "skills"],
  open: ["Codebeam", "Ledgr", "NomadDesk", "PatchworkCMS"],
  uname: ["-a"],
};

function getCommonPrefix(strs: string[]): string {
  if (!strs.length) return "";
  let prefix = strs[0];
  for (const str of strs.slice(1)) {
    while (!str.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return "";
    }
  }
  return prefix;
}

function parseLine(input: string): [string, string[]] {
  const parts = input.trim().split(/\s+/);
  const cmd = parts[0]?.toLowerCase() ?? "";
  const args = parts.slice(1);

  const compound = `${cmd} ${args[0] ?? ""}`.trim().toLowerCase();
  if (compound in COMMANDS) return [compound, args.slice(1)];
  if (`${cmd} ${args.join(" ")}`.trim().toLowerCase() === "uname -a") return ["uname -a", []];

  return [cmd, args];
}

export default function CliPage() {
  const [lines, setLines] = useState<Line[]>(WELCOME_LINES);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [tabHint, setTabHint] = useState<string[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback(() => {
    window.location.hash = "/";
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const runCommand = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const promptLine: Line = {
      type: "prompt",
      text: `${PROMPT_USER}@${PROMPT_HOST}:${cwd}$ ${trimmed}`,
    };

    const [cmd, args] = parseLine(trimmed);

    if (cmd === "history") {
      const histLines: Line[] = [
        { type: "yellow", text: "Command history:" },
        { type: "blank", text: "" },
        ...cmdHistory.map((c, i) => ({ type: "dim" as LineType, text: `  ${i + 1}  ${c}` })),
      ];
      setCmdHistory((h) => [...h, trimmed]);
      setLines((l) => [...l, promptLine, ...histLines]);
      return;
    }

    if (cmd === "clear" || cmd === "cls") {
      setCmdHistory((h) => [...h, trimmed]);
      setLines([]);
      return;
    }

    const handler = COMMANDS[cmd];
    if (!handler) {
      setCmdHistory((h) => [...h, trimmed]);
      setLines((l) => [
        ...l,
        promptLine,
        { type: "error", text: `  command not found: ${cmd}` },
        { type: "dim", text: "  Type 'help' for available commands" },
      ]);
      return;
    }

    const output = handler(args, cwd, setCwd, navigate);
    setCmdHistory((h) => [...h, trimmed]);
    setLines((l) => [...l, promptLine, ...output]);
  }, [cwd, cmdHistory, navigate]);

  const handleTab = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const parts = input.split(/\s+/);

    if (parts.length === 1) {
      const prefix = parts[0].toLowerCase();
      if (!prefix) {
        setTabHint(TOP_LEVEL_COMMANDS);
        return;
      }
      const matches = TOP_LEVEL_COMMANDS.filter((c) => c.startsWith(prefix));
      if (!matches.length) return;
      setTabHint(null);
      if (matches.length === 1) {
        setInput(matches[0] + " ");
      } else {
        const common = getCommonPrefix(matches);
        if (common.length > prefix.length) {
          setInput(common);
        } else {
          setTabHint(matches);
        }
      }
    } else {
      const cmd = parts[0].toLowerCase();
      const argPrefix = parts[parts.length - 1].toLowerCase();
      const completions = ARG_COMPLETIONS[cmd] ?? [];
      const matches = completions.filter((c) => c.toLowerCase().startsWith(argPrefix));
      if (!matches.length) return;
      const base = parts.slice(0, -1).join(" ");
      setTabHint(null);
      if (matches.length === 1) {
        setInput(base + " " + matches[0] + " ");
      } else {
        const common = getCommonPrefix(matches.map((m) => m.toLowerCase()));
        if (common.length > argPrefix.length) {
          setInput(base + " " + common);
        } else {
          setTabHint(matches);
        }
      }
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      handleTab(e);
      return;
    }
    setTabHint(null);
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
      setHistoryIdx(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(idx);
      setInput(cmdHistory[idx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const idx = historyIdx + 1;
      if (idx >= cmdHistory.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(idx);
        setInput(cmdHistory[idx]);
      }
    } else if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      setLines((l) => [...l, { type: "prompt", text: `${PROMPT_USER}@${PROMPT_HOST}:${cwd}$ ${input}^C` }]);
      setInput("");
      setHistoryIdx(-1);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div className={styles.page} onClick={() => inputRef.current?.focus()}>
      <Cursor />
      <ParticleBackground />
      <div className={styles.window}>
        <div className={styles.titleBar}>
          <div className={styles.dots}>
            <a href="#/" className={styles.dot} style={{ background: "#ff5f57" }} title="Close — return to portfolio" />
            <span className={styles.dot} style={{ background: "#ffbd2e" }} />
            <span className={styles.dot} style={{ background: "#28c840" }} />
          </div>
          <span className={styles.titleText}>visitor@jagetic.com — portfolio-cli</span>
          <a href="#/" className={styles.exitBtn}>← Back to portfolio</a>
        </div>

        <div className={styles.terminal}>
          {lines.map((line, i) => (
            <div key={i} className={`${styles.line} ${styles[line.type]}`}>
              {line.type === "blank" ? " " : line.text}
            </div>
          ))}

          {tabHint && (
            <div className={styles.tabHint}>
              {tabHint.map((m) => (
                <span key={m} className={styles.tabHintItem}>{m}</span>
              ))}
            </div>
          )}

          <div className={styles.inputRow}>
            <span className={styles.inputPrompt}>
              <span className={styles.promptUser}>{PROMPT_USER}</span>
              <span className={styles.promptAt}>@</span>
              <span className={styles.promptHost}>{PROMPT_HOST}</span>
              <span className={styles.promptColon}>:</span>
              <span className={styles.promptCwd}>{cwd}</span>
              <span className={styles.promptDollar}>$</span>
            </span>
            <input
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
