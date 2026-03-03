import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, ExternalLink } from "lucide-react";

export default function Contact() {
  const contactLinks = [
    {
      name: "Email",
      value: "tarangsachaniya8@gmail.com",
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:tarangsachaniya8@gmail.com"
    },
    {
      name: "GitHub",
      value: "github.com/tarangsachaniya",
      icon: <Github className="w-6 h-6" />,
      href: "https://github.com/tarangsachaniya"
    },
    {
      name: "LinkedIn",
      value: "linkedin.com/in/tarang-sachaniya",
      icon: <Linkedin className="w-6 h-6" />,
      href: "https://www.linkedin.com/in/tarang-sachaniya/"
    },
    {
      name: "Instagram",
      value: "@tarangsachaniya",
      icon: <Instagram className="w-6 h-6" />,
      href: "https://instagram.com/tarangsachaniya"
    }
  ];

  return (
    <section id="contact" className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/[0.02]"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-6 text-foreground">Get in touch</h2>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
          {contactLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl flex items-center gap-4 md:gap-6 group hover:border-foreground/20"
            >
              <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-foreground/5 text-foreground group-hover:bg-foreground group-hover:text-background transition-all duration-300 shrink-0">
                {link.icon}
              </div>
              <div className="text-left min-w-0">
                <div className="text-xs md:text-sm font-medium text-muted-foreground mb-0.5 md:mb-1">{link.name}</div>
                <div className="text-base md:text-lg font-medium text-foreground flex items-center gap-2 truncate">
                  <span className="truncate">{link.value}</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity shrink-0" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
