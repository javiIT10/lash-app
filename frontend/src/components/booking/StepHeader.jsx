import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function StepHeader({
  stepNumber,
  totalSteps = 3,
  stepLabel,
  title,
  subtitle,
  backLink,
}) {
  return (
    <div className="space-y-6">
      {backLink && (
        <Link
          to={backLink.href}
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-pink-600 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {backLink.label}
        </Link>
      )}

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="h-9 w-9 rounded-full bg-linear-to-br from-pink-500 to-rose-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-pink-200">
            {stepNumber}
          </span>

          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
            Paso {stepNumber} de {totalSteps} · {stepLabel}
          </span>
        </div>

        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="text-lg text-slate-500 leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
