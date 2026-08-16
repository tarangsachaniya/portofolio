import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Priinteve from "@/components/Priinteve";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Marquee from "@/components/motion/Marquee";
import TextMarquee from "@/components/motion/TextMarquee";
import { marqueeRowA, marqueeRowB } from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />

        <section
          aria-label="Technologies"
          className="space-y-3 border-y border-border/60 bg-surface py-10"
        >
          <Marquee items={marqueeRowA} duration={48} />
          <Marquee items={marqueeRowB} duration={54} reverse />
        </section>

        <About />

        <TextMarquee
          items={["Full Stack", "React", "Laravel", "Node", "Next.js", "Python"]}
        />

        <Priinteve />
        <Projects />
        <Experience />
        <Skills />

        <TextMarquee
          items={["Let's build", "Available for work", "Get in touch"]}
          reverse
          duration={30}
        />

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
