import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = ({ selectedRange, onSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = [];
  for (let i = 0; i < firstDayOfMonth(year, month); i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth(year, month); i++) {
    days.push(new Date(year, month, i));
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const isSelected = (date) => {
    if (!date || !selectedRange.start) return false;
    if (selectedRange.end) {
      return date >= selectedRange.start && date <= selectedRange.end;
    }
    return date.getTime() === selectedRange.start.getTime();
  };

  return (
    <div className="p-8 bg-background border border-foreground/5 rounded-2xl shadow-2xl max-w-md w-full">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => setCurrentDate(new Date(year, month - 1))} className="p-2 hover:bg-foreground/5 rounded-full transition-colors">
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-sm font-bold tracking-[0.2em] uppercase">{monthNames[month]} {year}</h3>
        <button onClick={() => setCurrentDate(new Date(year, month + 1))} className="p-2 hover:bg-foreground/5 rounded-full transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
          <div key={d} className="text-center text-[10px] font-bold opacity-30 py-2">{d}</div>
        ))}
        {days.map((date, i) => (
          <div 
            key={i} 
            onClick={() => date && onSelect(date)}
            className={`
              aspect-square flex items-center justify-center text-xs cursor-pointer transition-all rounded-full
              ${!date ? 'pointer-events-none' : 'hover:bg-foreground/5'}
              ${date && isSelected(date) ? 'bg-accent text-foreground font-bold scale-110 shadow-lg' : ''}
              ${date && date < new Date() ? 'opacity-20 pointer-events-none' : ''}
            `}
          >
            {date ? date.getDate() : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function HutBooking({ price = "€1,200", lang = 'en' }) {
  const [isOpen, setIsOpen] = useState(false);
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
      {/* Floating Action Bar */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-4xl"
      >
        <div className="bg-foreground text-background p-2 rounded-full flex items-center justify-between shadow-2xl border border-white/10 backdrop-blur-xl">
          <div className="flex items-center px-8 gap-12">
            <div className="hidden md:flex flex-col">
              <span className="text-[10px] tracking-widest uppercase opacity-50 mb-1">Price per night</span>
              <span className="text-lg font-hutstuf">{price}</span>
            </div>
            <div className="flex gap-8 border-l border-white/10 pl-8">
              <div className="flex flex-col cursor-pointer" onClick={() => setIsOpen(true)}>
                <span className="text-[10px] tracking-widest uppercase opacity-50 mb-1">Check In</span>
                <span className="text-xs font-bold">{formatDate(selectedRange.start)}</span>
              </div>
              <div className="flex flex-col cursor-pointer" onClick={() => setIsOpen(true)}>
                <span className="text-[10px] tracking-widest uppercase opacity-50 mb-1">Check Out</span>
                <span className="text-xs font-bold">{formatDate(selectedRange.end)}</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setIsOpen(true)}
            className="bg-accent text-foreground px-10 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all hover:scale-105 active:scale-95"
          >
            {lang === 'gr' ? 'ΚΡΑΤΗΣΗ' : 'BOOK NOW'}
          </button>
        </div>
      </motion.div>

      {/* Booking Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-background/95 backdrop-blur-md flex flex-col items-center justify-center p-6 overflow-y-auto"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-10 right-10 p-4 hover:rotate-90 transition-transform"
            >
              <X size={32} />
            </button>

            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-start"
            >
              <div>
                <p className="text-xs tracking-[0.4em] uppercase mb-8 opacity-40">Select Dates</p>
                <h2 className="text-5xl md:text-7xl font-serif mb-16 italic">Plan your stay</h2>
                
                <Calendar selectedRange={selectedRange} onSelect={handleDateSelect} />
                
                <div className="mt-12 flex items-center gap-12 border-t border-foreground/5 pt-12">
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] tracking-widest uppercase opacity-40">Guests</span>
                    <div className="flex items-center gap-6">
                      <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors">-</button>
                      <span className="text-lg font-bold">{guests}</span>
                      <button onClick={() => setGuests(guests + 1)} className="w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors">+</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-foreground text-background p-12 rounded-3xl sticky top-0">
                <h3 className="text-2xl font-serif mb-12 italic">Your Selection</h3>
                <div className="space-y-8 mb-12">
                  <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <span className="text-[10px] tracking-widest uppercase opacity-50">Dates</span>
                    <span className="text-sm font-bold">{formatDate(selectedRange.start)} — {formatDate(selectedRange.end)}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <span className="text-[10px] tracking-widest uppercase opacity-50">Guests</span>
                    <span className="text-sm font-bold">{guests} Guests</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <span className="text-[10px] tracking-widest uppercase opacity-50">Rate</span>
                    <span className="text-sm font-bold">{price} / Night</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-12">
                  <span className="text-lg">Total Estimate</span>
                  <span className="text-3xl font-hutstuf">
                    {selectedRange.start && selectedRange.end ? '€2,400' : price}
                  </span>
                </div>

                <button className="w-full bg-accent text-foreground py-6 rounded-full text-xs font-bold tracking-[0.4em] uppercase hover:bg-white transition-colors">
                  Confirm Reservation
                </button>
                <p className="text-[10px] text-center mt-6 opacity-40 tracking-widest uppercase">
                  No immediate payment required
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
