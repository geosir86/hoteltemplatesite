import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const EASE = [0.23, 1, 0.32, 1];

function WordReveal({ text, className, style }) {
  const reduced = useReducedMotion();
  if (reduced) return <h1 className={className} style={style}>{text}</h1>;
  return (
    <motion.h1
      className={className} style={style}
      initial="hidden" animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
    >
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{ hidden: { y: '110%' }, visible: { y: 0, transition: { duration: 1.1, ease: EASE } } }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

export default function HeroCinematic({ title, subtitle, location, imageUrl, theme }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const reduced = useReducedMotion();

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const textY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-25%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.45, 0.85]);

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <motion.div
        className="absolute inset-0"
        style={{ scale: reduced ? 1 : imgScale }}
      >
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
          initial={reduced ? {} : { scale: 1.08 }}
          animate={reduced ? {} : { scale: 1 }}
          transition={{ duration: 2.8, ease: EASE }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: reduced ? 0.5 : overlayOpacity }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.9) 100%)' }}
      />

      <motion.div
        className="relative z-10 text-center px-6 flex flex-col items-center gap-5"
        style={{ y: reduced ? 0 : textY }}
      >
        <motion.div
          initial={reduced ? {} : { opacity: 0, letterSpacing: '0.6em' }}
          animate={reduced ? {} : { opacity: 1, letterSpacing: '0.25em' }}
          transition={{ delay: 1.0, duration: 1.5, ease: EASE }}
          className="text-xs md:text-sm uppercase tracking-[0.25em]"
          style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {location}
        </motion.div>

        <WordReveal
          text={title}
          className="text-5xl md:text-7xl lg:text-[8rem] font-light leading-[0.92] tracking-tighter text-white"
          style={{ fontFamily: theme.fontHeading }}
        />

        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={reduced ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1.2, ease: EASE }}
          className="text-sm md:text-base tracking-[0.15em] uppercase"
          style={{ color: theme.accent, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {subtitle}
        </motion.div>
      </motion.div>

      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 20 }}
        animate={reduced ? {} : { opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={reduced ? {} : { y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-10"
          style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}
        />
      </motion.div>
    </section>
  );
}
