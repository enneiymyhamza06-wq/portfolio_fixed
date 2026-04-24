import { useEffect, useState } from "react";

export default function TypewriterText({ text, className, delay = 0 }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, 120);
    return () => clearTimeout(t);
  }, [started, displayed, text]);

  return (
    <span className={className}>
      {displayed}
      <span
        className={`inline-block w-[3px] h-[0.85em] ml-1 align-middle rounded-sm bg-orange-400 ${
          done ? "animate-pulse" : "opacity-100"
        }`}
      />
    </span>
  );
}