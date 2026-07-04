'use client';

import {
  Calendar,
  FolderSearch2,
  Gavel,
  Hammer,
  Home,
  Package2,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useDashboardMenuStore } from '@/stores/useDashboardMenuStore';
import { useRouter } from 'next/navigation';

export default function DashboardSidebar() {
  const setActivePage = useDashboardMenuStore((state) => state.setActivePage);
  const router = useRouter();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span>Martillo</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <button
              onClick={() => {
                router.push('/dashboard');
                setActivePage('cases');
              }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:cursor-pointer hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Inicio
            </button>
            <button
              onClick={() => {
                router.push('/dashboard');
                setActivePage('calendar');
              }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:cursor-pointer hover:text-primary"
            >
              <Calendar className="h-4 w-4" />
              Calendario
            </button>
            <button
              onClick={() => {
                router.push('/dashboard');
                setActivePage('cases');
              }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:cursor-pointer hover:text-primary"
            >
              <FolderSearch2 className="h-4 w-4" />
              Casos
            </button>
            <button
              onClick={() => {
                router.push('/dashboard');
                setActivePage('auctions');
              }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:cursor-pointer hover:text-primary"
            >
              <Hammer className="h-4 w-4" />
              Subastas
            </button>
          </nav>

          <div className="mt-4 flex flex-col gap-2">
            <Button
              className="w-[150px] self-center"
              onClick={() => {
                router.push('/dashboard');
                setActivePage('new-case');
              }}
            >
              <Plus className="h-4 w-4" />
              Nuevo Caso
            </Button>
            <Button
              className="w-[150px] self-center"
              onClick={() => {
                router.push('/dashboard');
                setActivePage('new-auction');
              }}
            >
              <Gavel className="h-4 w-4" />
              Nueva Subasta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
