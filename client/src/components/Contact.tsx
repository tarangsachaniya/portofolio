import { m } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import SectionHeader from "@/components/motion/SectionHeader";
import { MagneticLink } from "@/components/motion/MagneticButton";
import { priinteve, profile } from "@/lib/data";
import { fadeUp, fadeUpSm, revealGroup, stagger, viewport } from "@/lib/motion";

const socialIcons = { github: Github, linkedin: Linkedin, instagram: Instagram };

const channels = [
  {
    icon: Mail,
    label: "Personal email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Mail,
    label: "Priinteve",
    value: priinteve.email,
    href: `mailto:${priinteve.email}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: priinteve.whatsapp,
    href: `https://wa.me/${priinteve.whatsapp.replace(/\D/g, "")}`,
  },
  {
    icon: Phone,
    label: "Call",
    value: priinteve.phone,
    href: `tel:${priinteve.phone.replace(/\s/g, "")}`,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeader
          eyebrow="./contact"
          title="Let's build something"
          description="Open to freelance work, product partnerships, and interesting engineering problems. Fastest reply is WhatsApp."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* ── primary CTA ── */}
          <m.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 sm:p-8"
          >
            <div>
              <m.p
                variants={fadeUp}
                className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl"
              >
                Have a project in mind?
              </m.p>
              <m.p
                variants={fadeUpSm}
                className="mt-3 text-sm leading-relaxed text-muted-foreground"
              >
                Tell me what you&apos;re building and what&apos;s in the way. I
                reply to everything — usually within a day.
              </m.p>
            </div>

            <m.div variants={fadeUp} className="mt-7 flex flex-wrap gap-2">
              <MagneticLink
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-mono text-sm font-semibold text-accent-foreground transition-shadow hover:shadow-[0_0_30px_-6px_hsl(var(--accent)/0.7)]"
              >
                Send an email
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticLink>
              <MagneticLink
                href={`https://wa.me/${priinteve.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                cap={8}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-mono text-sm font-semibold text-foreground transition-colors hover:border-accent/60 hover:text-accent"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </MagneticLink>
            </m.div>

            <m.div
              variants={fadeUpSm}
              className="mt-7 flex items-center gap-2.5 rounded-lg border border-accent/25 bg-accent/[0.07] px-4 py-3"
            >
              <span className="animate-pulse-dot h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-[13px] text-muted-foreground">
                Currently available for new work
              </span>
            </m.div>
          </m.div>

          {/* ── channels ── */}
          <m.div {...revealGroup(0.06)} className="grid content-start gap-3">
            <m.div variants={fadeUp} className="grid gap-3 sm:grid-cols-2">
              {channels.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/40"
                >
                  <Icon
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  <span className="min-w-0">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                      {label}
                    </span>
                    <span className="mt-0.5 block truncate text-[13px] text-foreground">
                      {value}
                    </span>
                  </span>
                </a>
              ))}
            </m.div>

            <m.div
              variants={fadeUp}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Elsewhere
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.socials.map((social) => {
                  const Icon =
                    socialIcons[social.icon as keyof typeof socialIcons];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-border bg-elevated px-3 py-2 font-mono text-[11px] text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {social.label}
                    </a>
                  );
                })}
              </div>

              <h3 className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Priinteve
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {priinteve.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-border bg-elevated px-3 py-2 font-mono text-[11px] text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
