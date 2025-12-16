import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

import ServicesData from '../../data/ServicesData';
import StepHeader from '../../components/booking/StepHeader';
import ServiceCard from '../../components/booking/ServiceCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/Select';

function ServicesContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialCategory = searchParams.get('category'); // "pestanas" | "unas" | null

  const [category, setCategory] = useState('Todos'); // "Todos" | "Pestañas" | "Uñas"
  const [sort, setSort] = useState('featured'); // featured | price-asc | price-desc | name-asc | name-desc

  useEffect(() => {
    if (initialCategory === 'pestanas') setCategory('Pestañas');
    else if (initialCategory === 'unas') setCategory('Uñas');
  }, [initialCategory]);

  const filteredServices = useMemo(() => {
    const list = ServicesData.filter((service) =>
      category === 'Todos' ? true : service.category === category
    ).slice();

    list.sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'name-asc') return a.name.localeCompare(b.name);
      if (sort === 'name-desc') return b.name.localeCompare(a.name);
      return 0; // featured: mantiene orden original
    });

    return list;
  }, [category, sort]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <main className="pt-8 pb-16 md:pt-12 md:pb-24 container mx-auto px-4 max-w-6xl">
        <div className="mb-10">
          <StepHeader
            stepNumber={1}
            totalSteps={3}
            stepLabel="Elige tu servicio"
            title="Elige el servicio que quieres reservar"
            subtitle="Selecciona uno de nuestros servicios de pestañas o uñas para continuar con tu reserva."
            backLink={{ href: '/', label: 'Volver al inicio' }}
          />
        </div>

        {/* Sticky filter bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 sticky top-4 z-30 bg-white dark:bg-slate-900 p-5 rounded-4xl backdrop-blur-sm border border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          {/* Category pills */}
          <div className="flex items-center gap-2.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-x-auto max-w-full w-full md:w-auto">
            {['Todos', 'Pestañas', 'Uñas'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  category === cat
                    ? 'bg-white dark:bg-slate-700 text-foreground shadow-md scale-105'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-slate-700/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort (select nativo con estilo similar) */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-sm font-semibold text-muted-foreground hidden md:inline-block">
              Ordenar por:
            </span>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-full md:w-[200px] rounded-full h-11 font-medium">
                <SelectValue placeholder="Ordenar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Recomendados</SelectItem>
                <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-desc">
                  Precio: Mayor a Menor
                </SelectItem>
                <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
                <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
              onClick={() =>
                navigate(`/book/date-time?serviceId=${service.id}`)
              }
              onDeposit={() =>
                navigate(`/book/date-time?serviceId=${service.id}&mode=deposit`)
              }
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-14 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-pink-500" />
              <span className="font-bold text-lg">Bella Studio</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Bella Studio. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function ServicesPage() {
  return <ServicesContent />;
}
