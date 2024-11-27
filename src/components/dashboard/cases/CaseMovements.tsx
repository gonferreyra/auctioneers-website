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
import { Plus, Calendar } from 'lucide-react';
import type { Case, CaseMovement } from '@/types/case';

interface CaseMovementsProps {
  caseData: Case;
}

export default function CaseMovements({ caseData }: CaseMovementsProps) {
  const [isAddingMovement, setIsAddingMovement] = useState(false);
  const [newMovement, setNewMovement] = useState<Partial<CaseMovement>>({
    date: new Date().toISOString().split('T')[0],
    type: 'other',
    description: '',
  });

  const handleAddMovement = () => {
    // Here you would typically make an API call to add the movement
    console.log('Adding new movement:', newMovement);
    setIsAddingMovement(false);
    setNewMovement({
      date: new Date().toISOString().split('T')[0],
      type: 'other',
      description: '',
    });
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Case Movements</h2>
        <Dialog open={isAddingMovement} onOpenChange={setIsAddingMovement}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Movement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Movement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={newMovement.date}
                  onChange={(e) =>
                    setNewMovement({ ...newMovement, date: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Type</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={newMovement.type}
                  onChange={(e) =>
                    setNewMovement({
                      ...newMovement,
                      type: e.target.value as CaseMovement['type'],
                    })
                  }
                >
                  <option value="filing">Filing</option>
                  <option value="hearing">Hearing</option>
                  <option value="motion">Motion</option>
                  <option value="decision">Decision</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Description
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
                Add Movement
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {caseData.movements.map((movement) => (
          <div
            key={movement.id}
            className="flex items-start gap-4 rounded-lg border p-4"
          >
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {new Date(movement.date).toLocaleDateString()}
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-sm font-medium">
                  {movement.type.charAt(0).toUpperCase() +
                    movement.type.slice(1)}
                </span>
              </div>
              <p className="text-sm">{movement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
