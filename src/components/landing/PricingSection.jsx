import { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BarChart2,
  Film,
  Globe2,
  ImageIcon,
  Layout,
  Mail,
  MessageCircle,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const EASE = [0.23, 1, 0.32, 1];

const FALLBACK_BRAND = {
  stone: '#F7F3EA',
  ink: '#171512',
  taupe: '#6F685F',
  bronze: '#B8894A',
  espresso: '#14110E',
  linen: '#E9DFCF',
  olive: '#566B5A',
};

const FEATURES = {
  page: { icon: Layout, en: 'Premium one-page website', gr: 'Premium μονοσέλιδο website' },
  mobile: { icon: ShieldCheck, en: 'Mobile-first responsive design', gr: 'Mobile-first responsive design' },
  gallery: { icon: ImageIcon, en: 'Photo gallery and property story', gr: 'Gallery φωτογραφιών και ιστορία καταλύματος' },
  contact: { icon: MessageCircle, en: 'WhatsApp, phone, and email actions', gr: 'WhatsApp, τηλέφωνο και email actions' },
  hosting: { icon: Server, en: 'Hosting and SSL for year one', gr: 'Hosting και SSL για τον πρώτο χρόνο' },
  bilingual: { icon: Globe2, en: 'Greek and English copy', gr: 'Ελληνικά και Αγγλικά κείμενα' },
  inquiry: { icon: Mail, en: 'Direct inquiry form and owner alert', gr: 'Direct inquiry φόρμα και ειδοποίηση ιδιοκτήτη' },
  seo: { icon: Search, en: 'Improved SEO structure', gr: 'Βελτιωμένη SEO δομή' },
  tracking: { icon: BarChart2, en: 'Contact and inquiry tracking setup', gr: 'Contact και inquiry tracking setup' },
  video: { icon: Film, en: 'Cinematic hero or AI video section', gr: 'Cinematic hero ή AI video section' },
  signature: { icon: Sparkles, en: 'Signature visual direction', gr: 'Signature visual direction' },
};

const PACKAGES = [
  {
    id: 'essential',
    name: 'Essential Presence',
    price: 249,
    scarcityLimit: 100,
    recommended: false,
    desc: {
      en: 'For hosts who need a polished standalone page for a strong first impression.',
      gr: 'Για hosts που χρειάζονται μια προσεγμένη ανεξάρτητη σελίδα για καλύτερη πρώτη εντύπωση.',
    },
    features: ['page', 'mobile', 'gallery', 'contact', 'hosting'],
  },
  {
    id: 'direct',
    name: 'Direct Inquiry',
    price: 399,
    scarcityLimit: 75,
    recommended: true,
    desc: {
      en: 'For owners who want a branded site that makes direct inquiry easy.',
      gr: 'Για ιδιοκτήτες που θέλουν branded site που κάνει εύκολο το direct inquiry.',
    },
    features: ['page', 'mobile', 'gallery', 'contact', 'hosting', 'bilingual', 'inquiry', 'seo', 'tracking'],
  },
  {
    id: 'signature',
    name: 'Signature Stay',
    price: 699,
    scarcityLimit: 50,
    recommended: false,
    desc: {
      en: 'For villas and boutique stays that need a more cinematic presentation.',
      gr: 'Για villas και boutique stays που χρειάζονται πιο cinematic παρουσίαση.',
    },
    features: ['page', 'mobile', 'gallery', 'contact', 'hosting', 'bilingual', 'inquiry', 'seo', 'tracking', 'video', 'signature'],
  },
];

function FeatureRow({ id, lang, brand, mutedColor }) {
  const safeLang = FEATURES[id]?.[lang] ? lang : 'en';
  const feature = FEATURES[id];
  const Icon = feature.icon;

  return (
    <li className="flex items-start gap-3 py-1.5">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
        <Icon size={14} strokeWidth={2} style={{ color: brand.olive }} />
      </span>
      <span className="text-sm leading-6" style={{ color: mutedColor }}>
        {feature[safeLang]}
      </span>
    </li>
  );
}

function PricingCard({ pkg, lang, index, reduced, brand, onPriceReveal }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const safeLang = pkg.desc[lang] ? lang : 'en';
  const isRecommended = pkg.recommended;
  const mutedColor = isRecommended ? 'rgba(247,243,234,0.68)' : brand.taupe;

  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      if (onPriceReveal) onPriceReveal(pkg);
    }
  };

  useEffect(() => {
    let timer;
    if (isRevealed) {
      timer = setTimeout(() => {
        setIsRevealed(false);
      }, 6000); // Auto-hide after 6 seconds
    }
    return () => clearTimeout(timer);
  }, [isRevealed]);

  return (
    <motion.article
      initial={reduced ? {} : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: EASE }}
      className="relative flex flex-col rounded-lg border p-7 md:p-8"
      style={{
        backgroundColor: isRecommended ? brand.ink : brand.linen,
        borderColor: isRecommended ? brand.ink : 'rgba(23,21,18,0.1)',
        color: isRecommended ? brand.stone : brand.ink,
      }}
    >
      {isRecommended && (
        <div
          className="absolute -top-3 left-6 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-[0.18em]"
          style={{ backgroundColor: brand.bronze, color: brand.espresso }}
        >
          {lang === 'en' ? 'Recommended' : 'Προτεινόμενο'}
        </div>
      )}

      <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: isRecommended ? brand.bronze : brand.olive }}>
        {lang === 'en' ? 'Package' : 'Πακέτο'}
      </p>
      <h3 className="mt-4 text-3xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {pkg.name}
      </h3>
      <p className="mt-4 text-sm leading-6 lg:min-h-[96px]" style={{ color: mutedColor }}>
        {pkg.desc[safeLang]}
      </p>

      <div className="my-7 border-t pt-7" style={{ borderColor: isRecommended ? 'rgba(247,243,234,0.16)' : 'rgba(23,21,18,0.12)' }}>
        <p className="text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: isRecommended ? 'rgba(247,243,234,0.45)' : brand.taupe }}>
          {lang === 'en' ? 'from' : 'από'}
        </p>
        <button
          onClick={handleReveal}
          className="mt-1 flex flex-col items-start gap-1 rounded-lg px-3 py-1 -mx-3 transition-colors hover:cursor-pointer hover:scale-105 active:scale-95 duration-200"
          style={{ backgroundColor: isRecommended ? 'rgba(247,243,234,0.08)' : 'rgba(23,21,18,0.04)' }}
          aria-label={lang === 'en' ? 'Reveal price' : 'Εμφάνιση τιμής'}
        >
          {isRevealed ? (
            <motion.div
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              className="flex flex-col items-start gap-1"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  €
                </span>
                <span className="text-6xl font-light leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {pkg.price}
                </span>
              </div>
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-sm px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.1em]"
                style={{ backgroundColor: brand.bronze, color: brand.espresso }}
              >
                {lang === 'en' ? `Offer for first ${pkg.scarcityLimit}` : `Προσφορα για τους πρωτους ${pkg.scarcityLimit}`}
              </motion.span>
            </motion.div>
          ) : (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-2 text-3xl font-light italic leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", opacity: 0.8 }}
            >
              {lang === 'en' ? 'Reveal Price' : 'Εμφάνιση Τιμής'}
            </motion.span>
          )}
        </button>
        <p className="mt-2 text-xs" style={{ color: isRecommended ? 'rgba(247,243,234,0.45)' : brand.taupe }}>
          {lang === 'en' ? 'one-time setup · year-one hosting included' : 'εφάπαξ setup · hosting πρώτου χρόνου included'}
        </p>
      </div>

      <ul className="flex flex-1 flex-col">
        {pkg.features.map((id) => (
          <FeatureRow key={id} id={id} lang={safeLang} brand={brand} mutedColor={mutedColor} />
        ))}
      </ul>

      <a
        href="#contact"
        className="mt-8 inline-flex cursor-pointer items-center justify-center gap-3 rounded-full px-6 py-4 text-xs font-black uppercase tracking-[0.18em]"
        style={{
          backgroundColor: isRecommended ? brand.bronze : brand.ink,
          color: isRecommended ? brand.espresso : brand.stone,
        }}
      >
        {lang === 'en' ? 'Send your listing' : 'Στείλε listing'}
        <ArrowRight size={15} />
      </a>
    </motion.article>
  );
}

export default function PricingSection({ lang, brand = FALLBACK_BRAND }) {
  const reduced = useReducedMotion();

  const handlePriceReveal = (pkg) => {
    console.log('Price revealed:', pkg.name, pkg.price);
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'reveal_price', { package: pkg.name, price: pkg.price });
      } else if (window.va) {
        window.va('event', { name: 'reveal_price', data: { package: pkg.name, price: pkg.price } });
      }
    }
  };

  return (
    <section id="pricing" className="px-5 py-24 md:px-10" style={{ backgroundColor: brand.stone }}>
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: brand.bronze }}>
              {lang === 'en' ? 'Packages' : 'Πακέτα'}
            </p>
            <h2
              className="mt-5 max-w-3xl text-4xl font-light leading-tight md:text-6xl"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: brand.ink }}
            >
              {lang === 'en'
                ? 'Clear options for a stronger property presence.'
                : 'Καθαρές επιλογές για πιο δυνατή παρουσία καταλύματος.'}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7" style={{ color: brand.taupe }}>
            {lang === 'en'
              ? 'No hidden agency process. Pick the level that fits your property and we keep the scope clear from the start.'
              : 'Χωρίς κρυφό agency process. Διαλέγουμε το επίπεδο που ταιριάζει στο κατάλυμά σου και κρατάμε το scope καθαρό από την αρχή.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PACKAGES.map((pkg, index) => (
            <PricingCard key={pkg.id} pkg={pkg} lang={lang} index={index} reduced={reduced} brand={brand} onPriceReveal={handlePriceReveal} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs leading-6" style={{ color: brand.taupe }}>
          {lang === 'en'
            ? 'Not sure which fits? Send the listing and I will recommend the practical option.'
            : 'Δεν ξέρεις ποιο ταιριάζει; Στείλε το listing και θα σου προτείνω την πρακτική επιλογή.'}
        </p>
      </div>
    </section>
  );
}
