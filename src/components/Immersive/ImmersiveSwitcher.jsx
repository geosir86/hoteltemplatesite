import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const versions = [
  { id: 'athens',   en: 'Athens',   gr: 'Αθήνα' },
  { id: 'cyclades', en: 'Cyclades', gr: 'Κυκλάδες' },
  { id: 'ionian',   en: 'Ionian',   gr: 'Ιόνιο' },
  { id: 'crete',    en: 'Crete',    gr: 'Κρήτη' },
  { id: 'nisi',     en: 'Nisi',     gr: 'Νησί' },
];

export default function ImmersiveSwitcher({ activeRegion, setActiveRegion, lang, setLang }) {
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-2 right-2 md:left-1/2 md:right-auto md:-translate-x-1/2 z-[100] pointer-events-auto"
    >
      <div className="relative w-full md:w-auto bg-black/60 backdrop-blur-2xl rounded-full p-1.5 flex items-center gap-0.5 border border-white/[0.12] shadow-[0_8px_40px_rgba(0,0,0,0.6)] overflow-hidden">

        {/* Brand icon */}
        <div className="hidden sm:flex pl-3 pr-2 py-2 items-center gap-1.5 border-r border-white/[0.1]">
          <Sparkles size={11} className="text-white/50" />
        </div>

        {/* Region tabs - scrollable on mobile */}
        <div className="flex-1 min-w-0 flex items-center overflow-x-auto no-scrollbar">
          {versions.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveRegion(v.id)}
              data-magnetic
              className={`relative flex-shrink-0 px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] font-medium tracking-[0.1em] uppercase transition-all duration-300 rounded-full
                ${activeRegion === v.id ? 'text-black' : 'text-white/50 hover:text-white/90'}`}
            >
              <span className="relative z-10">{lang === 'gr' ? v.gr : v.en}</span>
              {activeRegion === v.id && (
                <motion.div
                  layoutId="immersive-active-pill"
                  className="absolute inset-0 bg-white rounded-full shadow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-white/10 mx-1 flex-shrink-0" />

        {/* Language Toggle */}
        <button
          onClick={() => setLang(lang === 'en' ? 'gr' : 'en')}
          data-magnetic
          className="flex-shrink-0 flex items-center gap-1 px-3 py-2 mr-1 rounded-full text-[10px] font-bold tracking-widest text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
        >
          <span className={lang === 'en' ? 'text-white' : 'text-white/30'}>EN</span>
          <span className="text-white/20">/</span>
          <span className={lang === 'gr' ? 'text-white' : 'text-white/30'}>ΕΛ</span>
        </button>
      </div>
    </motion.div>
  );
}

