import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import DemoSwitcher from './components/DemoSwitcher';
import Landing from './pages/Landing';
import Athens from './pages/Athens';
import Cyclades from './pages/Cyclades';
import Ionian from './pages/Ionian';
import Nisi from './pages/Nisi';
import ImmersiveSantorini from './pages/immersive/ImmersiveSantorini';
import ImmersiveCrete from './pages/immersive/ImmersiveCrete';
import AirbnbListing from './pages/AirbnbListing';

/* ── Scroll to top on every route change ── */
function ScrollToTop() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash) {
      window.setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ block: 'start' });
      }, 0);
      return;
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [hash, pathname]);
  return null;
}

// Hides DemoSwitcher on home page — navigation comes from the Landing page itself
function DemoSwitcherConditional({ lang, setLang }) {
  const location = useLocation();
  if (location.pathname === '/') return null;
  return <DemoSwitcher lang={lang} setLang={setLang} />;
}

export default function App() {
  const [lang, setLang] = useState('gr');

  return (
    <BrowserRouter>
      <ScrollToTop />
      <DemoSwitcherConditional lang={lang} setLang={setLang} />
      <Routes>
        <Route path="/" element={<Landing lang={lang} setLang={setLang} />} />
        <Route path="/athens" element={<Athens lang={lang} setLang={setLang} />} />
        <Route path="/cyclades" element={<Cyclades lang={lang} setLang={setLang} />} />
        <Route path="/ionian" element={<Ionian lang={lang} setLang={setLang} />} />
        <Route path="/crete" element={<ImmersiveCrete lang={lang} />} />
        <Route path="/nisi" element={<Nisi lang={lang} setLang={setLang} />} />
        <Route path="/santorini" element={<ImmersiveSantorini lang={lang} />} />
        <Route path="/greece" element={<ImmersiveSantorini lang={lang} />} />
        <Route path="/airbnb" element={<AirbnbListing lang={lang} setLang={setLang} />} />
        <Route path="/airbnbtheloume" element={<AirbnbListing lang={lang} setLang={setLang} />} />
      </Routes>
    </BrowserRouter>
  );
}
