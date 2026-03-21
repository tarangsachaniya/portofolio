import { motion } from "framer-motion";
import { ArrowRight, Github, Instagram, Linkedin } from "lucide-react";
import profileImage from "@/assets/images/profile.jpeg";
import { Spotlight } from "@/components/ui/aceternity/spotlight";
import { FlipWords } from "@/components/ui/aceternity/flip-words";
import { MovingBorderButton } from "@/components/ui/aceternity/moving-border";
import { BackgroundBeams } from "@/components/ui/aceternity/background-beams";

const flipWords = ["Full Stack Developer", "MERN Stack Expert", "Backend Engineer", "Laravel Developer"];

const socialLinks = [
  {
    href: "https://github.com/tarangsachaniya",
    label: "GitHub",
    icon: <Github className="w-4 h-4" />,
    color: "hover:border-foreground/40 hover:text-foreground dark:hover:border-white/40 dark:hover:text-white",
  },
  {
    href: "https://instagram.com/tarangsachaniya",
    label: "Instagram",
    icon: <Instagram className="w-4 h-4" />,
    color: "hover:border-pink-400/60 hover:text-pink-400",
  },
  {
    href: "https://www.linkedin.com/in/tarang-sachaniya/",
    label: "LinkedIn",
    icon: <Linkedin className="w-4 h-4" />,
    color: "hover:border-blue-400/60 hover:text-blue-400",
  },
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="hidden dark:block">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      </div>
      <BackgroundBeams />

      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[128px] opacity-40 animate-pulse pointer-events-none"></div>
      <div className="absolute top-1/3 -right-64 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[128px] opacity-40 animate-pulse pointer-events-none" style={{ animationDelay: "700ms" }}></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            <div className="relative">
              <div className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-40 dark:opacity-60"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl">
                <img src={profileImage} alt="Tarang Sachaniya" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                <span className="text-background font-bold text-sm text-center leading-tight">2.5 Yrs</span>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-green-500/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-green-400 tracking-widest uppercase">Available for work</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight mb-4"
            >
              Hi, I&apos;m Tarang
              <br />
              <FlipWords words={flipWords} className="text-purple-400" />
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Specializing in production-ready web applications using MERN, Laravel, and Python. Focused on performance optimization, intelligent API integrations, and clean architecture.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
            >
              {/* Primary — animated moving border */}
              <MovingBorderButton
                containerClassName="rounded-full h-auto w-auto"
                borderClassName="bg-[radial-gradient(ellipse_at_center,_#a855f7_0%,transparent_70%)]"
                className="px-8 py-3.5 text-sm font-semibold"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span className="flex items-center gap-2">
                  View My Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </MovingBorderButton>

              {/* Secondary */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="relative px-8 py-3.5 rounded-full text-sm font-semibold text-foreground border border-border/60 bg-foreground/5 backdrop-blur-sm hover:border-purple-400/40 hover:bg-purple-500/5 transition-all duration-300"
              >
                Contact Me
              </motion.button>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              {socialLinks.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group flex items-center gap-2 px-4 py-2.5 rounded-full border border-border/50 bg-background/40 backdrop-blur-sm text-muted-foreground transition-all duration-300 ${s.color}`}
                >
                  {s.icon}
                  <span className="text-xs font-medium">{s.label}</span>
                </motion.a>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
