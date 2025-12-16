import { useEffect, useMemo, useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import StepHeader from '../../components/booking/StepHeader';
import { useBooking } from '../../contexts/BookingContext';
import { useNavigate } from 'react-router-dom';

// Genera los siguientes 14 días
function generateDates() {
  const dates = [];
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    dates.push({
      date,
      dayName: days[date.getDay()],
      dayNumber: date.getDate(),
      fullDate: date.toISOString().split('T')[0], // YYYY-MM-DD
    });
  }
  return dates;
}

const availableTimes = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
];

export default function DateTimePage() {
  const navigate = useNavigate();
  const { booking, actions } = useBooking();

  // Si entran directo a esta ruta sin seleccionar servicio, regresarlos
  useEffect(() => {
    if (!booking.service) {
      navigate('/book/services', { replace: true });
    }
  }, [booking.service, navigate]);

  // Lista de fechas (memo para no recalcular cada render)
  const dates = useMemo(() => generateDates(), []);

  // Pre-llenar si el usuario ya había elegido algo
  const [selectedDate, setSelectedDate] = useState(booking.date ?? null);
  const [selectedTime, setSelectedTime] = useState(booking.time ?? null);

  const handleDateSelect = (dateStr) => {
    setSelectedDate(dateStr);
    setSelectedTime(null); // Reset time cuando cambias de día
  };

  const getSelectedDateDisplay = () => {
    if (!selectedDate) return 'Selecciona fecha';
    const dateObj = dates.find((d) => d.fullDate === selectedDate);
    return dateObj
      ? `${dateObj.dayName} ${dateObj.dayNumber}`
      : 'Selecciona fecha';
  };

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) return;

    actions.setDateTime({ date: selectedDate, time: selectedTime });
    navigate('/book/checkout');
  };

  // Si no hay servicio aún (mientras navega), evita crashear el render
  const selectedService = booking.service;
  if (!selectedService) return null;

  return (
    <div className="min-h-dvh flex flex-col bg-slate-50 dark:bg-slate-950">
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-lg px-4 py-8 pb-32 space-y-8">
          <StepHeader
            stepNumber={2}
            totalSteps={3}
            stepLabel="Selecciona fecha y hora"
            title="Elige tu fecha"
            subtitle="Selecciona el día y horario que mejor te acomode."
            backLink={{
              href: '/book/services',
              label: 'Volver a servicios',
            }}
          />

          {/* Card resumen del servicio seleccionado */}
          <div className="relative overflow-hidden rounded-4xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-2">
            <div className="flex gap-4 p-4">
              <div className="h-24 w-24 rounded-2xl shrink-0 overflow-hidden bg-slate-100">
                <img
                  src={selectedService.image || '/placeholder.svg'}
                  alt={selectedService.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 py-1">
                <Badge
                  variant="secondary"
                  className="mb-2 bg-pink-50 text-pink-700 hover:bg-pink-100 rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                >
                  {selectedService.category}
                </Badge>

                <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1">
                  {selectedService.name}
                </h3>

                <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {selectedService.duration}
                  </span>
                  <span className="font-bold text-slate-900">
                    ${selectedService.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-pink-500" /> Fechas disponibles
            </h2>

            <div className="relative -mx-4 px-4">
              <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide snap-x pt-2">
                {dates.map((day, index) => {
                  const isSelected = selectedDate === day.fullDate;

                  return (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(day.fullDate)}
                      className={cn(
                        'flex flex-col items-center justify-center min-w-18 h-22 rounded-3xl border-2 transition-all duration-300 snap-start shrink-0',
                        isSelected
                          ? 'bg-slate-900 border-slate-900 text-white shadow-xl scale-105'
                          : 'bg-white border-transparent text-slate-500 hover:border-slate-200 hover:bg-white shadow-sm'
                      )}
                    >
                      <span
                        className={cn(
                          'text-[10px] font-bold uppercase mb-1 tracking-wider',
                          'text-slate-400'
                        )}
                      >
                        {day.dayName}
                      </span>

                      <span
                        className={cn(
                          'text-2xl font-black',
                          isSelected ? 'text-white' : 'text-slate-900'
                        )}
                      >
                        {day.dayNumber}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Time Slots Section */}
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Clock className="h-5 w-5 text-pink-500" /> Horarios
            </h2>

            {!selectedDate ? (
              <div className="py-12 text-center rounded-4xl border-2 border-dashed border-slate-200 bg-slate-50/50">
                <p className="text-slate-400 font-medium">
                  Selecciona un día arriba para ver horarios
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {availableTimes.map((time) => {
                  const isSelected = selectedTime === time;

                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        'py-3 px-2 rounded-full text-sm font-bold transition-all duration-200 border-2',
                        isSelected
                          ? 'bg-pink-600 text-white border-pink-600 shadow-lg shadow-pink-200'
                          : 'bg-white text-slate-600 border-transparent hover:border-slate-200 shadow-sm'
                      )}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Fixed Bottom Bar */}
      <div className="sticky bottom-0 inset-x-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 p-4 pb-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-20">
        <div className="container mx-auto max-w-lg flex items-center justify-between gap-6">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
              Tu selección
            </span>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-900">
                {getSelectedDateDisplay()}
              </span>

              {selectedTime && (
                <>
                  <span className="text-slate-300">|</span>
                  <span className="text-base font-bold text-pink-600">
                    {selectedTime}
                  </span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedDate || !selectedTime}
            className={cn(
              'shrink-0 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all shadow-xl',
              !selectedDate || !selectedTime
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-2xl hover:scale-105 active:scale-95'
            )}
          >
            Continuar <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
