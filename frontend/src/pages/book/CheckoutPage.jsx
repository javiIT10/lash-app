import { useEffect, useMemo, useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Textarea } from '../../components/ui/Textarea';
import { Clock, ArrowRight, Lock } from 'lucide-react';
import { cn } from '../../lib/utils';
import StepHeader from '../../components/booking/StepHeader';
import { useBooking } from '../../contexts/BookingContext';
import { useNavigate } from 'react-router-dom';

// Helper: muestra "Lun 24" desde "YYYY-MM-DD"
function formatShortDate(dateStr) {
  if (!dateStr) return '';
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const d = new Date(`${dateStr}T00:00:00`);
  return `${days[d.getDay()]} ${d.getDate()}`;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { booking, actions } = useBooking();

  // Protección: si falta algo del flujo, regresamos a servicios
  useEffect(() => {
    if (!booking.service || !booking.date || !booking.time) {
      navigate('/book/services', { replace: true });
    }
  }, [booking.service, booking.date, booking.time, navigate]);

  // Precarga si ya existía customer (por si vuelves atrás)
  const [formData, setFormData] = useState(() => ({
    name: booking.customer?.name ?? '',
    email: booking.customer?.email ?? '',
    phone: booking.customer?.phone ?? '',
    notes: booking.customer?.notes ?? '',
  }));

  const isFormValid =
    formData.name.trim().length > 0 && formData.email.trim().length > 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Derivados para UI (resumen)
  const summary = useMemo(() => {
    const service = booking.service;
    if (!service) return null;

    const total = service.price ?? 0;
    const deposit = service.deposit ?? 0;
    const remaining = Math.max(0, total - deposit);

    return {
      service,
      dateDisplay: formatShortDate(booking.date),
      time: booking.time,
      total,
      deposit,
      remaining,
    };
  }, [booking.service, booking.date, booking.time]);

  const handleConfirm = () => {
    if (!isFormValid || !summary) return;

    // Guardar datos del cliente en el contexto
    actions.setCustomer({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      notes: formData.notes.trim(),
    });

    navigate('/book/success');
  };

  // Mientras redirige (o si falta summary), evita render roto
  if (!summary) return null;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50 dark:bg-slate-950">
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-lg px-4 py-8 pb-32 space-y-8">
          <StepHeader
            stepNumber={3}
            totalSteps={3}
            stepLabel="Datos y confirmación"
            title="Completa tus datos"
            subtitle="Revisa los detalles y completa tu información para confirmar."
            backLink={{
              href: '/book/date-time',
              label: 'Volver a horarios',
            }}
          />

          {/* Summary Card */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 pb-4 flex gap-5">
              <div className="h-24 w-24 rounded-2xl shrink-0 overflow-hidden bg-slate-100">
                <img
                  src={summary.service.image || '/placeholder.svg'}
                  alt={summary.service.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-pink-50 text-pink-700 rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  >
                    {summary.service.category}
                  </Badge>

                  <span className="font-bold text-lg text-slate-900">
                    ${summary.total}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 leading-tight mb-2">
                  {summary.service.name}
                </h3>

                <div className="flex items-center gap-1 text-sm font-medium text-slate-500 bg-slate-50 inline-block px-3 py-1 rounded-full">
                  <Clock className="h-3.5 w-3.5" />
                  {summary.service.duration}
                </div>
              </div>
            </div>

            <div className="bg-slate-50/50 p-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Fecha seleccionada
              </span>
              <span className="text-sm font-bold text-slate-900">
                {summary.dateDisplay} · {summary.time}
              </span>
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-200/60">
              <span className="h-2 w-2 rounded-full bg-pink-500"></span>
              <h2 className="text-lg font-bold text-slate-900">
                Tus datos de contacto
              </h2>
            </div>

            <div className="grid gap-5">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-slate-600 font-medium ml-1"
                >
                  Nombre completo <span className="text-pink-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ej. María Pérez"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="h-14 rounded-2xl bg-white border-slate-200 shadow-sm focus:border-pink-500 focus:ring-pink-500/20 px-5 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-slate-600 font-medium ml-1"
                >
                  Correo electrónico <span className="text-pink-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nombre@ejemplo.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-14 rounded-2xl bg-white border-slate-200 shadow-sm focus:border-pink-500 focus:ring-pink-500/20 px-5 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-slate-600 font-medium ml-1"
                >
                  WhatsApp / Teléfono{' '}
                  <span className="text-xs text-muted-foreground font-normal">
                    (Opcional)
                  </span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="55 1234 5678"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="h-14 rounded-2xl bg-white border-slate-200 shadow-sm focus:border-pink-500 focus:ring-pink-500/20 px-5 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="notes"
                  className="text-slate-600 font-medium ml-1"
                >
                  Notas adicionales{' '}
                  <span className="text-xs text-muted-foreground font-normal">
                    (Opcional)
                  </span>
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="¿Tienes alguna alergia o requerimiento especial?"
                  className="min-h-[100px] rounded-2xl bg-white border-slate-200 shadow-sm focus:border-pink-500 focus:ring-pink-500/20 p-5 resize-none text-base"
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="rounded-[2rem] bg-slate-900 text-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-medium text-white/70">
                Total del servicio
              </span>
              <span className="font-bold text-xl">${summary.total}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-pink-300">
                  <Lock className="h-4 w-4" />
                  <span className="font-bold">A pagar ahora (Depósito)</span>
                </div>
                <span className="font-bold text-2xl text-pink-300">
                  ${summary.deposit}
                </span>
              </div>

              <p className="text-xs text-white/50 leading-relaxed pl-6">
                El depósito asegura tu cita y se descuenta del total. No es
                reembolsable.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between text-sm font-medium">
              <span className="text-white/70">Restante a pagar en studio</span>
              <span>${summary.remaining}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Bar */}
      <div className="sticky bottom-0 inset-x-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 p-4 pb-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-20">
        <div className="container mx-auto max-w-lg flex items-center justify-between gap-6">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
              Total a pagar hoy
            </span>
            <div className="text-xl font-bold text-slate-900">
              ${summary.deposit}
            </div>
          </div>

          <button
            onClick={handleConfirm}
            disabled={!isFormValid}
            className={cn(
              'shrink-0 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all shadow-xl',
              !isFormValid
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-pink-600 to-rose-500 text-white hover:brightness-110 hover:shadow-2xl hover:scale-105 active:scale-95'
            )}
          >
            Confirmar Reserva
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
