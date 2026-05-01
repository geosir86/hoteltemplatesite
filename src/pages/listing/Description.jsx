import { GOLD, Ico, Reveal, useIsMobile } from './primitives.jsx';

export default function Description({ lang }) {
  const isGr = lang === 'gr';
  const isMobile = useIsMobile();
  const copy = isGr
    ? {
      eyebrow: 'Το διαμέρισμα',
      title: 'Λίγα τετραγωνικά.',
      titleAccent: 'Μεγάλη αίσθηση.',
      reviews: '87 επαληθευμένες κριτικές',
      dropcap: 'Δ',
      body: 'Δεν χρειάζεται κάθε αξέχαστη διαμονή να είναι σε βίλα. Μερικές φορές αρκούν μια στενή σκάλα, η μηχανή espresso που ζεσταίνεται στις 7 το πρωί και η Ακρόπολη που πιάνει το πρώτο φως από το παράθυρό σου. Το The Athens Flat είναι 45 τ.μ. καθαρής πρόθεσης: λιτό, προσεγμένο και γεμάτο αίσθηση.',
      facts: ['2 επισκέπτες', '1 κρεβάτι', '1 μπάνιο', '45 m²'],
      highlights: [
        { t: 'Σπάνια εύρεση.', d: 'Το studio είναι κλεισμένο το 92% του χρόνου.' },
        { t: 'Σχεδιασμένο από την Ελένη.', d: 'Ελληνίδα αρχιτέκτονας και οικοδέσποινα. Κάθε αντικείμενο έχει τη θέση του.' },
        { t: '2 λεπτά από το Μετρό Ακρόπολη.', d: 'Μένεις στην είσοδο του πιο ζωντανού υπαίθριου μουσείου της πόλης.' },
      ],
    }
    : {
      eyebrow: 'The Space',
      title: 'Small space.',
      titleAccent: 'Big soul.',
      reviews: '87 verified reviews',
      dropcap: 'N',
      body: "Not every unforgettable stay happens in a villa. Sometimes it's the narrow staircase, the espresso machine humming at 7am, and the Acropolis catching the first light from your window. The Athens Flat is 45 square metres of pure intention: stripped of excess, rich in feeling.",
      facts: ['2 guests', '1 bed', '1 bath', '45 m²'],
      highlights: [
        { t: 'Rare find.', d: 'This studio is fully booked 92% of the year.' },
        { t: 'Designed by Eleni.', d: 'A Greek architect-host. Every object placed with intent.' },
        { t: '2 min from the Acropolis Metro.', d: "You are at the doorstep of the city's greatest open-air museum." },
      ],
    };

  return (
    <section id="story" style={{ padding: isMobile ? '84px 20px' : '140px 60px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 42 : 96 }}>
        <Reveal>
          <div style={{ position: isMobile ? 'relative' : 'sticky', top: isMobile ? 'auto' : 120 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
              <div style={{ width: 28, height: 1, background: GOLD }} />
              <span style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD }}>{copy.eyebrow}</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300, fontSize: isMobile ? 'clamp(42px, 13vw, 64px)' : 'clamp(48px, 6vw, 96px)', lineHeight: 0.96, color: 'white', margin: 0, letterSpacing: '-0.015em' }}>
              {copy.title}<br />
              <span style={{ fontStyle: 'italic', color: GOLD }}>{copy.titleAccent}</span>
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
              <Ico.Star size={14} fill={GOLD} color={GOLD} />
              <span style={{ color: 'white', fontWeight: 600, fontSize: 14 }}>4.96</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: isMobile ? '0.08em' : '0.2em' }}>· {copy.reviews}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p style={{ fontSize: isMobile ? 15.5 : 17, lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', margin: 0, fontWeight: 300 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 54 : 64, lineHeight: 0.4, float: 'left', marginRight: 12, marginTop: 20, marginBottom: -8, color: GOLD, fontWeight: 300, fontStyle: 'italic' }}>
              {copy.dropcap}
            </span>
            {copy.body.slice(1)}
          </p>

          <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 0, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              { Icon: Ico.Users, label: copy.facts[0] },
              { Icon: Ico.Bed, label: copy.facts[1] },
              { Icon: Ico.Bath, label: copy.facts[2] },
              { Icon: Ico.Home, label: copy.facts[3] },
            ].map(({ Icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <Icon size={18} color={GOLD} />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{label}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40 }}>
            {[
              ...copy.highlights,
            ].map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '18px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: GOLD, fontSize: 18, lineHeight: 1, marginTop: 2, minWidth: 30 }}>0{i + 1}</span>
                <div>
                  <div style={{ fontSize: 14, color: 'white', fontWeight: 500, marginBottom: 4 }}>{h.t}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{h.d}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
