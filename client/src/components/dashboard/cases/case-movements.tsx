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
import { Loader2, Plus } from 'lucide-react';
import type { Case, CaseMovement } from '@/types/case';
import MovementItem from './movement-items';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNewMovement } from '@/lib/api';
import { toast } from 'sonner';
import { queryClient } from '@/components/react-query-provider';
import { createMovementSchema } from '@/validations/schemas';
import { ZodError } from 'zod';

interface CaseMovementsProps {
  caseData: Case;
}

export default function CaseMovements({ caseData }: CaseMovementsProps) {
  const [isAddingMovement, setIsAddingMovement] = useState(false);
  const { register, handleSubmit, getValues, setValue } = useForm({
    resolver: zodResolver(createMovementSchema),
    defaultValues: {
      caseInternNumber: caseData.internNumber,
      description: '',
    },
  });

  // search cache data
  const { data: cachedCase, isLoading } = useQuery<{
    movements: CaseMovement[];
  }>({
    queryKey: ['case', caseData.id],
    enabled: true,
  });
  const cachedMovements = cachedCase?.movements || [];

  const { mutate: handleAddMovement, isPending } = useMutation({
    mutationFn: () =>
      createNewMovement(caseData.internNumber, getValues('description')),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['case', caseData.id] });
      setIsAddingMovement(false);
      setValue('description', '');
      toast.success('Movement added successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // client side validation errors - client errors
  const onError = (error: ZodError) => {
    Object.keys(error).forEach((key) => {
      const fieldName = key; // get field name validation failed
      const errorMessage = error[key].message; // get error message
      toast.error(`${fieldName}: ${errorMessage}`);
    });
  };

  const onAddingNewMovement = () => {
    handleAddMovement();
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
                  // {...register('date')}
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Descripcion
                </label>
                <Textarea
                  {...register('description')}
                  name="description"
                  rows={3}
                />
              </div>
              <Button
                className="w-full"
                type="button"
                onClick={handleSubmit(onAddingNewMovement, onError)}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Agregar Movimiento'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          cachedMovements?.map((movement, index) => (
            <MovementItem
              key={index}
              movement={movement}
              caseId={caseData.id}
              caseInternNumber={caseData.internNumber}
            />
          ))
        )}
      </div>
    </Card>
  );
}
