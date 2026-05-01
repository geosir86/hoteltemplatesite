import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

// Estate demo pages only — HOME is now handled by Landing's AgencyNav
const versions = [
  { id: 'airbnb',    en: 'ATHENS FLAT', gr: 'ΑΘΗΝΑ FLAT',  path: '/airbnb' },
  { id: 'santorini', en: 'SANTORINI',   gr: 'ΣΑΝΤΟΡΙΝΗ',   path: '/santorini' },
  { id: 'crete',     en: 'CRETE',       gr: 'ΚΡΗΤΗ',       path: '/crete' },
  { id: 'athens',    en: 'ATHENS',      gr: 'ΑΘΗΝΑ',       path: '/athens' },
  { id: 'cyclades',  en: 'CYCLADES',    gr: 'ΚΥΚΛΑΔΕΣ',    path: '/cyclades' },
  { id: 'ionian',    en: 'IONIAN',      gr: 'ΙΟΝΙΟ',       path: '/ionian' },
  { id: 'nisi',      en: 'NISI',        gr: 'ΝΗΣΙ',        path: '/nisi' },
];

export default function DemoSwitcher({ lang = 'en', setLang }) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 left-2 right-2 md:left-1/2 md:right-auto md:-translate-x-1/2 z-[999] pointer-events-auto"
    >
      <div className="w-full md:w-auto bg-foreground/95 backdrop-blur-xl rounded-full p-1 flex items-center shadow-2xl border border-white/10 overflow-hidden">

        {/* Back to Studio / Home icon */}
        <Link
          to="/"
          title="Back to Studio"
          className="flex-shrink-0 flex items-center gap-2 pl-3 pr-4 py-2 border-r border-white/10 text-white/50 hover:text-white transition-colors duration-200"
        >
          <Home size={13} />
          <span className="hidden md:inline text-[10px] font-bold tracking-widest uppercase">Studio</span>
        </Link>

        {/* Demo Buttons */}
        <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar">
          <div className="flex px-0.5 shrink-0">
            {versions.map((v) => (
              <NavLink
                key={v.id}
                to={v.path}
                className={({ isActive }) =>
                  `relative px-3 md:px-5 py-2 text-[10px] md:text-xs font-bold tracking-wide md:tracking-widest uppercase transition-all duration-300 rounded-full whitespace-nowrap
                  ${isActive ? 'text-foreground' : 'text-white/60 hover:text-white hover:bg-white/5'}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{v[lang]}</span>
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-white rounded-full z-0"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-white/10 mx-1 flex-shrink-0" />

        {/* Language Toggle */}
        <button
          onClick={() => setLang(lang === 'en' ? 'gr' : 'en')}
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
