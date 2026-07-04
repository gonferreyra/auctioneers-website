import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center">
      <div className="flex h-full flex-col items-center justify-center gap-2 py-24 lg:py-32">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-x-2 rounded-full border px-4 py-1.5 text-sm">
            Próximas subastas en Córdoba
          </span>
        </div>

        <div className="mx-auto mt-5 max-w-2xl text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Comprá y vendé en subasta
          </h1>
        </div>

        <div className="mx-auto mt-5 max-w-3xl text-center">
          <p className="text-xl text-muted-foreground">
            Inmuebles y vehículos con transparencia y seguridad.
            <br />
            Ferreyra Martilleros &mdash; más de 60 años de trayectoria.
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <a href="#subastas">
            <Button size="lg">
              Ver subastas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <a href="#contacto">
            <Button size="lg" variant="outline">
              Contactanos
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
