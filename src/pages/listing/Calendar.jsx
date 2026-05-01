import { useState } from 'react';
import { GOLD, EASE, MagButton, Ico, Reveal, useIsMobile } from './primitives.jsx';

const BOOKED = new Set([2, 3, 4, 5, 22, 23, 24, 25, 26, 27]);
const DAYS = Array.from({ length: 30 }, (_, i) => i + 1);
const OFFSET = 2;

export default function Calendar({ lang }) {
  const [hover, setHover] = useState(null);
  const [picked, setPicked] = useState({ in: 12, out: 18 });
  const isGr = lang === 'gr';
  const isMobile = useIsMobile();

  return (
    <section id="calendar" style={{ padding: isMobile ? '84px 20px' : '140px 60px', borderTop: '1px solid rgba(255,255,255,0.05)', background: `linear-gradient(to bottom, transparent, rgba(201,160,76,0.025))` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: isMobile ? 42 : 80 }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <div style={{ width: 28, height: 1, background: GOLD }} />
            <span style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD }}>{isGr ? 'Κάνε Κράτηση' : 'Reserve Your Stay'}</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300, fontSize: isMobile ? 'clamp(40px, 12vw, 58px)' : 'clamp(44px, 5.5vw, 84px)', lineHeight: 0.96, color: 'white', margin: 0, letterSpacing: '-0.015em' }}>
            {isGr ? 'Διάλεξε την εβδομάδα' : 'Pick your'}<br />
            <span style={{ fontStyle: 'italic', color: GOLD }}>{isGr ? 'ηρεμίας σου.' : 'quiet week.'}</span>
          </h2>
          <p style={{ marginTop: 32, color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 1.7, maxWidth: 380 }}>
            {isGr ? 'Ζωντανή διαθεσιμότητα για τις επόμενες 30 ημέρες.' : "Live availability for the next 30 days. Faded squares are taken — Eleni's regulars book early."}
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: isMobile ? 14 : 24, alignItems: 'center', flexWrap: 'wrap', fontSize: 11, letterSpacing: isMobile ? '0.08em' : '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 12, height: 12, background: GOLD, borderRadius: 2, display: 'inline-block' }} />{isGr ? 'Επιλεγμένο' : 'Selected'}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 12, height: 12, background: 'rgba(255,255,255,0.08)', borderRadius: 2, display: 'inline-block' }} />{isGr ? 'Ελεύθερο' : 'Available'}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 12, height: 12, background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: 2, display: 'inline-block' }} />{isGr ? 'Κρατημένο' : 'Booked'}</span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: isMobile ? 16 : 28, background: 'rgba(255,255,255,0.02)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 22, color: 'white' }}>May 2026</span>
              <div style={{ display: 'flex', gap: 8 }}>
                {[Ico.ChevL, Ico.ChevR].map((Ch, i) => (
                  <button key={i} style={{ width: 32, height: 32, border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'white', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ch size={14} /></button>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
              {['M','T','W','T','F','S','S'].map((d, i) => (
                <div key={i} style={{ textAlign: 'center', fontSize: 9, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.35)', padding: '8px 0' }}>{d}</div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: isMobile ? 3 : 4 }}>
              {Array.from({ length: OFFSET }).map((_, i) => <div key={'p' + i} />)}
              {DAYS.map((d) => {
                const isBooked = BOOKED.has(d);
                const inRange = d >= picked.in && d <= picked.out;
                const isEdge = d === picked.in || d === picked.out;
                return (
                  <button key={d}
                    onClick={() => !isBooked && setPicked({ in: d, out: Math.min(d + 6, 30) })}
                    onMouseEnter={() => setHover(d)} onMouseLeave={() => setHover(null)}
                    disabled={isBooked}
                    style={{
                      aspectRatio: '1', border: isBooked ? '1px dashed rgba(255,255,255,0.15)' : 'none', borderRadius: 4,
                      cursor: isBooked ? 'not-allowed' : 'pointer',
                      background: isEdge ? GOLD : inRange ? `${GOLD}40` : isBooked ? 'transparent' : 'rgba(255,255,255,0.05)',
                      color: isEdge ? '#0A0908' : inRange ? 'white' : isBooked ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)',
                      minWidth: 0,
                      fontSize: isMobile ? 11 : 12, fontWeight: isEdge ? 700 : 400, transition: 'all 0.2s',
                      textDecoration: isBooked ? 'line-through' : 'none',
                    }}>{d}</button>
                );
              })}
            </div>
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center', gap: 18 }}>
              <div>
                <div style={{ fontSize: 9, letterSpacing: '0.4em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 4 }}>
                  {picked.out - picked.in} nights · May {picked.in}–{picked.out}
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: 'white', fontStyle: 'italic' }}>
                  €{(picked.out - picked.in) * 245}
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontStyle: 'normal', marginLeft: 8 }}>total</span>
                </div>
              </div>
              <MagButton style={{ width: isMobile ? '100%' : 'auto', justifyContent: 'center', padding: '14px 28px', borderRadius: 999, background: GOLD, color: '#0A0908', border: 'none', fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                Reserve <Ico.ArrowRight size={14} color="#0A0908" />
              </MagButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
