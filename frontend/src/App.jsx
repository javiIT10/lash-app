import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/book/ServicesPage';
import DateTimePage from './pages/book/DateTimePage';
import CheckoutPage from './pages/book/CheckoutPage';
import SuccessPage from './pages/book/SuccessPage';

function App() {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<HomePage />} />

      {/* Booking Pages */}
      <Route path="/book/services" element={<ServicesPage />} />
      <Route path="/book/date-time" element={<DateTimePage />} />
      <Route path="/book/checkout" element={<CheckoutPage />} />
      <Route path="/book/success" element={<SuccessPage />} />

      {/* Redirect any unknown routes to Home Page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
