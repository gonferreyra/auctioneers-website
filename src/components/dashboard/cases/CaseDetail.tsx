'use client';

import CaseHeader from './CaseHeader';
import CaseInfo from './CaseInfo';
import CaseMovements from './CaseMovements';
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
