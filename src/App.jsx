import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import DemoSwitcher from './components/DemoSwitcher';
import Landing from './pages/Landing';
import Athens from './pages/Athens';
import Cyclades from './pages/Cyclades';
import Ionian from './pages/Ionian';
import Nisi from './pages/Nisi';
import ImmersiveSantorini from './pages/immersive/ImmersiveSantorini';
import ImmersiveCrete from './pages/immersive/ImmersiveCrete';
import AirbnbListing from './pages/AirbnbListing';
import SEOLanding from './pages/SEOLanding';

/* ── Scroll to top on every route change ── */
function ScrollToTop() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash) {
      window.setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ block: 'start' });
      }, 0);
      return;
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [hash, pathname]);
  return null;
}

// Hides DemoSwitcher on home page — navigation comes from the Landing page itself
function DemoSwitcherConditional({ lang, setLang }) {
  const location = useLocation();
  // Don't show demo switcher on landing or SEO pages
  if (['/', '/airbnb-website', '/direct-booking-website', '/villas-websites-greece', '/website-gia-katalymata'].includes(location.pathname)) return null;
  return <DemoSwitcher lang={lang} setLang={setLang} />;
}

export default function App() {
  const [lang, setLang] = useState('gr');

  return (
    <BrowserRouter>
      <ScrollToTop />
      <DemoSwitcherConditional lang={lang} setLang={setLang} />
      <Routes>
        <Route path="/" element={<Landing lang={lang} setLang={setLang} />} />
        <Route path="/athens" element={<Athens lang={lang} setLang={setLang} />} />
        <Route path="/cyclades" element={<Cyclades lang={lang} setLang={setLang} />} />
        <Route path="/ionian" element={<Ionian lang={lang} setLang={setLang} />} />
        <Route path="/crete" element={<ImmersiveCrete lang={lang} />} />
        <Route path="/nisi" element={<Nisi lang={lang} setLang={setLang} />} />
        <Route path="/santorini" element={<ImmersiveSantorini lang={lang} />} />
        <Route path="/greece" element={<ImmersiveSantorini lang={lang} />} />
        <Route path="/airbnb" element={<AirbnbListing lang={lang} setLang={setLang} />} />
        <Route path="/airbnbtheloume" element={<AirbnbListing lang={lang} setLang={setLang} />} />
        
        {/* SEO Landing Pages */}
        <Route path="/airbnb-website" element={
          <SEOLanding 
            title="Κατασκευή Ιστοσελίδας για Airbnb | Stayfolio"
            description="Αυξήστε τις κρατήσεις σας με μια επαγγελματική ιστοσελίδα για το Airbnb σας. Μοντέρνος σχεδιασμός, χωρίς προμήθειες."
            h1Keyword="Ιστοσελίδες για Airbnb"
            heroProps={{ title: "Η ιστοσελίδα του Airbnb σας." }}
            seoText="Μια ξεχωριστή ιστοσελίδα για το Airbnb σας βοηθάει να χτίσετε εμπιστοσύνη με τους επισκέπτες σας και να δέχεστε κρατήσεις απευθείας, αποφεύγοντας τις υψηλές προμήθειες των πλατφορμών."
          />
        } />
        <Route path="/direct-booking-website" element={
          <SEOLanding 
            title="Direct Booking Websites για Καταλύματα | Stayfolio"
            description="Αποκτήστε τη δική σας direct booking ιστοσελίδα και μεγιστοποιήστε τα κέρδη σας με απευθείας κρατήσεις για το κατάλυμά σας."
            h1Keyword="Direct Booking Websites"
            heroProps={{ title: "Απευθείας κρατήσεις. Χωρίς προμήθειες." }}
            seoText="Εστιάζουμε στη δημιουργία direct booking websites που διευκολύνουν τον επισκέπτη να κάνει κράτηση απευθείας σε εσάς. Μετατρέψτε τους επισκέπτες σε πελάτες με μια premium εμπειρία."
          />
        } />
        <Route path="/villas-websites-greece" element={
          <SEOLanding 
            title="Κατασκευή Ιστοσελίδας για Βίλες στην Ελλάδα | Stayfolio"
            description="Premium ιστοσελίδες για πολυτελείς βίλες στην Ελλάδα. Αναδείξτε την ιδιοκτησία σας με cinematic design και αυξήστε τις κρατήσεις."
            h1Keyword="Ιστοσελίδες για Βίλες στην Ελλάδα"
            heroProps={{ title: "Premium παρουσίαση για τη βίλα σας." }}
            seoText="Η πολυτέλεια μιας βίλας πρέπει να αντανακλάται στην ψηφιακή της παρουσία. Σχεδιάζουμε ιστοσελίδες για βίλες στην Ελλάδα με υψηλή αισθητική και βίντεο που καθηλώνουν."
          />
        } />
        <Route path="/website-gia-katalymata" element={
          <SEOLanding 
            title="Κατασκευή Ιστοσελίδας για Καταλύματα | Stayfolio"
            description="Δημιουργούμε σύγχρονες ιστοσελίδες για ενοικιαζόμενα δωμάτια, διαμερίσματα και boutique καταλύματα με σύστημα online κρατήσεων."
            h1Keyword="Ιστοσελίδες για Καταλύματα"
            heroProps={{ title: "Αναδείξτε το κατάλυμά σας." }}
            seoText="Ένα ολοκληρωμένο website για το κατάλυμά σας είναι το πρώτο βήμα για μια ισχυρή παρουσία. Προβάλετε τις παροχές σας, την τοποθεσία και λάβετε απευθείας κρατήσεις."
          />
        } />
      </Routes>
    </BrowserRouter>
  );
}
