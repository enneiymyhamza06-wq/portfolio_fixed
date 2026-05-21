import { motion } from "framer-motion";
import portfolio_img_part2 from "../assets/img_portfolio_part1.png";

const EASE = [0.22, 1, 0.36, 1];

export default function About() {
  const scrollToSkills = () => {
    const el = document.getElementById("skills");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black px-6 py-24 text-white sm:px-10 lg:px-16"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-[-5%] top-[-10%] h-[500px] w-[500px] rounded-full bg-orange-600/20 blur-[120px]" />
        <div className="absolute right-[-5%] bottom-[-10%] h-[450px] w-[450px] rounded-full bg-amber-500/15 blur-[100px]" />
        <div className="absolute left-[40%] top-[30%] h-[350px] w-[350px] rounded-full bg-orange-500/10 blur-[90px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(255,106,0,0.18),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(255,184,0,0.12),transparent_28%),radial-gradient(circle_at_60%_10%,rgba(255,120,0,0.10),transparent_22%)]" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] [background-size:200px]" />
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">

        {/* Image — slides in from the left */}
        <motion.div
          className="relative mx-auto w-full max-w-[480px]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <div className="absolute -inset-8 rounded-[2.5rem] bg-orange-500/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/5 p-3 shadow-[0_25px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-amber-300/10" />
            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#111]">
              <img
                src={portfolio_img_part2}
                alt="Hamza portrait"
                className="h-[500px] w-full object-cover object-center"
              />
            </div>

            <div className="absolute left-6 top-6 rounded-2xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.24em] text-orange-200/70">Based in</p>
              <p className="mt-1 text-sm font-semibold text-white">Casablanca, Morocco</p>
            </div>

            <div className="absolute bottom-6 right-6 rounded-2xl border border-orange-400/20 bg-orange-500/10 px-4 py-3 backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.24em] text-orange-200/70">Focus</p>
              <p className="mt-1 text-sm font-semibold text-white">Modern Web Interfaces</p>
            </div>
          </div>
        </motion.div>

        {/* Text — slides in from the right */}
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
        >
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-orange-400/15 bg-white/5 px-4 py-2 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500 shadow-[0_0_18px_rgba(255,106,0,0.85)]" />
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-orange-200/90">
              About Me
            </span>
          </div>

          <h2 className="text-4xl font-black leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-white via-orange-200 to-orange-500 bg-clip-text text-transparent">
              Designing and building
            </span>
            <span className="mt-2 block text-white/90">digital experiences with purpose.</span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-zinc-300/80 sm:text-lg">
            I'm Hamza, a web developer focused on creating clean, modern, and engaging
            interfaces backed by solid development practices. I enjoy turning ideas into
            polished web experiences that feel smooth, useful, and visually strong.
          </p>

          <p className="mt-4 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
            My approach blends thoughtful UI, responsive layouts, and practical
            implementation so each project looks refined and performs reliably across devices.
          </p>

          {/* Stat cards — staggered fade-up */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Core Stack", value: "React • Laravel" },
              { label: "Strength",   value: "UI / UX Thinking" },
              { label: "Goal",       value: "Scalable Web Apps" },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.25 + i * 0.1 }}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition duration-300 hover:border-orange-400/20 hover:bg-white/[0.07]"
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-orange-200/70">{card.label}</p>
                <p className="mt-3 text-lg font-semibold text-white">{card.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={scrollToSkills}
              className="rounded-full bg-orange-500 px-8 py-3.5 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-orange-400 hover:shadow-[0_0_35px_rgba(255,106,0,0.45)]"
            >
              My Skills
            </button>
            <a
              href="/cv.pdf"
              download="Hamza_Enneiymy_CV.pdf"
              className="rounded-full border border-white/15 bg-white/5 px-8 py-3.5 font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-orange-400/60 hover:bg-white/[0.07] hover:text-orange-300"
            >
              Download CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
