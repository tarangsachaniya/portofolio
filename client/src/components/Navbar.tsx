import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Priinteve", id: "priinteve" },
  { name: "Work", id: "work" },
  { name: "Stack", id: "skills" },
  { name: "Contact", id: "contact" },
];

const sectionIds = navItems.map((n) => n.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState<string | null>(null);
  const spyActive = useScrollSpy(sectionIds);
  const active = clicked ?? spyActive;
  const { theme, toggle } = useTheme();

  useEffect(() => {
    if (clicked && spyActive === clicked) setClicked(null);
  }, [spyActive, clicked]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && sectionIds.includes(hash)) {
      setTimeout(
        () =>
          document
            .getElementById(hash)
            ?.scrollIntoView({ behavior: "smooth", block: "start" }),
        300,
      );
    }
  }, []);

  const handleNav = (id: string) => {
    const wasOpen = open;
    setOpen(false);
    setClicked(id);
    history.pushState(null, "", `#${id}`);
    // wait for the drawer collapse before scrolling, or the target moves mid-scroll
    setTimeout(
      () =>
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      wasOpen ? 300 : 0,
    );
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border glass"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <button
          onClick={() => handleNav("home")}
          className="flex items-center gap-2.5"
          aria-label="Home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/40 bg-card font-display text-sm font-extrabold text-accent">
            TS
          </span>
          <span className="hidden font-mono text-[13px] text-muted-foreground sm:block">
            tarang<span className="text-accent">.dev</span>
          </span>
        </button>

        <ul className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
                  className={cn(
                    "relative rounded-md px-3.5 py-2 font-mono text-[13px] transition-colors",
                    isActive
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.name}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 -bottom-px h-px origin-left bg-accent transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <span className="font-mono text-[11px] capitalize text-muted-foreground md:hidden">
            {active}
          </span>

          <button
            onClick={toggle}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-0.5 px-6 py-4">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNav(item.id)}
                      className={cn(
                        "relative w-full overflow-hidden rounded-md px-4 py-3 text-left font-mono text-sm transition-colors",
                        isActive
                          ? "bg-accent/10 text-accent"
                          : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
                      )}
                    >
                      {isActive && (
                        <span
                          aria-hidden
                          className="absolute inset-y-0 left-0 w-0.5 bg-accent"
                        />
                      )}
                      {item.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
