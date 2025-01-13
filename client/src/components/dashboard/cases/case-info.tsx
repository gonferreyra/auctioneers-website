'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Gavel, FileText, DollarSign } from 'lucide-react';
import type { Case, CaseStatus, CaseType } from '@/types/case';

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
  const renderDynamicFields = () => {
    if (!isEditing) {
      switch (caseData.caseType) {
        case 'vehicle':
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Dominio</Label>
                  <p className="text-gray-600">
                    {caseData.vehicleDetails?.licensePlate}
                  </p>
                </div>
                <div>
                  <Label>Marca y Modelo</Label>
                  <p className="text-gray-600">
                    {caseData.vehicleDetails?.brand}{' '}
                    {caseData.vehicleDetails?.model}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Chasis</Label>
                  <p className="text-gray-600">
                    {caseData.vehicleDetails?.chassisBrand} -{' '}
                    {caseData.vehicleDetails?.chassisNumber}
                  </p>
                </div>
                <div>
                  <Label>Motor</Label>
                  <p className="text-gray-600">
                    {caseData.vehicleDetails?.engineBrand} -{' '}
                    {caseData.vehicleDetails?.engineNumber}
                  </p>
                </div>
              </div>
            </div>
          );
        case 'property':
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Matricula</Label>
                  <p className="text-gray-600">
                    {caseData.propertyDetails?.propertyRegistration}
                  </p>
                </div>
                <div>
                  <Label>Porcentaje</Label>
                  <p className="text-gray-600">
                    {caseData.propertyDetails?.percentage}%
                  </p>
                </div>
              </div>
              <div>
                <Label>Direccion</Label>
                <p className="text-gray-600">
                  {caseData.propertyDetails?.address}
                </p>
              </div>
              <div>
                <Label>Preventiva Detalles</Label>
                <p className="text-gray-600">
                  {caseData.propertyDetails?.aps?.toLocaleDateString()}{' '}
                  (Expires:{' '}
                  {caseData.propertyDetails?.apsExpiresAt &&
                    new Date(
                      caseData.propertyDetails?.apsExpiresAt,
                    ).toLocaleDateString()}
                  )
                </p>
              </div>
              <div>
                <Label>Numero de Cuenta</Label>
                <p className="text-gray-600">
                  {caseData.propertyDetails?.accountDgr}
                </p>
              </div>
              <div>
                <Label>Nomenclatura</Label>
                <p className="text-gray-600">
                  {caseData.propertyDetails?.nomenclature}
                </p>
              </div>
            </div>
          );
        case 'appraisal':
          return (
            <div className="space-y-4">
              <div>
                <Label>Inmueble a Tasar</Label>
                <ul className="list-inside list-disc text-gray-600">
                  {caseData.appraisalDetails?.itemsToAppraise.map(
                    (item, index) => <li key={index}>{item}</li>,
                  )}
                </ul>
              </div>
              <div>
                <Label>Descripcion</Label>
                <p className="text-gray-600">
                  {caseData.appraisalDetails?.description}
                </p>
              </div>
            </div>
          );
      }
    }

    switch (caseData.caseType) {
      case 'vehicle':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licensePlate">Dominio</Label>
                <Input
                  id="licensePlate"
                  value={caseData.vehicleDetails?.licensePlate}
                  onChange={(e) => onUpdate({ licensePlate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Año</Label>
                <Input
                  id="year"
                  type="number"
                  value={caseData.vehicleDetails?.year}
                  onChange={(e) => onUpdate({ year: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Marca</Label>
                <Input
                  id="brand"
                  value={caseData.vehicleDetails?.brand}
                  onChange={(e) => onUpdate({ brand: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Modelo</Label>
                <Input
                  id="model"
                  value={caseData.vehicleDetails?.model}
                  onChange={(e) => onUpdate({ model: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="chasisBrand">Chasis Marca</Label>
                <Input
                  id="chasisBrand"
                  value={caseData.vehicleDetails?.chassisBrand}
                  onChange={(e) => onUpdate({ chassisBrand: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chasisNumber">Chasis Numero</Label>
                <Input
                  id="chasisNumber"
                  value={caseData.vehicleDetails?.chassisNumber}
                  onChange={(e) => onUpdate({ chassisNumber: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="engineBrand">Motor Marca</Label>
                <Input
                  id="engineBrand"
                  value={caseData.vehicleDetails?.engineBrand}
                  onChange={(e) => onUpdate({ engineBrand: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="engineNumber">Motor Numero</Label>
                <Input
                  id="engineNumber"
                  value={caseData.vehicleDetails?.engineNumber}
                  onChange={(e) => onUpdate({ engineNumber: e.target.value })}
                />
              </div>
            </div>
          </div>
        );
      case 'property':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyRegistration">Matricula</Label>
                <Input
                  id="propertyRegistration"
                  value={caseData.propertyDetails?.propertyRegistration}
                  onChange={(e) =>
                    onUpdate({ propertyRegistration: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="percentage">Porcentaje</Label>
                <Input
                  id="percentage"
                  type="number"
                  min="0"
                  max="100"
                  value={caseData.propertyDetails?.percentage}
                  onChange={(e) =>
                    onUpdate({ percentage: parseInt(e.target.value) })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Direccion</Label>
              <Input
                id="address"
                value={caseData.propertyDetails?.address}
                onChange={(e) => onUpdate({ address: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripcion</Label>
              <Textarea
                id="description"
                value={caseData.propertyDetails?.description}
                onChange={(e) => onUpdate({ description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="aps">Preventiva</Label>
                <Input
                  id="aps"
                  value={caseData.propertyDetails?.aps?.toISOString()}
                  // onChange={(e) => onUpdate({ aps: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apsExpiresAt">
                  Fecha Vencimiento Preventiva
                </Label>
                <Input
                  id="apsExpiresAt"
                  type="date"
                  value={caseData.propertyDetails?.apsExpiresAt?.toISOString()}
                  // onChange={(e) => onUpdate({ apsExpiresAt: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountDgr">Numero de Cuenta</Label>
                <Input
                  id="accountDgr"
                  value={caseData.propertyDetails?.accountDgr}
                  onChange={(e) => onUpdate({ accountDgr: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomenclature">Nomenclatura</Label>
                <Input
                  id="nomenclature"
                  value={caseData.propertyDetails?.nomenclature}
                  onChange={(e) => onUpdate({ nomenclature: e.target.value })}
                />
              </div>
            </div>
          </div>
        );
      case 'appraisal':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="itemsToAppraise">Inmueble a Tasar</Label>
              <Textarea
                id="itemsToAppraise"
                value={caseData.appraisalDetails?.itemsToAppraise.join('\n')}
                onChange={(e) =>
                  onUpdate({ itemsToAppraise: e.target.value.split('\n') })
                }
                rows={4}
                placeholder="Enter each item on a new line"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripcion</Label>
              <Textarea
                id="description"
                value={caseData.appraisalDetails?.description}
                onChange={(e) => onUpdate({ description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Base Information</h2>
        <div className="space-y-4">
          {isEditing ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="record">Numero de expediente</Label>
                <Input
                  id="record"
                  value={caseData.record}
                  onChange={(e) => onUpdate({ record: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="court">Juzgado</Label>
                <Input
                  id="court"
                  value={caseData.court}
                  onChange={(e) => onUpdate({ court: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="court">Actor</Label>
                <Input
                  id="plaintiff"
                  value={caseData.plaintiff}
                  onChange={(e) => onUpdate({ plaintiff: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="court">Demandado</Label>
                <Input
                  id="defendant"
                  value={caseData.defendant}
                  onChange={(e) => onUpdate({ defendant: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="court">Tipo de ejecucion</Label>
                <Input
                  id="type"
                  value={caseData.type}
                  onChange={(e) => onUpdate({ type: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select
                  value={caseData.status}
                  onValueChange={(value: CaseStatus) =>
                    onUpdate({ status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="paralyzed">Paralizado</SelectItem>
                    <SelectItem value="closed">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Juicio</Label>
                <Select
                  value={caseData.caseType}
                  disabled
                  onValueChange={(value: CaseType) =>
                    onUpdate({ caseType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vehicle">Rodado</SelectItem>
                    <SelectItem value="property">Inmueble</SelectItem>
                    <SelectItem value="appraisal">Tasacion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="debt">Deuda</Label>
                <Input
                  id="debt"
                  type="number"
                  value={caseData.debt}
                  onChange={(e) =>
                    onUpdate({ debt: parseFloat(e.target.value) })
                  }
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>Record: {caseData.record}</span>
              </div>
              <div className="flex items-center gap-2">
                <Gavel className="h-4 w-4 text-muted-foreground" />
                <span>Type: {caseData.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>Debt: ${caseData.debt.toLocaleString()}</span>
              </div>
            </>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Case Details</h2>
        {renderDynamicFields()}
      </Card>
    </div>
  );
}
