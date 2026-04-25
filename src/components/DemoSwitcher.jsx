import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';

const versions = [
  { id: 'landing', label: 'HOME', path: '/' },
  { id: 'athens', label: 'ATHENS', path: '/athens' },
  { id: 'cyclades', label: 'CYCLADES', path: '/cyclades' },
  { id: 'ionian', label: 'IONIAN', path: '/ionian' },
  { id: 'crete', label: 'CRETE', path: '/crete' },
  { id: 'nisi', label: 'NISI', path: '/nisi' },
];

export default function DemoSwitcher() {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto"
      style={{ maxWidth: 'calc(100vw - 1rem)' }}
    >
      <div className="bg-foreground/95 backdrop-blur-xl rounded-full p-1 flex items-center shadow-2xl border border-white/10 overflow-x-auto no-scrollbar">

        {/* Label — desktop only */}
        <div className="hidden md:flex pl-4 pr-3 py-2 items-center gap-2 border-r border-white/10 shrink-0">
          <LayoutGrid size={14} className="text-accent" />
          <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase">Demo</span>
        </div>

        {/* Buttons */}
        <div className="flex px-0.5 shrink-0">
          {versions.map((v) => (
            <NavLink
              key={v.id}
              to={v.path}
              className={({ isActive }) =>
                `relative px-3 md:px-5 py-2 text-[10px] md:text-xs font-bold tracking-wide md:tracking-widest uppercase transition-all duration-300 rounded-full whitespace-nowrap
                ${isActive ? 'text-foreground' : 'text-white/60 hover:text-white hover:bg-white/5'}`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{v.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
