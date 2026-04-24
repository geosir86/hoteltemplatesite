import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DemoSwitcher from './components/DemoSwitcher';

// Pages
import Athens from './pages/Athens';
import Cyclades from './pages/Cyclades';
import Ionian from './pages/Ionian';
import Crete from './pages/Crete';

export default function App() {
  return (
    <BrowserRouter>
      <DemoSwitcher />
      <Routes>
        <Route path="/" element={<Athens />} />
        <Route path="/cyclades" element={<Cyclades />} />
        <Route path="/ionian" element={<Ionian />} />
        <Route path="/crete" element={<Crete />} />
      </Routes>
    </BrowserRouter>
  );
}
