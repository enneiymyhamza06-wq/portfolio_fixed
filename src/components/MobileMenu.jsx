import { motion, AnimatePresence } from "framer-motion";
import { HoverImageLinks } from "./HoverImageLinks";

export default function MobileMenu({ isOpen, onNavigate }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed top-[72px] left-0 right-0 bottom-0 z-40 overflow-y-auto md:hidden"
        >
          <HoverImageLinks onNavigate={onNavigate} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}