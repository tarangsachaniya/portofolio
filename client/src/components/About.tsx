import { motion } from "framer-motion";
import { experienceData } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 text-foreground">About Me</h2>
          <div className="w-20 h-1 bg-foreground/20 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 rounded-3xl"
          >
            <h3 className="text-xl font-medium mb-4 text-foreground">The Journey</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I'm a passionate frontend architect with over 5 years of experience crafting digital products. 
              My journey started with a deep curiosity for how things work on the web, which evolved into 
              a relentless pursuit of building perfect user interfaces.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, I specialize in bridging the gap between design and engineering, ensuring that 
              every pixel serves a purpose and every interaction feels natural. I believe great software 
              is built at the intersection of robust architecture and beautiful design.
            </p>
          </motion.div>

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
