import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ui/ScrollToTop';
import { BookingProvider } from './contexts/BookingContext.jsx';
import './index.css';
import App from './App.jsx';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BookingProvider>
        <ScrollToTop />
        <App />
      </BookingProvider>
    </BrowserRouter>
  </StrictMode>
);
