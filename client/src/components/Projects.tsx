import { m } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import SectionHeader from "@/components/motion/SectionHeader";
import BrowserFrame from "@/components/motion/BrowserFrame";
import { useTilt } from "@/hooks/useTilt";
import { projectsData, extracurricularData, type Project } from "@/lib/data";
import { fadeUp, revealGroup, staggerReverse, viewport } from "@/lib/motion";

function ProjectCard({ project }: { project: Project }) {
  const { ref, style, glare, handlers } = useTilt<HTMLDivElement>({ max: 6 });

  return (
    /*
     * Two elements, deliberately: the outer one owns the stagger variant, the
     * inner one owns the tilt. They cannot be merged — useTilt binds `y` as a
     * MotionValue on `style`, and a style MotionValue outranks a variant
     * animating the same property, so fadeUp's `y` would never run.
     */
    <m.div variants={fadeUp} className="h-full">
    <m.article
      ref={ref}
      style={style}
      {...handlers}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-5 transition-colors duration-300 hover:border-accent-amber/40"
    >
      <m.div
        aria-hidden
        style={{ opacity: glare.opacity }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <m.div
          style={{ left: glare.x, top: glare.y }}
          className="absolute h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background: `radial-gradient(circle, hsl(${project.hue} 71% 50%) 0%, transparent 65%)`,
            }}
          />
        </m.div>
      </m.div>

      <BrowserFrame
        domain={project.domain ?? project.category.toLowerCase()}
        src={project.image ? `/projects/${project.image}` : undefined}
        alt={`${project.title} homepage`}
        hue={project.hue}
        label={project.title}
        className="mb-4"
      />

      <div className="flex items-center gap-2">
        <span
          className="rounded border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em]"
          style={{
            color: `hsl(${project.hue} 65% 62%)`,
            borderColor: `hsl(${project.hue} 60% 50% / 0.3)`,
            backgroundColor: `hsl(${project.hue} 60% 50% / 0.08)`,
          }}
        >
          {project.category}
        </span>
        {project.year && (
          <span className="font-mono text-[10px] text-muted-foreground">
            {project.year}
          </span>
        )}
      </div>

      <h3 className="mt-2.5 font-display text-base font-bold tracking-tight text-foreground">
        {project.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="rounded border border-border bg-elevated px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 5 && (
          <span className="rounded border border-border bg-elevated px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
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
              className="flex items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground transition-colors hover:text-accent-amber"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground transition-colors hover:text-accent-amber"
            >
              <Github className="h-3.5 w-3.5" /> Source
            </a>
          )}
        </div>
      )}
    </m.article>
    </m.div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative overflow-hidden py-24 md:py-28">
      {/* ambient amber wash — a color, not a panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,hsl(var(--accent-amber)/0.06),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <SectionHeader
          eyebrow="selected work"
          title="Things I've built"
          description="Client and personal projects outside the Priinteve portfolio."
          accent="amber"
        />

        <m.div
          variants={staggerReverse(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-12 grid gap-6 sm:grid-cols-2"
        >
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </m.div>

        {/* ── beyond code ── */}
        <div className="mt-24">
          <SectionHeader
            eyebrow="beyond code"
            title="Co-curricular"
            description="Leadership and community work alongside engineering."
            accent="amber"
          />

          <m.div
            {...revealGroup(0.07)}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {extracurricularData.map((activity) => (
              <m.div
                key={`${activity.org}-${activity.title}`}
                variants={fadeUp}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent-amber/40"
              >
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-amber">
                  {activity.org}
                </div>
                <h3 className="mt-2 text-sm font-semibold text-foreground">
                  {activity.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {activity.description}
                </p>
              </m.div>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}
