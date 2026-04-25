import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const EASE = [0.23, 1, 0.32, 1];

export default function Navbar({ theme = null, lang, setLang, isLanding = false }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60));

  const bg = scrolled
    ? (theme ? `${theme.bg}e6` : 'rgba(8,8,8,0.92)')
    : 'transparent';
  const textColor = theme ? theme.fg : '#FAFAFA';
  const accentColor = theme ? theme.accent : '#C9A84C';

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: EASE }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex justify-between items-center transition-colors duration-500"
      style={{ backgroundColor: bg, backdropFilter: scrolled ? 'blur(20px)' : 'none' }}
    >
      <Link to="/" data-hover className="font-bold text-lg tracking-wider" style={{ color: textColor, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        STAYSCAPE<span style={{ color: accentColor }}>.</span>GR
      </Link>

      <div className="flex items-center gap-4">
        <button
          data-hover
          onClick={() => setLang(lang === 'en' ? 'gr' : 'en')}
          className="text-xs font-semibold tracking-widest transition-opacity hover:opacity-70 cursor-pointer"
          style={{ color: textColor }}
        >
          {lang === 'en' ? 'EN' : 'GR'} <span style={{ color: accentColor }}>|</span> {lang === 'en' ? 'GR' : 'EN'}
        </button>

        {isLanding ? (
          <motion.a
            href="https://wa.me/306900000000"
            target="_blank" rel="noopener noreferrer"
            data-hover
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="text-[10px] md:text-xs font-bold tracking-widest px-4 md:px-6 py-2.5 md:py-3 rounded-full border cursor-pointer transition-colors duration-300 whitespace-nowrap"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            <span className="hidden sm:inline">GET YOUR SITE </span>→
          </motion.a>
        ) : (
          <Link to="/">
            <motion.button
              data-hover
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="text-[10px] md:text-xs font-bold tracking-widest px-4 md:px-6 py-2.5 md:py-3 rounded-full cursor-pointer transition-colors duration-300 whitespace-nowrap"
              style={{ backgroundColor: accentColor, color: theme?.bg || '#0A0A0A' }}
            >
              <span className="hidden sm:inline">← </span>ALL
            </motion.button>
          </Link>
        )}
      </div>
    </motion.nav>
  );
}
