'use client';

import CaseHeader from './case-header';
import CaseInfo from './case-info';
import CaseMovements from './case-movements';
import type { Case } from '@/types/case';

interface CaseDetailProps {
  caseData: Case;
}

export default function CaseDetail({ caseData }: CaseDetailProps) {
  return (
    <div className="space-y-6">
      <CaseHeader caseData={caseData} />
      <CaseInfo caseData={caseData} />
      <CaseMovements caseData={caseData} />
    </div>
  );
}
