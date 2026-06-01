import { useEffect, useState } from "react";

interface Options {
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
}

/**
 * Cycles through `words`, typing then deleting each one — for the hero role line.
 * Returns the current partial string to render alongside a blinking caret.
 */
export function useTypewriter(
  words: string[],
  { typeSpeed = 90, deleteSpeed = 45, pause = 1400 }: Options = {}
): string {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const current = words[wordIndex % words.length];

    let delay: number;
    if (!deleting && text === current) {
      delay = pause;
    } else if (deleting && text === "") {
      delay = typeSpeed;
    } else {
      delay = deleting ? deleteSpeed : typeSpeed;
    }

    const timer = window.setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        const next = deleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1);
        setText(next);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return text;
}
