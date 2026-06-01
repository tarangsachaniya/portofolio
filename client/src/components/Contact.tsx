import { motion } from "framer-motion";
import { ExternalLink, Github, Instagram, Linkedin, Mail } from "lucide-react";

const EMAIL = "tarangsachaniya8@gmail.com";

const socials = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/tarangsachaniya",
    color: "hover:border-foreground/50 hover:text-foreground",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/tarang-sachaniya/",
    color: "hover:border-blue-400/60 hover:text-blue-400",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/tarangsachaniya",
    color: "hover:border-pink-400/60 hover:text-pink-400",
  },
];

const contactCards = [
  {
    name: "Email",
    value: EMAIL,
    icon: Mail,
    href: `mailto:${EMAIL}`,
    accent: "text-accent-indigo",
  },
  {
    name: "GitHub",
    value: "github.com/tarangsachaniya",
    icon: Github,
    href: "https://github.com/tarangsachaniya",
    accent: "text-foreground",
  },
  {
    name: "LinkedIn",
    value: "linkedin.com/in/tarang-sachaniya",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/tarang-sachaniya/",
    accent: "text-blue-400",
  },
  {
    name: "Instagram",
    value: "@tarangsachaniya",
    icon: Instagram,
    href: "https://instagram.com/tarangsachaniya",
    accent: "text-pink-400",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-[100px]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-accent-indigo/10 blur-[130px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: heading + socials */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              Get in <span className="text-gradient">touch</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              I&apos;m always open to discussing new projects, creative ideas or
              opportunities to be part of your visions.
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-indigo to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-indigo/25 transition-transform hover:scale-[1.03]"
            >
              <Mail className="h-4 w-4" /> Email me
            </a>

            <div className="mt-8 flex items-center gap-3">
              {socials.map(({ name, icon: Icon, href, color }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-all hover:-translate-y-1 ${color}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: contact link cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.a
                  key={card.name}
                  href={card.href}
                  target={card.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface/60 p-5 transition-all hover:-translate-y-1 hover:border-accent-indigo/40"
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-foreground/5 ${card.accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {card.name}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-foreground">
                      <span className="truncate">{card.value}</span>
                      <ExternalLink className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
