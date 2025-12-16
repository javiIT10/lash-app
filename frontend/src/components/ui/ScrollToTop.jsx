import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Si viene con hash (#section), respétalo
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ block: 'start' });
      return;
    }

    // Si no hay hash, siempre arriba
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname, location.search, location.hash]);

  return null;
}
