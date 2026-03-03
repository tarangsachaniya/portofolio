import { motion } from "framer-motion";
import { experienceData, educationData } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 text-foreground">About Me</h2>
          <div className="w-20 h-1 bg-foreground/20 rounded-full"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 rounded-3xl mb-12"
        >
          <h3 className="text-xl font-medium mb-4 text-foreground">The Journey</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            I am Tarang Sachaniya, a Computer Science and Engineering graduate (2025) with two and half years of professional experience as a Backend Developer at Prime Apps Infotech. I specialize in building scalable full-stack applications with a strong command over the MERN stack, particularly Next.js, Redux, and Zustand for advanced state management. Alongside JavaScript technologies, I have solid expertise in Laravel, PHP, and WordPress for backend and CMS development.
          </p>
          <p className="text-muted-foreground leading-relaxed">
           I also work with Python for machine learning and image processing applications. Passionate about writing clean, efficient, and maintainable code, I focus on performance optimization, API integrations, and delivering production-ready solutions that solve real-world problems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Education Column */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium mb-6 text-foreground px-2">Education</h3>
            {educationData.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 border-l border-border pb-8 last:pb-0 group"
              >
                <div className="absolute w-3 h-3 bg-foreground/20 rounded-full -left-[6.5px] top-2 group-hover:bg-foreground transition-colors shadow-[0_0_10px_rgba(var(--foreground),0.3)]"></div>
                <div className="text-sm text-muted-foreground font-mono mb-1">{edu.period}</div>
                <h4 className="text-lg font-medium text-foreground">{edu.degree}</h4>
                <div className="text-sm text-muted-foreground mb-3">{edu.school}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{edu.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Experience Column */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium mb-6 text-foreground px-2">Experience</h3>
            {experienceData.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 border-l border-border pb-8 last:pb-0 group"
              >
                <div className="absolute w-3 h-3 bg-foreground/20 rounded-full -left-[6.5px] top-2 group-hover:bg-foreground transition-colors shadow-[0_0_10px_rgba(var(--foreground),0.3)]"></div>
                <div className="text-sm text-muted-foreground font-mono mb-1">{exp.period}</div>
                <h4 className="text-lg font-medium text-foreground">{exp.role}</h4>
                <div className="text-sm text-muted-foreground mb-3">{exp.company}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
