import { motion } from "framer-motion";
import { ArrowRight, Github, Instagram, Linkedin } from "lucide-react";
import profileImage from "@/assets/images/profile.jpeg";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-foreground/[0.03] via-background to-background"></div>
      
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[128px] opacity-50 animate-pulse"></div>
      <div className="absolute top-1/3 -right-64 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[128px] opacity-50 animate-pulse delay-700"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Picture Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-foreground/10 shadow-2xl">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 pointer-events-none"></div>
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                <span className="text-background font-bold text-sm">2.5 Yrs</span>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">Available for work</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight mb-8"
            >
              Digital Solutions
              <br />
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Full-Stack Engineer specializing in developing production-ready web applications using MERN, Laravel, and Python. Focused on performance optimization, intelligent API integrations, and clean architecture to deliver reliable, real-world software solutions.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button 
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative px-8 py-4 bg-foreground text-background rounded-full font-medium flex items-center gap-2 overflow-hidden w-full sm:w-auto justify-center transition-transform hover:scale-105"
              >
                <span className="relative z-10">View My Work</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 rounded-full font-medium glass hover:bg-foreground/5 transition-colors w-full sm:w-auto text-foreground"
              >
                Contact Me
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-muted-foreground"
            >
              <a href="https://github.com/tarangsachaniya" className="hover:text-foreground transition-colors p-2 hover:bg-foreground/5 rounded-full"><Github className="w-5 h-5" /></a>
              <a href="https://instagram.com/tarangsachaniya" className="hover:text-foreground transition-colors p-2 hover:bg-foreground/5 rounded-full"><Instagram className="w-5 h-5" /></a>
              <a href="https://www.linkedin.com/in/tarang-sachaniya/" className="hover:text-foreground transition-colors p-2 hover:bg-foreground/5 rounded-full"><Linkedin className="w-5 h-5" /></a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
