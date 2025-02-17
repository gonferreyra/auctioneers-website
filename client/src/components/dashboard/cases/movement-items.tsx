'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Pencil, Check, X, Loader2, Trash2 } from 'lucide-react';
import type { Case, CaseMovement } from '@/types/case';
import { useForm } from 'react-hook-form';
import type { TUpdateMovementSchema } from '@/validations/schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMovement, updateMovement } from '@/lib/api';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateMovementSchema } from '../../../validations/schemas';
import moment from 'moment';

interface MovementItemProps {
  movement: CaseMovement;
  caseId: number;
  caseInternNumber: string;
}

export default function MovementItem({
  movement,
  caseId,
  caseInternNumber,
}: MovementItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [originalMovement] = useState(movement.description);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<TUpdateMovementSchema>({
    defaultValues: movement,
    resolver: zodResolver(updateMovementSchema),
  });

  const { mutate: updateMovementMutation, isPending } = useMutation({
    mutationFn: () =>
      updateMovement(movement.id, caseInternNumber, getValues().description),
    onSuccess: () => {
      setIsEditing(false);

      queryClient.setQueryData(['case', caseId], (caseData: Case) => {
        return {
          ...caseData,
          movements: caseData?.movements?.map((m) => {
            if (m.id === movement.id) {
              return {
                ...m,
                description: getValues('description'),
              };
            }
            return m;
          }),
        };
      });

      toast.success('Movement updated successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: handleDeleteMovement, isPending: isDeletingMovement } =
    useMutation({
      mutationFn: () => deleteMovement(movement.id),
      onSuccess: () => {
        toast.success('Movimiento eliminado correctamente');
        queryClient.setQueryData(['case', caseId], (caseData: Case) => {
          return {
            ...caseData,
            movements: caseData?.movements?.filter((m) => m.id !== movement.id),
          };
        });
      },
      onError: (error) => {
        toast.error(error.message || 'Hubo un error al eliminar el movimiento');
      },
    });

  // client side validation errors - client errors
  const onError = () => {
    (Object.keys(errors) as Array<keyof TUpdateMovementSchema>).forEach(
      (key) => {
        const fieldName = key;
        const errorMessage = errors[key]?.message;
        toast.error(`${fieldName}: ${errorMessage}`);
      },
    );
  };

  const handleCancel = () => {
    setValue('description', originalMovement);
    setIsEditing(false);
  };

  const onSubmit = () => {
    updateMovementMutation();
  };

  return (
    <div className="flex items-start gap-4 rounded-lg border p-4">
      <div className="flex-1">
        <div className="mb-2 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {moment(movement.createdAt).format('DD/MM/YYYY')}
          </span>
        </div>
        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              {...register('description')}
              rows={2}
              className="resize-none"
            />
            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                variant="ghost"
                type="button"
                onClick={handleCancel}
              >
                <X className="mr-1 h-4 w-4" />
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleSubmit(onSubmit, onError)}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Check />
                    Guardar
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <p className="flex-1 text-sm">{movement.description}</p>
            <Button
              size="sm"
              variant="ghost"
              type="button"
              onClick={() => setIsEditing(true)}
              disabled={!movement.id}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={() => handleDeleteMovement()}
              disabled={isDeletingMovement || !movement.id}
            >
              {isDeletingMovement ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
