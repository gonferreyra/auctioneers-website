'use client';

import { Card } from '@/components/ui/card';
import { Calendar, Gavel, User, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Case } from '@/types/case';

interface CaseInfoProps {
  caseData: Case;
  isEditing: boolean;
  onUpdate: (updates: Partial<Case>) => void;
}

export default function CaseInfo({
  caseData,
  isEditing,
  onUpdate,
}: CaseInfoProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Case Details</h2>
        <div className="space-y-4">
          {isEditing ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="court">Court</Label>
                <Input
                  id="court"
                  value={caseData.court}
                  onChange={(e) => onUpdate({ court: e.target.value })}
                  placeholder="Enter court name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Case Type</Label>
                <Input
                  id="type"
                  value={caseData.type}
                  onChange={(e) => onUpdate({ type: e.target.value })}
                  placeholder="Enter case type"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="filingDate">Filing Date</Label>
                <Input
                  id="filingDate"
                  type="date"
                  value={caseData.filingDate}
                  onChange={(e) => onUpdate({ filingDate: e.target.value })}
                />
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Parties</h2>
        <div className="space-y-4">
          {isEditing ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="plaintiff">Plaintiff</Label>
                <Input
                  id="plaintiff"
                  value={caseData.plaintiff}
                  onChange={(e) => onUpdate({ plaintiff: e.target.value })}
                  placeholder="Enter plaintiff name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="defendant">Defendant</Label>
                <Input
                  id="defendant"
                  value={caseData.defendant}
                  onChange={(e) => onUpdate({ defendant: e.target.value })}
                  placeholder="Enter defendant name"
                />
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
