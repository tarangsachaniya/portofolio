import { m } from "framer-motion";
import { Building2, GraduationCap } from "lucide-react";
import SectionHeader from "@/components/motion/SectionHeader";
import ScrollBeam from "@/components/motion/ScrollBeam";
import { educationData, experienceData } from "@/lib/data";
import { fadeUp, slideInRight, stagger, viewportEarly } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-surface py-24 md:py-28"
    >
      {/* ambient violet wash — mirrors the amber wash on Projects */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,hsl(var(--accent-violet)/0.06),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <SectionHeader
          eyebrow="history -i"
          title="Where I've worked"
          description="From backend engineer to running the company."
          accent="violet"
        />

        <ScrollBeam
          className="mt-12 pl-8 md:pl-10"
          railClassName="left-[5px]"
          accent="violet"
        >
          <m.ol
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewportEarly}
            className="space-y-5"
          >
            {experienceData.map((exp) => (
              <m.li key={exp.id} variants={slideInRight} className="relative">
                <span
                  aria-hidden
                  className={cn(
                    "absolute -left-8 top-6 h-2.5 w-2.5 rounded-full ring-4 ring-surface md:-left-10",
                    exp.current ? "bg-accent" : "bg-border-strong",
                  )}
                />

                <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent-violet/40 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-base font-bold tracking-tight text-foreground">
                        {exp.role}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-accent-violet">
                        <Building2 className="h-3.5 w-3.5" aria-hidden />
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className={cn(
                          "rounded border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em]",
                          exp.type === "Founder"
                            ? "border-accent/30 bg-accent/10 text-accent"
                            : "border-border bg-elevated text-muted-foreground",
                        )}
                      >
                        {exp.type}
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>

                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {exp.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-violet"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </m.li>
            ))}

            {/* education shares the same rail */}
            {educationData.map((edu) => (
              <m.li key={edu.id} variants={slideInRight} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-8 top-6 h-2.5 w-2.5 rounded-full bg-border-strong ring-4 ring-surface md:-left-10"
                />
                <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent-violet/40 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-base font-bold tracking-tight text-foreground">
                        {edu.degree}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-accent-violet">
                        <GraduationCap className="h-3.5 w-3.5" aria-hidden />
                        {edu.school}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {edu.period}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {edu.description}
                  </p>
                </div>
              </m.li>
            ))}
          </m.ol>
        </ScrollBeam>
      </div>
    </section>
  );
}
