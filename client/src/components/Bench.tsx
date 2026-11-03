import { m } from "framer-motion";
import { bench } from "@/lib/data";
import { SectionHead } from "./SectionHead";
import { ease } from "@/lib/motion";

export default function Bench() {
  return (
    <section id="bench" className="section-y bg-ink text-paper" aria-labelledby="bench-title">
      {/* local token flip: inside this band "ink" text reads as paper */}
      <div className="wrap [--line:rgb(243_240_232/0.14)] [--line-strong:rgb(243_240_232/0.3)] [--ink-2:#c9c4b9] [--ink-3:#9a958b] [--signal-ink:#ff9466] dark:[--line:rgb(18_18_17/0.14)] dark:[--line-strong:rgb(18_18_17/0.3)] dark:[--ink-2:#3a3833] dark:[--ink-3:#5f5b54] dark:[--signal-ink:#b93a0b]">
        <SectionHead
          id="bench"
          index="04"
          path="ls ~/bench --unfinished"
          title={["On the bench.", "Learning in public."]}
          aside="Half-built things I'm using to learn something new. Some will ship. All of them teach."
        />

        <ul className="grid gap-px bg-[var(--line)] md:grid-cols-2">
          {bench.map((b, i) => {
            const Tag = b.href ? "a" : "div";
            return (
              <m.li
                key={b.name}
                className="bg-ink"
                initial={{ opacity: 0, y: 40, rotateX: 12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: (i % 2) * 0.12, ease: ease.out }}
                style={{ transformPerspective: 900 }}
              >
                <Tag
                  {...(b.href ? { href: b.href, target: "_blank", rel: "noreferrer" } : {})}
                  className="group relative flex h-full min-h-[17rem] flex-col justify-between overflow-hidden p-6 md:p-8"
                >
                  {/* hover wash: scales from bottom, transform only */}
                  <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-signal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="font-mono text-xs text-[var(--ink-3)] transition-colors group-hover:text-on-signal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full border border-[var(--line-strong)] px-2.5 py-1 text-meta text-[var(--ink-2)] transition-colors group-hover:border-on-signal group-hover:text-on-signal">
                      {b.stage}
                    </span>
                  </div>
                  <div className="relative mt-10">
                    <h3 className="text-h3 transition-colors group-hover:text-on-signal">
                      {b.name}
                      {b.href && <span aria-hidden> ↗</span>}
                    </h3>
                    <p className="mt-3 max-w-[48ch] text-[0.98rem] leading-relaxed text-[var(--ink-2)] transition-colors group-hover:text-on-signal">
                      {b.body}
                    </p>
                    <p className="mt-5 font-mono text-[0.75rem] text-[var(--signal-ink)] transition-colors group-hover:text-on-signal">
                      learning → {b.learning}
                    </p>
                  </div>
                </Tag>
              </m.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
