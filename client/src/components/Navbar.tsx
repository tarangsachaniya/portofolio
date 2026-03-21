import { useState } from "react";
import { Sun, Moon, Home, User, Zap, FolderGit2, Mail } from "lucide-react";
import { FloatingNav, NavItem } from "@/components/ui/aceternity/floating-nav";

const navItems: NavItem[] = [
  { name: "Home", link: "#home", icon: <Home className="w-4 h-4" /> },
  { name: "About", link: "#about", icon: <User className="w-4 h-4" /> },
  { name: "Skills", link: "#skills", icon: <Zap className="w-4 h-4" /> },
  { name: "Projects", link: "#projects", icon: <FolderGit2 className="w-4 h-4" /> },
  { name: "Contact", link: "#contact", icon: <Mail className="w-4 h-4" /> },
];

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "dark";
  });

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const themeToggle = (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-foreground/5 transition-colors text-foreground"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );

  return (
    <FloatingNav
      navItems={navItems}
      rightContent={themeToggle}
    />
  );
}
