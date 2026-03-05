import { motion } from "framer-motion";
import { experienceData, educationData } from "@/lib/data";
import { Timeline, TimelineEntry } from "@/components/ui/aceternity/timeline";
import { Briefcase, GraduationCap, Rocket } from "lucide-react";


export default function About() {
  const timelineData: TimelineEntry[] = [
    {
      title: "Experience",
      content: (
        <div className="space-y-6">
          {experienceData.map((exp) => (
            <div key={exp.id} className="relative glass-card p-6 rounded-2xl overflow-hidden group hover:border-blue-500/30 transition-colors duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-500/0 rounded-l-2xl"></div>
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-1">{exp.period}</div>
                  <h4 className="text-base font-semibold text-foreground">{exp.role}</h4>
                  <div className="text-sm text-blue-400 font-medium">{exp.company}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-11">{exp.description}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Education",
      content: (
        <div className="space-y-6">
          {educationData.map((edu) => (
            <div key={edu.id} className="relative glass-card p-6 rounded-2xl overflow-hidden group hover:border-purple-500/30 transition-colors duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-purple-500/0 rounded-l-2xl"></div>
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-1">{edu.period}</div>
                  <h4 className="text-base font-semibold text-foreground">{edu.degree}</h4>
                  <div className="text-sm text-purple-400 font-medium">{edu.school}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-11">{edu.description}</p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">

        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 text-foreground">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        </div>

        {/* Journey Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl mb-16 overflow-hidden"
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 p-[1px]">
            <div className="absolute inset-0 rounded-3xl bg-background/80 backdrop-blur-xl"></div>
          </div>

          <div className="relative p-8 md:p-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-purple-400">
                <Rocket className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">The Journey</h3>
            </div>

            {/* Bio */}
            <p className="text-muted-foreground leading-relaxed mb-4 text-base">
              I am Tarang Sachaniya, a Computer Science and Engineering graduate (2025) with two and half years of professional experience as a Backend Developer at Prime Apps Infotech. I specialize in building scalable full-stack applications with a strong command over the MERN stack, particularly Next.js, Redux, and Zustand for advanced state management. Alongside JavaScript technologies, I have solid expertise in Laravel, PHP, and WordPress.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 text-base">
              I also work with Python for machine learning and image processing. Passionate about writing clean, efficient code — I focus on performance optimization, API integrations, and delivering production-ready solutions that solve real-world problems.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {["MERN Stack", "Laravel", "Python", "Next.js", "TypeScript", "REST APIs", "Docker", "MySQL"].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-3 py-1.5 text-xs rounded-full bg-foreground/5 border border-border text-muted-foreground hover:border-purple-400/40 hover:text-foreground transition-colors cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <Timeline data={timelineData} />
      </div>
    </section>
  );
}
