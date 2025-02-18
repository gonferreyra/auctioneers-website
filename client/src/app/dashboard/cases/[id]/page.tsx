'use client';

import { use } from 'react';
import BackButton from '@/components/dashboard/back-button';
import { useQuery } from '@tanstack/react-query';
import type { Case } from '@/types/case';
import CaseDetail from '@/components/dashboard/cases/case-detail';
import { getCaseById } from '@/lib/api';
import { useCaseStore } from '@/stores/useCaseStore';
import Loading from './loading';

interface CasePageProps {
  params: Promise<{ id: string }>;
}

export default function CasePage({ params }: CasePageProps) {
  const { id } = use(params);
  const numberId = Number(id);
  const { currentPage, debouncedValue, searchType, caseType } = useCaseStore();

  // Try to get cases from cache
  const cachedCases = useQuery<{ cases: Case[] }>({
    queryKey: ['cases', currentPage, debouncedValue, searchType, caseType],
    enabled: false, // We don't want to refetch, just read cache
  });

  // Search case in cache
  const cachedCase = cachedCases?.data?.cases?.find(
    (case_: Case) => case_.id === numberId,
  );

  // If not in cache, fetch it
  const { data: caseData, isLoading } = useQuery({
    queryKey: ['case', numberId], // New key for every case
    queryFn: () => getCaseById(numberId),
    initialData: cachedCase, // If in cache, use it
    enabled: !cachedCase, // Only fetch if not in cache
  });

  if (isLoading) {
    return <Loading />;
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
        <CaseDetail caseData={caseData as Case} />
      </div>
    </div>
  );
}
