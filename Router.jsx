import { useState, useEffect } from 'react';
import App from './src/App.jsx';
import ImmersiveApp from './src/ImmersiveApp.jsx';

export default function Router() {
  const [page, setPage] = useState(
    window.location.hash === '#stayscape' ? 'stayscape' : 'immersive'
  );

  useEffect(() => {
    const handleHashChange = () => {
      setPage(window.location.hash === '#stayscape' ? 'stayscape' : 'immersive');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      {page === 'stayscape' ? <App /> : <ImmersiveApp />}

      {/* Subtle Stayscape link — only visible on #stayscape */}
      {page === 'stayscape' && (
        <button
          onClick={() => { window.location.hash = ''; window.location.hash = 'immersive'; }}
          className="fixed bottom-6 right-6 z-[9999] px-4 py-2 bg-black/80 backdrop-blur text-white/60 text-xs uppercase tracking-widest rounded-full border border-white/10 hover:border-white/40 hover:text-white transition-all duration-300"
        >
          ← Immersive
        </button>
      )}
    </>
  );
}

