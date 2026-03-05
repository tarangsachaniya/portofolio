"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

export function FloatingNav({
  navItems,
  rightContent,
  className,
}: {
  navItems: NavItem[];
  rightContent?: React.ReactNode;
  className?: string;
}) {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setAtTop(currentScrollY < 50);
      if (currentScrollY < 50) {
        setVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex fixed top-6 inset-x-0 mx-auto z-[5000] w-fit",
          className
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center gap-1 px-4 py-2.5 rounded-full transition-all duration-300",
            atTop
              ? "bg-transparent"
              : "bg-background/80 backdrop-blur-md border border-border shadow-lg shadow-black/10"
          )}
        >
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.link.replace("#", ""));
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-foreground/5"
            >
              {item.icon && <span className="sm:hidden">{item.icon}</span>}
              <span className="hidden sm:inline">{item.name}</span>
            </a>
          ))}
          {rightContent && (
            <div className="ml-2 pl-2 border-l border-border">{rightContent}</div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
