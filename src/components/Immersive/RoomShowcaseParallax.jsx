import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function RoomShowcaseParallax({ title, description, imageUrl, reverse = false, index = 0, theme = {} }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.4, 1], [1.25, 1.08, 1.15]);
  
  const textY = useTransform(scrollYProgress, [0.1, 0.5], ['80px', '0px']);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  const ordinal = String(index + 1).padStart(2, '0');

  const headingStyle = theme.fontHeading ? { fontFamily: theme.fontHeading } : {};
  const bodyStyle = theme.fontBody ? { fontFamily: theme.fontBody } : {};
  const accentColor = theme.primary || '#ffffff';

  return (
    <section 
      ref={containerRef} 
      className={`relative py-20 md:py-32 px-6 md:px-16 text-white flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-20 min-h-[90vh]`}
      style={{ backgroundColor: theme.secondary || '#000000' }}
    >
      <div className="w-full md:w-[55%] h-[55vh] md:h-[80vh] overflow-hidden relative flex-shrink-0">
        <motion.div
          className="absolute inset-0 z-10 origin-right"
          style={{ 
            scaleX: useTransform(scrollYProgress, [0.05, 0.35], [1, 0]),
            backgroundColor: theme.secondary || '#000000'
          }}
        />
        <motion.div 
          className="absolute inset-0 w-full h-[130%] bg-cover bg-center origin-center"
          style={{ 
            backgroundImage: `url(${imageUrl})`,
            y: imageY,
            scale: imageScale
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[2]" />

        <div
          className="absolute bottom-4 right-4 z-[3] text-[8rem] font-bold text-white/[0.07] leading-none select-none pointer-events-none"
          style={headingStyle}
        >
          {ordinal}
        </div>
      </div>

      <motion.div 
        className="w-full md:flex-1 flex flex-col justify-center"
        style={{ y: textY, opacity: textOpacity }}
      >
        <p 
          className="text-[10px] uppercase tracking-[0.35em] text-white/40 mb-6"
          style={bodyStyle}
        >
          {ordinal} — The Spaces
        </p>
        <h2 
          className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight"
          style={headingStyle}
        >
          {title}
        </h2>
        <p 
          className="text-white/60 text-base md:text-lg leading-relaxed max-w-md"
          style={bodyStyle}
        >
          {description}
        </p>
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
          transition={{ duration: 0.3 }}
          data-magnetic
          className="mt-10 px-8 py-4 border border-white/20 uppercase tracking-[0.2em] text-xs hover:border-white/50 transition-colors duration-500 w-fit rounded-full"
          style={{ ...bodyStyle, borderColor: `${accentColor}33` }}
        >
          Explore This Space
        </motion.button>
      </motion.div>
    </section>
  );
}

