import { m } from "framer-motion";
import { Github, Mail, MapPin, Rocket } from "lucide-react";
import SectionHeader from "@/components/motion/SectionHeader";
import { profile } from "@/lib/data";
import { fadeUpSm, scaleIn, slideInLeft, stagger, viewport } from "@/lib/motion";

const infoItems = [
  { icon: MapPin, label: "Based in", value: "Ahmedabad, India" },
  { icon: Rocket, label: "Currently", value: "Building Priinteve" },
  { icon: Mail, label: "Email", value: profile.email },
  { icon: Github, label: "GitHub", value: "@tarangsachaniya" },
];

/** Terms bolded inside the bio copy. */
const HIGHLIGHTS = [
  "MERN stack",
  "Next.js",
  "React",
  "Redux",
  "Zustand",
  "Laravel",
  "PHP",
  "WordPress",
  "Python",
  "Priinteve Innovations",
];

function highlight(text: string) {
  const pattern = new RegExp(
    `(${HIGHLIGHTS.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "g",
  );
  return text.split(pattern).map((part, i) =>
    HIGHLIGHTS.includes(part) ? (
      <strong key={i} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default function About() {
  return (
    <section id="about" className="relative bg-surface py-24 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
          {/* ── portrait + chips ── */}
          <m.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mx-auto w-full max-w-[320px] lg:mx-0"
          >
            <m.div variants={scaleIn} className="group relative">
              <div
                aria-hidden
                className="absolute -inset-2 rounded-xl bg-accent/15 opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative overflow-hidden rounded-xl border border-border">
                <picture>
                  <source srcSet="/img/about-560.avif" type="image/avif" />
                  <img
                    src="/img/about-560.webp"
                    alt={profile.name}
                    width={560}
                    height={560}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-cover"
                  />
                </picture>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"
                />
              </div>
            </m.div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {infoItems.map(({ icon: Icon, label, value }) => (
                <m.div
                  key={label}
                  variants={fadeUpSm}
                  className="rounded-lg border border-border bg-card p-3 transition-colors hover:border-accent/40"
                >
                  <Icon className="mb-1.5 h-3.5 w-3.5 text-accent" />
                  <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                    {label}
                  </div>
                  <div
                    className="mt-0.5 truncate text-[11px] font-medium text-foreground"
                    title={value}
                  >
                    {value}
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>

          {/* ── bio ── */}
          <div>
            <SectionHeader eyebrow="whoami" title="About me" />

            <m.div
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="mt-8 space-y-4"
            >
              <m.p
                variants={slideInLeft}
                className="text-[15px] leading-relaxed text-muted-foreground"
              >
                {highlight(
                  "I'm a Computer Science graduate (2025) who has been shipping production software since 2023. I started as a backend developer building REST APIs and optimizing databases, and I now run Priinteve Innovations — where I design, build and operate the products myself.",
                )}
              </m.p>
              <m.p
                variants={slideInLeft}
                className="text-[15px] leading-relaxed text-muted-foreground"
              >
                {highlight(
                  "My day-to-day is the MERN stack — particularly Next.js, React, Redux and Zustand — alongside Laravel, PHP and WordPress on the backend. I also use Python for machine learning and image processing work.",
                )}
              </m.p>
              <m.p
                variants={slideInLeft}
                className="text-[15px] leading-relaxed text-muted-foreground"
              >
                {highlight(
                  "What I care about is software that holds up: fast page loads, APIs that don't fall over, and architecture the next person can actually read. Running a company has made me a far more pragmatic engineer — shipping beats perfect.",
                )}
              </m.p>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
