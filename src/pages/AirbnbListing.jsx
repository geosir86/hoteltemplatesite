import { GOLD } from './listing/primitives';
import Nav from './listing/Nav';
import Hero from './listing/Hero';
import Story from './listing/Story';
import Gallery from './listing/Gallery';
import Description from './listing/Description';
import Amenities from './listing/Amenities';
import Calendar from './listing/Calendar';
import Reviews from './listing/Reviews';
import Closer from './listing/Closer';
import StickyBar from './listing/StickyBar';

export default function AirbnbListing({ lang = 'en', setLang }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0908', color: 'white', fontFamily: "'Plus Jakarta Sans', sans-serif", overflowX: 'hidden' }}>
      <Nav lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Story lang={lang} />
      <Gallery lang={lang} />
      <Description lang={lang} />
      <Amenities lang={lang} />
      <Calendar lang={lang} />
      <Reviews lang={lang} />
      <Closer lang={lang} />
      <footer style={{ padding: '40px 60px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: 'rgba(255,255,255,0.3)', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.5)' }}>
          STAYFOLIO<span style={{ color: GOLD }}>.</span>GR
        </span>
        <span style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: 10 }}>© 2026 · Demo build · All rights reserved</span>
        <div style={{ display: 'flex', gap: 18, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
          {['Instagram', 'Pinterest', 'Email'].map(s => (
            <a key={s} href="#" style={{ color: 'inherit', textDecoration: 'none' }}>{s}</a>
          ))}
        </div>
      </footer>
      <StickyBar lang={lang} />
    </div>
  );
}
