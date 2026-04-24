import React, { useState } from 'react';
import ImmersiveSwitcher from './components/Immersive/ImmersiveSwitcher';
import ImmersiveAthens from './pages/immersive/ImmersiveAthens';
import ImmersiveCyclades from './pages/immersive/ImmersiveCyclades';
import ImmersiveIonian from './pages/immersive/ImmersiveIonian';
import ImmersiveCrete from './pages/immersive/ImmersiveCrete';
import ImmersiveNisi from './pages/immersive/ImmersiveNisi';
import { AnimatePresence, motion } from 'framer-motion';

export const LanguageContext = React.createContext('en');

export default function ImmersiveApp() {
  const [activeRegion, setActiveRegion] = useState('athens');
  const [lang, setLang] = useState('en');

  const renderRegion = () => {
    switch (activeRegion) {
      case 'athens':   return <ImmersiveAthens key="athens" lang={lang} />;
      case 'cyclades': return <ImmersiveCyclades key="cyclades" lang={lang} />;
      case 'ionian':   return <ImmersiveIonian key="ionian" lang={lang} />;
      case 'crete':    return <ImmersiveCrete key="crete" lang={lang} />;
      case 'nisi':     return <ImmersiveNisi key="nisi" lang={lang} />;
      default:         return <ImmersiveAthens key="athens" lang={lang} />;
    }
  };

  return (
    <LanguageContext.Provider value={lang}>
      <div className="relative bg-black min-h-screen">
        <ImmersiveSwitcher
          activeRegion={activeRegion}
          setActiveRegion={setActiveRegion}
          lang={lang}
          setLang={setLang}
        />

        <AnimatePresence mode="wait">
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
