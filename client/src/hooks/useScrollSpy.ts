import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[], navbarHeight = 80): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY + navbarHeight + 1;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [ids, navbarHeight]);

  return active;
}
