import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [trails, setTrails] = useState([]);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 35 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 35 });

  const trailX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const trailY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Add trail particle
      const id = Date.now();
      setTrails((prev) => [...prev.slice(-10), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setTrails((prev) => prev.filter((t) => t.id !== id));
      }, 600);
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    // Magnetic effect on interactive elements
    const interactives = document.querySelectorAll("button, a, [data-magnetic]");
    const handleEnter = () => setHovered(true);
    const handleLeave = () => setHovered(false);

    interactives.forEach((el) => {
      el.style.cursor = "none";
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Trail particles */}
      {trails.map((trail, i) => (
        <motion.div
          key={trail.id}
          className="fixed top-0 left-0 pointer-events-none rounded-full bg-orange-500"
          style={{
            x: trail.x - 4,
            y: trail.y - 4,
            width: 8,
            height: 8,
            zIndex: 9998,
            opacity: (i + 1) / trails.length,
            scale: (i + 1) / trails.length,
          }}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full border border-orange-500"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9999,
        }}
        animate={{
          width: hovered ? 56 : clicked ? 20 : 36,
          height: hovered ? 56 : clicked ? 20 : 36,
          opacity: hovered ? 0.4 : 0.7,
          borderWidth: hovered ? 2 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />

      {/* Inner dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full bg-orange-500"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9999,
        }}
        animate={{
          width: clicked ? 16 : hovered ? 10 : 8,
          height: clicked ? 16 : hovered ? 10 : 8,
          opacity: hovered ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </>
  );
}