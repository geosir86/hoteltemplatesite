import { useState } from 'react';
import ImmersiveSwitcher from './components/Immersive/ImmersiveSwitcher';
import ImmersiveAthens from './pages/immersive/ImmersiveAthens';
import ImmersiveCyclades from './pages/immersive/ImmersiveCyclades';
import ImmersiveIonian from './pages/immersive/ImmersiveIonian';
import ImmersiveCrete from './pages/immersive/ImmersiveCrete';
import ImmersiveNisi from './pages/immersive/ImmersiveNisi';
import ImmersiveGreece from './pages/immersive/ImmersiveGreece';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageContext } from './context/LanguageContext';

export default function ImmersiveApp() {
  const [activeRegion, setActiveRegion] = useState(() => {
    const path = window.location.pathname.replace('/', '');
    return path && ['athens', 'cyclades', 'ionian', 'crete', 'nisi', 'greece'].includes(path) 
      ? path 
      : 'athens';
  });
  const [lang, setLang] = useState('gr');

  const renderRegion = () => {
    switch (activeRegion) {
      case 'athens':   return <ImmersiveAthens key="athens" lang={lang} />;
      case 'cyclades': return <ImmersiveCyclades key="cyclades" lang={lang} />;
      case 'ionian':   return <ImmersiveIonian key="ionian" lang={lang} />;
      case 'crete':    return <ImmersiveCrete key="crete" lang={lang} />;
      case 'nisi':     return <ImmersiveNisi key="nisi" lang={lang} />;
      case 'greece':   return <ImmersiveGreece key="greece" lang={lang} />;
      default:         return <ImmersiveAthens key="athens" lang={lang} />;
    }
  };

  return (
    <LanguageContext.Provider value={lang}>
      <div className={`relative min-h-screen theme-${activeRegion}`}>
        <ImmersiveSwitcher
          activeRegion={activeRegion}
          setActiveRegion={setActiveRegion}
          lang={lang}
          setLang={setLang}
        />

        <AnimatePresence>
          <motion.div
            key={activeRegion}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {renderRegion()}
          </motion.div>
        </AnimatePresence>
      </div>
    </LanguageContext.Provider>
  );
}

