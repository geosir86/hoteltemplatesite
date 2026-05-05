import { GOLD, Reveal } from './primitives.jsx';

export default function Story({ lang }) {
  const isGr = lang === 'gr';
  return (
    <section id="story-quote" style={{ padding: '160px 60px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, marginBottom: 60 }}>
            <div style={{ width: 50, height: 1, background: GOLD }} />
            <span style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD }}>The Story</span>
            <div style={{ width: 50, height: 1, background: GOLD }} />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(24px, 3.4vw, 52px)', lineHeight: 1.25, textAlign: 'center', color: 'rgba(255,255,255,0.88)', margin: 0, letterSpacing: '-0.01em' }}>
            {isGr
              ? <>«Ένα studio 45τμ που νιώθεις σαν καταφύγιο στην καρδιά της Αθήνας.<br /><span style={{ color: GOLD }}>Σχεδιασμένο.</span>{' '}<span style={{ color: GOLD }}>Επιμελημένο.</span>{' '}<span style={{ color: GOLD }}>Δικό σου.»</span></>
              : <>"A 45m² studio that feels like a sanctuary in the heart of Athens.<br /><span style={{ color: GOLD }}>Designed.</span>{' '}<span style={{ color: GOLD }}>Curated.</span>{' '}<span style={{ color: GOLD }}>Yours."</span></>
            }
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 60 }}>
            <img src="https://i.pravatar.cc/100?img=32" alt="Eleni Marinos - Airbnb Superhost Athens" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${GOLD}` }} />
            <div>
              <div style={{ fontSize: 12, color: 'white', fontWeight: 600 }}>Eleni Marinos</div>
              <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Host · Superhost since 2019</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
