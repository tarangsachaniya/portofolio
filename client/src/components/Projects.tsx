import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { extracurricularData, projectsData, type Project } from "@/lib/data";

const TECH_SLUGS: Record<string, string> = {
  "Next.js": "nextdotjs",
  React: "react",
  Python: "python",
  TypeScript: "typescript",
  "Node.js": "nodedotjs",
  MongoDB: "mongodb",
  Express: "express",
  Laravel: "laravel",
  PostgreSQL: "postgresql",
};

const CATEGORY_STYLE: Record<string, { bg: string; badge: string; dot: string }> = {
  "Full Stack": {
    bg: "from-blue-500/20 via-indigo-500/15 to-violet-500/20",
    badge: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/40",
    dot: "bg-blue-500",
  },
  IoT: {
    bg: "from-emerald-500/20 via-teal-500/15 to-cyan-500/20",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/40",
    dot: "bg-emerald-500",
  },
  "Data Science": {
    bg: "from-violet-500/20 via-purple-500/15 to-fuchsia-500/20",
    badge: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-900/40",
    dot: "bg-violet-500",
  },
  "E-Commerce": {
    bg: "from-orange-500/20 via-amber-500/15 to-yellow-500/20",
    badge: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-900/40",
    dot: "bg-orange-500",
  },
};

const DEFAULT_STYLE = CATEGORY_STYLE["Full Stack"];

function primarySlug(tech: string[]): string | null {
  for (const t of tech) {
    const slug = TECH_SLUGS[t];
    if (slug) return slug;
  }
  return null;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const style = CATEGORY_STYLE[project.category] ?? DEFAULT_STYLE;
  const slug = primarySlug(project.tech);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * 5, ry: px * 5 });
  };

  const reset = () => setTilt({ rx: 0, ry: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group [perspective:1000px]"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="tilt-card flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm group-hover:-translate-y-1 group-hover:border-accent-indigo/40 group-hover:shadow-xl group-hover:shadow-accent-indigo/8 dark:bg-card"
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        {/* Card header with gradient */}
        <div className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${style.bg} overflow-hidden`}>
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />

          {slug ? (
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/60 bg-white/80 shadow-lg backdrop-blur-sm">
              <img
                src={`https://cdn.simpleicons.org/${slug}`}
                alt=""
                aria-hidden
                loading="lazy"
                className="h-8 w-8"
              />
            </div>
          ) : (
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/60 bg-white/80 shadow-lg">
              <span className="font-display text-2xl font-bold text-foreground">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Category badge */}
          <span className={`absolute right-3 top-3 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${style.badge}`}>
            {project.category}
          </span>

          {/* Colored dot indicator */}
          <div className={`absolute left-3 top-3 h-2 w-2 rounded-full ${style.dot}`} />
        </div>

        {/* Card body */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-[15px] font-bold leading-snug text-foreground">
            {project.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                className="rounded-lg border border-border bg-surface px-2.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span className="rounded-lg border border-border bg-surface px-2.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">
                +{project.tech.length - 5}
              </span>
            )}
          </div>

          {(project.github || project.live) && (
            <div className="mt-4 flex items-center gap-4 border-t border-border pt-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-accent-indigo"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-accent-indigo"
                >
                  <Github className="h-3.5 w-3.5" /> Source Code
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-14"
        >
          <p className="mb-2 font-mono text-sm font-medium uppercase tracking-widest text-accent-indigo">
            What I've Built
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-5xl">
            Selected Work
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-accent-indigo to-accent-cyan" />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {projectsData.map((project, i) => (
            <ProjectCard key={project.id ?? project.title} project={project} index={i} />
          ))}
        </div>

        {/* ── Co-Curricular Activities ── */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <p className="mb-2 font-mono text-sm font-medium uppercase tracking-widest text-accent-indigo">
              Beyond Code
            </p>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-4xl">
              Co-Curricular Activities
            </h2>
            <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-accent-indigo to-accent-cyan" />
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {extracurricularData.map((activity, i) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent-indigo/40 hover:shadow-md dark:bg-card"
              >
                <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-accent-indigo">
                  {activity.org}
                </div>
                <h3 className="mb-2 text-sm font-bold text-foreground">{activity.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {activity.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
