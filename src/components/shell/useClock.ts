"use client";
import { useEffect, useState } from "react";

export function useClock(timeZone = "Asia/Kolkata") {
  const [t, setT] = useState("--:--");
  useEffect(() => {
    const f = () => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone }).format(new Date());
    setT(f());
    const id = setInterval(() => setT(f()), 20_000);
    return () => clearInterval(id);
  }, [timeZone]);
  return t;
}
