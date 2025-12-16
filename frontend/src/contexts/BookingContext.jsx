import { createContext, useContext, useMemo, useState } from 'react';

const BookingContext = createContext(null);

const initialState = {
  service: null, // {id, category, name, description, duration, price, deposit, image}
  date: null, // "YYYY-MM-DD"
  time: null, // "HH:mm"
  customer: {
    name: '',
    email: '',
    phone: '',
    notes: '',
  },
};

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(initialState);

  const actions = useMemo(() => {
    return {
      setService(service) {
        setBooking((prev) => ({
          ...prev,
          service,
          date: null,
          time: null,
        }));
      },
      setDateTime({ date, time }) {
        setBooking((prev) => ({
          ...prev,
          date,
          time,
        }));
      },
      setCustomer(partialCustomer) {
        setBooking((prev) => ({
          ...prev,
          customer: { ...prev.customer, ...partialCustomer },
        }));
      },
      reset() {
        setBooking(initialState);
      },
    };
  }, []);

  const value = useMemo(() => ({ booking, actions }), [booking, actions]);

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx)
    throw new Error('useBooking must be used inside <BookingProvider />');
  return ctx;
}
