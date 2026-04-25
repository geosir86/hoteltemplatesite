import { Fragment, useRef } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';

const copy = {
  en: {
    tagline: 'Begin Your Journey',
    heading: ['Ready to', 'live it?'],
    btn: 'Book Your Stay',
    locs: ['Athens', 'Cyclades', 'Ionian', 'Crete', 'Nisi'],
    cr: '© 2025 StayScape Collection',
  },
  gr: {
    tagline: 'Ξεκινήστε το Ταξίδι σας',
    heading: ['Έτοιμοι να', 'το ζήσετε;'],
    btn: 'Κλείστε Θέση',
    locs: ['Αθήνα', 'Κυκλάδες', 'Ιόνιο', 'Κρήτη', 'Νησί'],
    cr: '© 2025 StayScape Collection',
  }
};

export default function EnhancedCTA({ lang = 'en', theme = {} }) {
  const ref = useRef(null);
  const btnRef = useRef(null);
  const c = copy[lang] || copy.en;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgTextY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.5);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const headingStyle = theme.fontHeading ? { fontFamily: theme.fontHeading } : {};
  const bodyStyle = theme.fontBody ? { fontFamily: theme.fontBody } : {};
  const accentColor = theme.primary || '#ffffff';

  return (
    <footer
      ref={ref}
      className="relative min-h-[80vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden border-t border-white/[0.07]"
      style={{ backgroundColor: theme.secondary || '#000000' }}
    >

      {/* Giant parallax watermark */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ y: bgTextY }}
      >
        <span
          className="text-[16vw] md:text-[10vw] font-bold text-white/[0.02] tracking-tighter whitespace-nowrap leading-none"
          style={headingStyle}
        >
          STAYSCAPE
        </span>
      </motion.div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${accentColor}08 0%, transparent 65%)` }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] uppercase tracking-[0.35em] text-white/40"
          style={bodyStyle}
        >
          — {c.tagline}
        </motion.p>

        <motion.h2
          key={lang}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9rem] font-light tracking-tighter leading-[0.9]"
          style={headingStyle}
        >
          {c.heading[0]}<br />{c.heading[1]}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          ref={btnRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mt-2"
        >
          <motion.div
            style={{ x: springX, y: springY }}
            className="relative group cursor-pointer md:cursor-none"
            data-magnetic
          >
            <div
              className="absolute inset-0 rounded-full border scale-125 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700"
              style={{ borderColor: `${accentColor}33` }}
            />
            <button
              className="relative px-10 md:px-14 py-5 md:py-7 bg-white text-black font-semibold text-sm md:text-base uppercase tracking-[0.2em] rounded-full overflow-hidden"
              style={bodyStyle}
            >
              <div className="absolute inset-0 bg-[#1a1a1a] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1] z-0" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">{c.btn}</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Region links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-2"
        >
          {c.locs.map((loc, i) => (
            <Fragment key={loc}>
              <span
                className="text-[10px] uppercase tracking-[0.2em] text-white/25 hover:text-white/60 transition-colors cursor-pointer"
                data-magnetic
                style={bodyStyle}
              >
                {loc}
              </span>
              {i < c.locs.length - 1 && <span className="hidden sm:block w-px h-3 bg-white/10" />}
            </Fragment>
          ))}
        </motion.div>
      </div>

      <div
        className="absolute bottom-6 left-0 right-0 flex justify-between px-6 md:px-16 text-[9px] uppercase tracking-[0.2em] text-white/15"
        style={bodyStyle}
      >
        <span>{c.cr}</span>
        <span>Greece</span>
      </div>
    </footer>
  );
}
