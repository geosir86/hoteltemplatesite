import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Γιατί χρειάζομαι δική μου ιστοσελίδα για το Airbnb μου;',
    answer:
      'Η δική σας ιστοσελίδα σας επιτρέπει να δέχεστε απευθείας κρατήσεις χωρίς τις υψηλές προμήθειες των πλατφορμών. Παράλληλα χτίζετε το δικό σας brand και δεν εξαρτάστε αποκλειστικά από τον αλγόριθμο κάθε πλατφόρμας.',
  },
  {
    question: 'Τι περιλαμβάνει η κατασκευή ιστοσελίδας για βραχυχρόνια μίσθωση;',
    answer:
      'Περιλαμβάνει premium cinematic design, φόρμες επικοινωνίας για direct inquiries, SEO για το Google και responsive σχεδιασμό για άψογη εμφάνιση σε κινητά.',
  },
  {
    question: 'Μπορώ να συγχρονίσω το ημερολόγιό μου με Airbnb και Booking.com;',
    answer:
      'Ναι. Η ιστοσελίδα μπορεί να δεχτεί ενσωμάτωση iCal, channel manager ή booking widget ώστε τα ημερολόγια σε Airbnb, Booking.com, VRBO και την προσωπική σας σελίδα να μένουν συγχρονισμένα.',
  },
  {
    question: 'Πόσος χρόνος χρειάζεται για την κατασκευή της ιστοσελίδας;',
    answer:
      'Ο χρόνος υλοποίησης κυμαίνεται συνήθως από 5 έως 15 ημέρες, ανάλογα με τις απαιτήσεις του project, τον αριθμό των καταλυμάτων και το διαθέσιμο υλικό.',
  },
  {
    question: 'Η ιστοσελίδα θα βοηθήσει στο SEO;',
    answer:
      'Ναι. Η τεχνική βελτιστοποίηση, η γρήγορη φόρτωση, τα δομημένα δεδομένα και οι σωστές λέξεις-κλειδιά είναι μέρος της κατασκευής.',
  },
];

export default function FAQSection({ brand }) {
  const [openIndex, setOpenIndex] = useState(null);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="px-5 py-24 md:px-10" style={{ backgroundColor: brand.warmMarble || '#F5EFE6', color: brand.deepInk || '#1A1612' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="mx-auto max-w-[800px]">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-widest opacity-70" style={{ color: brand.taupe || '#6F685F' }}>
            Συχνές ερωτήσεις
          </p>
          <h2 className="text-3xl font-light leading-tight md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Απαντήσεις στις ερωτήσεις σας
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="overflow-hidden border-b border-black/10">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-black/70"
                >
                  <span className="pr-8 text-lg font-medium">{faq.question}</span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <div className="pb-6 pr-8 text-base leading-relaxed opacity-80" style={{ color: brand.taupe || '#6F685F' }}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
