import { useState, useEffect } from 'react';
import { GOLD, EASE, INK, Ico, useIsMobile } from './primitives.jsx';

const GRAIN = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")";

export default function Hero({ lang }) {
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useIsMobile();
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const title = lang === 'gr' ? 'The Athens Flat' : 'The Athens Flat';
  const sub = lang === 'gr' ? 'Εκεί που η πόλη αναπνέει.' : 'Where the city breathes.';

  return (
    <section style={{ position: 'relative', height: '100svh', minHeight: isMobile ? 620 : 720, overflow: 'hidden', background: INK }}>
      {/* Parallax background */}
      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${scrollY * 0.4}px) scale(${1 + scrollY * 0.0003})` }}>
        <video src="/assets/Apartment_to_Athens_Acropolis_202605011825.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,9,8,0.4) 0%, rgba(10,9,8,0.05) 30%, rgba(10,9,8,0.5) 80%, rgba(10,9,8,0.95) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, transparent 30%, rgba(10,9,8,0.6) 100%)' }} />
      </div>

      {/* Grain overlay */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.07, mixBlendMode: 'overlay', pointerEvents: 'none', backgroundImage: GRAIN }} />

      {/* Awards strip */}
      <div style={{ position: 'absolute', top: 100, left: '50%', transform: 'translateX(-50%)', display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: 28, zIndex: 5, opacity: Math.max(0, 1 - scrollY / 400) }}>
        {['Featured · Condé Nast', 'Top 1% · Airbnb', "Editor's Pick · 2026"].map((a, i) => (
          <span key={a} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {i > 0 && <span style={{ width: 4, height: 4, borderRadius: '50%', background: GOLD, opacity: 0.6, display: 'inline-block' }} />}
            <span style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>{a}</span>
          </span>
        ))}
      </div>

      {/* Main content */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: isMobile ? '0 20px 72px' : '0 60px 80px', opacity: Math.max(0, 1 - scrollY / 600) }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, minWidth: 0 }}>
            <Ico.MapPin size={13} color={GOLD} />
            <span style={{ fontSize: 10.5, letterSpacing: isMobile ? '0.18em' : '0.45em', textTransform: 'uppercase', color: GOLD }}>Monastiraki · Athens</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300, fontSize: isMobile ? 'clamp(56px, 16vw, 78px)' : 'clamp(56px, 9vw, 144px)', lineHeight: 0.92, letterSpacing: '-0.015em', color: 'white', margin: 0, marginBottom: 12 }}>
            {title}
          </h1>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(18px, 2vw, 28px)', color: 'rgba(255,255,255,0.55)', margin: 0, marginBottom: 40, fontWeight: 300 }}>
            {sub}
          </p>
          <div style={{ display: isMobile ? 'grid' : 'flex', gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : undefined, alignItems: 'center', flexWrap: 'wrap', gap: isMobile ? 12 : 28, paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.12)', fontSize: 11, letterSpacing: isMobile ? '0.08em' : '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
            {[lang === 'gr' ? '2 επισκέπτες' : '2 guests', lang === 'gr' ? '1 κρεβάτι' : '1 bed', lang === 'gr' ? '1 μπάνιο' : '1 bath', '45 m²'].map((s, i) => (
              <span key={i}>{i > 0 && !isMobile && <span style={{ color: GOLD, opacity: 0.5, marginRight: 28 }}>·</span>}{s}</span>
            ))}
            <div style={{ flex: 1, display: isMobile ? 'none' : 'block' }} />
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'white', gridColumn: isMobile ? '1 / -1' : undefined }}>
              <Ico.Star size={13} fill={GOLD} color={GOLD} />
              <span style={{ fontWeight: 600, letterSpacing: '0.05em' }}>4.96</span>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>· 87 reviews</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom hints */}
      <div style={{ position: 'absolute', bottom: 24, left: 60, display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: 12, fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80', display: 'inline-block' }} />
        Now booking · Spring 2026
      </div>
      <div style={{ position: 'absolute', bottom: 20, right: 20, fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
        scroll ↓
      </div>
    </section>
  );
}
