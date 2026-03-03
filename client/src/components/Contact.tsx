import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, ExternalLink } from "lucide-react";

export default function Contact() {
  const contactLinks = [
    {
      name: "Email",
      value: "hello@devportfolio.com",
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:hello@devportfolio.com"
    },
    {
      name: "GitHub",
      value: "github.com/devport",
      icon: <Github className="w-6 h-6" />,
      href: "https://github.com"
    },
    {
      name: "LinkedIn",
      value: "linkedin.com/in/devport",
      icon: <Linkedin className="w-6 h-6" />,
      href: "https://linkedin.com"
    },
    {
      name: "Twitter",
      value: "@devportfolio",
      icon: <Twitter className="w-6 h-6" />,
      href: "https://twitter.com"
    }
  ];

  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/[0.02]"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-6 text-foreground">Get in touch</h2>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
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
              className="glass-card p-8 rounded-3xl flex items-center gap-6 group hover:border-foreground/20"
            >
              <div className="p-4 rounded-2xl bg-foreground/5 text-foreground group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                {link.icon}
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-muted-foreground mb-1">{link.name}</div>
                <div className="text-lg font-medium text-foreground flex items-center gap-2">
                  {link.value}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
