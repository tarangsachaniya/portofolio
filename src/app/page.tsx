import { person, services } from "@/lib/content";
import { meta, faqNode, graph } from "@/lib/seo";
import JsonLd from "@/components/ui/JsonLd";
import DeskScene from "@/components/desk/DeskScene";
import AfterHours from "@/components/desk/AfterHours";
import About from "@/components/desk/sections/About";
import Services from "@/components/desk/sections/Services";
import Contact from "@/components/desk/sections/Contact";

export const metadata = meta({
  title: `${person.name} | Full-stack developer in Ahmedabad`,
  description: person.summary,
  path: "/",
});

const homeFaq = [
  { q: "Who is Tarang Sachaniya?", a: person.summary },
  { q: "What has Tarang Sachaniya built?", a: "Priinteve's on-demand printing network (five apps on one Bun and Hono API), Nectcard (NFC digital business cards), VentaDot (QR restaurant ordering), Zerox Buddy (web and Windows app for print shops), Salonly (salon bookings with an Android app), client websites, and the otp-forge npm package." },
  { q: "Where is Tarang Sachaniya based?", a: "Ahmedabad, Gujarat, India. He works with clients remotely and in person around Ahmedabad." },
  { q: "Is Tarang available for freelance projects?", a: services.faq[0].a },
];

/** One working day at the desk, then everything else about Tarang. */
export default function Home() {
  return (
    <>
      <DeskScene />
      <AfterHours faq={homeFaq} />
      <About />
      <Services />
      <Contact />
      <JsonLd data={graph(faqNode(homeFaq))} />
    </>
  );
}
