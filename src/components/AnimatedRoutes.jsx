import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import Skills from "../pages/Skills";
import Contact from "../pages/Contact";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Home /></motion.div>} />
        <Route path="/about" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><About /></motion.div>} />
        <Route path="/skills" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Skills /></motion.div>} />
        <Route path="/projects" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Projects /></motion.div>} />
        <Route path="/contact" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Contact /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
}