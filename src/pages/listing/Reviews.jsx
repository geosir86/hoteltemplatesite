import { GOLD, Ico, Reveal, useIsMobile } from './primitives.jsx';

const REVIEWS = [
  { name: 'Maëlle R.', loc: 'Lyon',   date: 'Oct 2024', text: 'I have stayed in 5-star hotels with less soul than this flat. The light, the view, the details — perfect.', avatar: 'https://i.pravatar.cc/100?img=5' },
  { name: 'Daniel K.', loc: 'Berlin', date: 'Aug 2024', text: 'Exactly what Athens should feel like. Woke up to the Acropolis every morning. Cannot believe it is only 45sqm.', avatar: 'https://i.pravatar.cc/100?img=18' },
  { name: 'Elena P.',  loc: 'Rome',   date: 'Sep 2024', text: 'Small but flawlessly designed. Every corner is intentional. The neighbourhood is electric. I will be back.', avatar: 'https://i.pravatar.cc/100?img=44' },
];

export default function Reviews({ lang }) {
  const isGr = lang === 'gr';
  const isMobile = useIsMobile();
  return (
    <section id="reviews" style={{ padding: isMobile ? '84px 20px' : '140px 60px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'space-between', marginBottom: isMobile ? 36 : 60, flexDirection: isMobile ? 'column' : 'row', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                <div style={{ width: 28, height: 1, background: GOLD }} />
                <span style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD }}>{isGr ? 'Λένε οι Επισκέπτες' : 'Guests Say'}</span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300, fontSize: isMobile ? 'clamp(40px, 12vw, 58px)' : 'clamp(44px, 5.5vw, 84px)', lineHeight: 0.96, color: 'white', margin: 0, letterSpacing: '-0.015em' }}>
                4.96 / 5.00<br />
                <span style={{ fontStyle: 'italic', color: GOLD }}>{isGr ? 'σε 87 διαμονές.' : 'across 87 stays.'}</span>
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {Array.from({ length: 5 }).map((_, i) => <Ico.Star key={i} size={20} fill={GOLD} color={GOLD} />)}
            </div>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {REVIEWS.map((r, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ padding: isMobile ? '30px 0' : '40px 32px', borderRight: !isMobile && i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 56, color: GOLD, lineHeight: 0.5, marginBottom: 12, height: 30 }}>"</div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: isMobile ? 17 : 18, lineHeight: 1.55, color: 'rgba(255,255,255,0.85)', margin: 0, marginBottom: 28, fontWeight: 300 }}>{r.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img src={r.avatar} alt={r.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: 13, color: 'white', fontWeight: 500 }}>{r.name}</div>
                    <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>{r.loc} · {r.date}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
