import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  Mail,
  Menu,
  MessageCircle,
  Play,
  Send,
  X,
} from 'lucide-react';
import BeforeAfterTransformation from '../components/landing/BeforeAfterTransformation';
import CapabilityBento from '../components/landing/CapabilityBento';
import CinematicHero from '../components/landing/CinematicHero';
import PricingSection from '../components/landing/PricingSection';
import { DESTINATIONS, DESTINATION_LIST } from '../data/destinations';

const EASE = [0.23, 1, 0.32, 1];

const BRAND = {
  warmMarble: '#F5EFE6',
  stone: '#F7F3EA',
  deepInk: '#1A1612',
  ink: '#171512',
  taupe: '#6F685F',
  bronze: '#B8894A',
  bronzeLight: '#EBC777',
  aegeanBlue: '#0E5FA8',
  luxuryNavy: '#1E3A8A',
  espresso: '#14110E',
  linen: '#E9DFCF',
  olive: '#566B5A',
};

const NAV_LINKS = {
  en: [
    { label: 'Examples', href: '#examples' },
    { label: 'Why Stayfolio', href: '#why' },
    { label: 'Packages', href: '#pricing' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
  gr: [
    { label: 'Παραδείγματα', href: '#examples' },
    { label: 'Γιατί Stayfolio', href: '#why' },
    { label: 'Πακέτα', href: '#pricing' },
    { label: 'Process', href: '#process' },
    { label: 'Επικοινωνία', href: '#contact' },
  ],
};

const PROJECTS = DESTINATION_LIST
  .map((id) => ({ id, ...DESTINATIONS[id] }))
  .filter((project) => project.path && project.heroImage && project.content);

const EXPERIENCE_TYPES = {
  athens: { en: 'Urban stay', gr: 'Urban stay' },
  cyclades: { en: 'Island villa', gr: 'Island villa' },
  ionian: { en: 'Nature retreat', gr: 'Nature retreat' },
  crete: { en: 'Heritage estate', gr: 'Heritage estate' },
  nisi: { en: 'Boutique suite', gr: 'Boutique suite' },
  greece: { en: 'Signature escape', gr: 'Signature escape' },
  airbnb: { en: 'Airbnb-style Demo', gr: 'Demo Airbnb-style' },
};

const COPY = {
  en: {
    brandLine: 'Premium websites for Greek stays',
    heroEyebrow: 'Premium website · direct inquiry',
    heroTitle: 'Your stay deserves more than a listing.',
    heroSub:
      'I build cinematic, bilingual websites for Greek studios, apartments, Airbnb hosts, and villas — so their online presence feels as considered as the real stay.',
    heroTrust:
      'A clear, personal process with the person designing and building your site.',
    primaryCta: 'See the Demos',
    secondaryCta: 'Start your own',
    heroStats: [
      { value: 'Premium', label: 'design' },
      { label: 'YOUR DESIGNER', hasAvatar: true },
      { value: '3-10 days', label: 'build cycle' },
    ],

    problemLabel: 'The online gap',
    problemTitle: 'Premium in person. Lost inside another listing online.',
    problemBody:
      'Airbnb and Booking pages are useful, but they make every property feel the same — studio, apartment, or villa alike. A dedicated site gives your stay a place to show its atmosphere, story, and value.',
    problemPoints: [
      'Raise perceived value before the first message.',
      'Give guests a branded place to understand the experience.',
      'Make direct inquiry easier without overpromising bookings.',
    ],
    beforeAfter: {
      label: 'Before / After',
      title: 'From another listing to a branded stay experience.',
      body:
        'The property can be the same. The perceived value changes when the online experience has story, rhythm, and a clear direct inquiry path.',
      before: {
        label: 'Before: another listing',
        features: ['photos', 'price', 'reviews'],
      },
      after: {
        label: 'After: a Stayfolio experience',
        features: ['cinematic gallery', 'location story', 'direct inquiry', 'premium mood'],
      },
      cta: 'See what this could become',
    },
    capabilities: {
      label: 'What I can build',
      title: 'What your property can get online.',
      items: [
        { type: 'homepage', title: 'Cinematic homepage', body: 'A first screen that feels like the start of a premium stay, not a template.' },
        { type: 'gallery', title: 'Premium gallery', body: 'Photos arranged to build atmosphere, rhythm, and perceived value.' },
        { type: 'story', title: 'Bilingual story', body: 'English and Greek copy shaped around the property, location, and guest profile.' },
        { type: 'inquiry', title: 'Direct inquiry flow', body: 'WhatsApp, email, or form actions designed to make the next step obvious.' },
        { type: 'mobile', title: 'Mobile-first experience', body: 'A polished phone experience for guests browsing from social or booking platforms.' },
      ],
    },
    examplesLabel: 'Stay experiences',
    examplesTitle: 'Different properties. Different moods. One premium standard.',
    examplesBody:
      'Explore demo experiences that show how each stay can carry its own atmosphere online.',
    viewExample: 'See the experience',
    whyLabel: 'One specialist',
    whyTitle: 'No agency layers. You speak with the person building it.',
    whyBody:
      'Stayfolio is intentionally small. That means clearer decisions, tighter taste, and a site shaped around your actual property instead of a generic web-design package.',
    whyPoints: [
      'Direct communication from first message to launch.',
      'A clear scope, fixed deliverables, and fast decisions.',
      'Hospitality-specific design, copy, and guest-flow thinking.',
      'Personal attention to your photos, location, and guest profile.',
    ],
    processLabel: 'Process',
    processTitle: 'From listing to live site without a heavy agency process.',
    processSteps: [
      {
        title: 'Send the material',
        body: 'Share your listing link, photos, location, and the basics of the stay.',
      },
      {
        title: 'I shape the experience',
        body: 'Structure, copy, visuals, bilingual content, and inquiry flow are designed together.',
      },
      {
        title: 'The site goes live',
        body: 'You get a hosted site with contact actions, basic tracking, and a clean handoff.',
      },
    ],
    finalTitle: 'Want to see how your stay could look online?',
    finalBody:
      'Send me your Airbnb or Booking listing and I will tell you honestly which package fits.',
    whatsapp: 'WhatsApp',
    email: 'Email',
    footerLine: 'Premium websites for Greek stays',
  },
  gr: {
    brandLine: 'Premium websites για καταλύματα στην Ελλάδα',
    heroEyebrow: 'Premium website · άμεσο inquiry',
    heroTitle: 'Το κατάλυμά σου αξίζει κάτι περισσότερο από μία καταχώρηση.',
    heroSub:
      'Φτιάχνω cinematic, δίγλωσσα websites για studios, διαμερίσματα, Airbnb και villas στην Ελλάδα, ώστε η online παρουσία τους να δείχνει όσο προσεγμένη είναι και η πραγματική εμπειρία.',
    heroTrust:
      'Ένα καθαρό, προσωπικό process από τον άνθρωπο που σχεδιάζει και χτίζει το site σου.',
    primaryCta: 'Δες τα Demos',
    secondaryCta: 'Ξεκίνα το δικό σου',
    heroStats: [
      { value: 'Premium', label: 'design' },
      { label: '1-ON-1 ΣΥΝΕΡΓΑΣΙΑ', hasAvatar: true },
      { value: '3-10', label: 'ημέρες παράδοση' },
    ],

    problemLabel: 'Το online κενό',
    problemTitle: 'Από κοντά δείχνει premium. Online όμως χάνεται μέσα στις καταχωρήσεις.',
    problemBody:
      'Airbnb και Booking είναι χρήσιμα, αλλά κάνουν κάθε κατάλυμα να μοιάζει ίδιο — studio, διαμέρισμα ή villa. Ένα δικό σου site δίνει στο property χώρο να δείξει ατμόσφαιρα, ιστορία και αξία.',
    problemPoints: [
      'Ανεβάζει την αντιληπτή αξία πριν το πρώτο μήνυμα.',
      'Δίνει στον επισκέπτη branded χώρο να καταλάβει την εμπειρία.',
      'Κάνει πιο εύκολο το direct inquiry χωρίς υπερβολικές υποσχέσεις.',
    ],
    beforeAfter: {
      label: 'Before / After',
      title: 'Από μια απλή καταχώρηση σε branded εμπειρία καταλύματος.',
      body:
        'Το κατάλυμα μπορεί να είναι το ίδιο. Η αντιληπτή αξία αλλάζει όταν η online εμπειρία έχει ιστορία, ρυθμό και καθαρό direct inquiry path.',
      before: {
        label: 'Πριν: ακόμα μία καταχώρηση',
        features: ['photos', 'τιμή', 'reviews'],
      },
      after: {
        label: 'Μετά: Stayfolio experience',
        features: ['cinematic gallery', 'ιστορία τοποθεσίας', 'direct inquiry', 'premium mood'],
      },
      cta: 'Δες πώς μπορεί να γίνει',
    },
    capabilities: {
      label: 'ΤΙ ΜΠΟΡΩ ΝΑ ΦΤΙΑΞΩ',
      title: 'Τι μπορεί να αποκτήσει online το κατάλυμά σου.',
      items: [
        { type: 'homepage', title: 'Cinematic homepage', body: 'Πρώτη οθόνη που μοιάζει με αρχή premium εμπειρίας, όχι με template.' },
        { type: 'gallery', title: 'Premium gallery', body: 'Φωτογραφίες στημένες για ατμόσφαιρα, ρυθμό και υψηλότερη αντιληπτή αξία.' },
        { type: 'story', title: 'Δίγλωσση ιστορία', body: 'Ελληνικά και Αγγλικά κείμενα γύρω από το property, την τοποθεσία και το κοινό σου.' },
        { type: 'inquiry', title: 'Direct inquiry flow', body: 'WhatsApp, email ή φόρμα ώστε το επόμενο βήμα να είναι προφανές.' },
        { type: 'mobile', title: 'Mobile-first εμπειρία', body: 'Προσεγμένη mobile εικόνα για guests που έρχονται από social ή booking platforms.' },
      ],
    },
    examplesLabel: 'Stay experiences',
    examplesTitle: 'Διαφορετικά καταλύματα. Διαφορετικά moods. Ένα premium επίπεδο.',
    examplesBody:
      'Δες demo εμπειρίες που δείχνουν πώς κάθε stay μπορεί να έχει τη δική του ατμόσφαιρα online.',
    viewExample: 'Δες την εμπειρία',
    whyLabel: 'Ένας specialist',
    whyTitle: 'Δεν περνάς από ομάδα. Μιλάς με αυτόν που το φτιάχνει.',
    whyBody:
      'Το Stayfolio είναι συνειδητά μικρό. Αυτό σημαίνει πιο καθαρές αποφάσεις, πιο συγκεκριμένο taste και site χτισμένο γύρω από το πραγματικό σου κατάλυμα.',
    whyPoints: [
      'Άμεση συνεννόηση από το πρώτο μήνυμα μέχρι το launch.',
      'Καθαρό scope, συγκεκριμένα deliverables και γρήγορες αποφάσεις.',
      'Hospitality-specific design, copy και guest-flow thinking.',
      'Προσωπική προσοχή στις φωτογραφίες, την τοποθεσία και το κοινό σου.',
    ],
    processLabel: 'Process',
    processTitle: 'Από την καταχώρηση στο live site, χωρίς περίπλοκο agency process.',
    processSteps: [
      {
        title: 'Στέλνεις το υλικό',
        body: 'Link καταχώρησης, φωτογραφίες, τοποθεσία και τα βασικά στοιχεία του καταλύματος.',
      },
      {
        title: 'Σχεδιάζω την εμπειρία',
        body: 'Δομή, κείμενο, visuals, δίγλωσσο περιεχόμενο και inquiry flow χτίζονται μαζί.',
      },
      {
        title: 'Βγαίνει live',
        body: 'Παραλαμβάνεις hosted site με contact actions, basic tracking και καθαρό handoff.',
      },
    ],
    finalTitle: 'Θες να δούμε πώς μπορεί να δείχνει το δικό σου κατάλυμα online;',
    finalBody:
      'Στείλε μου την καταχώρησή σου στο Airbnb ή Booking και θα σου πω ειλικρινά ποιο πακέτο ταιριάζει.',
    whatsapp: 'WhatsApp',
    email: 'Email',
    footerLine: 'Premium websites για ελληνικά καταλύματα',
  },
};

function StayfolioNav({ lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const safeLang = COPY[lang] ? lang : 'en';
  const links = NAV_LINKS[safeLang];
  const cta = COPY[safeLang].secondaryCta;

  return (
    <>
      <nav
        className="fixed left-0 top-0 z-[500] flex w-full items-center justify-between border-b px-5 py-4 backdrop-blur-md md:px-10"
        style={{
          backgroundColor: 'rgba(247,243,234,0.88)',
          borderColor: 'rgba(23,21,18,0.08)',
          color: BRAND.ink,
        }}
      >
        <a href="/" className="text-sm font-black uppercase tracking-[0.22em]">
          STAYFOLIO
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-[#B8894A]"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'gr' : 'en')}
            className="flex cursor-pointer items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em]"
          >
            <Globe size={14} />
            {lang === 'en' ? 'GR' : 'EN'}
          </button>
          <a
            href="#contact"
            className="cursor-pointer rounded-full px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.18em] transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: BRAND.ink, color: BRAND.stone }}
          >
            {cta}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="cursor-pointer md:hidden"
          aria-label="Open menu"
          aria-controls="stayfolio-mobile-menu"
          aria-expanded={menuOpen}
        >
          <Menu size={22} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="stayfolio-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Stayfolio navigation menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-[600] flex flex-col px-7 py-8"
            style={{ backgroundColor: BRAND.espresso, color: BRAND.stone }}
          >
            <div className="mb-14 flex items-center justify-between">
              <span className="text-sm font-black uppercase tracking-[0.22em]">STAYFOLIO</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-7">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-light"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center justify-between border-t pt-6" style={{ borderColor: 'rgba(247,243,234,0.16)' }}>
              <button
                type="button"
                onClick={() => setLang(lang === 'en' ? 'gr' : 'en')}
                className="cursor-pointer text-sm uppercase tracking-[0.2em]"
              >
                {lang === 'en' ? 'Greek' : 'English'}
              </button>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-[0.18em]"
                style={{ color: BRAND.bronze }}
              >
                {cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ExampleCard({ project, lang, index }) {
  const reduced = useReducedMotion();
  const safeLang = COPY[lang] ? lang : 'en';
  const content = project.content[lang] || project.content.en;
  const accent = project.theme?.accent || BRAND.bronze;
  const type = EXPERIENCE_TYPES[project.id]?.[safeLang] || EXPERIENCE_TYPES[project.id]?.en || 'Stay experience';

  // Editorial / Journal style asymmetric grid calculation for 7 items
  const spanClass =
    index === 0 ? "md:col-span-12 lg:col-span-8" :
      index === 1 ? "md:col-span-6 lg:col-span-4" :
        index === 2 ? "md:col-span-6 lg:col-span-4" :
          index === 3 ? "md:col-span-6 lg:col-span-4" :
            index === 4 ? "md:col-span-12 lg:col-span-4" :
              "md:col-span-6 lg:col-span-6"; // indices 5 and 6

  // Varied aspect ratios for editorial feel
  const aspectClass =
    index === 0 ? "aspect-[4/3] md:aspect-[2/1] lg:aspect-[16/9]" :
      index === 5 || index === 6 ? "aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/9]" :
        "aspect-[4/3] lg:aspect-[4/5]";

  return (
    <Link to={project.path} className={`group block cursor-pointer flex flex-col h-full ${spanClass}`}>
      <motion.article
        initial={reduced ? {} : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: EASE }}
        className="overflow-hidden rounded-lg border flex flex-col flex-1"
        style={{ backgroundColor: '#201B16', borderColor: 'rgba(247,243,234,0.12)' }}
      >
        <div className={`relative w-full overflow-hidden ${aspectClass}`}>
          <img
            src={project.heroImage}
            alt={content.title}
            loading={index < 2 ? 'eager' : 'lazy'}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/25 to-transparent" />
          <div className="absolute left-5 top-5 font-mono text-[11px] text-white/55">
            {String(index + 1).padStart(2, '0')}
          </div>
          <div
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:-translate-y-0.5"
            style={{ backgroundColor: accent }}
          >
            <ArrowUpRight size={15} color="#14110E" strokeWidth={2.5} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: accent }}>
              {content.location}
            </p>
            <span
              className="mb-3 inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] backdrop-blur-md"
              style={{ borderColor: 'rgba(255,255,255,0.18)', backgroundColor: 'rgba(20,17,14,0.45)', color: BRAND.bronzeLight }}
            >
              {type}
            </span>
            <h3
              className="text-3xl font-light leading-tight text-white"
              style={{ fontFamily: project.theme?.fontHeading || "'Cormorant Garamond', serif" }}
            >
              {content.title}
            </h3>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between gap-4 px-5 py-5">
          <p className="line-clamp-2 text-sm leading-6 text-white/60">{content.subtitle}</p>
          <span className="flex shrink-0 items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: BRAND.bronze }}>
            {COPY[safeLang].viewExample}
            <ArrowRight size={13} />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

export default function Landing({ lang = 'en', setLang }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const c = COPY[lang] || COPY.en;
  const showLegacyLandingSections = false;
  const reduced = true;
  const featuredProject = null;
  const featuredContent = null;

  return (
    <div
      className="min-h-screen overflow-x-hidden antialiased"
      style={{ backgroundColor: BRAND.stone, color: BRAND.ink, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <StayfolioNav lang={lang} setLang={setLang} />

      <main>
        <CinematicHero lang={lang} brand={BRAND} copy={c} onVideoOpen={() => setIsVideoModalOpen(true)} />
        <BeforeAfterTransformation lang={lang} brand={BRAND} copy={c} />
        <CapabilityBento brand={BRAND} copy={c} lang={lang} />
        {showLegacyLandingSections && (
          <section className="px-5 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36">
            <div className="mx-auto grid max-w-[1220px] gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <motion.div
                initial={reduced ? {} : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: EASE }}
              >
                <p className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: BRAND.bronze }}>
                  {c.brandLine}
                </p>
                <h1
                  className="mt-6 max-w-4xl text-[clamp(2.65rem,13vw,7.35rem)] font-light leading-[0.94]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {c.heroTitle}
                </h1>
                <p className="mt-7 max-w-2xl text-base leading-8 md:text-lg" style={{ color: BRAND.taupe }}>
                  {c.heroSub}
                </p>
                <div className="mt-7 flex max-w-xl items-start gap-3 border-l-2 pl-4" style={{ borderColor: BRAND.bronze }}>
                  <CheckCircle2 className="mt-1 shrink-0" size={18} style={{ color: BRAND.olive }} />
                  <p className="text-sm leading-7" style={{ color: BRAND.taupe }}>{c.heroTrust}</p>
                </div>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#examples"
                    className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full px-7 py-4 text-xs font-black uppercase tracking-[0.18em]"
                    style={{ backgroundColor: BRAND.ink, color: BRAND.stone }}
                  >
                    {c.primaryCta}
                    <ArrowRight size={15} />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full border px-7 py-4 text-xs font-black uppercase tracking-[0.18em]"
                    style={{ borderColor: 'rgba(23,21,18,0.16)', color: BRAND.ink }}
                  >
                    <Send size={15} />
                    {c.secondaryCta}
                  </a>
                </div>
              </motion.div>

              {featuredProject && (
                <motion.div
                  initial={reduced ? {} : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
                  className="relative"
                >
                  <div className="relative overflow-hidden rounded-lg border" style={{ borderColor: 'rgba(23,21,18,0.1)' }}>
                    <img
                      src={featuredProject.heroImage}
                      alt={featuredContent?.title || 'Greek stay example'}
                      className="aspect-[4/3] w-full object-cover md:aspect-[5/4]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-5 text-white">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/60">
                          {featuredContent?.location}
                        </p>
                        <h2 className="mt-2 text-3xl font-light leading-none md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                          {featuredContent?.title}
                        </h2>
                      </div>
                      <div className="hidden rounded-lg px-4 py-3 text-right md:block" style={{ backgroundColor: 'rgba(20,17,14,0.72)' }}>
                        <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: BRAND.bronze }}>
                          Stayfolio preview
                        </p>
                        <p className="mt-1 text-xs text-white/60">Bilingual property story</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute -bottom-6 right-4 hidden max-w-[270px] rounded-lg border p-5 shadow-2xl md:block"
                    style={{ backgroundColor: BRAND.linen, borderColor: 'rgba(23,21,18,0.08)' }}
                  >
                    <p className="text-sm leading-7" style={{ color: BRAND.taupe }}>
                      {lang === 'en'
                        ? 'A homepage should make the stay feel memorable before the guest opens a booking platform.'
                        : 'Ένα homepage πρέπει να κάνει το κατάλυμα να μένει στη μνήμη πριν ο επισκέπτης ανοίξει πλατφόρμα.'}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </section>
        )}

        {showLegacyLandingSections && (
          <section className="px-5 py-20 md:px-10 md:py-24" style={{ backgroundColor: BRAND.linen }}>
            <div className="mx-auto grid max-w-[1120px] gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: BRAND.bronze }}>{c.problemLabel}</p>
                <h2 className="mt-5 text-4xl font-light leading-tight md:text-6xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {c.problemTitle}
                </h2>
              </div>
              <div>
                <p className="text-base leading-8" style={{ color: BRAND.taupe }}>{c.problemBody}</p>
                <div className="mt-8 grid gap-3">
                  {c.problemPoints.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 shrink-0" size={18} style={{ color: BRAND.olive }} />
                      <p className="text-sm leading-7" style={{ color: BRAND.ink }}>{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section id="examples" className="px-5 py-24 md:px-10" style={{ backgroundColor: BRAND.espresso, color: BRAND.stone }}>
          <div className="mx-auto max-w-[1220px]">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: BRAND.bronze }}>{c.examplesLabel}</p>
                <h2 className="mt-5 max-w-3xl text-4xl font-light leading-tight md:text-6xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {c.examplesTitle}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-white/60">{c.examplesBody}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 lg:grid-cols-12">
              {PROJECTS.map((project, index) => (
                <ExampleCard key={project.id} project={project} lang={lang} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="px-5 py-24 md:px-10">
          <div className="mx-auto grid max-w-[1120px] gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-center">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: BRAND.bronze }}>{c.whyLabel}</p>
              <h2 className="mt-5 text-4xl font-light leading-tight md:text-6xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                <span className="align-middle">{c.whyTitle}</span>
                <span className="ml-4 inline-flex items-center gap-3 align-middle">
                  <button
                    onClick={() => lang === 'gr' && setIsVideoModalOpen(true)}
                    className="relative group cursor-pointer inline-block rounded-full p-1 shrink-0 transition-transform hover:scale-[1.02]"
                    style={{ border: `1px solid ${BRAND.bronze}` }}
                    aria-label="Play video"
                  >
                    <img
                      src="/assets/specialist.jpg"
                      alt="Stayfolio Specialist"
                      className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover"
                    />
                    <div className="absolute inset-1 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={20} fill="white" color="white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 rounded-full p-1.5 shadow-lg flex items-center justify-center" style={{ backgroundColor: BRAND.bronze, color: BRAND.espresso }}>
                      <Play size={10} fill="currentColor" />
                    </div>
                  </button>
                  <div className="flex flex-col justify-center text-left">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-black" style={{ color: BRAND.bronze }}>
                      {lang === 'en' ? 'Play Video' : 'Δες το Video'}
                    </span>
                  </div>
                </span>
              </h2>
              <p className="mt-7 text-base leading-8" style={{ color: BRAND.taupe }}>{c.whyBody}</p>
            </div>
            <div className="grid gap-3">
              {c.whyPoints.map((point, index) => (
                <div key={point} className="flex items-start gap-4 border-t py-5" style={{ borderColor: 'rgba(23,21,18,0.12)' }}>
                  <span className="font-mono text-xs" style={{ color: BRAND.bronze }}>{String(index + 1).padStart(2, '0')}</span>
                  <p className="text-sm leading-7" style={{ color: BRAND.ink }}>{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PricingSection lang={lang} brand={BRAND} />

        <section id="process" className="px-5 py-24 md:px-10">
          <div className="mx-auto max-w-[1120px]">
            <p className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: BRAND.bronze }}>{c.processLabel}</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-light leading-tight md:text-6xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {c.processTitle}
            </h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {c.processSteps.map((step, index) => (
                <div key={step.title} className="rounded-lg p-7" style={{ backgroundColor: BRAND.linen }}>
                  <span className="font-mono text-xs" style={{ color: BRAND.bronze }}>{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-8 text-2xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{step.title}</h3>
                  <p className="mt-4 text-sm leading-7" style={{ color: BRAND.taupe }}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-5 py-24 md:px-10" style={{ backgroundColor: BRAND.espresso, color: BRAND.stone }}>
          <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
            <h2 className="text-4xl font-light leading-tight md:text-7xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{c.finalTitle}</h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/60">{c.finalBody}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://wa.me/306972417067"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full px-8 py-4 text-xs font-black uppercase tracking-[0.18em]"
                style={{ backgroundColor: BRAND.bronze, color: BRAND.espresso }}
              >
                <MessageCircle size={16} />
                {c.secondaryCta}
              </a>
              <a
                href="mailto:stayfolio.gr@gmail.com"
                className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full border px-8 py-4 text-xs font-black uppercase tracking-[0.18em]"
                style={{ borderColor: 'rgba(247,243,234,0.22)', color: BRAND.stone }}
              >
                <Mail size={16} />
                {c.email}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer
        className="flex flex-col items-center justify-between gap-4 px-5 py-7 text-xs md:flex-row md:px-10"
        style={{
          backgroundColor: BRAND.espresso,
          color: 'rgba(247,243,234,0.42)',
          borderTop: '1px solid rgba(247,243,234,0.1)',
        }}
      >
        <span className="font-black uppercase tracking-[0.22em]">STAYFOLIO</span>
        <span>2026 · {c.footerLine}</span>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setLang('en')}
            className="cursor-pointer"
            style={{ color: lang === 'en' ? BRAND.bronze : 'rgba(247,243,234,0.42)' }}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang('gr')}
            className="cursor-pointer"
            style={{ color: lang === 'gr' ? BRAND.bronze : 'rgba(247,243,234,0.42)' }}
          >
            GR
          </button>
        </div>
      </footer>

      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10"
            style={{ backgroundColor: 'rgba(20, 17, 14, 0.95)' }}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Close video"
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl relative"
              style={{ backgroundColor: BRAND.ink }}
            >
              <video
                src="/assets/specialist-video.mov"
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
