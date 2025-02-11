'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import type { Case, CaseMovement } from '@/types/case';
import MovementItem from './movement-items';
import { useQuery } from '@tanstack/react-query';

interface CaseMovementsProps {
  caseData: Case;
  onUpdateMovement: (movementId: string, description: string) => void;
}

export default function CaseMovements({
  caseData,
  onUpdateMovement,
}: CaseMovementsProps) {
  const [isAddingMovement, setIsAddingMovement] = useState(false);
  const [newMovement, setNewMovement] = useState<Partial<CaseMovement>>({
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  // search cache data
  const cachedCase = useQuery<{ movements: CaseMovement[] }>({
    queryKey: ['case', caseData.id],
    enabled: false,
  });
  const cachedMovements = cachedCase?.data?.movements || [];

  // search movements in cache

  const handleAddMovement = () => {
    // Here you would typically make an API call to add the movement
    console.log('Adding new movement:', newMovement);
    setIsAddingMovement(false);
    setNewMovement({
      date: new Date().toISOString().split('T')[0],
      description: '',
    });
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Movimientos</h2>
        <Dialog open={isAddingMovement} onOpenChange={setIsAddingMovement}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Movimiento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Movimiento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Fecha</label>
                <Input
                  type="date"
                  value={newMovement.date}
                  onChange={(e) =>
                    setNewMovement({ ...newMovement, date: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Descripcion
                </label>
                <Textarea
                  value={newMovement.description}
                  onChange={(e) =>
                    setNewMovement({
                      ...newMovement,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <Button onClick={handleAddMovement} className="w-full">
                Agregar Movimiento
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {cachedMovements?.map((movement, index) => (
          <MovementItem
            // key={movement.id}
            key={index}
            movement={movement}
            caseId={caseData.id}
            // onUpdateDescription={(description) =>
            //   onUpdateMovement(movement.id, description)
            // }
          />
        ))}
      </div>
    </Card>
  );
}
