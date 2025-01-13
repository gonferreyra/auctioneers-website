'use client';

import { use } from 'react';
import BackButton from '@/components/dashboard/back-button';
import { useQuery } from '@tanstack/react-query';
import type { Case } from '@/types/case';
import CaseDetail from '@/components/dashboard/cases/case-detail';
import { getCaseById } from '@/lib/api';

interface CasePageProps {
  params: Promise<{ id: string }>;
}

export default function CasePage({ params }: CasePageProps) {
  const { id } = use(params);
  const numberId = Number(id);

  // If the case is not on cache, fetch it
  const { data: caseData, isLoading } = useQuery({
    queryKey: ['cases'],
    // select: get data from cache, and if not found, fetch it (need to be test!)
    select: (data: { data: { cases: Case[] } }) => {
      const case_ = data.data.cases.find(
        (case_: Case) => case_.id === numberId,
      );
      if (!case_) {
        return getCaseById(numberId);
      }
      return case_;
    },
    staleTime: 1000 * 60 * 60, // 1 hora
  });

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
        <CaseDetail caseData={caseData as Case} />
      </div>
    </div>
  );
}
