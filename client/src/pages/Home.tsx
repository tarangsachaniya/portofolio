import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useMinDelay } from "@/hooks/useMinDelay";
import {
  AboutSkeleton,
  ContactSkeleton,
  HeroSkeleton,
  ProjectsSkeleton,
  SkillsSkeleton,
} from "@/components/skeletons/Skeletons";

export default function Home() {
  const loading = useMinDelay(800);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent-indigo/20 selection:text-foreground">
      <Navbar />
      <main>
        {loading ? (
          <>
            <HeroSkeleton />
            <AboutSkeleton />
            <SkillsSkeleton />
            <ProjectsSkeleton />
            <ContactSkeleton />
          </>
        ) : (
          <>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
