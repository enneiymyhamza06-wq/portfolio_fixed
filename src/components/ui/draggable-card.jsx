import { useRef } from "react";
import { motion } from "framer-motion";

export function DraggableCardContainer({ className, children }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function DraggableCardBody({ className, children, onClick }) {
  const dragStart = useRef(null);

  return (
    <motion.div
      className={`cursor-grab active:cursor-grabbing ${className}`}
      drag
      dragMomentum={false}
      dragElastic={0.08}
      whileDrag={{ scale: 1.06, zIndex: 50 }}
      onDragStart={() => { dragStart.current = Date.now(); }}
      onDragEnd={() => {
        if (Date.now() - (dragStart.current || 0) < 150) {
          onClick?.();
        }
      }}
      style={{ position: "absolute", userSelect: "none" }}
    >
      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-shadow hover:border-orange-400/20 hover:shadow-[0_8px_32px_rgba(255,106,0,0.12)]">
        {children}
      </div>
    </motion.div>
  );
}
