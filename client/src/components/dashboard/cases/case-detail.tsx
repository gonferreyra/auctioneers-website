'use client';

import { useEffect, useState } from 'react';
import CaseHeader from './case-header';
import CaseInfo from './case-info';
import CaseMovements from './case-movements';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { Case } from '@/types/case';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TUpdateCaseSchema, updateCaseSchema } from '@/validations/schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCase } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface CaseDetailProps {
  caseData: Case;
}

export default function CaseDetail({ caseData }: CaseDetailProps) {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  // initialice useForm
  const methods = useForm<TUpdateCaseSchema>({
    resolver: zodResolver(updateCaseSchema),
    defaultValues: caseData,
  });
  const {
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  // mutation to update case
  const { mutate: handleUpdate } = useMutation({
    mutationFn: () => updateCase(caseData.id, getValues()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      queryClient.setQueryData(['case', caseData.id], getValues());

      toast.success('Caso actualizado correctamente');
      router.push('/dashboard');
      setIsEditing(false);
    },
    // server errors
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  // mutation to update movement
  // const {} = useMutation({
  //   mutationFn: () => updateMovement()
  // })

  const handleUpdateMovement = (movementId: number, description: string) => {
    const updatedMovements = editedCase.movements.map((movement) =>
      movement.id === movementId ? { ...movement, description } : movement,
    );

    // handleUpdate({ movements: updatedMovements });
    toast.success('Movement updated successfully');
  };

  // client side validation errors - client errors
  const onError = () => {
    Object.entries(errors).forEach(([key, error]) => {
      if (error) {
        toast.error(`${key}: ${error.message || 'Hubo un error'}`);
      }
    });
  };

  const onSubmit = async () => {
    const caseType = getValues('caseType');

    // set data to Number (RHF transform to string by default)
    if (caseType === 'vehicle') {
      const carYear = getValues('specificData.year');
      setValue('specificData.year', Number(carYear));
    } else if (caseType === 'property') {
      const percentage = getValues('specificData.percentage');
      setValue('specificData.percentage', Number(percentage));
    }

    // API call
    handleUpdate();
  };

  const handleCancel = () => {
    reset(caseData);
    setIsEditing(false);
  };

  useEffect(() => {
    reset(caseData);
  }, [caseData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <CaseHeader
            caseData={caseData}
            isEditing={isEditing}
            // onUpdate={handleUpdate}
          />
          <div className="ml-4 space-x-2 self-end">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>Edit Case</Button>
            ) : (
              <>
                {/* {hasUnsavedChanges && (
                  <Button
                    variant="outline"
                    onClick={handleUndo}
                    className="border-yellow-600 text-yellow-600 hover:bg-yellow-50"
                  >
                    Undo Changes
                  </Button>
                )} */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Discard Changes?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You have unsaved changes. Are you sure you want to
                        discard them?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Continue Editing</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCancel}>
                        Discard Changes
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button type="submit">Save Changes</Button>
              </>
            )}
          </div>
        </div>

        <CaseInfo
          caseData={caseData}
          isEditing={isEditing}
          methods={methods}
          // handleSubmit={onSubmit}
        />

        <CaseMovements
          caseData={caseData}
          onUpdateMovement={handleUpdateMovement}
        />
      </div>
    </form>
  );
}
