import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useState } from 'react';

export default function StickyBookingBar({ title, rating, reviewCount, price, currency, accentColor, fgColor, bgColor }) {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();

  useMotionValueEvent(scrollY, 'change', (v) => setVisible(v > 100));

  return (
    <motion.div
      initial={false}
      animate={visible ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 35 }}
      className="fixed top-0 left-0 right-0 z-40 px-6 md:px-10 py-3 flex items-center justify-between shadow-lg"
      style={{ backgroundColor: bgColor, borderBottom: `1px solid ${accentColor}22` }}
    >
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold" style={{ color: fgColor }}>{title}</span>
        <div className="hidden md:flex items-center gap-1">
          <Star size={12} fill={accentColor} color={accentColor} />
          <span className="text-xs font-bold" style={{ color: accentColor }}>{rating}</span>
          <span className="text-xs" style={{ color: fgColor, opacity: 0.5 }}>({reviewCount}+)</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-bold" style={{ color: fgColor }}>
          {currency}{price} <span className="font-normal text-xs" style={{ opacity: 0.6 }}>/night</span>
        </span>
        <motion.button
          data-hover
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          className="text-xs font-bold tracking-widest px-5 py-2 rounded-full cursor-pointer"
          style={{ backgroundColor: accentColor, color: bgColor }}
        >
          BOOK
        </motion.button>
      </div>
    </motion.div>
  );
}
