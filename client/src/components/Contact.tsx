import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, ExternalLink } from "lucide-react";
import { BackgroundGradient } from "@/components/ui/aceternity/background-gradient";
import { BackgroundBeams } from "@/components/ui/aceternity/background-beams";

export default function Contact() {
  const contactLinks = [
    {
      name: "Email",
      value: "tarangsachaniya8@gmail.com",
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:tarangsachaniya8@gmail.com",
    },
    {
      name: "GitHub",
      value: "github.com/tarangsachaniya",
      icon: <Github className="w-6 h-6" />,
      href: "https://github.com/tarangsachaniya",
    },
    {
      name: "LinkedIn",
      value: "linkedin.com/in/tarang-sachaniya",
      icon: <Linkedin className="w-6 h-6" />,
      href: "https://www.linkedin.com/in/tarang-sachaniya/",
    },
    {
      name: "Instagram",
      value: "@tarangsachaniya",
      icon: <Instagram className="w-6 h-6" />,
      href: "https://instagram.com/tarangsachaniya",
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <BackgroundBeams className="opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/[0.02] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold font-display mb-6 text-foreground"
          >
            Get in touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-xl mx-auto"
          >
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {contactLinks.map((link, idx) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <BackgroundGradient
                className="rounded-2xl p-0 bg-background"
                containerClassName="rounded-2xl"
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 rounded-2xl group w-full h-full"
                >
                  <div className="p-3 rounded-xl bg-foreground/5 text-foreground group-hover:bg-foreground group-hover:text-background transition-all duration-300 shrink-0">
                    {link.icon}
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <div className="text-xs font-medium text-muted-foreground mb-1">{link.name}</div>
                    <div className="text-sm font-medium text-foreground flex items-center gap-2 truncate">
                      <span className="truncate">{link.value}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-50 transition-opacity shrink-0" />
                    </div>
                  </div>
                </a>
              </BackgroundGradient>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
