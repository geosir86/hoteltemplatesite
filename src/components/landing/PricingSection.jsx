import { motion, useReducedMotion } from 'framer-motion';
import {
  Layout, Smartphone, ImageIcon, Star, MessageCircle, MapPin,
  ExternalLink, Search, Server, ShieldCheck, CalendarCheck, Mail,
  Languages, HelpCircle, BarChart2, Film, Settings, TrendingUp,
  Zap, Check, ArrowRight, Sparkles, RefreshCw,
} from 'lucide-react';

const EASE = [0.23, 1, 0.32, 1];
const GOLD = '#C9A84C';

const F = {
  website:    { icon: Layout,        en: 'Premium one-page website',                gr: 'Premium μονοσέλιδο website' },
  mobile:     { icon: Smartphone,    en: 'Mobile-first design',                     gr: 'Σχεδιασμός για κινητό' },
  photos:     { icon: ImageIcon,     en: 'Photo gallery & description',             gr: 'Gallery φωτογραφιών & περιγραφή' },
  amenities:  { icon: Star,          en: 'Amenities section',                       gr: 'Section παροχών' },
  contact:    { icon: MessageCircle, en: 'WhatsApp / phone / email buttons',        gr: 'Κουμπιά WhatsApp / τηλ. / email' },
  maps:       { icon: MapPin,        en: 'Google Maps',                             gr: 'Google Maps' },
  airbnb:     { icon: ExternalLink,  en: 'Link to Airbnb / Booking.com',            gr: 'Link Airbnb / Booking.com' },
  seo:        { icon: Search,        en: 'Basic SEO setup',                         gr: 'Βασικό SEO setup' },
  hosting:    { icon: Server,        en: '1-year hosting included',                 gr: 'Hosting 1 χρόνο δωρεάν' },
  ssl:        { icon: ShieldCheck,   en: 'SSL security',                            gr: 'SSL ασφάλεια' },
  form:       { icon: CalendarCheck, en: 'Availability request form',               gr: 'Φόρμα αιτήματος διαθεσιμότητας' },
  emailOwner: { icon: Mail,          en: 'Instant email alert to owner',            gr: 'Email ειδοποίηση στον ιδιοκτήτη' },
  emailGuest: { icon: Mail,          en: 'Auto-reply email to guest',               gr: 'Αυτόματο email στον επισκέπτη' },
  bilingual:  { icon: Languages,     en: 'Greek & English',                         gr: 'Ελληνικά & Αγγλικά' },
  faq:        { icon: HelpCircle,    en: 'FAQ section',                             gr: 'FAQ section' },
  reviews:    { icon: Star,          en: 'Guest reviews section',                   gr: 'Section αξιολογήσεων' },
  bookDirect: { icon: ArrowRight,    en: '"Book Direct & Save" section',            gr: '"Κράτησε Απευθείας" section' },
  tracking:   { icon: BarChart2,     en: 'WhatsApp / form / link tracking',         gr: 'Tracking επαφών & κρατήσεων' },
  seoPlus:    { icon: Search,        en: 'Improved SEO structure',                  gr: 'Βελτιωμένη SEO δομή' },
  aiVideo:    { icon: Film,          en: '1 AI cinematic video for your site',      gr: '1 AI cinematic video για το site σου' },
  heroVideo:  { icon: Film,          en: 'Hero video background section',           gr: 'Hero video background section' },
  advGallery: { icon: ImageIcon,     en: 'Advanced photo gallery',                  gr: 'Advanced photo gallery' },
  roomTypes:  { icon: Layout,        en: 'Room types & spaces section',             gr: 'Section τύπων δωματίων & χώρων' },
  admin:      { icon: Settings,      en: 'Mini admin: edit prices & text yourself', gr: 'Mini admin: αλλάζεις τιμές & κείμενα μόνος σου' },
  seasonal:   { icon: Sparkles,      en: 'Seasonal offers & packages section',      gr: 'Section εποχικών προσφορών & πακέτων' },
  analytics:  { icon: TrendingUp,    en: 'Google Analytics + Search Console',       gr: 'Google Analytics + Search Console' },
  localSeo:   { icon: Search,        en: 'Advanced local SEO setup',                gr: 'Advanced local SEO setup' },
  priority:   { icon: Zap,           en: 'Priority delivery — ready in 1 week',     gr: 'Προτεραιότητα παράδοσης — έτοιμο σε 1 εβδομάδα' },
};

const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Stay',
    tagline: { en: 'For Airbnb hosts, studios & small properties.', gr: 'Για Airbnb hosts, studios & μικρά καταλύματα.' },
    price: 249,
    popular: false,
    cta: { en: 'Get started', gr: 'Ξεκίνα εδώ' },
    prevTier: null,
    features: ['website','mobile','photos','amenities','contact','maps','airbnb','seo','hosting','ssl'],
    border: 'rgba(255,255,255,0.1)',
    bg: 'rgba(255,255,255,0.025)',
    glow: 'none',
  },
  {
    id: 'direct',
    name: 'Direct Booking',
    tagline: { en: 'For owners who want direct reservations — no commissions.', gr: 'Για ιδιοκτήτες που θέλουν απευθείας κρατήσεις χωρίς προμήθειες.' },
    price: 399,
    popular: true,
    cta: { en: 'WhatsApp us →', gr: 'WhatsApp →' },
    prevTier: { en: 'Everything in Starter, plus:', gr: 'Όλα του Starter, και επιπλέον:' },
    features: ['form','emailOwner','emailGuest','bilingual','faq','reviews','bookDirect','tracking','seoPlus'],
    border: GOLD,
    bg: 'rgba(201,168,76,0.05)',
    glow: '0 0 60px rgba(201,168,76,0.12), 0 0 120px rgba(201,168,76,0.06)',
  },
  {
    id: 'premium',
    name: 'Premium Visual',
    tagline: { en: 'For villas, boutique hotels & properties that demand attention.', gr: 'Για βίλες, boutique hotels & καταλύματα που θέλουν να ξεχωρίζουν.' },
    price: 699,
    popular: false,
    cta: { en: 'Go premium', gr: 'Πάμε premium' },
    prevTier: { en: 'Everything in Direct Booking, plus:', gr: 'Όλα του Direct Booking, και επιπλέον:' },
    features: ['aiVideo','heroVideo','advGallery','roomTypes','admin','seasonal','analytics','localSeo','priority'],
    border: 'rgba(201,168,76,0.25)',
    bg: 'rgba(201,168,76,0.02)',
    glow: 'none',
  },
];

const ADD_ONS = [
  {
    icon: Film,
    name: { en: 'AI Cinematic Video', gr: 'AI Cinematic Video' },
    desc: {
      en: 'We turn your existing property photos into a short cinematic clip (8–15 sec). For hero background, room preview, or gallery entrance.',
      gr: 'Μετατρέπουμε τις υπάρχουσες φωτογραφίες σου σε σύντομο cinematic video (8–15 δευτ.) για hero, room preview ή gallery.',
    },
    price: 149,
    unit: { en: 'per video', gr: 'ανά video' },
  },
  {
    icon: RefreshCw,
    name: { en: 'Annual Hosting Renewal', gr: 'Ετήσια Ανανέωση' },
    desc: {
      en: 'After year 1, keep your site live, fast and secure. Includes updates, SSL renewal and uptime monitoring.',
      gr: 'Μετά τον 1ο χρόνο, το site παραμένει online, γρήγορο & ασφαλές. Περιλαμβάνει updates, SSL και monitoring.',
    },
    price: 79,
    unit: { en: 'per year', gr: 'ανά χρόνο' },
  },
];

function FeatureRow({ id, lang }) {
  const feat = F[id];
  const Icon = feat.icon;
  return (
    <li className="flex items-start gap-3 py-1.5">
      <span className="mt-0.5 shrink-0 w-4 h-4 flex items-center justify-center">
        <Check size={13} strokeWidth={2.5} style={{ color: GOLD }} />
      </span>
      <span className="text-sm leading-snug" style={{ color: 'rgba(255,255,255,0.65)' }}>
        {feat[lang]}
      </span>
    </li>
  );
}

function PrevTierBadge({ text }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4 text-xs font-semibold tracking-wide"
      style={{ backgroundColor: 'rgba(201,168,76,0.1)', color: GOLD, border: '1px solid rgba(201,168,76,0.2)' }}
    >
      <span style={{ color: GOLD }}>✦</span>
      {text}
    </div>
  );
}

function PricingCard({ pkg, lang, index, reduced }) {
  const c = pkg.cta[lang];
  const tagline = pkg.tagline[lang];

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: EASE }}
      className="relative flex flex-col rounded-2xl p-8 md:p-10"
      style={{
        backgroundColor: pkg.bg,
        border: `1px solid ${pkg.border}`,
        boxShadow: pkg.glow,
      }}
    >
      {/* Most popular badge */}
      {pkg.popular && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase whitespace-nowrap"
          style={{ backgroundColor: GOLD, color: '#080808' }}
        >
          {lang === 'en' ? '★ Most Popular' : '★ Πιο Δημοφιλές'}
        </div>
      )}

      {/* Package name */}
      <div className="mb-1">
        <span
          className="text-[10px] tracking-[0.4em] uppercase"
          style={{ color: pkg.popular ? GOLD : 'rgba(255,255,255,0.3)' }}
        >
          {lang === 'en' ? 'Package' : 'Πακέτο'}
        </span>
        <h3
          className="text-2xl md:text-3xl font-light text-white mt-1"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {pkg.name}
        </h3>
      </div>

      {/* Tagline — who it's for */}
      <p className="text-xs leading-relaxed mb-6 mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {tagline}
      </p>

      {/* Price */}
      <div className="mb-8 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="text-[10px] tracking-[0.4em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
          {lang === 'en' ? 'from' : 'από'}
        </div>
        <div className="flex items-baseline gap-1">
          <span
            className="font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: pkg.popular ? GOLD : 'rgba(255,255,255,0.5)' }}
          >
            €
          </span>
          <span
            className="font-light leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '5rem', color: 'white' }}
          >
            {pkg.price}
          </span>
        </div>
        <div className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
          {lang === 'en' ? 'one-time payment · 1-year hosting included' : 'εφάπαξ πληρωμή · hosting 1 χρόνο included'}
        </div>
      </div>

      {/* Prev tier include */}
      {pkg.prevTier && <PrevTierBadge text={pkg.prevTier[lang]} />}

      {/* Features */}
      <ul className="flex flex-col flex-1 mb-8">
        {pkg.features.map((id) => (
          <FeatureRow key={id} id={id} lang={lang} />
        ))}
      </ul>

      {/* CTA */}
      <motion.a
        href="#contact"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="block text-center py-4 rounded-full text-xs font-bold tracking-[0.3em] uppercase cursor-pointer transition-all duration-300"
        style={
          pkg.popular
            ? { backgroundColor: GOLD, color: '#080808' }
            : { border: `1px solid ${pkg.border}`, color: 'rgba(255,255,255,0.7)' }
        }
      >
        {c}
      </motion.a>
    </motion.div>
  );
}

export default function PricingSection({ lang }) {
  const reduced = useReducedMotion();

  return (
    <section
      id="pricing"
      className="py-24 md:py-36 px-6 md:px-16 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px" style={{ backgroundColor: GOLD }} />
              <span className="text-[11px] tracking-[0.5em] uppercase" style={{ color: GOLD }}>
                {lang === 'en' ? 'Packages' : 'Πακέτα'}
              </span>
            </div>
            <h2
              className="text-4xl md:text-6xl font-light text-white leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {lang === 'en' ? 'Choose your\npackage.' : 'Επίλεξε το\nπακέτο σου.'}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed md:text-right" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {lang === 'en'
              ? 'All packages include hosting, SSL and mobile design. No hidden fees. One payment, site is yours.'
              : 'Όλα τα πακέτα περιλαμβάνουν hosting, SSL και mobile design. Καμία κρυφή χρέωση. Μία πληρωμή, το site είναι δικό σου.'}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-start mt-8">
          {PACKAGES.map((pkg, i) => (
            <PricingCard key={pkg.id} pkg={pkg} lang={lang} index={i} reduced={reduced} />
          ))}
        </div>

        {/* Add-ons */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-5 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
            <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {lang === 'en' ? 'Optional add-ons' : 'Προαιρετικά extras'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ADD_ONS.map((a) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={a.name.en}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-6 p-6 md:p-8 rounded-2xl"
                  style={{ border: '1px solid rgba(255,255,255,0.07)', backgroundColor: 'rgba(255,255,255,0.02)' }}
                >
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}
                  >
                    <Icon size={16} style={{ color: GOLD }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <span
                        className="font-light text-white text-lg"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {a.name[lang]}
                      </span>
                      <div className="text-right shrink-0">
                        <span className="text-2xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                          €{a.price}
                        </span>
                        <span className="text-xs ml-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                          {a.unit[lang]}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {a.desc[lang]}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={reduced ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 text-center text-xs tracking-wide"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          {lang === 'en'
            ? 'Not sure which to pick? WhatsApp us — we\'ll tell you honestly which package fits your property.'
            : 'Δεν ξέρεις ποιο να διαλέξεις; WhatsApp μας — θα σου πούμε ειλικρινά ποιο ταιριάζει στο κατάλυμά σου.'}
        </motion.p>

      </div>
    </section>
  );
}
