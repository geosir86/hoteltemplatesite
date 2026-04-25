import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } }
};
const letterVariant = {
  hidden: { y: '110%', rotate: 4, opacity: 0 },
  show: { y: 0, rotate: 0, opacity: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }
};

function SplitText({ text, className }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-wrap justify-center">
        {text.split('').map((char, i) => (
          <motion.span key={i} variants={letterVariant} className="inline-block whitespace-pre">
            {char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

export default function HeroCinematic({ title, subtitle, imageUrl, theme = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1.35]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-30%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.8]);

  const headingStyle = theme.fontHeading ? { fontFamily: theme.fontHeading } : {};
  const bodyStyle = theme.fontBody ? { fontFamily: theme.fontBody } : {};
  const accentColor = theme.primary || '#ffffff';

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale }}
      >
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-[1] bg-black"
        style={{ opacity: overlayOpacity }}
      />

      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)' }}
      />

      <motion.div
        className="relative z-10 text-center text-white px-4 flex flex-col items-center gap-6"
        style={{ y: textY }}
      >
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/70"
          style={bodyStyle}
        >
          {subtitle}
        </motion.div>

        <h1 
          className="text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tighter leading-[0.9]"
          style={headingStyle}
        >
          <SplitText text={title} />
        </h1>

        <motion.div
          className="w-px h-0 mt-4"
          style={{ backgroundColor: accentColor }}
          animate={{ height: 56 }}
          transition={{ delay: 2.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
          className="text-xs uppercase tracking-[0.25em] text-white/60"
          style={bodyStyle}
        >
          Scroll to explore
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 right-8 z-10 text-right"
        style={bodyStyle}
      >
        <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-1">Greece</div>
        <div className="text-sm text-white/70">StayScape Collection</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 left-8 z-10"
        style={bodyStyle}
      >
        <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-1">Property</div>
        <div className="text-5xl text-white/10 font-light leading-none select-none">01</div>
      </motion.div>
    </section>
  );
}


