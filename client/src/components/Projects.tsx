import { motion } from "framer-motion";
import { extracurricularData, projectsData } from "@/lib/data";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 text-foreground">Selected Work</h2>
          <div className="w-20 h-1 bg-foreground/20 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
              className="glass-card p-6 rounded-lg shadow-lg space-y-4"
            >
              <h3 className="text-xl font-display font-bold text-foreground">{project.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
              <ul className="flex flex-wrap gap-3">
                {project.tech.map((t, i) => (
                  <li key={i} className="text-xs font-mono text-muted-foreground bg-foreground/5 px-2 py-1 rounded">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-6 pt-2">
                {project.github && (
                  <a href={project.github} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="w-5 h-5" /> <span>Source</span>
                  </a>
                )}
                {project.live && (
                  <a href={project.live} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ExternalLink className="w-5 h-5" /> <span>Visit Site</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 text-foreground">Co-Curricular Activities</h2>
          <div className="w-20 h-1 bg-foreground/20 rounded-full mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {extracurricularData.map((activity, index) => (
              <div key={index} className="bg-background/95 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-foreground">{activity.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
