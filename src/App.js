import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      setShowBackTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div key="loading" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <LoadingScreen onComplete={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
          <CustomCursor />

          {/* scroll progress bar */}
          <div className="fixed top-0 left-0 right-0 h-[3px] z-[99999] bg-white/5">
            <motion.div
              className="h-full"
              style={{
                width: `${scrollProgress}%`,
                background: "linear-gradient(90deg, #f97316, #fb923c, #fdba74)",
              }}
            />
          </div>

          <Navbar />

          <main>
            <Home />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>

          <AnimatePresence>
            {showBackTop && (
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-[0_0_25px_rgba(249,115,22,0.35)] hover:bg-orange-400 transition-all duration-300 cursor-none"
              >
                ↑
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default App;