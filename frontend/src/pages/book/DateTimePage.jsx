import { useMemo, useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

import { Badge } from '../../components/ui/Badge';
import StepHeader from '../../components/booking/StepHeader';
import servicesData from '../../data/ServicesData';

// Mock fechas (próximos 14 días)
const generateDates = () => {
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
};

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

function DateTimeSelectionContent() {
  const [searchParams] = useSearchParams();

  const serviceId = Number(searchParams.get('serviceId'));
  const mode = searchParams.get('mode') || 'full'; // full | deposit

  const selectedService = useMemo(
    () => servicesData.find((s) => s.id === serviceId),
    [serviceId]
  );

  // Si entran sin serviceId, regrésalos a servicios
  if (!serviceId || !selectedService) {
    return <Navigate to="/book/services" replace />;
  }

  const [selectedDate, setSelectedDate] = useState(null); // "YYYY-MM-DD"
  const [selectedTime, setSelectedTime] = useState(null); // "HH:MM"

  const dates = useMemo(() => generateDates(), []);

  const handleDateSelect = (dateStr) => {
    setSelectedDate(dateStr);
    setSelectedTime(null); // Reset time when date changes
  };

  // Helper para footer
  const getSelectedDateDisplay = () => {
    if (!selectedDate) return 'Selecciona fecha';
    const dateObj = dates.find((d) => d.fullDate === selectedDate);
    return `${dateObj?.dayName ?? ''} ${dateObj?.dayNumber ?? ''}`.trim();
  };

  const isReady = Boolean(selectedDate && selectedTime);

  return (
    <div className="min-h-dvh flex flex-col bg-slate-50 dark:bg-slate-950">
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-xl px-4 py-8 pb-32 space-y-8">
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

          {/* Card del servicio seleccionado */}
          <div className="relative overflow-hidden rounded-[2rem] bg-white dark:bg-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 p-2">
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

                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-50 leading-tight mb-1">
                  {selectedService.name}
                </h3>

                <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {selectedService.duration}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-slate-50">
                    ${selectedService.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Fechas */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-pink-500" /> Fechas disponibles
            </h2>

            <div className="relative -mx-4 px-4">
              <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide snap-x pt-2">
                {dates.map((day) => {
                  const isSelected = selectedDate === day.fullDate;
                  return (
                    <button
                      key={day.fullDate}
                      onClick={() => handleDateSelect(day.fullDate)}
                      className={cn(
                        'flex flex-col items-center justify-center min-w-[4.5rem] h-[5.5rem] rounded-[1.5rem] border-2 transition-all duration-300 snap-start shrink-0',
                        isSelected
                          ? 'bg-slate-900 border-slate-900 text-white shadow-xl scale-105'
                          : 'bg-white dark:bg-slate-900 border-transparent text-slate-500 hover:border-slate-200 dark:hover:border-slate-700 hover:bg-white shadow-sm'
                      )}
                    >
                      <span
                        className={cn(
                          'text-[10px] font-bold uppercase mb-1 tracking-wider text-slate-400'
                        )}
                      >
                        {day.dayName}
                      </span>
                      <span
                        className={cn(
                          'text-2xl font-black',
                          isSelected
                            ? 'text-white'
                            : 'text-slate-900 dark:text-slate-50'
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

          {/* Horarios */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
              <Clock className="h-5 w-5 text-pink-500" /> Horarios
            </h2>

            {!selectedDate ? (
              <div className="py-12 text-center rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
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
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-200 border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm'
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

      {/* Bottom bar */}
      <div className="sticky bottom-0 inset-x-0 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 p-4 pb-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-20">
        <div className="container mx-auto max-w-lg flex items-center justify-between gap-6">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
              Tu selección
            </span>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-900 dark:text-slate-50">
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

          <div
            className={cn(
              'shrink-0 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all shadow-xl',
              !isReady
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-2xl hover:scale-105 active:scale-95'
            )}
          >
            {!isReady ? (
              'Continuar'
            ) : (
              <Link
                to={`/book/checkout?serviceId=${serviceId}&date=${selectedDate}&time=${encodeURIComponent(
                  selectedTime
                )}&mode=${mode}`}
                className="flex items-center gap-2 w-full h-full"
              >
                Continuar <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DateTimePage() {
  return <DateTimeSelectionContent />;
}
