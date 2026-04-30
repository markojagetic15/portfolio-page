import { useReveal } from "../../../shared/lib/hooks/useReveal";
import { projects } from "../../../entities/project";
import styles from "./Projects.module.css";

const ExternalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const onTiltMove = (e: React.MouseEvent<HTMLElement>) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rx = ((y - rect.height / 2) / rect.height) * -10;
  const ry = ((x - rect.width / 2) / rect.width) * 10;
  card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(12px)`;
  card.style.transition = "transform 0.05s linear";
};

const onTiltLeave = (e: React.MouseEvent<HTMLElement>) => {
  const card = e.currentTarget;
  card.style.transform = "";
  card.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
};

export default function Projects() {
  const headerRef = useReveal();

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.header} reveal`} ref={headerRef}>
          <span className={styles.sectionLabel}>Work</span>
          <h2 className={styles.sectionTitle}>Projects</h2>
          <p className={styles.sectionSub}>A selection of things I've built.</p>
        </div>

        <div className={styles.grid}>
          {projects.map((project) => (
            <article
              key={project.title}
              className={styles.card}
              onMouseMove={onTiltMove}
              onMouseLeave={onTiltLeave}
            >
              {project.wip && (
                <span className={styles.wipBadge}>Work in Progress</span>
              )}
              {project.image ? (
                <div className={styles.cardImage}>
                  <img src={project.image} alt={`${project.title} preview`} />
                </div>
              ) : (
                <div className={styles.cardImagePlaceholder} style={{ background: project.gradient }} />
              )}
              <div className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>

                  <div className={styles.cardLinks}>
                    {project.private ? (
                      <span
                        className={styles.privateLink}
                        data-tooltip="Private — in development or restricted access"
                        aria-label="Private project"
                      >
                        <LockIcon />
                      </span>
                    ) : (
                      <a
                        href={project.link}
                        className={styles.iconLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live demo"
                      >
                        <ExternalIcon />
                      </a>
                    )}
                  </div>
                </div>

                <p className={styles.cardDesc}>{project.description}</p>

                <div className={styles.cardTech}>
                  {project.tech.map((t) => (
                    <span key={t} className={styles.techTag}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
