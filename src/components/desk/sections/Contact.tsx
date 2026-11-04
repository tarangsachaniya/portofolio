import { person } from "@/lib/content";
import Ship from "../steps/Ship";
import CopyEmail from "./CopyEmail";

/** The end of the page: say hello, with the same composer as the 21:30 stop. */
export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="wrap scroll-mt-24 py-[clamp(4rem,8vw,7rem)]">
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(90%_120%_at_0%_0%,rgb(255_181_71/0.16),transparent_55%),radial-gradient(80%_120%_at_100%_100%,rgb(155_140_255/0.18),transparent_55%)] p-6 sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#ffc46b]">21:30 · ship</p>
            <h2 id="contact-title" className="mt-3 font-display text-[clamp(2.8rem,6vw,5.4rem)] font-bold leading-[0.9] tracking-[-0.05em]">
              Let&apos;s build <span className="text-glow">something.</span>
            </h2>
            <p className="mt-5 max-w-[42ch] text-[1.08rem] text-fg-2">Tell me what you&apos;re building and what&apos;s in the way. I reply within a day, usually faster on WhatsApp.</p>
            <dl className="mt-8 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3"><dt className="text-fg-3">Email</dt><dd><CopyEmail /></dd></div>
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3"><dt className="text-fg-3">WhatsApp</dt><dd><a className="ulink" href={`https://wa.me/${person.whatsapp}`} target="_blank" rel="noreferrer">{person.whatsappLabel} ↗</a></dd></div>
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3"><dt className="text-fg-3">Based in</dt><dd>{person.city}, {person.region} · IST</dd></div>
              <div className="flex items-center justify-between gap-4"><dt className="text-fg-3">Elsewhere</dt><dd className="flex gap-3">{person.socials.map((s) => <a key={s.label} className="ulink" href={s.href} target="_blank" rel="me noreferrer">{s.label}</a>)}</dd></div>
            </dl>
          </div>
          <div className="lg:col-span-7">
            <div className="h-[26rem] overflow-hidden rounded-[22px] border border-white/10 shadow-[0_40px_100px_-40px_rgb(0_0_0/0.9)]"><Ship t={1} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
