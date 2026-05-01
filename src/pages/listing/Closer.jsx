import { GOLD, EASE, MagButton, Ico, Reveal } from './primitives.jsx';

export default function Closer({ lang }) {
  const isGr = lang === 'gr';
  return (
    <section id="book" style={{ padding: '180px 60px', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/athens_flat_detail.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3, filter: 'saturate(0.8)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,9,8,0.7), rgba(10,9,8,0.95))' }} />
      <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <Reveal>
          <div style={{ width: 50, height: 1, background: GOLD, margin: '0 auto 40px' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD, marginBottom: 32, display: 'block' }}>
            {isGr ? 'Για Ιδιοκτήτες' : 'For Hosts'}
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300, fontSize: 'clamp(56px, 8vw, 120px)', lineHeight: 0.92, color: 'white', margin: 0, letterSpacing: '-0.03em' }}>
            {isGr ? 'Το ακίνητό σας,' : 'Your property,'}<br />
            <span style={{ fontStyle: 'italic', color: GOLD }}>{isGr ? 'σε σινεμά.' : 'cinematized.'}</span>
          </h2>
          <p style={{ marginTop: 40, fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', maxWidth: 580, margin: '40px auto 0' }}>
            {isGr
              ? 'Σταματήστε να χάνεστε στις κοινές πλατφόρμες. Αποκτήστε ένα premium, editorial showcase για το ενοικιαζόμενό σας — δίγλωσσο, με direct inquiry. Έτοιμο σε δύο εβδομάδες.'
              : 'Stop blending in with generic listings. Get a premium, editorial showcase for your rental — bilingual, bookable, lifetime ownership. Built in two weeks.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 56, flexWrap: 'wrap' }}>
            <MagButton style={{ padding: '18px 32px', borderRadius: 999, background: GOLD, color: '#0A0908', border: 'none', fontSize: 11, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
              {isGr ? 'Αποκτήστε το design' : 'Get this design'} <Ico.ArrowRight size={14} color="#0A0908" />
            </MagButton>
            <MagButton style={{ padding: '18px 32px', borderRadius: 999, background: 'transparent', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.2)', fontSize: 11, fontWeight: 600, letterSpacing: '0.32em', textTransform: 'uppercase', cursor: 'pointer' }}>
              {isGr ? 'Δες τιμές' : 'See pricing'}
            </MagButton>
          </div>
          <p style={{ marginTop: 40, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
            {isGr ? 'Ξεκινώντας από €490 ανά project · Ισόβια ιδιοκτησία' : 'Starting from €490 per project · Lifetime ownership'}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
