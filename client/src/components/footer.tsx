import Link from 'next/link';
import { Gavel } from 'lucide-react';

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="mb-4 flex items-center space-x-2">
              <Gavel className="h-8 w-8" />
              <span className="text-xl font-bold">
                Ferreyra Martilleros
              </span>
            </Link>
            <p className="mb-4 text-gray-400">
              Martilleros con más de 60 años de trayectoria en Córdoba.
            </p>
            <p className="text-sm text-gray-500">M.P. 01-xxx</p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#subastas">Subastas</Link>
              </li>
              <li>
                <Link href="#servicios">Servicios</Link>
              </li>
              <li>
                <Link href="#contacto">Contacto</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy">Aviso legal</Link>
              </li>
              <li>
                <Link href="/terms">Privacidad</Link>
              </li>
              <li>
                <Link href="/cookies">Cookies</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Ferreyra Martilleros. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
