import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { LampContainer } from "../components/lamp";

const skillsData = {
  frontend: ["React", "JavaScript", "Tailwind CSS", "HTML5 / CSS3"],
  backend: ["Laravel", "PHP", "MySQL", "REST APIs"],
  c: ["Pointers", "Memory Mgmt", "Algorithms", "Data Structures"],
  learning: ["TypeScript", "Next.js", "Docker", "PostgreSQL"],
};

const CubeFace = ({ className, label, icon, items }) => (
  <div className={`cube-face ${className}`}>
    <div className="face-content">
      <div className="face-icon">{icon}</div>
      <div className="face-title">{label}</div>
      <ul className="face-skills">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  </div>
);

export default function Skills() {
  const cubeRef = useRef(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const rotX = useRef(-15);
  const rotY = useRef(25);
  const animFrameRef = useRef(null);
  const autoSpeedRef = useRef(0.18);

  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;

    const animate = () => {
      if (!isDragging.current) rotY.current += autoSpeedRef.current;
      cube.style.transform = `rotateX(${rotX.current}deg) rotateY(${rotY.current}deg)`;
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);

    const onMouseDown  = (e) => { isDragging.current = true; lastX.current = e.clientX; lastY.current = e.clientY; autoSpeedRef.current = 0; };
    const onMouseMove  = (e) => { if (!isDragging.current) return; rotY.current += (e.clientX - lastX.current) * 0.5; rotX.current -= (e.clientY - lastY.current) * 0.5; lastX.current = e.clientX; lastY.current = e.clientY; };
    const onMouseUp    = ()  => { isDragging.current = false; autoSpeedRef.current = 0.18; };
    const onTouchStart = (e) => { isDragging.current = true; lastX.current = e.touches[0].clientX; lastY.current = e.touches[0].clientY; autoSpeedRef.current = 0; };
    const onTouchMove  = (e) => { if (!isDragging.current) return; rotY.current += (e.touches[0].clientX - lastX.current) * 0.5; rotX.current -= (e.touches[0].clientY - lastY.current) * 0.5; lastX.current = e.touches[0].clientX; lastY.current = e.touches[0].clientY; };
    const onTouchEnd   = ()  => { isDragging.current = false; autoSpeedRef.current = 0.18; };

    cube.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    cube.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      cube.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      cube.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section id="skills" className="relative overflow-hidden bg-[#030303] text-white pt-20">

      
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

            <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="bg-gradient-to-br from-orange-200 to-orange-500 py-4 bg-clip-text text-center font-black tracking-tight text-transparent text-5xl md:text-7xl"
        >
          My Skills
        </motion.h1>
      </LampContainer>

            <div className="skills-body">  <div className="skills-text">
          <div className="tag-label">My Skills</div>
          <h2>
            <span className="grad-text">Crafting digital</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.9)" }}>experiences</span>
          </h2>
          <p>
            I&apos;m a full stack developer passionate about building clean, fast,
            and modern web applications. I love turning ideas into polished
            products from database to UI.
          </p>
          <p>
            Currently also leveling up in{" "}
            <span>C programming</span>{" "}
            — sharpening my understanding of low-level logic, memory, and algorithms.
          </p>
          <div className="tag-pills">
            {["Full Stack", "React", "Laravel", "C Language"].map((tag) => (
              <span key={tag} className="pill">{tag}</span>
            ))}
          </div>
        </div>

        
        <div className="cube-scene">
          <div className="cube-top-label"><span>Full Stack</span></div>
          <div className="cube-wrap">
            <div ref={cubeRef} className="cube">
              <CubeFace className="face-front" label="Frontend"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>}
                items={skillsData.frontend} />
              <CubeFace className="face-back" label="C Language"
                icon={<svg viewBox="0 0 24 24" width="28" height="28"><text x="2" y="20" fontSize="19" fontFamily="monospace" fontWeight="bold" fill="rgba(255,160,60,0.9)">C</text></svg>}
                items={skillsData.c} />
              <CubeFace className="face-left" label="Backend"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>}
                items={skillsData.backend} />
              <CubeFace className="face-right" label="Learning"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>}
                items={skillsData.learning} />
              <CubeFace className="face-top" label="Full Stack"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>}
                items={[]} />
              <CubeFace className="face-bottom" label="" icon={null} items={[]} />
            </div>
          </div>
          <p className="cube-hint">drag to rotate</p>
        </div>
      </div>

      <style>{`
        .skills-body { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; gap: 48px; padding: 0 24px 80px; max-width: 1100px; margin: 0 auto; }
        @media(min-width:700px) { .skills-body { flex-direction: row; align-items: center; justify-content: center; gap: 80px; } }
        .skills-text { max-width: 460px; text-align: center; }
        @media(min-width:700px) { .skills-text { text-align: left; } }
        .tag-label { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(255,160,60,0.8); margin-bottom: 18px; }
        .skills-text h2 { font-size: clamp(32px,5vw,52px); font-weight: 900; line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 20px; }
        .grad-text { background: linear-gradient(to right,#fff,#ffe0b0,#ff9500); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .skills-text p { font-size: 15px; line-height: 1.9; color: rgba(255,255,255,0.5); margin-bottom: 12px; }
        .skills-text p span { color: rgba(255,160,80,0.9); font-weight: 600; }
        .tag-pills { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 22px; justify-content: center; }
        @media(min-width:700px) { .tag-pills { justify-content: flex-start; } }
        .pill { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; color: rgba(255,180,80,0.8); padding: 5px 15px; border: 1px solid rgba(255,106,0,0.18); border-radius: 999px; background: rgba(255,106,0,0.05); }
        .cube-scene { display: flex; flex-direction: column; align-items: center; user-select: none; flex-shrink: 0; }
        .cube-top-label { margin-bottom: 12px; }
        .cube-top-label span { font-size: 10px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(255,160,60,0.75); padding: 4px 14px; border: 1px solid rgba(255,106,0,0.2); border-radius: 999px; background: rgba(255,106,0,0.06); }
        .cube-wrap { perspective: 900px; }
        .cube { width: 300px; height: 300px; position: relative; transform-style: preserve-3d; cursor: grab; }
        .cube:active { cursor: grabbing; }
        .cube-face { position: absolute; width: 300px; height: 300px; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .cube-face::before { content: ''; position: absolute; inset: 0; border-radius: 20px; background: linear-gradient(135deg,rgba(255,255,255,0.04) 0%,transparent 60%); pointer-events: none; }
        .face-front  { background: rgba(255,106,0,0.08);  transform: translateZ(150px); border-color: rgba(255,106,0,0.2); }
        .face-back   { background: rgba(28,28,28,0.88);   transform: rotateY(180deg) translateZ(150px); }
        .face-left   { background: rgba(244,180,0,0.07);  transform: rotateY(-90deg) translateZ(150px); border-color: rgba(244,180,0,0.18); }
        .face-right  { background: rgba(18,18,28,0.88);   transform: rotateY(90deg) translateZ(150px); }
        .face-top    { background: rgba(255,106,0,0.12);  transform: rotateX(90deg) translateZ(150px); border-color: rgba(255,106,0,0.25); }
        .face-bottom { background: rgba(8,8,8,0.95);      transform: rotateX(-90deg) translateZ(150px); }
        .face-content { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 24px 20px; text-align: center; }
        .face-icon { color: rgba(255,160,60,0.88); }
        .face-title { font-size: 12px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.92); }
        .face-skills { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 5px; }
        .face-skills li { font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.6); padding: 4px 12px; border-radius: 999px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07); }
        .cube-hint { margin-top: 16px; font-size: 9.5px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.18); }
        @media(max-width:640px) {
          .cube,.cube-face { width: 230px; height: 230px; }
          .face-front  { transform: translateZ(115px); }
          .face-back   { transform: rotateY(180deg) translateZ(115px); }
          .face-left   { transform: rotateY(-90deg) translateZ(115px); }
          .face-right  { transform: rotateY(90deg) translateZ(115px); }
          .face-top    { transform: rotateX(90deg) translateZ(115px); }
          .face-bottom { transform: rotateX(-90deg) translateZ(115px); }
        }
      `}</style>
    </section>
  );
}