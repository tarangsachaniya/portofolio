import { skillsData } from "@/lib/data";
import { Code2, Server, Wrench } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/aceternity/bento-grid";
import { InfiniteMovingCards } from "@/components/ui/aceternity/infinite-moving-cards";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";

const allSkills = [
  ...skillsData.frontend,
  ...skillsData.backend,
  ...skillsData.tools,
].map((s) => ({ title: s }));

export default function Skills() {
  const frontendHeader = (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-purple-500/10 via-violet-500/5 to-background items-center justify-center">
      <Code2 className="w-12 h-12 text-purple-400 opacity-60" />
    </div>
  );

  const backendHeader = (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-background items-center justify-center">
      <Server className="w-12 h-12 text-blue-400 opacity-60" />
    </div>
  );

  const toolsHeader = (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-background items-center justify-center">
      <Wrench className="w-12 h-12 text-green-400 opacity-60" />
    </div>
  );

  return (
    <section id="skills" className="py-32 relative overflow-hidden border-y border-border">
      {/* Sparkles background */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="skills-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={60}
          particleColor="currentColor"
          className="opacity-20"
        />
      </div>
      <div className="absolute inset-0 bg-foreground/[0.02]"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 text-foreground">Technical Arsenal</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tools and technologies I've mastered to bring ideas to life.
          </p>
        </div>

        <BentoGrid className="max-w-4xl mx-auto mb-16">
          <BentoGridItem
            className="md:col-span-1"
            title="Frontend"
            description={
              <div className="flex flex-wrap gap-2 mt-3">
                {skillsData.frontend.map((skill) => (
                  <span key={skill} className="px-2.5 py-1 bg-foreground/5 border border-border rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            }
            header={frontendHeader}
            icon={<Code2 className="h-4 w-4 text-muted-foreground" />}
          />
          <BentoGridItem
            className="md:col-span-1"
            title="Backend"
            description={
              <div className="flex flex-wrap gap-2 mt-3">
                {skillsData.backend.map((skill) => (
                  <span key={skill} className="px-2.5 py-1 bg-foreground/5 border border-border rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            }
            header={backendHeader}
            icon={<Server className="h-4 w-4 text-muted-foreground" />}
          />
          <BentoGridItem
            className="md:col-span-1"
            title="Tools & DevOps"
            description={
              <div className="flex flex-wrap gap-2 mt-3">
                {skillsData.tools.map((skill) => (
                  <span key={skill} className="px-2.5 py-1 bg-foreground/5 border border-border rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            }
            header={toolsHeader}
            icon={<Wrench className="h-4 w-4 text-muted-foreground" />}
          />
        </BentoGrid>

        {/* Infinite scrolling skills strip */}
        <div>
          <InfiniteMovingCards
            items={allSkills}
            direction="left"
            speed="slow"
            pauseOnHover
          />
          <InfiniteMovingCards
            items={[...allSkills].reverse()}
            direction="right"
            speed="slow"
            pauseOnHover
            className="mt-4"
          />
        </div>
      </div>
    </section>
  );
}
