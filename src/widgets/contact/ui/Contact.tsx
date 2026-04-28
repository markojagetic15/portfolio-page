import { useState } from "react";
import MagneticButton from "../../../shared/ui/magnetic-button/MagneticButton";
import { useReveal } from "../../../shared/lib/hooks/useReveal";
import styles from "./Contact.module.css";

type Status = "idle" | "sending" | "sent";

export default function Contact() {
  const cardRef = useReveal(0.1);
  const formRef = useReveal(0.1);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const { name, email, message } = form;
    const mailto = `mailto:marko.jagetic3@gmail.com?subject=${encodeURIComponent(`Portfolio contact from ${name}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.open(mailto);
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    }, 600);
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Info card */}
          <div className={`${styles.card} reveal`} ref={cardRef}>
            <div className={styles.glow} />
            <div className={styles.inner}>
              <span className={styles.sectionLabel}>Let's talk</span>
              <h2 className={styles.title}>Open to new opportunities</h2>
              <p className={styles.body}>
                I'm currently looking for remote contract roles (B2B / contractor) with
                US-based or global companies. If you're building something interesting,
                I'd love to hear about it.
              </p>
              <div className={styles.actions}>
                <MagneticButton>
                  <a href="mailto:marko.jagetic3@gmail.com" className={styles.btnPrimary}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    Say hello
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a href="https://www.linkedin.com/in/marko-jagetić" target="_blank" rel="noreferrer" className={styles.btnGhost}>
                    LinkedIn
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a href="/cv.pdf" download className={styles.btnGhost}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download CV
                  </a>
                </MagneticButton>
              </div>

              <div className={styles.divider} />

              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Location</span>
                  <span className={styles.metaValue}>Zagreb, Croatia (UTC+1)</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Availability</span>
                  <span className={styles.metaValue}>
                    <span className={styles.dot} /> Immediately available
                  </span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Work type</span>
                  <span className={styles.metaValue}>Remote, B2B contract</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className={`${styles.formCard} reveal`} ref={formRef}>
            <div className={styles.formInner}>
              <span className={styles.sectionLabel}>Send a message</span>
              <h3 className={styles.formTitle}>Get in touch</h3>

              {status === "sent" ? (
                <div className={styles.successState}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                  <p>Your email client should have opened — hit send and I'll get back to you within 24 hours.</p>
                  <button className={styles.resetBtn} onClick={() => setStatus("idle")}>
                    Send another
                  </button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label className={styles.label}>Name</label>
                      <input
                        name="name"
                        className={styles.input}
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Email</label>
                      <input
                        name="email"
                        type="email"
                        className={styles.input}
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Message</label>
                    <textarea
                      name="message"
                      className={styles.textarea}
                      placeholder="Tell me about the project..."
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className={styles.submitBtn} disabled={status === "sending"}>
                    {status === "sending" ? "Opening email client..." : "Send message"}
                    {status !== "sending" && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 2L11 13"/>
                        <path d="M22 2L15 22 11 13 2 9l20-7z"/>
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
