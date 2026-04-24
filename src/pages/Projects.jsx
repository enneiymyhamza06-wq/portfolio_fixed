import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import restorant from "../assets/delicious.png";
import progect_yummy from "../assets/progect_yummy.png";
import moveis from "../assets/progect_movies.png";
import rashe from "../assets/rashe.png";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Full Stack",
    year: "2024",
    description: "Plateforme e-commerce complète avec panier, paiement.",
    tech: ["React", "sass"],
    image: restorant,
  },
  {
    id: 2,
    title: "progect_yummy",
    category: "Web App",
    year: "2024",
    description: "CMS personnalisé bach clients ydiro portfolio dyalhom.",
    tech: ["React", "Node.js"],
    image: progect_yummy,
  },
  {
    id: 3,
    title: "moveis",
    category: "moveis set web",
    year: "2023",
    description: "set wabe avec menu digital.",
    tech: ["React", "Stripe "],
    image: moveis,
  },
  {
    id: 4,
    title: "rashe",
    category: "Full Stack",
    year: "2023",
    description: "Platform immobilière avec recherche avancée.",
    tech: ["React", "Maps API"],
    image: rashe,
  }
];

const CARD_WIDTH = window.innerWidth > 768 ? 600 : 320;
const CARD_HEIGHT = window.innerWidth > 768 ? 450 : 400;






export default function Projects() {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [angle, setAngle] = useState(0);
  const [active, setActive] = useState(0);
  const [detail, setDetail] = useState(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startAngle = useRef(0);

  const count = projects.length;
  // Radius calculation for the INSIDE view cylinder
  // We use negative Z translation later, so radius determines how far the walls are
  const radius = Math.round((CARD_WIDTH / 2) / Math.tan(Math.PI / count)) + 150;
  const angleStep = 360 / count;

  // Drag to pan camera (looking around inside the room)
  useEffect(() => {
    if (!carouselOpen) return;

    const onMouseMove = (e) => {
      if (!dragging.current) return;
      // Reversed delta so dragging left turns camera right (natural panning)
      const delta = e.clientX - startX.current;
      setAngle(startAngle.current + delta * 0.4); 
    };
    const onMouseUp = () => { dragging.current = false; };
    const onTouchMove = (e) => {
      if (!dragging.current) return;
      const delta = e.touches[0].clientX - startX.current;
      setAngle(startAngle.current + delta * 0.4);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [carouselOpen]);

  useEffect(() => {
    const normalized = ((angle % 360) + 360) % 360;
    const idx = Math.round(normalized / angleStep) % count;
    setActive(idx);
  }, [angle, angleStep, count]);

  const rotateTo = (idx) => {
    const target = idx * angleStep;
    setAngle(target);
  };

  const next = () => rotateTo((active + 1) % count);
  const prev = () => rotateTo((active - 1 + count) % count);

  return (
    <section id="projects" className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">

      {/* Intro */}
      <motion.div className="text-center relative z-10" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="text-orange-500 text-xs tracking-[0.4em] uppercase mb-4 font-medium">Selected Work</p>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
          INSIDE <span className="text-orange-500">ROOM</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-10">Step inside the 360° gallery.</p>

        <button onClick={() => setCarouselOpen(true)} className="px-10 py-4 rounded-full border border-orange-500/50 text-white font-semibold text-sm tracking-widest uppercase hover:bg-orange-500 hover:text-black transition-all">
          Enter 360° Room
        </button>
      </motion.div>

      {/* ===== 360 PANORAMIC ROOM ===== */}
      <AnimatePresence>
        {carouselOpen && (
          <motion.div
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
          >
            {/* Ceiling and floor gradients to give room depth */}
            <div className="absolute top-0 w-full h-[30vh] bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 w-full h-[30vh] bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />

            <button onClick={() => { setCarouselOpen(false); setDetail(null); }} className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 text-white/50 hover:bg-orange-500 hover:text-black flex items-center justify-center z-50 transition-all cursor-none">
              ✕
            </button>
            {/* The Camera / Scene */}
            <div 
              className="relative z-10 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
              style={{
                // Perspective is strictly smaller than the negative translateZ radius
                // This places the viewer INSIDE the cylinder
                perspective: `${radius - 100}px`,
                perspectiveOrigin: "50% 50%",
              }}
              onMouseDown={(e) => { dragging.current = true; startX.current = e.clientX; startAngle.current = angle; }}
              onTouchStart={(e) => { dragging.current = true; startX.current = e.touches[0].clientX; startAngle.current = angle; }}
            >
              {/* The Room rotating around us */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  // Positive rotateY pans the camera
                  transform: `rotateY(${angle}deg)`,
                  transition: dragging.current ? "none" : "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
                }}
              >
                {projects.map((project, i) => {
                  const cardAngle = i * angleStep;
                  const isActive = i === active;
                  return (
                    <div
                      key={project.id}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: CARD_WIDTH,
                        height: CARD_HEIGHT,
                        
                        transform: `translate(-50%, -50%) rotateY(${-cardAngle}deg) translateZ(${-radius}px)`,
                        backfaceVisibility: "hidden", // Prevents seeing the back of the walls
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <motion.div 
                        className="w-full h-full relative group cursor-pointer"
                        animate={{ 
                          opacity: isActive ? 1 : 0.4,
                          scale: isActive ? 1 : 0.95
                        }}
                        transition={{ duration: 0.5 }}
                        onClick={() => {
                          if (!isActive) {
                            rotateTo(i);
                          } else {
                            setDetail(project);
                          }
                        }}
                      >
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/5"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-xl" />
                        
                        <div className="absolute bottom-8 left-8 right-8">
                          <p className="text-orange-500 text-xs tracking-widest uppercase mb-2">{project.category}</p>
                          <h3 className="text-3xl md:text-5xl font-black text-white mb-2">{project.title}</h3>
                          <motion.button 
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            onClick={(e) => { e.stopPropagation(); if (!isActive) { rotateTo(i); } else { setDetail(project); } }}
                            className="mt-4 px-6 py-2 bg-orange-500 text-black text-sm font-bold uppercase tracking-wider rounded-full hover:bg-white transition-colors"
                          >
                            {isActive ? "Explore Project" : "View"}
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation UI */}
            <div className="absolute bottom-12 flex items-center gap-6 z-30 pointer-events-auto">
              <button onClick={prev} className="w-12 h-12 rounded-full border border-white/20 hover:border-orange-500 text-white flex items-center justify-center transition-all bg-black/50 backdrop-blur-sm">
                ←
              </button>
              <div className="flex gap-3">
                {projects.map((_, i) => (
                  <button key={i} onClick={() => rotateTo(i)} className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-orange-500" : "w-2 bg-white/30"}`} />
                ))}
              </div>
              <button onClick={next} className="w-12 h-12 rounded-full border border-white/20 hover:border-orange-500 text-white flex items-center justify-center transition-all bg-black/50 backdrop-blur-sm">
                →
              </button>
            </div>
            <p className="absolute bottom-4 text-white/30 text-xs tracking-[0.2em] uppercase z-30 pointer-events-none">
              Drag left/right to look around
            </p>

            {/* DETAIL MODAL */}
            <AnimatePresence>
              {detail && (
                <motion.div className="absolute inset-0 z-[2000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <motion.div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8 max-w-lg w-full relative" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
                    <button onClick={() => setDetail(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-orange-500 hover:text-black flex items-center justify-center">✕</button>
                    <h3 className="text-3xl font-black text-white mb-2">{detail.title}</h3>
                    <p className="text-orange-500 text-xs tracking-widest uppercase mb-6">{detail.category}</p>
                    <p className="text-gray-400 mb-6">{detail.description}</p>
                    <div className="flex gap-2 mb-8">
                      {detail.tech.map(t => <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70">{t}</span>)}
                    </div>
                    <button className="w-full py-3 bg-orange-500 text-black font-bold uppercase rounded-lg hover:bg-white transition-colors">Visit Project</button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}