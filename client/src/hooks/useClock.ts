import { useEffect, useState } from "react";

/** Live HH:MM in a given IANA zone, ticking once per minute boundary. */
export function useClock(timeZone: string) {
  const fmt = () =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    let id: number;
    const tick = () => {
      setTime(fmt());
      id = window.setTimeout(tick, 60_000 - (Date.now() % 60_000) + 50);
    };
    id = window.setTimeout(tick, 60_000 - (Date.now() % 60_000) + 50);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);
  return time;
}
