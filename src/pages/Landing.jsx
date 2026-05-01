import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Menu, X, Globe, Play } from 'lucide-react';
import PricingSection from '../components/landing/PricingSection';
import { DESTINATIONS, DESTINATION_LIST, AIRBNB_PROPERTY } from '../data/destinations';

const EASE = [0.23, 1, 0.32, 1];
const GOLD = '#C9A84C';

/* ── Nav Links ── */
const NAV_LINKS = {
  en: [
    { label: 'Our Work', href: '#work' },
    { label: 'How It Works', href: '#how' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ],
  gr: [
    { label: 'Η Δουλειά μας', href: '#work' },
    { label: 'Πώς λειτουργεί', href: '#how' },
    { label: 'Τιμές', href: '#pricing' },
    { label: 'Επικοινωνία', href: '#contact' },
  ],
};

/* ── Portfolio data: what we build ── */
const PROJECTS = [
  ...DESTINATION_LIST.map((id) => ({ id, ...DESTINATIONS[id] })),
];

const COPY = {
  en: {
    eyebrow: 'Digital Studio — Greece',
    h1a: 'We Build',
    h1b: 'Luxury',
    h1c: 'Estate Sites.',
    sub: 'Cinematic, bilingual, conversion-focused websites for Greek villas, boutique hotels and exclusive estates.',
    scrollCta: 'Explore our portfolio',
    workLabel: 'Our Work',
    workSub: 'Live demo showcases. Click any project to explore the full experience.',
    howLabel: 'How It Works',
    steps: [
      { n: '01', title: 'Discovery Call', body: 'We learn your property, brand and guest profile.' },
      { n: '02', title: 'Design & Build', body: 'Cinematic visuals, bilingual copy and bespoke UI — delivered in 2 weeks.' },
      { n: '03', title: 'Launch & Own', body: 'You receive a fully hosted site, analytics and lifetime access.' },
    ],
    contactLabel: 'Ready to stand out?',
    contactSub: 'WhatsApp us or drop an email. We respond within 4 hours.',
    wa: 'WhatsApp Us →',
    email: 'hello@stayscape.gr',
  },
  gr: {
    eyebrow: 'Digital Studio — Ελλάδα',
    h1a: 'Χτίζουμε',
    h1b: 'Luxury',
    h1c: 'Estate Sites.',
    sub: 'Κινηματογραφικά, δίγλωσσα, sites υψηλής μετατροπής για βίλες, boutique ξενοδοχεία και αποκλειστικά κτήματα.',
    scrollCta: 'Δες τo portfolio',
    workLabel: 'Η Δουλειά μας',
    workSub: 'Live demo showcases. Κλίκ σε κάθε project για πλήρη εμπειρία.',
    howLabel: 'Πώς Λειτουργεί',
    steps: [
      { n: '01', title: 'Discovery Call', body: 'Μαθαίνουμε το property, το brand και το κοινό σου.' },
      { n: '02', title: 'Design & Build', body: 'Κινηματογραφικά visuals, δίγλωσσο κείμενο και bespoke UI — σε 2 εβδομάδες.' },
      { n: '03', title: 'Launch & Own', body: 'Παραλαμβάνεις hosted site, analytics και lifetime access.' },
    ],
    contactLabel: 'Έτοιμος να ξεχωρίσεις;',
    contactSub: 'WhatsApp ή email. Απαντάμε σε 4 ώρες.',
    wa: 'WhatsApp →',
    email: 'hello@stayscape.gr',
  },
};

/* ── Agency Navbar ── */
function AgencyNav({ lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = NAV_LINKS[lang];
  const c = COPY[lang];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[500] px-6 md:px-12 py-5 flex items-center justify-between">
        {/* Brand */}
        <motion.a
          href="/"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white font-bold tracking-[0.2em] uppercase text-sm"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          STAYSCAPE<span style={{ color: GOLD }}>.</span>GR
        </motion.a>

        {/* Desktop links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="hidden md:flex items-center gap-10"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/50 hover:text-white text-xs tracking-[0.3em] uppercase transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => setLang(lang === 'en' ? 'gr' : 'en')}
            className="flex items-center gap-2 text-white/40 hover:text-white text-xs tracking-widest uppercase transition-colors duration-200 cursor-pointer"
          >
            <Globe size={13} />
            {lang === 'en' ? 'GR' : 'EN'}
          </button>
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{ backgroundColor: GOLD, color: '#080808' }}
          >
            {lang === 'en' ? 'Get a Site' : 'Ζήτα Site'}
          </a>
        </motion.div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <Menu size={22} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[600] flex flex-col px-8 py-10"
            style={{ backgroundColor: '#0A0A0A' }}
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-white font-bold tracking-[0.2em] text-sm uppercase">
                STAYSCAPE<span style={{ color: GOLD }}>.</span>GR
              </span>
              <button onClick={() => setMenuOpen(false)} className="text-white/60 hover:text-white cursor-pointer">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-8 flex-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-4xl font-light text-white hover:opacity-50 transition-opacity cursor-pointer"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="flex items-center gap-6 mt-8">
              <button onClick={() => { setLang('en'); setMenuOpen(false); }}
                className={`text-sm tracking-widest ${lang === 'en' ? 'text-white' : 'text-white/30'} cursor-pointer`}>EN</button>
              <span style={{ color: GOLD }}>|</span>
              <button onClick={() => { setLang('gr'); setMenuOpen(false); }}
                className={`text-sm tracking-widest ${lang === 'gr' ? 'text-white' : 'text-white/30'} cursor-pointer`}>GR</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Project Card ── */
function ProjectCard({ project, lang, index, aspectRatio = '4/3' }) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const c = project.content[lang];
  const accent = project.theme?.accent || GOLD;
  const headingFont = project.theme?.fontHeading || "'Cormorant Garamond', serif";
  const num = String(index + 1).padStart(2, '0');
  const exploreLabel = lang === 'en' ? 'Explore' : 'Ανακάλυψε';

  return (
    <Link to={project.path} className="block cursor-pointer group">
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, delay: (index % 3) * 0.12, ease: EASE }}
        className="relative overflow-hidden w-full"
        style={{ aspectRatio, borderRadius: '12px' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <motion.img
          src={project.heroImage}
          alt={c.title}
          loading={index < 2 ? 'eager' : 'lazy'}
          className="w-full h-full object-cover"
          animate={reduced ? {} : { scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 1.2, ease: EASE }}
        />

        {/* Multi-layer gradient — strong at bottom, touch-friendly */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.05) 70%, transparent 100%)' }}
        />

        {/* Hover bright overlay */}
        <motion.div
          className="absolute inset-0"
          animate={reduced ? {} : { opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.04) 0%, transparent 60%)' }}
        />

        {/* Top row: index number + explore button */}
        <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
          <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {num}
          </span>
          <motion.div
            animate={reduced ? {} : { opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.25 }}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: accent }}
          >
            <ArrowUpRight size={15} color="#000" strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Bottom caption */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 pt-16">
          {/* Location */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[9px] tracking-[0.45em] uppercase font-semibold"
              style={{ color: accent }}
            >
              {c.location}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-light text-white leading-[1.05] mb-3"
            style={{
              fontFamily: headingFont,
              fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
            }}
          >
            {c.title}
          </h3>

          {/* Explore label — always visible on mobile, hover on desktop */}
          <motion.div
            className="flex items-center gap-2"
            animate={reduced ? {} : { opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-[10px] tracking-[0.35em] uppercase font-semibold" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {exploreLabel}
            </span>
            <ArrowRight size={12} style={{ color: 'rgba(255,255,255,0.55)' }} />
          </motion.div>
        </div>

        {/* Accent line at very bottom — destination color signature */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px]"
          style={{ backgroundColor: accent, opacity: hovered ? 1 : 0.35, transition: 'opacity 0.4s ease' }}
        />
      </motion.div>
    </Link>
  );
}

/* ── Main Landing Page ── */
export default function Landing({ lang = 'en', setLang }) {
  const c = COPY[lang];
  const reduced = useReducedMotion();

  return (
    <div className="min-h-screen antialiased overflow-x-hidden" style={{ backgroundColor: '#080808', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <AgencyNav lang={lang} setLang={setLang} />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-28 pb-16 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 65% 50%, rgba(201,168,76,0.07) 0%, transparent 65%)' }} />
        <div className="absolute top-0 left-0 w-px h-full opacity-10"
          style={{ background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)` }} />

        <div className="relative z-10 max-w-[1280px] mx-auto w-full">
          {/* Eyebrow */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-8 h-px" style={{ backgroundColor: GOLD }} />
            <span className="text-[11px] tracking-[0.5em] uppercase" style={{ color: GOLD }}>
              {c.eyebrow}
            </span>
          </motion.div>

          {/* Giant headline */}
          <div className="mb-10 overflow-hidden">
            {[c.h1a, c.h1b, c.h1c].map((line, i) => (
              <motion.div
                key={i}
                initial={reduced ? {} : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 1.1, ease: EASE }}
              >
                <span
                  className="block leading-[0.88] text-white"
                  style={{
                    fontSize: 'clamp(3.5rem, 10vw, 10rem)',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    letterSpacing: '-0.03em',
                    fontStyle: i === 1 ? 'italic' : 'normal',
                    color: i === 1 ? GOLD : 'white',
                  }}
                >
                  {line}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Sub */}
          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.9 }}
            className="max-w-lg text-base md:text-lg leading-relaxed mb-12"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            {c.sub}
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <a
              href="#work"
              className="flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{ backgroundColor: GOLD, color: '#080808' }}
            >
              {c.scrollCta} <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="text-xs tracking-[0.3em] uppercase transition-colors duration-200 hover:text-white cursor-pointer"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              {lang === 'en' ? 'Talk to us first →' : 'Μίλησε μαζί μας →'}
            </a>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          <span className="text-[10px] tracking-[0.5em] uppercase">Scroll</span>
          <motion.div
            animate={reduced ? {} : { y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-10"
            style={{ background: `linear-gradient(to bottom, ${GOLD}, transparent)` }}
          />
        </motion.div>
      </section>

      {/* ── OUR WORK ── */}
      <section id="work" className="py-24 md:py-36 px-6 md:px-16">
        <div className="max-w-[1280px] mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
          >
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-px" style={{ backgroundColor: GOLD }} />
                <span className="text-[11px] tracking-[0.5em] uppercase" style={{ color: GOLD }}>
                  {c.workLabel}
                </span>
              </div>
              <h2
                className="text-4xl md:text-6xl font-light text-white leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
              >
                {lang === 'en' ? 'Live Estate\nShowcases' : 'Live Estate\nShowcases'}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed md:text-right" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {c.workSub}
            </p>
          </motion.div>

          {/* Editorial grid — symmetric layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">

            {/* Row 1: wide hero + portrait */}
            <div className="md:col-span-2 lg:col-span-2">
              <ProjectCard project={PROJECTS[0]} lang={lang} index={0} aspectRatio="16/9" />
            </div>
            <div>
              <ProjectCard project={PROJECTS[1]} lang={lang} index={1} aspectRatio="4/3" />
            </div>

            {/* Row 2: three equal */}
            {PROJECTS.slice(2, 5).map((p, i) => (
              <ProjectCard key={p.id} project={p} lang={lang} index={i + 2} aspectRatio="4/3" />
            ))}

            {/* Row 3: wide + portrait (mirrors row 1) */}
            {PROJECTS[5] && (
              <div className="md:col-span-2 lg:col-span-2">
                <ProjectCard project={PROJECTS[5]} lang={lang} index={5} aspectRatio="16/9" />
              </div>
            )}
            {PROJECTS[6] && (
              <div>
                <ProjectCard project={PROJECTS[6]} lang={lang} index={6} aspectRatio="4/3" />
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 md:py-36 px-6 md:px-16 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px" style={{ backgroundColor: GOLD }} />
              <span className="text-[11px] tracking-[0.5em] uppercase" style={{ color: GOLD }}>
                {c.howLabel}
              </span>
            </div>
            <h2
              className="text-4xl md:text-6xl font-light text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {lang === 'en' ? 'From zero to\nlive in 2 weeks.' : 'Από μηδέν σε live\nσε 2 εβδομάδες.'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {c.steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: EASE }}
                className="p-10 md:p-14 border-t flex flex-col gap-6 group hover:bg-white/[0.02] transition-colors duration-300 cursor-default"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <span className="text-xs font-mono" style={{ color: GOLD }}>{step.n}</span>
                <h3
                  className="text-2xl md:text-3xl font-light text-white"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <PricingSection lang={lang} />

      {/* ── CONTACT / CTA ── */}
      <section id="contact" className="py-24 md:py-48 px-6 md:px-16 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-[900px] mx-auto text-center flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="w-10 h-px" style={{ backgroundColor: GOLD }} />

            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {c.contactLabel}
            </h2>

            <p className="text-base md:text-lg max-w-md" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {c.contactSub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <motion.a
                href="https://wa.me/306900000000"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase cursor-pointer transition-all"
                style={{ backgroundColor: GOLD, color: '#080808' }}
              >
                {c.wa}
              </motion.a>
              <motion.a
                href={`mailto:${c.email}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase border cursor-pointer transition-all hover:bg-white/5"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}
              >
                {c.email}
              </motion.a>
            </div>

            <p className="text-xs tracking-widest mt-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {lang === 'en'
                ? 'Trusted by hosts across Athens · Cyclades · Ionian · Crete'
                : 'Εμπιστεύονται hosts σε Αθήνα · Κυκλάδες · Ιόνιο · Κρήτη'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-8 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t text-xs"
        style={{ borderColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)' }}
      >
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>
          STAYSCAPE<span style={{ color: GOLD }}>.</span>GR
        </span>
        <span>© 2026 · All showcases are demo builds for client preview</span>
        <div className="flex gap-1 items-center">
          <button onClick={() => setLang('en')} className="cursor-pointer hover:opacity-60 transition-opacity"
            style={{ color: lang === 'en' ? GOLD : 'rgba(255,255,255,0.25)' }}>EN</button>
          <span className="mx-1" style={{ color: GOLD }}>|</span>
          <button onClick={() => setLang('gr')} className="cursor-pointer hover:opacity-60 transition-opacity"
            style={{ color: lang === 'gr' ? GOLD : 'rgba(255,255,255,0.25)' }}>GR</button>
        </div>
      </footer>
    </div>
  );
}
