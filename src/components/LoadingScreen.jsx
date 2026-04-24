import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 400);
          return 100;
        }
        return prev + 1.2;
      });
    }, 18);

    // Glitch effect random
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
    };
  }, []);

  useEffect(() => {
    if (done) {
      setTimeout(() => onComplete(), 900);
    }
  }, [done, onComplete]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background subtle grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Glow behind name */}
          <div className="absolute w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />

          {/* Name with glitch */}
          <div className="relative mb-2 select-none">
            {/* Glitch layers */}
            {glitch && (
              <>
                <span
                  className="absolute text-5xl md:text-7xl font-black text-orange-500 tracking-widest"
                  style={{
                    transform: "translate(-3px, 1px)",
                    clipPath: "polygon(0 30%, 100% 30%, 100% 50%, 0 50%)",
                    opacity: 0.7,
                  }}
                >
                  HAMZA
                </span>
                <span
                  className="absolute text-5xl md:text-7xl font-black text-cyan-400 tracking-widest"
                  style={{
                    transform: "translate(3px, -1px)",
                    clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
                    opacity: 0.5,
                  }}
                >
                  HAMZA
                </span>
              </>
            )}

            {/* Main name */}
            <motion.h1
              className="text-5xl md:text-7xl font-black text-white tracking-widest uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              HAMZA
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-orange-500 text-sm tracking-[0.4em] uppercase mb-16 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Full Stack Developer
          </motion.p>

          {/* Progress bar */}
          <div className="w-64 md:w-80 flex flex-col gap-2">
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-orange-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-white/20 text-xs tracking-widest uppercase">Loading</span>
              <span className="text-orange-500 text-xs font-mono">
                {Math.min(Math.floor(progress), 100)}%
              </span>
            </div>
          </div>
          <motion.div
            className="absolute top-0 left-0 right-0 h-16 bg-black"
            animate={done ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-16 bg-black"
            animate={done ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}