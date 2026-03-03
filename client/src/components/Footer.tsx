export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/5 relative z-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xl font-bold font-display tracking-tight text-white">
          Dev<span className="text-white/50">Port.</span>
        </div>
        
        <div className="text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
        
        <div className="flex items-center gap-4 text-sm text-neutral-500">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
