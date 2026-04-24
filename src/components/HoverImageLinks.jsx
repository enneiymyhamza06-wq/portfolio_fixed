import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import portfolio_img_part1 from "../assets/Use_this_image_portfolio_edit_.png";
import Use_this_image_portfolio_edit_ from "../assets/Use_this_image_portfolio_edit_.png";

export const HoverImageLinks = ({ onNavigate }) => {
  return (
    <section className="bg-neutral-950 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
<Link heading="Home" subheading="Back to the start" imgSrc={Use_this_image_portfolio_edit_} onNavigate={onNavigate} />        <Link heading="About"    subheading="Learn what we do here"       imgSrc="/imgs/random/6.jpg"  onNavigate={onNavigate} />
        <Link heading="Services" subheading="What we offer"               imgSrc="/imgs/random/4.jpg"  onNavigate={onNavigate} />
        <Link heading="Projects" subheading="Our work speaks for itself"  imgSrc="/imgs/random/5.jpg"  onNavigate={onNavigate} />
        <Link heading="Contact"  subheading="Get in touch"                imgSrc="/imgs/random/10.jpg" onNavigate={onNavigate} />
      </div>
    </section>
  );
};

const Link = ({ heading, imgSrc, subheading, onNavigate }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const top  = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  return (
    <motion.button
      ref={ref}
      onClick={() => onNavigate(heading)}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="w-full group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8"
    >
      <div>
        <motion.span
          variants={{ initial: { x: 0 }, whileHover: { x: -16 } }}
          transition={{ type: "spring", staggerChildren: 0.075, delayChildren: 0.25 }}
          className="relative z-10 block text-4xl font-bold text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              key={i}
              variants={{ initial: { x: 0 }, whileHover: { x: 16 } }}
              transition={{ type: "spring" }}
              className="inline-block"
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50">
          {subheading}
        </span>
      </div>

      {/* ✅ صورة غير على desktop */}
      <motion.img
        style={{ top, left, translateX: "-50%", translateY: "-50%" }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={portfolio_img_part1}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64 hidden md:block"
        alt={heading}
      />

      <motion.div
        variants={{ initial: { x: "25%", opacity: 0 }, whileHover: { x: "0%", opacity: 1 } }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
        <FiArrowRight className="text-5xl text-neutral-50" />
      </motion.div>
    </motion.button>
  );
};