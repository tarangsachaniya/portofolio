export default function Footer() {
  return (
    <footer className="py-8 border-t border-border relative z-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xl font-bold font-display tracking-tight text-foreground">
          Tarang<span className="opacity-50">Sachaniya.</span>
        </div>
        
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="https://instagram.com/tarangsachaniya" className="hover:text-foreground transition-colors">Instagram</a>
          <a href="https://github.com/tarangsachaniya" className="hover:text-foreground transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/tarang-sachaniya/" className="hover:text-foreground transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
