import ServiceCard from '../../components/booking/ServiceCard';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background p-6 max-w-6xl mx-auto">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          category="Pestañas"
          name="Extensiones Clásicas"
          description="Efecto natural, una extensión por cada pestaña natural."
          duration="1h 30m"
          price={650}
          deposit={200}
          image="/images/classic-lashes.jpg"
          onClick={() => console.log('Reservar')}
          onDeposit={() => console.log('Apartar')}
        />
      </div>
    </div>
  );
}
