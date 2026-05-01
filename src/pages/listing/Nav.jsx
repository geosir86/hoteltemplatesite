import { Link } from 'react-router-dom';
import { GOLD, EASE, Ico, useIsMobile } from './primitives.jsx';

export default function Nav({ lang, setLang }) {
  const isMobile = useIsMobile(860);

  return (
    <nav style={{
      position: 'fixed', top: isMobile ? 76 : 60, left: 0, right: 0, zIndex: 100,
      padding: isMobile ? '12px 16px' : '14px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: 'rgba(10,9,8,0.82)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      transition: `all 0.5s ${EASE}`,
    }}>
      <Link to="/" style={{ color: 'white', fontWeight: 700, fontSize: isMobile ? 11 : 12, letterSpacing: isMobile ? '0.12em' : '0.22em', textDecoration: 'none', whiteSpace: 'nowrap' }}>
        STAYFOLIO<span style={{ color: GOLD }}>.</span>GR
      </Link>
      <div style={{ display: 'flex', gap: isMobile ? 12 : 32, alignItems: 'center' }}>
        {[
          { l: 'Story', h: '#story' },
          { l: 'Gallery', h: '#gallery' },
          { l: 'Stays', h: '#calendar' },
          { l: 'Reviews', h: '#reviews' },
        ].filter(() => !isMobile).map((i) => (
          <a key={i.l} href={i.h} style={{
            color: 'rgba(255,255,255,0.55)', fontSize: 10.5, letterSpacing: '0.32em',
            textTransform: 'uppercase', textDecoration: 'none',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = 'white'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
          >{i.l}</a>
        ))}
        <button onClick={() => setLang && setLang(lang === 'en' ? 'gr' : 'en')} style={{
          background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)',
          cursor: 'pointer', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
        }}>{isMobile ? (lang === 'en' ? 'GR' : 'EN') : 'EN · GR'}</button>
        <a href="#book" style={{
          display: isMobile ? 'none' : 'inline-flex',
          padding: isMobile ? '9px 14px' : '10px 22px', borderRadius: 999,
          background: GOLD, color: '#0A0908',
          fontSize: 10.5, fontWeight: 700, letterSpacing: isMobile ? '0.12em' : '0.3em',
          textTransform: 'uppercase', textDecoration: 'none',
        }}>Reserve</a>
      </div>
    </nav>
  );
}
