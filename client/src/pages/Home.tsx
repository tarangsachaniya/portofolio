import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Readme from "@/components/Readme";
import Story from "@/components/Story";
import Work from "@/components/Work";
import Bench from "@/components/Bench";
import Toolbox from "@/components/Toolbox";
import Contact from "@/components/Contact";
import VelocityBand from "@/components/VelocityBand";

export default function Home() {
  return (
    <div className="grain min-h-screen overflow-x-clip">
      <Nav />
      <main id="main">
        <Hero />
        <VelocityBand words={["learn", "make", "ship", "break", "fix", "repeat"]} />
        <Readme />
        <Story />
        <Work />
        <Bench />
        <Toolbox />
        <VelocityBand tone="signal" base={3} words={["open for freelance", "let's build", "Ahmedabad → anywhere"]} />
        <Contact />
      </main>
    </div>
  );
}
