import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Mail, MapPin, Github } from "lucide-react";
import profileImage from "@/assets/images/profile.jpeg";
import { experienceData, educationData } from "@/lib/data";

const infoItems = [
  { icon: MapPin, label: "Location", value: "Ahmedabad, India" },
  { icon: Briefcase, label: "Experience", value: "2.5+ Years" },
  { icon: Mail, label: "Email", value: "tarangsachaniya8@gmail.com" },
  { icon: Github, label: "GitHub", value: "@tarangsachaniya" },
];

const HIGHLIGHTS = [
  "MERN stack",
  "Next.js",
  "Redux",
  "Zustand",
  "Laravel",
  "PHP",
  "WordPress",
  "Python",
];

function highlight(text: string) {
  const pattern = new RegExp(
    `(${HIGHLIGHTS.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "g"
  );
  return text.split(pattern).map((part, i) =>
    HIGHLIGHTS.includes(part) ? (
      <span key={i} className="font-semibold text-foreground">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function About() {
  const edu = educationData[0];

  return (
    <section id="about" className="relative bg-surface py-24 md:py-28">
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
            Who I Am
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-5xl">
            About Me
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-accent-indigo to-accent-cyan" />
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-[280px_1fr]">

          {/* ── Profile image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mx-auto w-full max-w-[280px]"
          >
            <div className="group relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent-indigo to-accent-cyan opacity-40 blur transition-opacity group-hover:opacity-70" />
              <div className="relative overflow-hidden rounded-2xl border border-white shadow-lg">
                <img
                  src={profileImage}
                  alt="Tarang Sachaniya"
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Quick info chips */}
            <div className="mt-5 grid grid-cols-2 gap-2">
              {infoItems.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border bg-white p-3 shadow-sm transition-shadow hover:shadow-md dark:bg-card"
                >
                  <Icon className="mb-1.5 h-3.5 w-3.5 text-accent-indigo" />
                  <div className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {label}
                  </div>
                  <div className="mt-0.5 truncate text-[10px] font-semibold text-foreground" title={value}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Bio + Experience + Education ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {highlight(
                "I am Tarang Sachaniya, a Computer Science graduate (2025) with 2+ years of professional experience as a Backend Developer at Prime Apps Infotech. I specialize in the MERN stack, particularly Next.js, Redux, and Zustand, alongside strong expertise in Laravel, PHP, and WordPress."
              )}
            </p>
            <p className="mt-3.5 text-[15px] leading-relaxed text-muted-foreground">
              {highlight(
                "I also work with Python for machine learning and image processing. Passionate about clean, efficient code — I focus on performance optimization, API integrations, and delivering production-ready solutions."
              )}
            </p>

            {/* ── Experience Timeline ── */}
            <div className="mt-9">
              <h3 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                <Briefcase className="h-4 w-4 text-accent-indigo" />
                Professional Experience
              </h3>

              <div className="relative space-y-4 pl-6">
                {/* Vertical connector line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-indigo to-accent-cyan/30" />

                {experienceData.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute -left-[22px] top-4 h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm ${
                        i === 0
                          ? "bg-accent-indigo"
                          : "bg-accent-cyan"
                      }`}
                    />

                    <div className="rounded-xl border border-border bg-white p-5 shadow-sm transition-all hover:border-accent-indigo/40 hover:shadow-md dark:bg-card">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-foreground">{exp.role}</h4>
                          <div className="mt-0.5 text-sm font-medium text-accent-indigo">
                            {exp.company}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              exp.type === "Full-time"
                                ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
                                : "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400"
                            }`}
                          >
                            {exp.type}
                          </span>
                          <span className="font-mono text-[11px] text-muted-foreground">
                            {exp.period}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                        {exp.description}
                      </p>
                      <ul className="mt-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
                        {exp.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <span className="h-1 w-1 shrink-0 rounded-full bg-accent-indigo" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Education ── */}
            <div className="mt-8">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                <GraduationCap className="h-4 w-4 text-accent-cyan" />
                Education
              </h3>
              <div className="rounded-xl border border-border bg-white p-5 shadow-sm transition-all hover:border-accent-cyan/40 hover:shadow-md dark:bg-card">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                    <div className="mt-0.5 text-sm font-medium text-accent-cyan">{edu.school}</div>
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground">{edu.period}</span>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {edu.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
