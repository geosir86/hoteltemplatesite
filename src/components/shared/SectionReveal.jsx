import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.23, 1, 0.32, 1];

export default function SectionReveal({ children, delay = 0, y = 60, className = '' }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? {} : { opacity: 0, y }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
