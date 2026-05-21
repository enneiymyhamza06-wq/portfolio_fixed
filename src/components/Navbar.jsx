import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import MobileMenu from "./MobileMenu";

const links = ["Home", "About", "Skills", "Projects", "Contact"];

const SPRING_CONFIG_TEXT = {
  type: "spring",
  stiffness: 320,
  damping: 32,
  mass: 1.3,
};

const EASE_CUBIC_CONFIG = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1],
};

function NavItem({ label, active, onClick }) {
  return (
    <li className="text-xs md:text-sm font-semibold">
      <motion.button
        onClick={onClick}
        className="relative px-3 py-2 rounded-md overflow-hidden block bg-transparent border-none cursor-pointer"
        initial="initial"
        whileHover="hover"
        variants={{ initial: {}, hover: {} }}
      >
        <span className="relative text-transparent select-none">{label}</span>

        <motion.span
          className={`absolute inset-0 w-full h-full flex items-center justify-center transition-colors duration-200 ${
            active ? "text-orange-500" : "text-gray-400"
          }`}
          style={{ zIndex: 2 }}
          initial={{ y: 0, scale: 1, rotate: 0 }}
          variants={{ hover: { y: -100, scale: 0.5, rotate: -30 } }}
          transition={SPRING_CONFIG_TEXT}
        >
          {label}
        </motion.span>

        <motion.span
          className="absolute inset-0 bg-orange-500 w-full h-full scale-x-150 overflow-hidden"
          style={{ zIndex: 1 }}
          initial={{ y: 100, rotate: -40 }}
          variants={{ hover: { y: 0, rotate: 0 } }}
          transition={EASE_CUBIC_CONFIG}
        >
          <motion.span
            className="absolute inset-0 bg-neutral-900 w-full h-full"
            initial={{ y: 150, rotate: -60 }}
            variants={{ hover: { y: 0, rotate: 0 } }}
            transition={EASE_CUBIC_CONFIG}
          />
        </motion.span>

        <motion.span
          className="absolute inset-0 flex items-center justify-center text-white"
          style={{ zIndex: 2 }}
          initial={{ y: 180, rotate: -60, scale: 0.5 }}
          variants={{ hover: { y: 0, rotate: 0, scale: 1 } }}
          transition={SPRING_CONFIG_TEXT}
        >
          {label}
        </motion.span>
      </motion.button>
    </li>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Auto-detect active section on scroll
  useEffect(() => {
    const observers = [];

    links.forEach((link) => {
      const el = document.getElementById(link.toLowerCase());
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(link);
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollTo = (id) => {
    setActive(id);
    setMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-3 bg-black/85 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-black/50" : ""
      }`}>

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="navLogoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
            <rect x="1" y="1" width="34" height="34" rx="10" fill="rgba(251,146,60,0.08)" stroke="url(#navLogoGrad)" strokeWidth="1.2" />
            <line x1="10.5" y1="10" x2="10.5" y2="26" stroke="url(#navLogoGrad)" strokeWidth="2.6" strokeLinecap="round" />
            <line x1="25.5" y1="10" x2="25.5" y2="26" stroke="url(#navLogoGrad)" strokeWidth="2.6" strokeLinecap="round" />
            <line x1="10.5" y1="18" x2="25.5" y2="18" stroke="url(#navLogoGrad)" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
          <div className="leading-none">
            <p className="text-[15px] font-black tracking-tight text-white leading-none">Hamza</p>
            <p className="mt-[3px] text-[9.5px] font-semibold tracking-[0.22em] text-orange-500 uppercase leading-none">Enneiymy</p>
          </div>
        </div>

        {/* Animated nav links — desktop */}
        <ul className="hidden md:flex items-center gap-1 list-none">
          {links.map((link) => (
            <NavItem
              key={link}
              label={link}
              active={active === link}
              onClick={() => scrollTo(link)}
            />
          ))}
        </ul>

        {/* Contact button — desktop */}
        <button
          onClick={() => scrollTo("Contact")}
          className="hidden md:block bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/40"
        >
          Contact Me
        </button>

        {/* Hamburger — mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-3xl focus:outline-none"
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </nav>

      <MobileMenu
        isOpen={menuOpen}
        active={active}
        onNavigate={scrollTo}
      />
    </>
  );
}