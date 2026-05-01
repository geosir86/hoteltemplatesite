import { useState, useEffect } from 'react';
import { GOLD, EASE, Ico, useIsMobile } from './primitives.jsx';

export default function StickyBar({ lang }) {
  const [show, setShow] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 700 && window.scrollY < document.body.scrollHeight - 1500);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 80,
      transform: show ? 'translateY(0)' : 'translateY(100%)',
      transition: `transform 0.6s ${EASE}`,
      padding: isMobile ? '12px 16px' : '14px 40px',
      background: 'rgba(10,9,8,0.92)', backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: isMobile ? 12 : 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: isMobile ? 7 : 12, minWidth: 0 }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: isMobile ? 22 : 26, color: 'white' }}>€245</span>
        <span style={{ fontSize: 10, letterSpacing: isMobile ? '0.08em' : '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>/ night</span>
        <span style={{ marginLeft: isMobile ? 4 : 16, display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
          <Ico.Star size={11} fill={GOLD} color={GOLD} /> 4.96
        </span>
      </div>
      <a href="#book" style={{ padding: isMobile ? '12px 16px' : '12px 26px', borderRadius: 999, background: GOLD, color: '#0A0908', textDecoration: 'none', fontSize: 11, fontWeight: 700, letterSpacing: isMobile ? '0.12em' : '0.3em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
        {lang === 'gr' ? 'Κράτηση' : 'Reserve'} <Ico.ArrowRight size={12} color="#0A0908" />
      </a>
    </div>
  );
}
