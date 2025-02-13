'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Pencil, Check, X } from 'lucide-react';
import type { Case, CaseMovement } from '@/types/case';
import { useForm } from 'react-hook-form';
import type { TCreateMovementSchema } from '@/validations/schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMovement } from '@/lib/api';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateMovementSchema } from '../../../validations/schemas';
import moment from 'moment';

interface MovementItemProps {
  movement: CaseMovement;
  caseId: number;
}

export default function MovementItem({ movement, caseId }: MovementItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [originalMovement] = useState(movement.description);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    // formState: { errors },
    getValues,
    setValue,
  } = useForm<TCreateMovementSchema>({
    defaultValues: movement,
    resolver: zodResolver(updateMovementSchema),
  });

  const { mutate: updateMovementMutation } = useMutation({
    mutationFn: () =>
      updateMovement(
        movement.id,
        movement.caseInternNumber,
        getValues().description,
      ),
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
              <Button size="sm" variant="ghost" onClick={handleCancel}>
                <X className="mr-1 h-4 w-4" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSubmit(onSubmit)}>
                <Check className="mr-1 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-4">
            <p className="flex-1 text-sm">{movement.description}</p>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="mt-[-4px]"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
