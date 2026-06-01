import { motion } from "framer-motion";
import { Briefcase, Github, GraduationCap, Mail, MapPin } from "lucide-react";
import profileImage from "@/assets/images/profile.jpeg";
import { experienceData, educationData } from "@/lib/data";

const infoItems = [
  { icon: MapPin, label: "Location", value: "Ahmedabad, India" },
  { icon: Briefcase, label: "Experience", value: "2.5+ Years" },
  { icon: Mail, label: "Email", value: "tarangsachaniya8@gmail.com" },
  { icon: Github, label: "GitHub", value: "@tarangsachaniya" },
];

// Tech words to highlight inside the bio.
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
  const pattern = new RegExp(`(${HIGHLIGHTS.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text.split(pattern).map((part, i) =>
    HIGHLIGHTS.includes(part) ? (
      <span
        key={i}
        className="font-medium text-foreground decoration-accent-indigo/50 underline-offset-4"
      >
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function About() {
  const exp = experienceData[0];
  const edu = educationData[0];

  return (
    <section id="about" className="relative py-24 md:py-[100px]">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2 className="font-display text-3xl font-bold md:text-5xl">About Me</h2>
          <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-accent-indigo to-accent-cyan" />
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-[300px_1fr]">
          {/* Avatar in glowing rounded-square frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-full max-w-[300px]"
          >
            <div className="group relative">
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-accent-indigo to-accent-cyan opacity-70 blur transition-opacity group-hover:opacity-100" />
              <div className="relative overflow-hidden rounded-3xl border border-border bg-surface">
                <img
                  src={profileImage}
                  alt="Tarang Sachaniya"
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </motion.div>

          {/* Bio + info grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-base leading-relaxed text-muted-foreground">
              {highlight(
                "I am Tarang Sachaniya, a Computer Science and Engineering graduate (2025) with two and half years of professional experience as a Backend Developer at Prime Apps Infotech. I specialize in building scalable full-stack applications with a strong command over the MERN stack, particularly Next.js, Redux, and Zustand for advanced state management. Alongside JavaScript technologies, I have solid expertise in Laravel, PHP, and WordPress."
              )}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {highlight(
                "I also work with Python for machine learning and image processing. Passionate about writing clean, efficient code — I focus on performance optimization, API integrations, and delivering production-ready solutions that solve real-world problems."
              )}
            </p>

            {/* Info grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {infoItems.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border bg-surface/60 p-4 transition-colors hover:border-accent-indigo/40"
                >
                  <Icon className="mb-2 h-4 w-4 text-accent-indigo" />
                  <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {label}
                  </div>
                  <div className="mt-0.5 truncate text-xs font-medium text-foreground" title={value}>
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* Experience + Education */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-accent-indigo/40">
                <div className="mb-3 flex items-center gap-2 text-accent-indigo">
                  <Briefcase className="h-4 w-4" />
                  <span className="font-mono text-[11px] uppercase tracking-wider">
                    {exp.period}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-foreground">{exp.role}</h4>
                <div className="text-xs font-medium text-accent-indigo">{exp.company}</div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-accent-cyan/40">
                <div className="mb-3 flex items-center gap-2 text-accent-cyan">
                  <GraduationCap className="h-4 w-4" />
                  <span className="font-mono text-[11px] uppercase tracking-wider">
                    {edu.period}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-foreground">{edu.degree}</h4>
                <div className="text-xs font-medium text-accent-cyan">{edu.school}</div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
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
