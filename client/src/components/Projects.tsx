import { motion } from "framer-motion";
import { projectsData } from "@/lib/data";
import { ExternalLink, Github } from "lucide-react";
import project1 from "@/assets/images/project-1.png";
import project2 from "@/assets/images/project-2.png";
import project3 from "@/assets/images/project-3.png";

const images = {
  "project-1": project1,
  "project-2": project2,
  "project-3": project3,
};

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 text-foreground">Selected Work</h2>
          <div className="w-20 h-1 bg-foreground/20 rounded-full"></div>
        </div>

        <div className="space-y-20 md:space-y-32">
          {projectsData.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center group`}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2 relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-10 pointer-events-none"></div>
                  <div className="relative rounded-2xl overflow-hidden glass shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                    <img 
                      src={images[project.imageRef as keyof typeof images]} 
                      alt={project.title}
                      className="w-full h-[240px] sm:h-[300px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
                  <div className="text-xs md:text-sm font-mono text-muted-foreground">Featured Project {idx + 1}</div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">{project.title}</h3>
                  
                  <div className="glass-card p-5 md:p-6 rounded-xl relative z-20 md:-ml-8 md:mr-0 group-odd:md:ml-0 group-odd:md:-mr-8 bg-background/95 shadow-lg">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  <ul className="flex flex-wrap gap-3">
                    {project.tech.map((t, i) => (
                      <li key={i} className="text-xs font-mono text-muted-foreground bg-foreground/5 px-2 py-1 rounded">
                        {t}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center gap-6 pt-2">
                    <a href={project.github} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <Github className="w-5 h-5" /> <span>Source</span>
                    </a>
                    <a href={project.live} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <ExternalLink className="w-5 h-5" /> <span>Visit Site</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
