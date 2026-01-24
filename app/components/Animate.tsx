import { useState } from 'react';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';

export default function BackToTop() {
  const { scrollY } = useScroll();
  const [showButton, setShowButton] = useState(false);

  // Show button only after scrolling down 400px
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 400) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling animation
    });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-100 bg-red-600 text-white p-4 rounded-full shadow-2xl shadow-red-500/40 border-2 border-white/20 flex items-center justify-center group"
          aria-label="Back to top"
        >
          {/* Upward Arrow Icon */}
          <svg
            className="w-6 h-6 group-hover:-translate-y-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
