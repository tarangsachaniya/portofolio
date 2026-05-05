import { extracurricularData, projectsData } from "@/lib/data";
import { ExternalLink, Github, Briefcase } from "lucide-react";
import { HoverEffect } from "@/components/ui/aceternity/card-hover-effect";
import { BackgroundGradient } from "@/components/ui/aceternity/background-gradient";

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 text-foreground">Selected Work</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        </div>
        <HoverEffect
          items={projectsData.map((p) => ({
            title: p.title,
            description: p.description,
            link: p.live || p.github || "#",
          }))}
          renderItem={(_, idx) => {
            const project = projectsData[idx];
            return (
              <div className="h-full flex flex-col">
                {project.workProject && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3 w-fit">
                    <Briefcase className="w-3 h-3" />
                    Work
                  </span>
                )}
                <h4 className="font-bold text-foreground text-lg mb-3 leading-snug">{project.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs font-mono text-muted-foreground bg-foreground/5 border border-border px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
                  {project.github && (
                    
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" /> Source
                    </a>
                  )}
                  {project.live && (
                    
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Visit Site
                    </a>
                  )}
                </div>
              </div>
            );
          }}
        />

        {/* Co-Curricular Activities */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 text-foreground">Co-Curricular Activities</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-12"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {extracurricularData.map((activity, index) => (
              <BackgroundGradient
                key={index}
                className="rounded-2xl p-6 bg-background"
                containerClassName="rounded-2xl"
              >
                <h3 className="text-base font-bold text-foreground mb-2">{activity.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{activity.description}</p>
              </BackgroundGradient>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
