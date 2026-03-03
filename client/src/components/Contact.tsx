import { motion } from "framer-motion";
import { Mail, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/[0.02]"></div>
      
      <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-8">
            <MessageSquare className="w-8 h-8 text-neutral-300" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">Let's work together</h2>
          <p className="text-xl text-neutral-400 mb-12 max-w-xl mx-auto">
            I'm currently available for freelance work and open to new full-time opportunities. 
            If you have a project that needs some magic, I'd love to hear about it.
          </p>

          <form className="glass-card p-8 md:p-12 rounded-3xl text-left space-y-6 max-w-2xl mx-auto relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="grid md:grid-cols-2 gap-6 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-neutral-600"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-neutral-600"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2 relative z-10">
              <label className="text-sm font-medium text-neutral-400">Message</label>
              <textarea 
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none placeholder:text-neutral-600"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            
            <button type="button" className="w-full py-4 bg-white text-black font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors relative z-10 group/btn">
              <span>Send Message</span>
              <Mail className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
