import { m } from "framer-motion";
import { ArrowUpRight, Check, Mail, MapPin, Phone } from "lucide-react";
import SectionHeader from "@/components/motion/SectionHeader";
import BrowserFrame from "@/components/motion/BrowserFrame";
import { useTilt } from "@/hooks/useTilt";
import { priinteve, priinteveProducts, type PriinteveProduct } from "@/lib/data";
import {
  fadeUp,
  fadeUpSm,
  popIn,
  revealGroup,
  scaleIn,
  stagger,
  viewport,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

function StatusPill({ status }: { status: PriinteveProduct["status"] }) {
  const live = status === "live";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em]",
        live
          ? "border-accent/30 bg-accent/10 text-accent"
          : "border-border bg-elevated text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          live ? "animate-pulse-dot bg-accent" : "bg-muted-foreground",
        )}
      />
      {live ? "Live" : "In development"}
    </span>
  );
}

function ProductCard({ product }: { product: PriinteveProduct }) {
  const { ref, style, glare, handlers } = useTilt<HTMLDivElement>({ max: 5 });

  return (
    /* outer = stagger variant, inner = tilt. See the note in Projects.tsx. */
    <m.div variants={scaleIn} className="h-full">
    <m.article
      ref={ref}
      style={style}
      {...handlers}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-5 transition-colors duration-300 hover:border-accent/40 sm:p-6"
    >
      {/* pointer sheen — one composited layer */}
      <m.div
        aria-hidden
        style={{ opacity: glare.opacity }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <m.div
          style={{ left: glare.x, top: glare.y }}
          className="absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background: `radial-gradient(circle, hsl(${product.hue} 71% 50%) 0%, transparent 65%)`,
            }}
          />
        </m.div>
      </m.div>

      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {product.tagline}
          </p>
        </div>
        <StatusPill status={product.status} />
      </div>

      <BrowserFrame
        domain={product.domain}
        src={product.image ? `/products/${product.image}` : undefined}
        alt={`${product.name} homepage`}
        hue={product.hue}
        label={product.name}
        className="mb-5"
      />

      <p className="text-sm leading-relaxed text-muted-foreground">
        {product.description}
      </p>

      <ul className="mt-4 grid gap-2">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-[13px] text-muted-foreground">
            <Check
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
              aria-hidden
            />
            {feature}
          </li>
        ))}
      </ul>

      {product.metrics && (
        <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4">
          {product.metrics.map((metric) => (
            <div key={metric.label}>
              <dd className="font-display text-base font-bold text-foreground">
                {metric.value}
              </dd>
              <dt className="mt-0.5 font-mono text-[9px] uppercase leading-tight tracking-[0.1em] text-muted-foreground">
                {metric.label}
              </dt>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
        {product.tech.map((tech) => (
          <span
            key={tech}
            className="rounded border border-border bg-elevated px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      {product.url && (
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent transition-colors hover:text-accent-bright"
        >
          Visit {product.domain}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      )}
    </m.article>
    </m.div>
  );
}

export default function Priinteve() {
  return (
    <section id="priinteve" className="relative border-t border-border/60 py-24 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeader
          eyebrow="the venture"
          title="Priinteve Innovations"
          description={priinteve.description}
        />

        {/* company strip */}
        <m.div
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-10 rounded-xl border border-border bg-card p-6 sm:p-7"
        >
          <m.p
            variants={fadeUpSm}
            className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl"
          >
            &ldquo;{priinteve.tagline}&rdquo;
          </m.p>
          <m.p
            variants={fadeUpSm}
            className="mt-2 font-mono text-xs text-muted-foreground"
          >
            {priinteve.role} · {priinteve.legalName} · {priinteve.location}
          </m.p>

          <m.div variants={fadeUp} className="mt-6">
            <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              What we build
            </h3>
            <m.ul
              variants={stagger(0.03)}
              className="flex flex-wrap gap-2"
            >
              {priinteve.services.map((service) => (
                <m.li
                  key={service}
                  variants={popIn}
                  className="rounded-md border border-border bg-elevated px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
                >
                  {service}
                </m.li>
              ))}
            </m.ul>
          </m.div>
        </m.div>

        {/* products */}
        <m.div {...revealGroup(0.1)} className="mt-8 grid gap-6 lg:grid-cols-2">
          {priinteveProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </m.div>

        {/* contact strip */}
        <m.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-8 grid gap-3 sm:grid-cols-3"
        >
          {[
            { icon: Mail, label: "Email", value: priinteve.email, href: `mailto:${priinteve.email}` },
            { icon: Phone, label: "WhatsApp", value: priinteve.whatsapp, href: `https://wa.me/${priinteve.whatsapp.replace(/\D/g, "")}` },
            { icon: MapPin, label: "Studio", value: priinteve.location, href: undefined },
          ].map(({ icon: Icon, label, value, href }) => {
            const body = (
              <>
                <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                <span className="min-w-0">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                    {label}
                  </span>
                  <span className="block truncate text-[13px] text-foreground">
                    {value}
                  </span>
                </span>
              </>
            );
            const cls =
              "flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-colors";
            return (
              <m.div key={label} variants={fadeUpSm}>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={cn(cls, "hover:border-accent/40")}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
