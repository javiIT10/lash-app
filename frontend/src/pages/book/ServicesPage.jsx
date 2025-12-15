import ServiceCard from '../../components/booking/ServiceCard';
import ServicesData from '../../data/ServicesData';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background p-6 max-w-6xl mx-auto">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ServicesData.map((service) => (
          <ServiceCard
            key={service.id}
            {...service}
            onClick={() => console.log('Reservar', service.id)}
            onDeposit={() => console.log('Apartar', service.id)}
          />
        ))}
      </div>
    </div>
  );
}
