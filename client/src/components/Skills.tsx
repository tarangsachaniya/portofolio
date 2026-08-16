import { m } from "framer-motion";
import SectionHeader from "@/components/motion/SectionHeader";
import TechIcon from "@/components/TechIcon";
import { techCategories, techStack } from "@/lib/data";
import { fadeUp, popIn, revealGroup, stagger } from "@/lib/motion";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeader
          eyebrow="stack --list"
          title="What I work with"
          description="The tools I reach for day to day, grouped by where they sit."
        />

        <m.div
          {...revealGroup(0.09)}
          className="mt-12 grid gap-5 sm:grid-cols-2"
        >
          {techCategories.map((category) => {
            const items = techStack.filter((tech) => tech.category === category);
            return (
              <m.div
                key={category}
                variants={fadeUp}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/40 sm:p-6"
              >
                <div className="mb-4 flex items-baseline justify-between">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    {category}
                  </h3>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {String(items.length).padStart(2, "0")}
                  </span>
                </div>

                {/*
                 * ~10 items per card: `each` stays small so the last badge
                 * doesn't land a second and a half after the first.
                 */}
                <m.ul
                  variants={stagger(0.025)}
                  className="flex flex-wrap gap-2"
                >
                  {items.map((tech) => (
                    <m.li
                      key={tech.name}
                      variants={popIn}
                      className="group flex items-center gap-2 rounded-md border border-border bg-elevated px-2.5 py-1.5 transition-colors hover:border-accent/40"
                    >
                      <TechIcon
                        name={tech.name}
                        slug={tech.slug}
                        size={15}
                        className="opacity-70 grayscale transition duration-200 group-hover:opacity-100 group-hover:grayscale-0"
                      />
                      <span className="font-mono text-[11px] text-muted-foreground transition-colors group-hover:text-foreground">
                        {tech.name}
                      </span>
                    </m.li>
                  ))}
                </m.ul>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
