import { m } from "framer-motion";
import { toolbox } from "@/lib/data";
import { ease } from "@/lib/motion";
import { Reveal } from "./Reveal";

export default function Toolbox() {
  return (
    <section aria-labelledby="toolbox-title" className="section-y">
      <div className="wrap">
        <div className="flex items-baseline justify-between border-b border-line pb-3 text-meta text-ink-3">
          <span>
            <span className="text-signal-ink">$</span> cat package.json | jq .dependencies
          </span>
          <span>toolbox</span>
        </div>
        <h2 id="toolbox-title" className="sr-only">
          Toolbox
        </h2>
        <div className="mt-10 grid gap-12 md:grid-cols-3 md:gap-8">
          {toolbox.map((g, gi) => (
            <div key={g.label}>
              <Reveal delay={gi * 0.08}>
                <h3 className="text-h3">{g.label}</h3>
                <p className="mt-2 font-serif text-xl italic text-ink-3">{g.note}</p>
              </Reveal>
              <ul className="mt-6 flex flex-wrap gap-2">
                {g.items.map((it, i) => (
                  <m.li
                    key={it}
                    initial={{ opacity: 0, scale: 0.6, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.45, delay: 0.1 + i * 0.03, ease: ease.back }}
                    className={
                      gi === 2
                        ? "rounded-full border border-dashed border-signal-ink px-3 py-1.5 font-mono text-[0.8rem] text-signal-ink"
                        : gi === 0
                          ? "rounded-full bg-ink px-3 py-1.5 font-mono text-[0.8rem] text-paper"
                          : "rounded-full border border-line-strong px-3 py-1.5 font-mono text-[0.8rem] text-ink-2"
                    }
                  >
                    {it}
                  </m.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
