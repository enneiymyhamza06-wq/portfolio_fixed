import { useEffect, useRef, useState } from "react";
import Grainient from "../components/Grainient.jsx";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaPhp } from "react-icons/fa";
import { SiLaravel } from "react-icons/si";
import portfolio_img_part1 from "../assets/Use_this_image_portfolio_edit_.png";
import ParticlesBackground from "../components/ParticlesBackground.jsx";
import TypewriterText from "../components/TypewriterText.jsx";



const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socials = [
  { icon: <GithubIcon />,    href: "https://github.com/enneiymyhamza06-wq", color: "rgba(255,255,255,0.9)", glow: "rgba(255,255,255,0.15)" },
  { icon: <LinkedinIcon />,  href: "https://www.linkedin.com/in/hamza-enneiymy-216a853b3/", color: "rgba(10,102,194,0.9)",  glow: "rgba(10,102,194,0.25)" },
  { icon: <InstagramIcon />, href: "https://www.instagram.com/en_hmz1/", color: "rgba(225,48,108,0.9)",  glow: "rgba(225,48,108,0.25)" },
  { icon: <TwitterIcon />,   href: "https://x.com/HamzaE7888", color: "rgba(255,255,255,0.9)", glow: "rgba(255,255,255,0.12)" },
];

// ── Animated counter hook ──────────────────────────────────────────
function useCounter(target, duration = 1400, delay = 0, enabled = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setCount(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay, enabled]);
  return count;
}

// ── Stat card component ────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
function StatCard({ value, suffix = "", label, icon, delay, visible }) {
  const count = useCounter(value, 1400, delay, visible);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "11px 16px",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "linear-gradient(135deg, rgba(18,18,18,0.94), rgba(28,28,28,0.72))",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: "0 8px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
        whiteSpace: "nowrap",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(14px) scale(0.94)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>{icon}</span>
      <div>
        <div style={{
          fontSize: "1.1rem",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          background: "linear-gradient(90deg, #fff 30%, #ffb347)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1.15,
        }}>
          {count}{suffix}
        </div>
        <div style={{
          fontSize: "0.6rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.32)",
          textTransform: "uppercase",
          marginTop: "2px",
        }}>
          {label}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
export default function Home() {
  const orbitRef         = useRef(null);
  const boostIntervalRef = useRef(null);
  const resetFrameRef    = useRef(null);
  const currentSpeedRef  = useRef(34);
  const [, setStatsVisible] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const setOrbitSpeed = (value) => {
    currentSpeedRef.current = value;
    if (orbitRef.current) {
      orbitRef.current.style.setProperty("--orbit-duration", `${value}s`);
    }
  };

  const startBoost = () => {
    clearInterval(boostIntervalRef.current);
    cancelAnimationFrame(resetFrameRef.current);
    boostIntervalRef.current = setInterval(() => {
      const next = Math.max(6, currentSpeedRef.current - 0.75);
      setOrbitSpeed(next);
    }, 180);
  };

  const stopBoost = () => {
    clearInterval(boostIntervalRef.current);
    const animateBack = () => {
      const current = currentSpeedRef.current;
      if (current < 34) {
        const next = Math.min(34, current + 0.45);
        setOrbitSpeed(next);
        resetFrameRef.current = requestAnimationFrame(animateBack);
      }
    };
    resetFrameRef.current = requestAnimationFrame(animateBack);
  };

  useEffect(() => {
    setOrbitSpeed(34);
    // Stats appear after typewriter finishes (≈1.8s)
    const t = setTimeout(() => setStatsVisible(true), 1800);
    return () => {
      clearInterval(boostIntervalRef.current);
      cancelAnimationFrame(resetFrameRef.current);
      clearTimeout(t);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-black text-white">

       <div className="absolute inset-0 z-0">
        <Grainient
          color1="#ff6a00"
          color2="#050505"
          color3="#f4b400"
          timeSpeed={0.8}
          colorBalance={0.15}
          warpStrength={1.2}
          warpFrequency={3}
          warpSpeed={3}
          warpAmplitude={30}
          blendAngle={20}
          blendSoftness={0.25}
          rotationAmount={300}
          noiseScale={1.4}
          grainAmount={0.08}
          grainScale={1.8}
          grainAnimated={true}
          contrast={1.3}
          gamma={1}
          saturation={1.1}
          centerX={0.1}
          centerY={-0.1}
          zoom={1}
        />
      </div>
      <ParticlesBackground />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_20%_30%,rgba(255,106,0,0.28),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(255,200,0,0.18),transparent_22%),radial-gradient(circle_at_70%_75%,rgba(255,106,0,0.18),transparent_24%)]" />
      <div className="absolute inset-0 z-[3] bg-black/35" />
      <div className="absolute left-[8%] top-[18%] z-[4] h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="absolute right-[8%] bottom-[12%] z-[4] h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

       <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between gap-16 px-6 pb-16 pt-28 sm:px-10 lg:flex-row lg:px-16">

         <div className="max-w-2xl text-center lg:text-left">

           <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-orange-400/15 bg-white/5 px-4 py-2 text-left backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500 shadow-[0_0_18px_rgba(255,106,0,0.85)]" />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-orange-200/90">
              Available for work
            </span>
          </div>

          {/* Headline */}
          <h1 className="max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            <TypewriterText
              text="I'm Hamza"
              delay={300}
              className="block bg-gradient-to-r from-white via-orange-200 to-orange-500 bg-clip-text text-transparent"
            />
            <TypewriterText
              text="full stack developer"
              delay={1200}
              className="block text-white/90"
            />
          </h1>

           <p className="mt-7 max-w-xl text-base leading-8 text-zinc-200/75 sm:text-lg">
            React on the front, Laravel in the back — building products
            that are fast, clean, and built to last. Based in Morocco 🇲🇦
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <button
              onClick={() => scrollTo("projects")}
              className="rounded-full bg-orange-500 px-8 py-3.5 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-orange-400 hover:shadow-[0_0_35px_rgba(255,106,0,0.45)]"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="rounded-full border border-white/25 bg-white/5 px-8 py-3.5 font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-orange-400/60 hover:bg-white/[0.07] hover:text-orange-300"
            >
              Let&apos;s Talk
            </button>
          </div>

           <div className="mt-10 flex items-center justify-center gap-3 lg:justify-start">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                style={{ "--glow": s.glow, "--icon-color": s.color }}
                className="group relative flex h-[68px] w-[68px] items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-white/70 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-white/[0.16] hover:bg-white/[0.08] hover:text-[var(--icon-color)] hover:shadow-[0_0_24px_var(--glow),0_8px_32px_rgba(0,0,0,0.4)] active:translate-y-0 active:scale-95 [box-shadow:0_4px_0_rgba(0,0,0,0.5),0_8px_24px_rgba(0,0,0,0.3)]"
              >
                {/* shimmer sweep */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute -inset-full top-0 h-[200%] w-[60%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-[400%]" />
                </div>
                {/* top edge highlight */}
                <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative z-10 scale-[1.2] transition-transform duration-300 group-hover:scale-[1.35]">
                  {s.icon}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* ──── RIGHT: photo + orbit + floating stat cards ──── */}
        <div className="relative flex items-center justify-center">
           <div className="absolute h-[430px] w-[430px] rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute h-[540px] w-[540px] rounded-full border border-orange-400/10" />
          <div className="absolute h-[470px] w-[470px] rounded-full border border-white/5" />
          <div className="absolute inset-0 scale-125 rounded-full bg-[radial-gradient(circle,rgba(255,160,60,0.16)_0%,transparent_60%)] blur-2xl" />

           <div ref={orbitRef} className="icon-orbit">
            <div className="icon-orbit-item item-1"><div className="tech-orbit-badge html"><FaHtml5 size={26} /></div></div>
            <div className="icon-orbit-item item-2"><div className="tech-orbit-badge css"><FaCss3Alt size={26} /></div></div>
            <div className="icon-orbit-item item-3"><div className="tech-orbit-badge js"><FaJs size={26} /></div></div>
            <div className="icon-orbit-item item-4"><div className="tech-orbit-badge react"><FaReact size={26} /></div></div>
            <div className="icon-orbit-item item-5"><div className="tech-orbit-badge php"><FaPhp size={26} /></div></div>
            <div className="icon-orbit-item item-6"><div className="tech-orbit-badge laravel"><SiLaravel size={24} /></div></div>
          </div>

           <div
            className="fire-frame relative z-10 h-[320px] w-[320px] overflow-hidden rounded-full border-2 border-orange-400/20 bg-black/20 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-md sm:h-[390px] sm:w-[390px]"
            onMouseEnter={startBoost}
            onMouseLeave={stopBoost}
          >
            <div className="fire-glow" />
            <div className="fire-overlay" />
            <div className="absolute inset-[10px] z-10 rounded-full border border-white/10" />
            <img
              src={portfolio_img_part1}
              alt="Hamza portrait"
              className="h-full w-full object-cover object-center scale-[1.03]"
            />
          </div>
 
        </div>
      </div>

       <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
        <span className="text-[10px] uppercase tracking-[0.22em] text-white/60">Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>

    </section>
  );
}