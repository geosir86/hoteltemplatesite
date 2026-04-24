import { DESTINATIONS } from '../data/destinations';
import Cursor from '../components/shared/Cursor';
import Navbar from '../components/shared/Navbar';
import StickyBookingBar from '../components/shared/StickyBookingBar';
import HeroCinematic from '../components/property/HeroCinematic';
import Gallery from '../components/property/Gallery';
import DetailsStrip from '../components/property/DetailsStrip';
import RoomParallax from '../components/property/RoomParallax';
import AmenitiesGrid from '../components/property/AmenitiesGrid';
import ReviewCards from '../components/property/ReviewCards';
import DualCTA from '../components/property/DualCTA';
import SectionReveal from '../components/shared/SectionReveal';

export default function Crete({ lang = 'en', setLang }) {
  const d = DESTINATIONS.crete;
  const c = d.content[lang];
  const { theme } = d;

  return (
    <div
      className="min-h-screen antialiased overflow-x-hidden"
      style={{ backgroundColor: theme.bg, color: theme.fg }}
    >
      <Cursor accentColor={theme.accent} />
      <Navbar theme={theme} lang={lang} setLang={setLang} />
      <StickyBookingBar
        title={c.title}
        rating={d.details.rating}
        reviewCount={d.details.reviews}
        price={d.pricing.from}
        currency={d.pricing.currency}
        accentColor={theme.accent}
        fgColor={theme.fg}
        bgColor={theme.bg}
      />
      <HeroCinematic title={c.title} subtitle={c.subtitle} location={c.location} imageUrl={d.heroImage} theme={theme} />
      <SectionReveal>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-16 md:pt-24" style={{ borderTop: `1px solid ${theme.border}` }}>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: theme.muted }}>{c.description}</p>
        </div>
      </SectionReveal>
      <Gallery photos={d.gallery} theme={theme} title={lang === 'gr' ? 'Ο Χώρος' : 'The Space'} />
      <DetailsStrip details={d.details} theme={theme} />
      <RoomParallax rooms={c.rooms} theme={theme} sectionTitle={lang === 'gr' ? 'Οι Χώροι' : 'The Spaces'} />
      <AmenitiesGrid amenities={d.amenities} theme={theme} title={lang === 'gr' ? 'Τι Περιλαμβάνεται' : "What's Included"} />
      <ReviewCards reviews={c.reviews} theme={theme} title={lang === 'gr' ? 'Λένε οι Επισκέπτες' : 'What Guests Say'} />
      <DualCTA theme={theme} price={d.pricing.from} currency={d.pricing.currency} lang={lang} />
    </div>
  );
}
