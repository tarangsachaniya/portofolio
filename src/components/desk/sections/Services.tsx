import Link from "next/link";
import { person, services } from "@/lib/content";
import { Faq } from "../../ui/Page";
import Process from "./Process";

const HUES = ["#7cc4ff", "#ffb547", "#5ee0c1", "#ff8a5c"];

/** What Tarang builds for clients, how a project runs, and the questions people ask first. */
export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="wrap scroll-mt-24 py-[clamp(4rem,8vw,7rem)]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#ffc46b]">man services · freelance</p>
          <h2 id="services-title" className="mt-3 max-w-[18ch] font-display text-[clamp(2.4rem,5vw,4.4rem)] font-bold leading-[0.95] tracking-[-0.045em]">
            What I can <span className="text-glow">build for you.</span>
          </h2>
        </div>
        <p className="max-w-[46ch] text-fg-2">{services.summary}</p>
      </div>

      <ul className="mt-12 grid gap-4 md:grid-cols-2">
        {services.offers.map((o, i) => (
          <li key={o.title} className="tile !col-auto group p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-[0.72rem]" style={{ color: HUES[i] }}>0{i + 1}</span>
              <span aria-hidden className="size-10 rounded-full opacity-70 blur-xl transition-opacity group-hover:opacity-100" style={{ background: HUES[i] }} />
            </div>
            <h3 className="mt-2 font-display text-[1.7rem] font-semibold tracking-[-0.03em]">{o.title}</h3>
            <p className="mt-3 max-w-[48ch] text-fg-2">{o.body}</p>
            <p className="mt-5 flex flex-wrap gap-1.5">{o.tags.map((t) => <span key={t} className="tag">{t}</span>)}</p>
          </li>
        ))}
      </ul>

      <div className="mt-20">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-fg-3">how a project runs</p>
        <h3 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-bold tracking-[-0.04em]">From a call to a deploy, in four stages.</h3>
        <div className="mt-10"><Process /></div>
      </div>

      <div className="mt-20 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-fg-3">before you ask</p>
          <h3 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-bold tracking-[-0.04em]">Questions clients ask first.</h3>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`https://wa.me/${person.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-primary">WhatsApp me <span aria-hidden>↗</span></a>
            <Link href="/services/" className="btn btn-ghost">Services in detail</Link>
          </div>
        </div>
        <div className="lg:col-span-8"><Faq items={services.faq} /></div>
      </div>
    </section>
  );
}
