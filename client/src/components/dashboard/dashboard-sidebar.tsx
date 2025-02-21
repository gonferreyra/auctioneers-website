'use client';

import {
  FolderSearch2,
  Gavel,
  Hammer,
  Home,
  Package2,
  Plus,
  ShoppingCart,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useDashboardMenuStore } from '@/stores/useDashboardMenuStore';

export default function DashboardSidebar() {
  const setActivePage = useDashboardMenuStore((state) => state.setActivePage);
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Martillo</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <div
              onClick={() => setActivePage('cases')}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:cursor-pointer hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Home
            </div>
            <div
              onClick={() => setActivePage('calendar')}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:cursor-pointer hover:text-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              Calendario
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </div>
            <div
              onClick={() => setActivePage('cases')}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:cursor-pointer hover:text-primary"
            >
              <FolderSearch2 className="h-4 w-4" />
              Casos
            </div>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4" />
              Mails
            </Link>
            <div
              onClick={() => setActivePage('auctions')}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:cursor-pointer hover:text-primary"
            >
              <Hammer className="h-4 w-4" />
              Subastas
            </div>
          </nav>

          {/* <DashboardMainButtons /> */}
          <div className="mt-4 flex flex-col gap-2">
            <Button
              className="w-[150px] self-center"
              onClick={() => setActivePage('new-case')}
            >
              <Plus className="h-4 w-4" />
              Nuevo Caso
            </Button>
            <Button
              className="w-[150px] self-center"
              onClick={() => setActivePage('new-auction')}
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
