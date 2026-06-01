import { useEffect, useState } from "react";

const getScrollY = () =>
  window.pageYOffset ?? document.documentElement.scrollTop ?? document.body.scrollTop ?? 0;

export function useScrollSpy(ids: string[], navbarHeight = 80): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const update = () => {
      const scrollY = getScrollY() + navbarHeight + 1;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + getScrollY();
          if (top <= scrollY) current = id;
        }
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    document.addEventListener("scroll", update, { passive: true });
    window.addEventListener("touchmove", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      document.removeEventListener("scroll", update);
      window.removeEventListener("touchmove", update);
    };
  }, [ids, navbarHeight]);

  return active;
}
