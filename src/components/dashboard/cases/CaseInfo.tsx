'use client';

import { Card } from '@/components/ui/card';
import { Calendar, Gavel, User, FileText } from 'lucide-react';
import type { Case } from '@/types/case';

interface CaseInfoProps {
  caseData: Case;
}

export default function CaseInfo({ caseData }: CaseInfoProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Case Details</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              Filed on {new Date(caseData.filingDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Gavel className="h-4 w-4 text-muted-foreground" />
            <span>{caseData.court}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>Type: {caseData.type}</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Parties</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <User className="mt-1 h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">{caseData.plaintiff}</p>
              <p className="text-sm text-muted-foreground">Plaintiff</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <User className="mt-1 h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">{caseData.defendant}</p>
              <p className="text-sm text-muted-foreground">Defendant</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
