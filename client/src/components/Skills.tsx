import { useState } from "react";
import { Code2, Database, Server, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { skillsData } from "@/lib/data";
import { useInView } from "@/hooks/useInView";

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
  border: string;
  iconColor: string;
  badgeHover: string;
}

const categories: Category[] = [
  {
    key: "frontend",
    title: "Frontend",
    icon: Code2,
    border: "hover:border-blue-300 hover:shadow-blue-100/80",
    iconColor: "text-blue-600",
    badgeHover: "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200",
  },
  {
    key: "backend",
    title: "Backend",
    icon: Server,
    border: "hover:border-violet-300 hover:shadow-violet-100/80",
    iconColor: "text-violet-600",
    badgeHover: "hover:bg-violet-50 hover:text-violet-700 hover:border-violet-200",
  },
  {
    key: "database",
    title: "Database",
    icon: Database,
    border: "hover:border-emerald-300 hover:shadow-emerald-100/80",
    iconColor: "text-emerald-600",
    badgeHover: "hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200",
  },
  {
    key: "tools",
    title: "DevOps & Tools",
    icon: Wrench,
    border: "hover:border-orange-300 hover:shadow-orange-100/80",
    iconColor: "text-orange-600",
    badgeHover: "hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200",
  },
];

function SkillBadge({ label, badgeHover }: { label: string; badgeHover: string }) {
  const [iconOk, setIconOk] = useState(true);
  const slug = ICON_SLUGS[label];

  return (
    <span
      className={`inline-flex cursor-default items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-all duration-200 dark:bg-surface ${badgeHover}`}
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
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-40" />
      )}
      {label}
    </span>
  );
}

export default function Skills() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="skills" className="relative border-y border-border bg-background py-24 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 font-mono text-sm font-medium uppercase tracking-widest text-accent-indigo">
            My Stack
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-5xl">
            Technical Arsenal
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-accent-indigo to-accent-cyan" />
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-muted-foreground">
            Tools and technologies I've mastered to bring ideas to life.
          </p>
        </motion.div>

        <div ref={ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, ci) => {
            const Icon = cat.icon;
            const skills = skillsData[cat.key];
            return (
              <div
                key={cat.key}
                className={`rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-lg dark:bg-card ${cat.border} ${
                  inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${ci * 80}ms` }}
              >
                <div className="mb-5 flex items-center gap-2.5">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-surface ${cat.iconColor}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                    {cat.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <SkillBadge key={skill} label={skill} badgeHover={cat.badgeHover} />
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
