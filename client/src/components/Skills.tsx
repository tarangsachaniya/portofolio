import { useState } from "react";
import { Code2, Database, Server, Wrench } from "lucide-react";
import { skillsData } from "@/lib/data";
import { useInView } from "@/hooks/useInView";

/** Map a skill label to a simple-icons CDN slug. Unknown -> no icon (fallback). */
const ICON_SLUGS: Record<string, string> = {
  React: "react",
  "Next.js": "nextdotjs",
  TypeScript: "typescript",
  Redux: "redux",
  "Tailwind CSS": "tailwindcss",
  Bootstrap: "bootstrap",
  HTML5: "html5",
  CSS3: "css",
  "Node.js": "nodedotjs",
  "Express.js": "express",
  Laravel: "laravel",
  PHP: "php",
  Python: "python",
  MongoDB: "mongodb",
  MySQL: "mysql",
  Git: "git",
  Docker: "docker",
  Postman: "postman",
  Linux: "linux",
  WordPress: "wordpress",
  Vercel: "vercel",
  Figma: "figma",
};

interface Category {
  key: keyof typeof skillsData;
  title: string;
  icon: typeof Code2;
  /** Tailwind classes applied to the group on hover for the accent glow. */
  accent: string;
  iconColor: string;
}

const categories: Category[] = [
  {
    key: "frontend",
    title: "Frontend",
    icon: Code2,
    accent: "hover:border-accent-indigo/60 hover:shadow-[0_0_24px_-6px_hsl(var(--accent-indigo)/0.55)] hover:text-accent-indigo",
    iconColor: "text-accent-indigo",
  },
  {
    key: "backend",
    title: "Backend",
    icon: Server,
    accent: "hover:border-accent-cyan/60 hover:shadow-[0_0_24px_-6px_hsl(var(--accent-cyan)/0.55)] hover:text-accent-cyan",
    iconColor: "text-accent-cyan",
  },
  {
    key: "database",
    title: "Database",
    icon: Database,
    accent: "hover:border-emerald-400/60 hover:shadow-[0_0_24px_-6px_rgba(52,211,153,0.55)] hover:text-emerald-400",
    iconColor: "text-emerald-400",
  },
  {
    key: "tools",
    title: "DevOps & Tools",
    icon: Wrench,
    accent: "hover:border-amber-400/60 hover:shadow-[0_0_24px_-6px_rgba(251,191,36,0.55)] hover:text-amber-400",
    iconColor: "text-amber-400",
  },
];

function SkillBadge({ label, accent, delay }: { label: string; accent: string; delay: number }) {
  const [iconOk, setIconOk] = useState(true);
  const slug = ICON_SLUGS[label];

  return (
    <span
      style={{ transitionDelay: `${delay}ms` }}
      className={`group/badge inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-300 ${accent}`}
    >
      {slug && iconOk ? (
        <img
          src={`https://cdn.simpleicons.org/${slug}`}
          alt=""
          aria-hidden
          loading="lazy"
          className="h-3.5 w-3.5"
          onError={() => setIconOk(false)}
        />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />
      )}
      {label}
    </span>
  );
}

export default function Skills() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="skills" className="relative border-y border-border py-24 md:py-[100px]">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="mb-14 text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl">Technical Arsenal</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Tools and technologies I&apos;ve mastered to bring ideas to life.
          </p>
        </div>

        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, ci) => {
            const Icon = cat.icon;
            const skills = skillsData[cat.key];
            return (
              <div
                key={cat.key}
                className={`rounded-2xl border border-border bg-surface/40 p-6 transition-all duration-700 ${
                  inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${ci * 100}ms` }}
              >
                <div className="mb-5 flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${cat.iconColor}`} />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                    {cat.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, si) => (
                    <SkillBadge
                      key={skill}
                      label={skill}
                      accent={cat.accent}
                      delay={ci * 100 + si * 40}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
