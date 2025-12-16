import { Navigate, Link, useSearchParams } from 'react-router-dom';
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

import servicesData from '../../data/servicesData';

function formatDateLong(isoDate) {
  // isoDate: YYYY-MM-DD
  if (!isoDate) return '';
  const [y, m, d] = isoDate.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString('es-MX', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });
}

export default function SuccessPage() {
  const [params] = useSearchParams();

  const serviceId = Number(params.get('serviceId'));
  const date = params.get('date'); // YYYY-MM-DD
  const time = params.get('time'); // HH:MM
  const mode = params.get('mode') || 'deposit'; // deposit | full

  const service = servicesData.find((s) => s.id === serviceId);

  // Si entran directo sin params, manda al inicio del flow
  if (!serviceId || !service || !date || !time) {
    return <Navigate to="/book/services" replace />;
  }

  const paidToday = mode === 'full' ? service.price : service.deposit;
  const remaining = mode === 'full' ? 0 : service.price - service.deposit;

  const dateDisplay = formatDateLong(date);

  return (
    <div className="min-h-dvh flex flex-col bg-slate-50 dark:bg-slate-950 items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-10 py-8">
        {/* Hero */}
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
          {/* Ticket notches */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 dark:bg-slate-950 rounded-full -translate-x-1/2 shadow-inner" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 dark:bg-slate-950 rounded-full translate-x-1/2 shadow-inner" />

          <div className="bg-linear-to-r from-pink-500 to-rose-500 border-b border-pink-400 px-6 py-4 text-center">
            <p className="text-xs font-bold text-white/90 uppercase tracking-widest mb-1">
              Tu cita confirmada
            </p>
            <div className="text-2xl font-extrabold flex items-center justify-center gap-3 text-white">
              <Calendar className="w-6 h-6" />
              {dateDisplay} · {time}
            </div>
          </div>

          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* QR */}
              <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-800 p-8 border-b md:border-b-0 md:border-r border-dashed border-slate-300 dark:border-slate-700 relative">
                <div
                  className="absolute inset-y-0 right-0 w-px md:block hidden"
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

              {/* Details */}
              <div className="flex-1 p-8 space-y-6">
                <div className="space-y-3">
                  <Badge
                    variant="secondary"
                    className="bg-pink-100 text-pink-700 border-0 dark:bg-pink-900/30 dark:text-pink-300 rounded-full px-4 py-1.5 font-bold text-sm"
                  >
                    {service.category}
                  </Badge>

                  <h3 className="font-extrabold text-2xl leading-tight">
                    {service.name}
                  </h3>

                  <div className="flex items-center text-muted-foreground text-base font-semibold">
                    <Clock className="h-5 w-5 mr-2" />
                    {service.duration}
                  </div>
                </div>

                <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />

                <div className="space-y-4 text-base">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">
                      Pagado hoy
                    </span>
                    <span className="text-green-600 font-bold flex items-center gap-2 text-lg">
                      <CheckCircle2 className="w-5 h-5" /> ${paidToday}
                    </span>
                  </div>

                  <div className="flex justify-between items-center font-semibold">
                    <span>Restante en studio</span>
                    <span className="text-xl">${remaining}</span>
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="text-center space-y-8">
          <div className="text-sm text-muted-foreground space-y-2 max-w-md mx-auto leading-relaxed">
            <p className="font-medium">
              Por favor llega 5 minutos antes de tu cita.
            </p>
            <p>Si necesitas reprogramar, contáctanos al WhatsApp del studio.</p>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="inline-flex w-full items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg bg-slate-900 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95"
            >
              Volver al inicio
            </Link>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-white dark:bg-slate-800 text-foreground border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:scale-105 transition-all duration-300 shadow-md"
              onClick={() => {
                // Placeholder: luego hacemos ICS / Google Calendar
                console.log('Agregar a calendario', { serviceId, date, time });
              }}
            >
              <CalendarPlus className="w-5 h-5" />
              Agregar a mi calendario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
