'use client';

import { FileText, Scale } from 'lucide-react';
import type { Case } from '@/types/case';

interface CaseHeaderProps {
  caseData: Case;
}

export default function CaseHeader({ caseData }: CaseHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{caseData.title}</h1>
          <div className="mt-2 flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Internal: {caseData.internalNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              <span>Record: {caseData.recordNumber}</span>
            </div>
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            caseData.status === 'active'
              ? 'bg-green-100 text-green-800'
              : caseData.status === 'paralyzed'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
          }`}
        >
          {caseData.status.charAt(0).toUpperCase() + caseData.status.slice(1)}
        </span>
      </div>
    </div>
  );
}
