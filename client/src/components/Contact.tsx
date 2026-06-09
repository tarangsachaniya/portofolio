import { motion } from "framer-motion";
import { ExternalLink, Github, Instagram, Linkedin, Mail, Send } from "lucide-react";

const EMAIL = "tarangsachaniya8@gmail.com";

const socials = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/tarangsachaniya",
    color: "hover:border-slate-400 hover:text-slate-700 dark:hover:text-slate-300",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/tarang-sachaniya/",
    color: "hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/tarangsachaniya",
    color: "hover:border-pink-400 hover:text-pink-600 dark:hover:text-pink-400",
  },
];

const contactCards = [
  {
    name: "Email",
    value: EMAIL,
    icon: Mail,
    href: `mailto:${EMAIL}`,
    iconBg: "bg-blue-50 dark:bg-blue-950/40",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    name: "GitHub",
    value: "tarangsachaniya",
    icon: Github,
    href: "https://github.com/tarangsachaniya",
    iconBg: "bg-slate-100 dark:bg-slate-800/60",
    iconColor: "text-slate-700 dark:text-slate-300",
  },
  {
    name: "LinkedIn",
    value: "tarang-sachaniya",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/tarang-sachaniya/",
    iconBg: "bg-blue-50 dark:bg-blue-950/40",
    iconColor: "text-blue-700 dark:text-blue-400",
  },
  {
    name: "Instagram",
    value: "@tarangsachaniya",
    icon: Instagram,
    href: "https://instagram.com/tarangsachaniya",
    iconBg: "bg-pink-50 dark:bg-pink-950/40",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative bg-surface py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,hsl(var(--accent-indigo)/0.06),transparent)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-14"
        >
          <p className="mb-2 font-mono text-sm font-medium uppercase tracking-widest text-accent-indigo">
            Let's Connect
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-5xl">
            Get in Touch
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-accent-indigo to-accent-cyan" />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">

          {/* Left: heading + CTA + socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="max-w-md text-[17px] leading-relaxed text-muted-foreground">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to collaborate. Let's build something great together.
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-accent-indigo to-accent-cyan px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-indigo/20 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-accent-indigo/25"
            >
              <Send className="h-4 w-4" />
              Send an Email
            </a>

            <div className="mt-8 flex items-center gap-3">
              {socials.map(({ name, icon: Icon, href, color }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-card ${color}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Availability note */}
            <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-900/40 dark:bg-green-950/20">
              <div className="flex items-center gap-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                  Currently available for freelance projects
                </span>
              </div>
              <p className="mt-2 text-sm text-green-700/80 dark:text-green-500/80">
                Open to full-time roles and interesting contract work.
              </p>
            </div>
          </motion.div>

          {/* Right: contact link cards */}
          <div className="grid grid-cols-2 gap-4">
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.a
                  key={card.name}
                  href={card.href}
                  target={card.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="group flex flex-col gap-3 rounded-2xl border border-border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent-indigo/40 hover:shadow-md dark:bg-card"
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {card.name}
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-sm font-semibold text-foreground">
                      <span className="truncate">{card.value}</span>
                      <ExternalLink className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-50" />
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
