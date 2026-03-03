import { motion } from "framer-motion";
import { skillsData } from "@/lib/data";
import { Code2, Server, Wrench } from "lucide-react";

export default function Skills() {
  const categories = [
    { title: "Frontend", icon: <Code2 className="w-5 h-5" />, skills: skillsData.frontend },
    { title: "Backend", icon: <Server className="w-5 h-5" />, skills: skillsData.backend },
    { title: "Tools & DevOps", icon: <Wrench className="w-5 h-5" />, skills: skillsData.tools },
  ];

  return (
    <section id="skills" className="py-32 relative bg-black/40 border-y border-white/5">
      <div className="absolute inset-0 bg-grid-white opacity-[0.02]"></div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Technical Arsenal</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Tools and technologies I've mastered to bring ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-6 rounded-2xl group hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-lg bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-lg font-medium">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <motion.span
                    key={skillIdx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (idx * 0.1) + (skillIdx * 0.05) }}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-md text-sm text-neutral-300 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
