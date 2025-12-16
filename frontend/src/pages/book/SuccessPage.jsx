import { useEffect, useMemo, useRef } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  CalendarPlus,
  QrCode,
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../../contexts/BookingContext';

// Helper: "2025-12-24" -> "Lunes 24"
function formatLongDate(dateStr) {
  if (!dateStr) return '';
  const daysLong = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];
  const d = new Date(`${dateStr}T00:00:00`);
  return `${daysLong[d.getDay()]} ${d.getDate()}`;
}

export default function SuccessPage() {
  const navigate = useNavigate();
  const { booking, actions } = useBooking();
  const leavingRef = useRef(false);

  // Si entran directo sin completar flujo, regresamos a services
  useEffect(() => {
    if (leavingRef.current) return;
    if (!booking.service || !booking.date || !booking.time) {
      navigate('/book/services', { replace: true });
    }
  }, [booking.service, booking.date, booking.time, navigate]);

  const summary = useMemo(() => {
    const service = booking.service;
    if (!service) return null;

    const total = service.price ?? 0;
    const deposit = service.deposit ?? 0;
    const remaining = Math.max(0, total - deposit);

    return {
      service,
      date: formatLongDate(booking.date),
      time: booking.time,
      remaining,
      deposit,
    };
  }, [booking.service, booking.date, booking.time]);

  const handleBackHome = () => {
    leavingRef.current = true;
    actions.reset();
    navigate('/', { replace: true });
  };

  const handleAddToCalendar = () => {
    alert('Agregar a mi calendario', 'Próximamente disponible');
  };

  if (!summary) return null;

  return (
    <div className="min-h-dvh flex flex-col bg-slate-50 dark:bg-slate-950 items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-10 py-8">
        {/* Hero Section */}
        <div className="text-center space-y-5">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 mb-3 animate-in zoom-in duration-500 shadow-lg">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              ¡Tu cita está confirmada!
            </h1>
            <p className="text-muted-foreground text-lg text-balance max-w-md mx-auto leading-relaxed">
              Te hemos enviado un correo con los detalles de tu reserva.
            </p>
          </div>
        </div>

        <Card className="overflow-hidden border-0 shadow-[0_20px_60px_rgb(0,0,0,0.15)] bg-white dark:bg-slate-900 rounded-[2.5rem] animate-in fade-in slide-in-from-bottom-8 duration-700 relative p-0 gap-0">
          {/* Notches for ticket effect */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 dark:bg-slate-950 rounded-full -translate-x-1/2 shadow-inner" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 dark:bg-slate-950 rounded-full translate-x-1/2 shadow-inner" />

          <div className="bg-linear-to-r from-pink-500 to-rose-500 border-b border-pink-400 px-6 py-4 text-center">
            <p className="text-xs font-bold text-white/90 uppercase tracking-widest mb-1">
              Tu cita confirmada
            </p>
            <div className="text-2xl font-extrabold flex items-center justify-center gap-3 text-white">
              <Calendar className="w-6 h-6" />
              {summary.date} · {summary.time}
            </div>
          </div>

          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* QR Code Section */}
              <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-800 p-8 border-b md:border-b-0 md:border-r border-dashed border-slate-300 dark:border-slate-700 relative">
                <div
                  className="absolute inset-y-0 right-0 w-px bg-linear-to-b from-transparent via-slate-300 to-transparent md:block hidden"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, transparent, transparent 4px, rgb(203 213 225) 4px, rgb(203 213 225) 8px)',
                  }}
                />

                <div className="bg-white p-4 rounded-2xl shadow-md">
                  <QrCode
                    className="w-32 h-32 text-slate-900"
                    strokeWidth={1}
                  />
                </div>
              </div>

              {/* Details Section */}
              <div className="flex-1 p-8 space-y-6">
                <div className="space-y-3">
                  <Badge
                    variant="secondary"
                    className="bg-pink-100 text-pink-700 border-0 dark:bg-pink-900/30 dark:text-pink-300 rounded-full px-4 py-1.5 font-bold text-sm"
                  >
                    {summary.service.category}
                  </Badge>

                  <h3 className="font-extrabold text-2xl leading-tight">
                    {summary.service.name}
                  </h3>

                  <div className="flex items-center text-muted-foreground text-base font-semibold">
                    <Clock className="h-5 w-5 mr-2" />
                    {summary.service.duration}
                  </div>
                </div>

                <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />

                <div className="space-y-4 text-base">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">
                      Depósito pagado
                    </span>
                    <span className="text-green-600 font-bold flex items-center gap-2 text-lg">
                      <CheckCircle2 className="w-5 h-5" /> ${summary.deposit}
                    </span>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span>Restante en studio</span>
                    <span className="text-xl">${summary.remaining}</span>
                  </div>
                </div>

                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-5 flex gap-4 items-start text-base">
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-2.5 rounded-xl">
                    <MapPin className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground mb-1">
                      Bella Studio
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Av. Principal 123, Local 4
                      <br />
                      Colonia Centro, Ciudad
                    </p>
                  </div>
                </div>

                {/* Opcional: mostrar datos del cliente si quieres */}
                {booking.customer?.name && (
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Reserva a nombre de:
                    </span>{' '}
                    {booking.customer.name}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-8">
          <div className="text-sm text-muted-foreground space-y-2 max-w-md mx-auto leading-relaxed">
            <p className="font-medium">
              Por favor llega 5 minutos antes de tu cita.
            </p>
            <p>Si necesitas reprogramar, contáctanos al WhatsApp del studio.</p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Usamos button para reset + navigate */}
            <button
              onClick={handleBackHome}
              className="inline-flex w-full items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg bg-slate-900 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95"
            >
              Volver al inicio
            </button>

            {/* Si prefieres Link sin reset, usa esto:
                <Link to="/" className="...">Volver al inicio</Link>
             */}

            <button
              onClick={handleAddToCalendar}
              className="inline-flex w-full items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-white dark:bg-slate-800 text-foreground border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:scale-105 transition-all duration-300 shadow-md"
            >
              <CalendarPlus className="w-5 h-5" />
              Agregar a mi calendario
            </button>
          </div>

          {/* Link secundario opcional */}
          <div className="text-sm text-muted-foreground">
            ¿Quieres reservar otra cosa?{' '}
            <Link
              to="/book/services"
              className="font-semibold text-pink-600 hover:underline"
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
