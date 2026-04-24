import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Cursor from '../components/shared/Cursor';
import Navbar from '../components/shared/Navbar';
import SectionReveal from '../components/shared/SectionReveal';
import { DESTINATIONS, DESTINATION_LIST } from '../data/destinations';

const EASE = [0.23, 1, 0.32, 1];
const LANDING_ACCENT = '#C9A84C';

const COPY = {
  en: {
    heroLine1: 'Where Greek',
    heroLine2: 'Luxury Lives',
    heroLine3: 'Online.',
    heroSub: 'Five destinations. Five personalities. One standard.',
    ourWork: 'Our Work',
    b2bHeadline: 'Want a site like this for your property?',
    b2bSub: 'We design and build world-class luxury listing pages for Greek hospitality businesses — Airbnb hosts, boutique hotels, and private villas across Greece.',
    b2bCta1: 'WhatsApp Us →',
    b2bCta2: 'See how it works',
    social: 'Trusted by hosts across Athens · Cyclades · Ionian · Crete',
    fromLabel: 'from',
    night: '/ night',
  },
  gr: {
    heroLine1: 'Η Ελληνική',
    heroLine2: 'Πολυτέλεια',
    heroLine3: 'Online.',
    heroSub: 'Πέντε προορισμοί. Πέντε προσωπικότητες. Ένα επίπεδο.',
    ourWork: 'Η Δουλειά μας',
    b2bHeadline: 'Θέλεις τέτοιο site για το property σου;',
    b2bSub: 'Σχεδιάζουμε και χτίζουμε luxury listing pages για ελληνικές επιχειρήσεις φιλοξενίας — Airbnb hosts, boutique ξενοδοχεία και βίλες σε όλη την Ελλάδα.',
    b2bCta1: 'WhatsApp →',
    b2bCta2: 'Δες πώς λειτουργεί',
    social: 'Εμπιστεύονται hosts σε Αθήνα · Κυκλάδες · Ιόνιο · Κρήτη',
    fromLabel: 'από',
    night: '/ νύχτα',
  },
};

function HeroLine({ text, delay }) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div className="overflow-hidden">
        <span
          className="block text-6xl md:text-8xl lg:text-[9rem] font-light tracking-tighter leading-[0.92] text-white"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {text}
        </span>
      </div>
    );
  }
  return (
    <div className="overflow-hidden">
      <motion.span
        className="block text-6xl md:text-8xl lg:text-[9rem] font-light tracking-tighter leading-[0.92] text-white"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay }}
      >
        {text}
      </motion.span>
    </div>
  );
}

function PropertyRow({ id, lang, copy }) {
  const [hovered, setHovered] = useState(false);
  const [mouseY, setMouseY] = useState(0);
  const rowRef = useRef(null);
  const d = DESTINATIONS[id];
  const c = d.content[lang];
  const reduced = useReducedMotion();

  const handleMouseMove = (e) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    setMouseY(e.clientY - rect.top);
  };

  return (
    <Link to={d.path}>
      <motion.div
        ref={rowRef}
        data-hover
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative flex items-center justify-between px-4 md:px-10 py-7 border-b cursor-pointer overflow-hidden group"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
        transition={{ duration: 0.3 }}
      >
        {!reduced && (
          <motion.div
            className="absolute right-0 top-0 h-full w-1/3 pointer-events-none overflow-hidden"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 60 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <img
              src={d.heroImage}
              alt={c.name}
              className="w-full h-full object-cover"
              style={{ transform: `translateY(${mouseY * 0.1 - 20}px)`, transition: 'transform 0.3s ease' }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#080808]" />
          </motion.div>
        )}

        <div className="flex items-center gap-6 md:gap-10 relative z-10">
          <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
            {String(DESTINATION_LIST.indexOf(id) + 1).padStart(2, '0')}
          </span>
          <div className="flex flex-col gap-1">
            <motion.span
              className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-white"
              style={{ fontFamily: d.theme.fontHeading }}
              animate={{ x: hovered && !reduced ? 8 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {c.title}
            </motion.span>
            <span className="text-xs tracking-widest uppercase" style={{ color: d.theme.accent }}>
              {c.location}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 relative z-10">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{copy.fromLabel}</span>
            <span className="text-lg font-light text-white">
              {d.pricing.currency}{d.pricing.from}{' '}
              <span className="text-xs opacity-50">{copy.night}</span>
            </span>
          </div>
          <motion.span
            animate={{ x: hovered && !reduced ? 6 : 0, color: hovered ? d.theme.accent : 'rgba(255,255,255,0.3)' }}
            transition={{ duration: 0.3 }}
            className="text-lg"
          >
            →
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Landing({ lang = 'en', setLang }) {
  const copy = COPY[lang];
  const reduced = useReducedMotion();

  return (
    <div className="min-h-screen antialiased overflow-x-hidden" style={{ backgroundColor: '#080808', cursor: 'none' }}>
      <Cursor accentColor={LANDING_ACCENT} />
      <Navbar lang={lang} setLang={setLang} isLanding />

      {/* HERO */}
      <section className="relative h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 40%, rgba(201,168,76,0.06) 0%, transparent 60%)' }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto w-full pt-24">
          <motion.div
            initial={reduced ? {} : { opacity: 0 }}
            animate={reduced ? {} : { opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-xs tracking-[0.4em] uppercase mb-8"
            style={{ color: LANDING_ACCENT }}
          >
            Stayscape GR — Luxury Property Sites
          </motion.div>

          <div className="flex flex-col mb-8">
            <HeroLine text={copy.heroLine1} delay={0.5} />
            <HeroLine text={copy.heroLine2} delay={0.65} />
            <HeroLine text={copy.heroLine3} delay={0.8} />
          </div>

          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={reduced ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1, ease: EASE }}
            className="text-base md:text-lg max-w-md"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            {copy.heroSub}
          </motion.p>
        </div>

        <motion.div
          initial={reduced ? {} : { opacity: 0 }}
          animate={reduced ? {} : { opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <motion.div
            animate={reduced ? {} : { y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-8 bg-white/20"
          />
        </motion.div>
      </section>

      {/* PROPERTIES LIST */}
      <SectionReveal>
        <section className="max-w-[1280px] mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-10 h-px" style={{ backgroundColor: LANDING_ACCENT }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: LANDING_ACCENT }}>
              {copy.ourWork}
            </span>
          </div>

          <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            {DESTINATION_LIST.map((id) => (
              <PropertyRow key={id} id={id} lang={lang} copy={copy} />
            ))}
          </div>
        </section>
      </SectionReveal>

      {/* B2B SECTION */}
      <SectionReveal>
        <section
          className="py-24 md:py-36 px-6 md:px-16 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <div className="max-w-[900px] mx-auto text-center flex flex-col items-center gap-8">
            <div className="w-10 h-px" style={{ backgroundColor: LANDING_ACCENT }} />

            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {copy.b2bHeadline}
            </h2>

            <p className="text-base md:text-lg max-w-lg" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {copy.b2bSub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <motion.a
                href="https://wa.me/306900000000"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase cursor-pointer"
                style={{ backgroundColor: LANDING_ACCENT, color: '#080808' }}
              >
                {copy.b2bCta1}
              </motion.a>
              <motion.button
                data-hover
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase border cursor-pointer"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}
              >
                {copy.b2bCta2}
              </motion.button>
            </div>

            <p className="text-xs tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {copy.social}
            </p>
          </div>
        </section>
      </SectionReveal>

      {/* FOOTER */}
      <footer
        className="py-8 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t text-xs"
        style={{ borderColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)' }}
      >
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>
          STAYSCAPE<span style={{ color: LANDING_ACCENT }}>.</span>GR
        </span>
        <span>© 2026 · All properties are demo showcases</span>
        <div className="flex gap-1 items-center">
          <button
            data-hover
            onClick={() => setLang('en')}
            className="cursor-pointer hover:opacity-60 transition-opacity"
            style={{ color: lang === 'en' ? LANDING_ACCENT : 'rgba(255,255,255,0.25)' }}
          >
            EN
          </button>
          <span className="mx-1" style={{ color: LANDING_ACCENT }}>|</span>
          <button
            data-hover
            onClick={() => setLang('gr')}
            className="cursor-pointer hover:opacity-60 transition-opacity"
            style={{ color: lang === 'gr' ? LANDING_ACCENT : 'rgba(255,255,255,0.25)' }}
          >
            GR
          </button>
        </div>
      </footer>
    </div>
  );
}
