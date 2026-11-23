import { useState } from "react";
import { EMAIL, LINKEDIN } from "../../../shared/config";
import styles from "./Contact.module.css";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const validate = (f: Fields): Errors => {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Write your name so I know who is writing.";
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = "Write an email address I can reply to.";
  if (f.message.trim().length < 2) e.message = "Write a message, even a short one.";
  return e;
};

export default function Contact() {
  const [form, setForm] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);
  const [copied, setCopied] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof Fields]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`f-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    const subject = encodeURIComponent(`Hello from ${form.name.trim()}`);
    const body = encodeURIComponent(`${form.message.trim()}\n\n${form.name.trim()} (${form.email.trim()})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setOpened(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const field = (name: keyof Fields, label: string, type: "text" | "email" | "area", autoComplete: string) => {
    const err = errors[name];
    const common = {
      id: `f-${name}`,
      name,
      value: form[name],
      onChange,
      autoComplete,
      "aria-invalid": err ? true : undefined,
      "aria-describedby": err ? `e-${name}` : undefined,
      className: styles.input,
    };
    return (
      <div className={styles.field}>
        <label htmlFor={`f-${name}`} className={styles.label}>{label}</label>
        {type === "area" ? <textarea rows={5} {...common} /> : <input type={type} {...common} />}
        {err && <p id={`e-${name}`} className={styles.error}>{err}</p>}
      </div>
    );
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="sectionHead">
          <h2 id="contact-title">Contact</h2>
          <p>Email reaches me fastest. The form fills in an email for you to send from your own mail app.</p>
        </div>

        <div className={styles.grid}>
          <div className={`panel ${styles.card}`}>
            <img className={styles.portrait} src="/work/portrait.webp" alt="Marko Jagetić" width={480} height={480} decoding="async" />
            <dl className={styles.info}>
              <div className={styles.row}>
                <dt>Email</dt>
                <dd className={styles.emailRow}>
                  <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  <button type="button" className={`brick white ${styles.copy}`} onClick={copy} aria-live="polite">
                    {copied ? "Copied" : "Copy"}
                  </button>
                </dd>
              </div>
              <div className={styles.row}>
                <dt>LinkedIn</dt>
                <dd><a className="link" href={LINKEDIN} target="_blank" rel="noreferrer">Marko Jagetić</a></dd>
              </div>
              <div className={styles.row}>
                <dt>Location</dt>
                <dd>Zagreb, Croatia (UTC+1)</dd>
              </div>
            </dl>
          </div>

          <div className={`panel ${styles.formCard}`}>
            {opened ? (
              <div className={styles.sent} role="status">
                <h3>Your email is ready in your mail app</h3>
                <p>Press send there and it reaches me. If nothing opened, write to {EMAIL} directly.</p>
                <button type="button" className="brick white btn" onClick={() => { setOpened(false); setForm({ name: "", email: "", message: "" }); }}>
                  Write another
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit} noValidate>
                <div className={styles.pair}>
                  {field("name", "Name", "text", "name")}
                  {field("email", "Your email", "email", "email")}
                </div>
                {field("message", "Message", "area", "off")}
                <button type="submit" className={`brick btn ${styles.submit}`}>Send email</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
