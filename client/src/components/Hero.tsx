import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Github, Instagram, Linkedin } from "lucide-react";
import profileImage from "@/assets/images/profile.jpeg";
import { useTypewriter } from "@/hooks/useTypewriter";

const roles = ["Full Stack Developer", "MERN Stack Engineer", "Laravel Expert"];

const socialLinks = [
  { href: "https://github.com/tarangsachaniya", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/tarang-sachaniya/", label: "LinkedIn", icon: Linkedin },
  { href: "https://instagram.com/tarangsachaniya", label: "Instagram", icon: Instagram },
];

const codeSnippet = `const dev = {
  name: "Tarang Sachaniya",
  stack: ["MERN", "Laravel", "Python"],
  focus: "production-ready apps",
  available: true,
};

export default dev;`;

export default function Hero() {
  const typed = useTypewriter(roles);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="grain-overlay relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-accent-indigo/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-accent-cyan/15 blur-[130px]" />

      {/* Floating blurred code snippet */}
      <motion.pre
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="animate-float pointer-events-none absolute right-[6%] top-[18%] hidden max-w-xs select-none rounded-2xl border border-border/40 bg-surface/30 p-5 font-mono text-[11px] leading-relaxed text-muted-foreground/70 blur-[1px] backdrop-blur-sm lg:block"
      >
        <code>{codeSnippet}</code>
      </motion.pre>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="order-2 flex justify-center lg:order-1 lg:justify-start"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-accent-indigo via-purple-500 to-accent-cyan opacity-60 blur-sm" />
              <div className="relative h-64 w-64 overflow-hidden rounded-full shadow-2xl md:h-80 md:w-80">
                <img
                  src={profileImage}
                  alt="Tarang Sachaniya"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 flex h-20 w-20 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-accent-indigo to-accent-cyan shadow-lg">
                <span className="text-center text-sm font-bold leading-tight text-white">
                  2.5 Yrs
                </span>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <div className="order-1 text-center lg:order-2 lg:text-left">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/5 px-4 py-2"
            >
              <span className="animate-pulse-dot h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs font-medium uppercase tracking-widest text-green-500">
                Available for work
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[72px]"
            >
              Hi, I&apos;m Tarang
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-3 flex h-9 items-center justify-center font-mono text-xl text-accent-indigo sm:text-2xl lg:justify-start"
            >
              <span>{typed}</span>
              <span className="animate-blink ml-1 inline-block h-6 w-[2px] bg-accent-cyan" />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground lg:mx-0 lg:text-lg"
            >
              Specializing in production-ready web applications using MERN, Laravel, and
              Python. Focused on performance optimization, intelligent API integrations,
              and clean architecture.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
            >
              <button
                onClick={() => scrollTo("projects")}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-indigo to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-indigo/25 transition-transform hover:scale-[1.03]"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="rounded-full border border-border bg-foreground/5 px-8 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-accent-indigo/50 hover:bg-accent-indigo/5"
              >
                Contact Me
              </button>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex items-center justify-center gap-3 lg:justify-start"
            >
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/40 text-muted-foreground backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-accent-indigo/50 hover:text-accent-indigo"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo("about")}
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <ChevronDown className="animate-bounce-arrow h-6 w-6" />
      </button>
    </section>
  );
}
