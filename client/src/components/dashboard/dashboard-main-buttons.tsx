'use client';

import { useRouter } from 'next/navigation';
import { Gavel, Plus } from 'lucide-react';
import { Button } from '../ui/button';

export default function DashboardMainButtons() {
  const router = useRouter();
  return (
    <div className="mt-4 flex flex-col gap-2">
      <Button
        className="w-[150px] self-center"
        onClick={() => router.push('/dashboard/cases/new')}
      >
        <Plus className="h-4 w-4" />
        Nuevo Caso
      </Button>
      <Button
        className="w-[150px] self-center"
        onClick={() => router.push('/dashboard/auctions/new')}
      >
        <Gavel className="h-4 w-4" />
        Nueva Subasta
      </Button>
    </div>
  );
}
