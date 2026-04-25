import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DemoSwitcher from './components/DemoSwitcher';
import Landing from './pages/Landing';
import Athens from './pages/Athens';
import Cyclades from './pages/Cyclades';
import Ionian from './pages/Ionian';
import Crete from './pages/Crete';
import Nisi from './pages/Nisi';

export default function App() {
  const [lang, setLang] = useState('en');

  return (
    <BrowserRouter>
      <DemoSwitcher />
      <Routes>
        <Route path="/" element={<Landing lang={lang} setLang={setLang} />} />
        <Route path="/athens" element={<Athens lang={lang} setLang={setLang} />} />
        <Route path="/cyclades" element={<Cyclades lang={lang} setLang={setLang} />} />
        <Route path="/ionian" element={<Ionian lang={lang} setLang={setLang} />} />
        <Route path="/crete" element={<Crete lang={lang} setLang={setLang} />} />
        <Route path="/nisi" element={<Nisi lang={lang} setLang={setLang} />} />
      </Routes>
    </BrowserRouter>
  );
}
