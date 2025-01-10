'use client';

import { use } from 'react';
import BackButton from '@/components/dashboard/back-button';
import { getCaseById } from '@/lib/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Case } from '@/types/case';
import CaseDetail from '@/components/dashboard/cases/case-detail';

interface CasePageProps {
  params: Promise<{ id: string }>;
}

export default function CasePage({ params }: CasePageProps) {
  const queryClient = useQueryClient();
  const { id } = use(params);

  // try to get data from cache
  const cachedCases = queryClient.getQueryData<{ data: { cases: Case[] } }>([
    'cases',
  ]);

  const cachedCase = cachedCases?.data?.cases.find((case_: Case) => case_.id);

  // If the case is not on cache, fetch it
  const { data: caseData, isLoading } = useQuery({
    queryKey: ['cases', id],
    // queryFn: () => getCaseById(id),
    queryFn: () => {
      if (cachedCase) {
        console.log('Obteniendo datos del caché');
        return Promise.resolve(cachedCase);
      } else {
        console.log('Obteniendo datos de la API');
        return getCaseById(id);
      }
    },
    initialData: cachedCase || undefined,
    staleTime: 1000 * 60 * 60, // 1 hora
    refetchOnWindowFocus: false,
    retry: false,
  });

  // console.log(data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!caseData) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-4xl">
          <BackButton />
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <h2 className="font-semibold text-red-800">Case Not Found</h2>
            <p className="text-red-600">
              The requested case could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        <BackButton />
        <CaseDetail caseData={caseData} />
      </div>
    </div>
  );
}
