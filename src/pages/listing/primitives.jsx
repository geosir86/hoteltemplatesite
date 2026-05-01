// Shared design tokens
export const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';
export const GOLD = '#C9A04C';
export const INK  = '#0A0908';

// Magnetic Button
import { useRef, useState } from 'react';
export function MagButton({ children, onClick, style = {}, ...rest }) {
  const ref = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  return (
    <button ref={ref} onClick={onClick}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        setT({ x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25 });
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      style={{ transform: `translate(${t.x}px,${t.y}px)`, transition: `transform 0.4s ${EASE}`, ...style }}
      {...rest}>{children}</button>
  );
}

// Scroll reveal
import { useEffect } from 'react';

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => (
    typeof window === 'undefined' ? false : window.innerWidth < breakpoint
  ));

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < breakpoint);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [breakpoint]);

  return isMobile;
}
export function Reveal({ children, delay = 0, y = 40, style = {} }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); obs.disconnect(); } }, { rootMargin: '-60px' });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ ...style, opacity: seen ? 1 : 0, transform: seen ? 'translateY(0)' : `translateY(${y}px)`, transition: `opacity 1s ${EASE} ${delay}s, transform 1s ${EASE} ${delay}s` }}>
      {children}
    </div>
  );
}

// Inline SVG icons
export const Ico = {
  Star: ({ size = 14, fill = 'currentColor', color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  MapPin: ({ size = 14, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  ArrowRight: ({ size = 14, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
  ),
  ArrowUpRight: ({ size = 14, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M7 17 17 7M7 7h10v10"/></svg>
  ),
  Wifi: ({ size = 18, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill={color}/></svg>
  ),
  Wind: ({ size = 18, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4"><path d="M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2M17.5 8a2.5 2.5 0 1 1 2 4H2"/></svg>
  ),
  Coffee: ({ size = 18, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4"><path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4ZM6 2v3M10 2v3M14 2v3"/></svg>
  ),
  Tv: ({ size = 18, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="m17 2-5 4-5-4"/></svg>
  ),
  Home: ({ size = 18, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M9 22V12h6v10"/></svg>
  ),
  Users: ({ size = 18, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  Bed: ({ size = 18, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v0M6 8a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3"/></svg>
  ),
  Bath: ({ size = 18, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-2.5 1V11M2 12h20M7 12v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-5M3 12V8a2 2 0 0 1 2-2h0M5 19l-1 2M19 19l1 2"/></svg>
  ),
  X: ({ size = 22, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
  ),
  ChevL: ({ size = 22, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="m15 18-6-6 6-6"/></svg>
  ),
  ChevR: ({ size = 22, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="m9 18 6-6-6-6"/></svg>
  ),
  Heart: ({ size = 18, color = 'currentColor', fill = 'none' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="1.4"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>
  ),
  Share: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
  ),
};
