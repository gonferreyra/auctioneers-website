'use client';

import { useEffect, useState } from 'react';
import CaseHeader from './case-header';
import CaseInfo from './case-info';
import CaseMovements from './case-movements';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { Case, PaginatesAndSearchCasesApiResponse } from '@/types/case';
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
import { updateCaseSchema } from '@/validations/schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCase } from '@/lib/api';
import { useCaseStore } from '@/stores/useCaseStore';
import { Loader2 } from 'lucide-react';

interface CaseDetailProps {
  caseData: Case;
}

export default function CaseDetail({ caseData }: CaseDetailProps) {
  const [isEditing, setIsEditing] = useState(false);

  // const router = useRouter();
  const queryClient = useQueryClient();
  const { currentPage, debouncedValue, searchType, caseType } = useCaseStore();

  // initialice useForm
  const methods = useForm<Case>({
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
  const { mutate: handleUpdate, isPending } = useMutation({
    mutationFn: () => updateCase(caseData.id, getValues()),
    onSuccess: (updatedCase) => {
      queryClient.setQueryData(
        ['cases', currentPage, debouncedValue, searchType, caseType],
        (oldData: PaginatesAndSearchCasesApiResponse) => {
          if (!oldData?.cases) return oldData;

          return {
            ...oldData,
            cases: oldData.cases.map((case_: Case) =>
              case_.id === caseData.id ? updatedCase : case_,
            ),
          };
        },
      );

      queryClient.setQueryData(['case', caseData.id], getValues());

      toast.success('Caso actualizado correctamente');
      setIsEditing(false);
    },
    // server errors
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

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
          <CaseHeader caseData={caseData} isEditing={isEditing} />
          <div className="ml-4 space-x-2 self-end">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>Editar Caso</Button>
            ) : (
              <>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Cancelar</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancelar Cambios?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Hay cambios sin guardar. Estas seguro que quieres
                        eliminarlos?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Continuar Editando</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCancel}>
                        Eliminar Cambios
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'Guardar Cambios'
                  )}
                </Button>
              </>
            )}
          </div>
        </div>

        <CaseInfo caseData={caseData} isEditing={isEditing} methods={methods} />

        <CaseMovements caseData={caseData} />
      </div>
    </form>
  );
}
