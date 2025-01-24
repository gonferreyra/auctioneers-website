'use client';

import { FileText, Scale } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import clsx from 'clsx';
import { Case } from '@/types/case';

interface CaseHeaderProps {
  caseData: Case;
  isEditing: boolean;
  // onUpdate: (updates: Partial<Case>) => void;
}

export default function CaseHeader({
  caseData,
  isEditing,
  // onUpdate,
}: CaseHeaderProps) {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-start justify-between">
        <div
          className={clsx('max-w-2xl flex-1 space-y-4', {
            flex: isEditing,
          })}
        >
          {isEditing ? (
            <>
              <div className="flex-1 space-y-2">
                <Label htmlFor="title">Autos caratulados</Label>
                {/* Este campo no debe ser editado, lo tenemos que editar abajo en las partes */}
                <Input
                  id="title"
                  value={`${caseData.plaintiff} c/ ${caseData.defendant} - ${caseData.type}`}
                  disabled
                  placeholder="e.g., Banco Suquia c/ Daniel Blanco - Ejecucion hipotecaria"
                />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold">
                {caseData.plaintiff} c/ {caseData.defendant} - {caseData.type} -
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Internal: {caseData.internNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  <span>Expediente: {caseData.record}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      caseData.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : caseData.status === 'paralyzed'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {caseData.status.charAt(0).toUpperCase() +
                      caseData.status.slice(1)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
