import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Cursor({ accentColor = '#C9A84C' }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e) => setHov(!!e.target.closest('button,a,[data-hover]'));
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] hidden lg:block mix-blend-difference"
        style={{ backgroundColor: accentColor }}
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: hov ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] hidden lg:block"
        style={{ border: `1px solid ${accentColor}` }}
        animate={{ x: pos.x - 20, y: pos.y - 20, scale: hov ? 2.2 : 1, opacity: hov ? 0.4 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
    </>
  );
}
