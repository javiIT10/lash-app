import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Sparkles,
  Star,
  Award,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  ArrowRight,
} from 'lucide-react';

import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/Sheet';

export default function HomePage() {
  const navigate = useNavigate();

  const goToServices = (category) => {
    if (!category) return navigate('/book/services');
    navigate(`/book/services?category=${category}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 font-sans selection:bg-pink-100 selection:text-pink-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-md supports-backdrop-filter:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-pink-500" />
              <span className="text-xl font-semibold">Bella Studio</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="#servicios"
                className="px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition-colors"
              >
                Servicios
              </a>
              <a
                href="#nosotros"
                className="px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition-colors"
              >
                Nosotros
              </a>
              <a
                href="#visita"
                className="px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition-colors"
              >
                Visítanos
              </a>

              <Button
                size="default"
                onClick={() => goToServices()}
                className="h-10 px-6 rounded-full text-sm font-semibold bg-pink-600 hover:bg-pink-700 shadow-lg shadow-pink-200"
              >
                Reservar Cita
              </Button>
            </div>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] rounded-l-4xl">
                <div className="flex flex-col items-center justify-center h-full gap-8 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-6 w-6 text-pink-500" />
                    <span className="text-xl font-bold">Bella Studio</span>
                  </div>

                  <a
                    href="#servicios"
                    className="text-lg font-medium hover:text-pink-500 transition-colors"
                  >
                    Servicios
                  </a>
                  <a
                    href="#nosotros"
                    className="text-lg font-medium hover:text-pink-500 transition-colors"
                  >
                    Nosotros
                  </a>
                  <a
                    href="#visita"
                    className="text-lg font-medium hover:text-pink-500 transition-colors"
                  >
                    Visítanos
                  </a>

                  <Button
                    size="lg"
                    onClick={() => goToServices()}
                    className="h-14 px-8 text-base mt-4 rounded-full w-full bg-linear-to-r from-pink-600 to-rose-500 hover:brightness-110 shadow-xl"
                  >
                    Reservar Cita
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-pink-200/20 rounded-full blur-[100px] mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-[100px] mix-blend-multiply" />

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold tracking-wide uppercase text-pink-600">
                <Award className="h-3.5 w-3.5" />
                <span>Studio certificado</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.1]">
                Realza tu{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-600 to-purple-600">
                  belleza natural
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Especialistas en maquillaje profesional, cejas y pestañas.
                Diseños personalizados que resaltan tu esencia única.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Button
                  onClick={() => goToServices()}
                  className="h-14 px-8 rounded-full bg-pink-600 hover:bg-pink-700 text-white shadow-xl shadow-pink-200 hover:shadow-2xl hover:shadow-pink-300 transition-all transform hover:-translate-y-1 text-base font-bold"
                >
                  Agendar Cita
                </Button>

                <Button
                  variant="outline"
                  onClick={() => goToServices()}
                  className="h-14 px-8 rounded-full border-2 border-slate-200 bg-transparent hover:bg-slate-50 text-slate-700 text-base font-bold hover:border-slate-300 transition-all"
                >
                  Ver Servicios
                </Button>
              </div>

              <div className="pt-8 flex items-center justify-center lg:justify-start gap-6">
                <div className="flex -space-x-4">
                  {[
                    '/young-woman-face-portrait-smiling.jpg',
                    '/latina-woman-professional-headshot.png',
                    '/asian-woman-portrait-beauty.jpg',
                    '/woman-face-closeup-elegant.jpg',
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center overflow-hidden"
                    >
                      <img
                        src={src || '/placeholder.svg'}
                        alt={`Cliente ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-bold text-slate-900 dark:text-white">
                      4.9
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-500">
                    Based on 500+ reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative aspect-4/5 md:aspect-square lg:aspect-4/5 rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-white/50 bg-white">
                <img
                  src="/professional-makeup-artist-applying-eyelash-extens.jpg"
                  alt="Bella Studio - Maquillaje profesional"
                  className="object-cover w-full h-full relative z-10"
                />
              </div>

              <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md border border-white/50 rounded-2xl p-4 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">10+ Años</p>
                    <p className="text-xs font-medium text-slate-500">
                      Experiencia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="py-24 relative">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/50 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 space-y-4">
            <span className="text-pink-600 font-bold tracking-wider text-sm uppercase">
              Nuestras Especialidades
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
              Explora nuestros servicios
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pestañas */}
            <button
              type="button"
              onClick={() => goToServices('pestanas')}
              className="group text-left"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-100 aspect-4/3 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <img
                  src="/eyelash-extensions-closeup-beautiful-eyes-lashes-b.jpg"
                  alt="Extensiones de Pestañas"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 relative z-10"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-20" />
                <div className="absolute top-6 left-6 z-30">
                  <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur text-xs font-bold uppercase tracking-wide text-slate-900 shadow-sm">
                    Pestañas
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-30">
                  <h3 className="text-3xl font-bold mb-2">Extensiones</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-white/90 font-medium">
                      Volumen, Clásicas y Lifting
                    </p>
                    <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* Uñas */}
            <button
              type="button"
              onClick={() => goToServices('unas')}
              className="group text-left"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-100 aspect-4/3 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <img
                  src="/nail-art-manicure-elegant-pink-nails-beauty-salon-.jpg"
                  alt="Nail Art y Manicure"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 relative z-10"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-20" />
                <div className="absolute top-6 left-6 z-30">
                  <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur text-xs font-bold uppercase tracking-wide text-slate-900 shadow-sm">
                    Uñas
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-30">
                  <h3 className="text-3xl font-bold mb-2">Nail Art</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-white/90 font-medium">
                      Manicure, Pedicure y Diseño
                    </p>
                    <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="nosotros" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
              ¿Quiénes Somos?
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
              Somos Bella Studio, un equipo de profesionales dedicados a
              ayudarte a destacar tu belleza natural con maquillaje, cejas y
              uñas de alta calidad.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative aspect-4/5 md:aspect-square lg:aspect-4/5 rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-white/50 bg-white">
                <img
                  src="/beauty-salon-team-professional-women-makeup-artist.jpg"
                  alt="Equipo Bella Studio"
                  className="object-cover w-full h-full relative z-10"
                />
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <Card className="rounded-[2.5rem] overflow-hidden shadow-[0_24px_48px_-12px_rgba(0,0,0,0.1)] h-full border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-10 md:p-12 space-y-8 bg-white dark:bg-slate-900">
                  <div>
                    <h3 className="text-3xl font-extrabold mb-6 text-slate-900 dark:text-white">
                      Nuestra Misión
                    </h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                      Transformar la belleza de cada una de nuestras clientas
                      con técnicas profesionales y un toque de arte.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-extrabold mb-6 text-slate-900 dark:text-white">
                      Nuestro Equipo
                    </h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                      Compuesto por expertas certificadas que se dedican a
                      brindarte la mejor atención y resultados.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visita" className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300/30 dark:bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/30 dark:bg-orange-500/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              Visítanos
            </h2>
            <p className="text-lg text-muted-foreground text-balance">
              Te esperamos en nuestro acogedor estudio
            </p>
          </div>

          <Card className="max-w-5xl mx-auto overflow-hidden border-0 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.1)] rounded-[2.5rem] bg-white/90 backdrop-blur-sm p-0">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto min-h-[300px]">
                <img
                  src="/modern-beauty-salon-interior-pink-elegant-chairs-m.jpg"
                  alt="Interior de Bella Studio"
                  className="object-cover w-full h-full"
                />
              </div>

              <CardContent className="p-10 md:p-12 space-y-8 bg-white dark:bg-slate-900">
                <div>
                  <h3 className="text-3xl font-extrabold mb-6 text-slate-900 dark:text-white">
                    Visítanos
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-pink-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Dirección</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Av. Principal 123, Local 45
                          <br />
                          Centro Comercial Plaza Mayor
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-pink-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Teléfono</p>
                        <p className="text-sm text-muted-foreground">
                          +1 (555) 123-4567
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-pink-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">
                          hola@bellastudio.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="font-medium mb-3">Síguenos</p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 bg-transparent rounded-full"
                    >
                      <Instagram className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 bg-transparent rounded-full"
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-14 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
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
