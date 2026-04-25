import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function MagneticCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth out the cursor movement
  const springX = useSpring(pos.x, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(pos.y, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    const updatePosition = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, [data-magnetic]')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          width: isHovered ? 64 : 12,
          height: isHovered ? 64 : 12,
          opacity: isHovered ? 0.3 : 1,
          backgroundColor: isHovered ? '#ffffff' : '#ffffff',
          mixBlendMode: isHovered ? 'difference' : 'normal'
        }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}

