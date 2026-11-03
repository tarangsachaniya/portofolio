import { profile, readme } from "@/lib/data";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";

export default function Readme() {
  return (
    <section id="readme" className="section-y" aria-labelledby="readme-title">
      <div className="wrap">
        <SectionHead id="readme" index="01" path="cat README.md" title={["Hi. I'm Tarang —", "I build to learn."]} />

        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5 lg:col-span-4">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
                <picture>
                  <source srcSet="/img/hero-760.avif" type="image/avif" />
                  <img
                    src="/img/hero-760.webp"
                    alt="Tarang Sachaniya standing outdoors, arms crossed, smiling"
                    width={760}
                    height={950}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover grayscale-[0.25] contrast-[1.02]"
                  />
                </picture>
                <span className="absolute left-3 top-3 bg-paper px-2 py-1 text-meta text-ink">fig. 01</span>
              </div>
              <figcaption className="mt-3 flex justify-between text-meta text-ink-3">
                <span>{profile.name}</span>
                <span>{profile.location}</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="text-[clamp(1.6rem,1.2rem+1.6vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em]">
                {readme.intro}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 max-w-[62ch] space-y-5 text-body text-ink-2">
              {readme.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>

            <ol className="mt-14 grid gap-px border-y border-line bg-line sm:grid-cols-3">
              {readme.principles.map((pr, i) => (
                <li key={pr.n} className="bg-paper py-6 sm:px-5 sm:first:pl-0">
                  <Reveal delay={0.08 * i} className="h-full">
                    <span className="text-meta text-signal-ink">{pr.n}</span>
                    <h3 className="mt-3 text-lg font-semibold leading-snug tracking-[-0.02em]">{pr.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-3">{pr.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
