import { useState } from 'react';
import { GOLD, EASE, INK, Ico, Reveal, useIsMobile } from './primitives.jsx';

const PHOTOS = [
  { src: '/assets/athens_flat_hero.png',     label: 'Acropolis from the window', tag: '01 · The View' },
  { src: '/assets/athens_flat_living.png',   label: 'The living room',           tag: '02 · The Salon' },
  { src: '/assets/athens_flat_bedroom.png',  label: 'The sleeping nook',         tag: '03 · The Nook' },
  { src: '/assets/athens_flat_kitchen.png',  label: 'Morning ritual',            tag: '04 · The Kitchen' },
  { src: '/assets/athens_flat_bathroom.png', label: 'The marble bath',           tag: '05 · The Marble' },
  { src: '/assets/athens_flat_detail.png',   label: 'Rooftop, golden hour',      tag: '06 · The Hour' },
];

const SPANS = [
  { col: 'span 8', row: 'span 2' },
  { col: 'span 4', row: 'span 1' },
  { col: 'span 4', row: 'span 1' },
  { col: 'span 5', row: 'span 1' },
  { col: 'span 4', row: 'span 1' },
  { col: 'span 3', row: 'span 1' },
];

const T = {
  en: {
    eyebrow: 'The Frames',
    line1: 'Six rooms.',
    line2italic: 'One unforgettable',
    line2end: ' stay.',
    enlarge: '↗ click to enlarge',
  },
  gr: {
    eyebrow: 'Τα Δωμάτια',
    line1: 'Έξι χώροι.',
    line2italic: 'Μία αξέχαστη',
    line2end: ' διαμονή.',
    enlarge: '↗ κλικ για μεγέθυνση',
  },
};

export default function Gallery({ lang = 'en' }) {
  const [box, setBox] = useState(null);
  const isMobile = useIsMobile();
  const t = T[lang] || T.en;

  return (
    <section id="gallery" style={{ padding: isMobile ? '84px 20px' : '120px 60px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row', gap: 20, marginBottom: isMobile ? 34 : 50 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                <div style={{ width: 28, height: 1, background: GOLD }} />
                <span style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD }}>{t.eyebrow}</span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300, fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.95, margin: 0, color: 'white', letterSpacing: '-0.02em' }}>
                {t.line1}<br />
                <span style={{ fontStyle: 'italic', color: GOLD }}>{t.line2italic}</span>{t.line2end}
              </h2>
            </div>
            <div style={{ display: isMobile ? 'none' : 'block', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>{t.enlarge}</div>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)', gap: isMobile ? 14 : 12, gridAutoRows: isMobile ? '260px' : '220px' }}>
          {PHOTOS.map((p, i) => (
            <Reveal key={i} delay={i * 0.05} style={{ gridColumn: isMobile ? 'auto' : SPANS[i].col, gridRow: isMobile ? 'auto' : SPANS[i].row }}>
              <div
                onClick={() => setBox(i)}
                onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.06)'}
                onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
                style={{ position: 'relative', height: '100%', overflow: 'hidden', borderRadius: 4, cursor: 'pointer' }}
              >
                <img src={p.src} alt={p.label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: `transform 1.2s ${EASE}` }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,9,8,0.6), transparent 50%)' }} />
                <div style={{ position: 'absolute', top: 16, left: 16, fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD, fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>{p.tag}</div>
                <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{p.label}</span>
                  <Ico.ArrowUpRight size={14} color="rgba(255,255,255,0.6)" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {box !== null && (
        <div onClick={() => setBox(null)} style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(5,4,3,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
          <button onClick={e => { e.stopPropagation(); setBox(null); }} style={{ position: 'absolute', top: 24, right: 24, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', width: 44, height: 44, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico.X size={20} /></button>
          <button onClick={e => { e.stopPropagation(); setBox((box - 1 + PHOTOS.length) % PHOTOS.length); }} style={{ position: 'absolute', left: 24, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', width: 56, height: 56, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico.ChevL size={22} /></button>
          <img src={PHOTOS[box].src} alt="" onClick={e => e.stopPropagation()} style={{ maxHeight: '85vh', maxWidth: '85vw', objectFit: 'contain', borderRadius: 4 }} />
          <button onClick={e => { e.stopPropagation(); setBox((box + 1) % PHOTOS.length); }} style={{ position: 'absolute', right: 24, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', width: 56, height: 56, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico.ChevR size={22} /></button>
          <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.7)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase' }}>{PHOTOS[box].label} · {box + 1} / {PHOTOS.length}</div>
        </div>
      )}
    </section>
  );
}
