import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, m, useScroll, useSpring } from "framer-motion";
import { chapters } from "@/lib/data";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";
import { ease, spring } from "@/lib/motion";

/** "[[phrase]]" → highlighted <span class="mark"> */
function rich(text: string): ReactNode[] {
  return text.split(/(\[\[.+?\]\])/g).map((part, i) =>
    part.startsWith("[[") ? (
      <span key={i} className="mark text-ink">
        {part.slice(2, -2)}
      </span>
    ) : (
      part
    ),
  );
}

export default function Story() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, spring.beam);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-ch]");
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.ch));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = chapters[active];

  return (
    <section id="story" className="section-y bg-paper-2" aria-labelledby="story-title">
      <div className="wrap">
        <SectionHead
          id="story"
          index="02"
          path="git log --story --reverse"
          title={["Five chapters,", "one long build."]}
          aside="Every chapter is what I was learning, and what I made while learning it. No gap between the two."
        />

        <div className="grid gap-10 md:grid-cols-12">
          {/* sticky year rail: desktop */}
          <div className="hidden md:col-span-4 md:block lg:col-span-5">
            <div className="sticky top-28 flex gap-6">
              <div className="relative w-px self-stretch bg-line-strong" aria-hidden>
                <m.span className="absolute inset-x-0 top-0 h-full origin-top bg-signal" style={{ scaleY: progress }} />
              </div>
              <div aria-hidden className="min-h-[60vh] flex-1">
                <p className="text-meta text-ink-3">
                  Chapter <span className="text-ink">{current.n}</span> / {String(chapters.length).padStart(2, "0")}
                </p>
                <div className="relative mt-4 h-[clamp(6rem,13vw,12rem)] overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <m.span
                      key={current.year}
                      className="absolute inset-0 text-[clamp(6rem,13vw,12rem)] font-extrabold leading-[0.85] tracking-[-0.07em] tabular-nums"
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "-100%" }}
                      transition={{ duration: 0.6, ease: ease.out }}
                    >
                      {current.year}
                    </m.span>
                  </AnimatePresence>
                </div>
                <p className="mt-6 max-w-[24ch] font-serif text-3xl italic leading-tight text-ink-2">{current.title}</p>
              </div>
            </div>
          </div>

          <ol ref={listRef} className="md:col-span-8 lg:col-span-7">
            {chapters.map((c, i) => (
              <li
                key={c.n}
                id={`ch-${c.n}`}
                data-ch={i}
                className="scroll-mt-28 border-t border-line-strong py-12 first:border-t-0 first:pt-0 md:py-16"
              >
                <Reveal>
                  <p className="flex flex-wrap gap-x-3 gap-y-1 text-meta text-ink-3">
                    <span className="text-signal-ink">CH {c.n}</span>
                    <span className="md:hidden">· {c.year}</span>
                    {c.where && <span>· {c.where}</span>}
                  </p>
                  <h3 className="mt-4 text-h3">{c.title}</h3>
                  <p className="mt-5 max-w-[60ch] text-body text-ink-2">{rich(c.story)}</p>
                </Reveal>
                <Reveal delay={0.1} className="mt-8 grid gap-6 sm:grid-cols-2">
                  {(
                    [
                      ["Learned", c.learned],
                      ["Made", c.made],
                    ] as const
                  ).map(([label, items]) => (
                    <div key={label} className="border-t border-line pt-3">
                      <p className="text-meta text-ink-3">{label}</p>
                      <ul className="mt-3 space-y-1.5 font-mono text-[0.82rem] text-ink">
                        {items.map((it) => (
                          <li key={it} className="flex gap-2.5">
                            <span aria-hidden className={label === "Made" ? "text-signal-ink" : "text-ink-3"}>
                              {label === "Made" ? "+" : "~"}
                            </span>
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
