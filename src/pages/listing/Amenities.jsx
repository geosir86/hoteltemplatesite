import { GOLD, Ico, Reveal, useIsMobile } from './primitives.jsx';

const ITEMS = [
  { Icon: Ico.Wifi, label: { en: 'Gigabit WiFi', gr: 'Gigabit WiFi' }, sub: { en: 'Mesh-routed for video calls', gr: 'Σταθερό δίκτυο για video calls' } },
  { Icon: Ico.Wind, label: { en: 'A/C & Heating', gr: 'A/C & Θέρμανση' }, sub: { en: 'Smart, app-controlled', gr: 'Έξυπνος έλεγχος από εφαρμογή' } },
  { Icon: Ico.Coffee, label: { en: 'Nespresso', gr: 'Nespresso' }, sub: { en: 'Daily-restocked pods', gr: 'Κάψουλες ανανεωμένες καθημερινά' } },
  { Icon: Ico.Tv, label: { en: 'Smart TV', gr: 'Smart TV' }, sub: { en: 'Netflix · Disney · YouTube', gr: 'Netflix · Disney · YouTube' } },
  { Icon: Ico.Home, label: { en: 'Self check-in', gr: 'Self check-in' }, sub: { en: 'Smart-lock, instant access', gr: 'Smart lock, άμεση πρόσβαση' } },
  { Icon: Ico.MapPin, label: { en: 'Central', gr: 'Κεντρικό σημείο' }, sub: { en: '2 min Acropolis Metro', gr: '2 λεπτά από το Μετρό Ακρόπολη' } },
];

export default function Amenities({ lang }) {
  const isGr = lang === 'gr';
  const isMobile = useIsMobile();
  const copy = {
    title: isGr ? 'Ό,τι' : 'Everything',
    titleAccent: isGr ? 'χρειάζεσαι.' : 'you need.',
    intro: isGr
      ? 'Έξι βασικά στοιχεία, επιλεγμένα από την Ελένη μετά από εκατοντάδες φιλοξενίες.'
      : 'Curated, never crammed. Six essentials, chosen by Eleni after a thousand stays.',
  };

  return (
    <section style={{ padding: isMobile ? '84px 20px' : '140px 60px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row', marginBottom: isMobile ? 36 : 60, flexWrap: 'wrap', gap: 24 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300, fontSize: isMobile ? 'clamp(42px, 13vw, 62px)' : 'clamp(48px, 6vw, 96px)', lineHeight: 0.96, color: 'white', margin: 0, letterSpacing: '-0.015em' }}>
              {copy.title}<br />
              <span style={{ fontStyle: 'italic', color: GOLD }}>{copy.titleAccent}</span>
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.5)', maxWidth: isMobile ? '100%' : 320, margin: 0, textAlign: isMobile ? 'left' : 'right' }}>
              {copy.intro}
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {ITEMS.map((a, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                style={{
                  padding: isMobile ? '24px 0' : '32px 28px',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  borderRight: !isMobile && (i + 1) % 3 !== 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  display: 'flex', alignItems: 'flex-start', gap: 18,
                  transition: 'background 0.4s', cursor: 'default',
                }}
              >
                <a.Icon size={22} color={GOLD} />
                <div>
                  <div style={{ fontSize: 14, color: 'white', fontWeight: 500, marginBottom: 4 }}>{a.label[isGr ? 'gr' : 'en']}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{a.sub[isGr ? 'gr' : 'en']}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
