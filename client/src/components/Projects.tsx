import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { extracurricularData, projectsData, type Project } from "@/lib/data";

/** simple-icons slugs for the primary tech shown on each card header. */
const TECH_SLUGS: Record<string, string> = {
  "Next.js": "nextdotjs",
  React: "react",
  Python: "python",
  IoT: "",
  TypeScript: "typescript",
  "Node.js": "nodedotjs",
  MongoDB: "mongodb",
  Express: "express",
};

/** Gradient + icon-color per project category. */
const CATEGORY_STYLE: Record<string, { gradient: string; badge: string }> = {
  "Full Stack": {
    gradient: "from-accent-indigo/30 to-accent-cyan/30",
    badge: "border-accent-indigo/30 bg-accent-indigo/10 text-accent-indigo",
  },
  IoT: {
    gradient: "from-accent-cyan/30 to-accent-indigo/20",
    badge: "border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan",
  },
  "Data Science": {
    gradient: "from-accent-indigo/20 to-accent-cyan/30",
    badge: "border-accent-indigo/30 bg-accent-indigo/10 text-accent-indigo",
  },
  "E-Commerce": {
    gradient: "from-amber-500/30 via-orange-500/20 to-pink-500/30",
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-300",
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

function ProjectCard({ project }: { project: Project }) {
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
    setTilt({ rx: -py * 6, ry: px * 6 });
  };

  const reset = () => setTilt({ rx: 0, ry: 0 });

  return (
    <div className="group [perspective:1000px]">
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="tilt-card flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/60 group-hover:-translate-y-2 group-hover:border-accent-indigo/50 group-hover:shadow-[0_18px_40px_-18px_hsl(var(--accent-indigo)/0.6)]"
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        {/* Gradient header with tech icon overlay */}
        <div
          className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${style.gradient}`}
        >
          <div className="absolute inset-0 bg-grid-pattern text-foreground opacity-40" />
          {slug ? (
            <img
              src={`https://cdn.simpleicons.org/${slug}/ffffff`}
              alt=""
              aria-hidden
              loading="lazy"
              className="relative h-14 w-14 opacity-80 drop-shadow-lg"
            />
          ) : (
            <span className="relative font-display text-3xl font-bold text-white/80">
              {project.title.charAt(0)}
            </span>
          )}
          {/* Category badge */}
          <span
            className={`absolute right-3 top-3 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${style.badge}`}
          >
            {project.category}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-base font-bold leading-snug text-foreground">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-md border border-border bg-foreground/5 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          {(project.github || project.live) && (
            <div className="mt-4 flex items-center gap-4 border-t border-border pt-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-accent-cyan"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-accent-indigo"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-[100px]">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="mb-14">
          <h2 className="font-display text-3xl font-bold md:text-5xl">Selected Work</h2>
          <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-accent-indigo to-accent-cyan" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project) => (
            <ProjectCard key={project.id ?? project.title} project={project} />
          ))}
        </div>

        {/* Co-Curricular Activities */}
        <div className="mt-24">
          <h2 className="font-display text-3xl font-bold md:text-5xl">Co-Curricular Activities</h2>
          <div className="mb-12 mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-accent-indigo to-accent-cyan" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {extracurricularData.map((activity) => (
              <div
                key={activity.title}
                className="rounded-2xl border border-border bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/40"
              >
                <h3 className="mb-2 text-base font-bold text-foreground">{activity.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
