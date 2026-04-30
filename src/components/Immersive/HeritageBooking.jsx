import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Users, ChevronLeft, ChevronRight, ArrowRight, Leaf } from 'lucide-react';

const HeritageCalendar = ({ selectedRange, onSelect, themeColor = "#4B4B2D" }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = [];
  for (let i = 0; i < firstDayOfMonth(year, month); i++) days.push(null);
  for (let i = 1; i <= daysInMonth(year, month); i++) days.push(new Date(year, month, i));

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const isSelected = (date) => {
    if (!date || !selectedRange.start) return false;
    if (selectedRange.end) return date >= selectedRange.start && date <= selectedRange.end;
    return date.getTime() === selectedRange.start.getTime();
  };

  const isInRange = (date) => {
    if (!date || !selectedRange.start || !selectedRange.end) return false;
    return date > selectedRange.start && date < selectedRange.end;
  };

  return (
    <div className="p-8 bg-[#FDFBF7] border border-[#4B4B2D]/10 rounded-3xl shadow-xl w-full">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => setCurrentDate(new Date(year, month - 1))} className="p-2 hover:bg-[#4B4B2D]/5 rounded-full">
          <ChevronLeft size={18} />
        </button>
        <h3 className="text-sm font-serif italic tracking-widest uppercase">{monthNames[month]} {year}</h3>
        <button onClick={() => setCurrentDate(new Date(year, month + 1))} className="p-2 hover:bg-[#4B4B2D]/5 rounded-full">
          <ChevronRight size={18} />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
          <div key={d} className="text-center text-[10px] font-bold opacity-30 py-2">{d}</div>
        ))}
        {days.map((date, i) => (
          <div 
            key={i} 
            onClick={() => date && onSelect(date)}
            className={`
              aspect-square flex items-center justify-center text-xs cursor-pointer transition-all rounded-lg
              ${!date ? 'pointer-events-none' : 'hover:bg-[#4B4B2D]/5'}
              ${date && isSelected(date) ? 'bg-[#4B4B2D] text-white font-bold' : ''}
              ${date && isInRange(date) ? 'bg-[#4B4B2D]/10' : ''}
              ${date && date < new Date() ? 'opacity-10 pointer-events-none' : ''}
            `}
          >
            {date ? date.getDate() : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function HeritageBooking({ price = "€1,800", lang = 'en', externalIsOpen, setExternalIsOpen }) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = setExternalIsOpen !== undefined ? setExternalIsOpen : setInternalIsOpen;

  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [guests, setGuests] = useState(2);

  const handleDateSelect = (date) => {
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: date, end: null });
    } else {
      if (date < selectedRange.start) {
        setSelectedRange({ start: date, end: null });
      } else {
        setSelectedRange({ ...selectedRange, end: date });
      }
    }
  };

  const formatDate = (date) => {
    if (!date) return '—';
    return date.toLocaleDateString(lang === 'gr' ? 'el-GR' : 'en-US', { day: 'numeric', month: 'short' });
  };

  return (
    <>
      {/* Side Trigger Button - More Elegant than a bottom bar */}
      <motion.button
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[200] bg-[#4B4B2D] text-[#F1EDE1] p-6 rounded-l-3xl shadow-2xl flex flex-col items-center gap-6 group hover:pl-12 transition-all"
      >
        <CalendarIcon size={20} className="group-hover:scale-125 transition-transform" />
        <span className="vertical-text text-[10px] font-bold tracking-[0.4em] uppercase whitespace-nowrap">
          {lang === 'en' ? 'Book the Heritage' : 'Κρατηση Κληρονομιας'}
        </span>
      </motion.button>

      {/* Booking Overlay - Fullscreen "Book of History" look */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-[#F1EDE1]/98 backdrop-blur-md flex flex-col items-center justify-center p-6 overflow-y-auto text-[#4B4B2D]"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-10 right-10 p-4 hover:scale-110 transition-transform"
            >
              <X size={32} strokeWidth={1} />
            </button>

            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center"
            >
              <div className="space-y-12">
                <div className="space-y-4">
                  <p className="text-xs tracking-[0.6em] uppercase opacity-40 font-bold">The Heritage Estate</p>
                  <h2 className="text-6xl md:text-9xl font-serif italic tracking-tighter leading-[0.8] mb-8">
                    Claim your <br/> legacy.
                  </h2>
                  <div className="w-24 h-px bg-[#4B4B2D]/30" />
                </div>
                
                <p className="text-xl font-light opacity-60 max-w-md leading-relaxed italic">
                  "Luxury is not a destination, but a state of being. Your journey into the heart of Crete begins here."
                </p>

                <div className="pt-8">
                   <HeritageCalendar selectedRange={selectedRange} onSelect={handleDateSelect} />
                </div>
              </div>

              <div className="bg-[#FDFBF7] p-12 lg:p-24 rounded-[4rem] border border-[#4B4B2D]/10 shadow-[0_50px_100px_-20px_rgba(75,75,45,0.15)] relative overflow-hidden">
                <div className="absolute top-12 right-12 opacity-10">
                  <Leaf size={120} strokeWidth={0.5} />
                </div>
                
                <h3 className="text-sm font-bold tracking-[0.4em] uppercase mb-16 opacity-40">Reservation Inquiry</h3>
                
                <div className="space-y-12 mb-20">
                  <div className="group">
                    <span className="block text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold mb-4">Preferred Window</span>
                    <div className="text-3xl font-serif italic border-b border-[#4B4B2D]/10 pb-4 flex justify-between items-center group-hover:border-[#4B4B2D] transition-colors">
                      {formatDate(selectedRange.start)} — {formatDate(selectedRange.end)}
                      <CalendarIcon size={20} className="opacity-20" />
                    </div>
                  </div>

                  <div className="group">
                    <span className="block text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold mb-4">Estate Guests</span>
                    <div className="flex items-center justify-between border-b border-[#4B4B2D]/10 pb-4 group-hover:border-[#4B4B2D] transition-colors">
                      <span className="text-3xl font-serif italic">{guests} Persons</span>
                      <div className="flex gap-4">
                        <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 rounded-full border border-[#4B4B2D]/10 flex items-center justify-center hover:bg-[#4B4B2D] hover:text-white">-</button>
                        <button onClick={() => setGuests(guests + 1)} className="w-10 h-10 rounded-full border border-[#4B4B2D]/10 flex items-center justify-center hover:bg-[#4B4B2D] hover:text-white">+</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-16">
                  <div>
                    <span className="block text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold mb-2">Heritage Value</span>
                    <span className="text-6xl font-serif italic">
                      {selectedRange.start && selectedRange.end ? '€3,600' : price}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-[#4B4B2D] text-[#F1EDE1] py-10 rounded-full text-[10px] font-bold tracking-[0.6em] uppercase hover:tracking-[0.8em] transition-all shadow-2xl">
                  {lang === 'en' ? 'Submit Application' : 'ΥΠΟΒΟΛΗ ΑΙΤΗΣΗΣ'}
                </button>
                
                <p className="text-[9px] text-center mt-12 opacity-30 tracking-[0.3em] uppercase font-bold leading-loose">
                  Your request is subject to estate availability. <br/> Access is granted upon review.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
