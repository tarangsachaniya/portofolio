import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Github, Instagram, Linkedin, MapPin } from "lucide-react";
import profileImage from "@/assets/images/profile.jpeg";
import { useTypewriter } from "@/hooks/useTypewriter";

const roles = ["Full Stack Developer", "MERN Stack Engineer", "Laravel Expert"];

const socialLinks = [
  { href: "https://github.com/tarangsachaniya", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/tarang-sachaniya/", label: "LinkedIn", icon: Linkedin },
  { href: "https://instagram.com/tarangsachaniya", label: "Instagram", icon: Instagram },
];

export default function Hero() {
  const typed = useTypewriter(roles);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-background pt-16"
    >
      {/* Subtle radial gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,hsl(var(--accent-indigo)/0.07),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_0%_80%,hsl(var(--accent-cyan)/0.06),transparent)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_420px]">

          {/* ── Text content ── */}
          <div className="order-1 text-center lg:text-left">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 dark:border-green-900/40 dark:bg-green-950/40"
            >
              <span className="animate-pulse-dot h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-green-700 dark:text-green-400">
                Available for work
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.07 }}
              className="font-display text-5xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-6xl md:text-7xl"
            >
              Hi, I'm<br />
              <span className="text-gradient">Tarang.</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 }}
              className="mt-4 flex h-8 items-center justify-center font-mono text-lg font-medium text-accent-indigo sm:text-xl lg:justify-start"
            >
              <span>{typed}</span>
              <span className="animate-blink ml-1 inline-block h-5 w-0.5 rounded-full bg-accent-cyan" />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.17 }}
              className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground lg:mx-0 lg:text-[17px]"
            >
              Specializing in production-ready web applications using MERN, Laravel, and
              Python. Focused on performance optimization, intelligent API integrations,
              and clean architecture.
            </motion.p>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.21 }}
              className="mt-3.5 flex items-center justify-center gap-1.5 text-sm text-muted-foreground lg:justify-start"
            >
              <MapPin className="h-3.5 w-3.5 text-accent-indigo" />
              <span>Ahmedabad, India</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.25 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
            >
              <button
                onClick={() => scrollTo("projects")}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-indigo to-accent-cyan px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-indigo/20 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-accent-indigo/25 active:scale-[0.98]"
              >
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="rounded-full border-2 border-border px-7 py-[10px] text-sm font-semibold text-foreground transition-all hover:border-accent-indigo/60 hover:bg-accent-indigo/5"
              >
                Contact Me
              </button>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mt-7 flex items-center justify-center gap-2.5 lg:justify-start"
            >
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent-indigo/50 hover:text-accent-indigo hover:shadow-md"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Profile image + floating cards ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="order-2 flex justify-center"
          >
            <div className="relative w-[320px] md:w-[380px]">
              {/* Glow behind image */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-accent-indigo/15 to-accent-cyan/15 blur-2xl" />

              {/* Profile image */}
              <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-2xl shadow-accent-indigo/10">
                <img
                  src={profileImage}
                  alt="Tarang Sachaniya"
                  className="aspect-[4/5] w-full object-cover object-top"
                  fetchpriority="high"
                  decoding="async"
                />
                {/* Subtle bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Experience badge — bottom right */}
              <div className="absolute -bottom-3 -right-3 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-accent-indigo to-accent-cyan shadow-xl">
                <div className="text-center leading-tight text-white">
                  <div className="text-lg font-extrabold">2.5</div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide">Yrs</div>
                </div>
              </div>

              {/* Floating card — top left */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 top-8 flex items-center gap-2.5 rounded-xl border border-border bg-white px-3.5 py-2.5 shadow-lg dark:bg-card"
              >
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <span className="text-xs font-semibold text-foreground">Open to Work</span>
              </motion.div>

              {/* Floating card — right */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -right-8 top-[40%] rounded-xl border border-border bg-white px-3.5 py-2.5 shadow-lg dark:bg-card"
              >
                <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Projects</div>
                <div className="text-xl font-extrabold text-accent-indigo">10+</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo("about")}
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-accent-indigo"
      >
        <ChevronDown className="animate-bounce-arrow h-6 w-6" />
      </button>
    </section>
  );
}
