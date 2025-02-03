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
import type { Case } from '@/types/case';
import { Controller, UseFormReturn } from 'react-hook-form';
import { useEffect } from 'react';
import moment from 'moment';

interface CaseInfoProps {
  caseData: Case;
  isEditing: boolean;
  methods: UseFormReturn<Case>;
}

export default function CaseInfo({
  caseData,
  isEditing,
  methods,
}: CaseInfoProps) {
  const { register, control, setValue } = methods;

  useEffect(() => {
    if (caseData && caseData.caseType === 'property' && caseData.specificData) {
      if (caseData.specificData.aps) {
        const formattedDate = moment
          .utc(caseData.specificData.aps)
          .format('YYYY-MM-DD');
        setValue('specificData.aps', formattedDate);
      }
      if (caseData.specificData.apsExpiresAt) {
        const formattedDate = moment
          .utc(caseData.specificData.apsExpiresAt)
          .format('YYYY-MM-DD');
        setValue('specificData.apsExpiresAt', formattedDate);
      }
    }
  }, [caseData, setValue]);

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
                    {caseData.specificData?.licensePlate}
                  </p>
                </div>
                <div>
                  <Label>Marca y Modelo</Label>
                  <p className="text-gray-600">
                    {caseData.specificData?.brand}{' '}
                    {caseData.specificData?.model}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Chasis</Label>
                  <p className="text-gray-600">
                    {caseData.specificData?.chassisBrand} -{' '}
                    {caseData.specificData?.chassisNumber}
                  </p>
                </div>
                <div>
                  <Label>Motor</Label>
                  <p className="text-gray-600">
                    {caseData.specificData?.engineBrand} -{' '}
                    {caseData.specificData?.engineNumber}
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
                    {caseData?.specificData?.propertyRegistration}
                  </p>
                </div>
                <div>
                  <Label>Porcentaje</Label>
                  <p className="text-gray-600">
                    {caseData.specificData?.percentage}%
                  </p>
                </div>
              </div>
              <div>
                <Label>Direccion</Label>
                <p className="text-gray-600">
                  {caseData.specificData?.address}
                </p>
              </div>
              <div>
                <Label>Preventiva</Label>
                <p className="text-gray-600">
                  {caseData.specificData?.aps
                    ? moment
                        .utc(caseData.specificData?.aps)
                        .format('DD-MM-YYYY')
                    : 'No se encuentra cargada fecha de preventiva de subasta'}{' '}
                  {caseData.specificData?.apsExpiresAt && (
                    <span className="text-gray-600">
                      (Expires:{' '}
                      {moment
                        .utc(caseData.specificData?.apsExpiresAt)
                        .format('DD-MM-YYYY') || 'N/A'}
                      )
                    </span>
                  )}
                </p>
              </div>
              <div>
                <Label>Numero de Cuenta</Label>
                <p className="text-gray-600">
                  {caseData.specificData?.accountDgr}
                </p>
              </div>
              <div>
                <Label>Nomenclatura</Label>
                <p className="text-gray-600">
                  {caseData.specificData?.nomenclature}
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
                  {caseData.specificData?.itemToAppraise}
                </ul>
              </div>
              <div>
                <Label>Descripcion</Label>
                <p className="text-gray-600">
                  {caseData.specificData?.description}
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
                  {...register('specificData.licensePlate')}
                  id="licensePlate"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Año</Label>
                <Input
                  {...register('specificData.year')}
                  id="year"
                  type="number"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Marca</Label>
                <Input {...register('specificData.brand')} id="brand" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Modelo</Label>
                <Input {...register('specificData.model')} id="model" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="chasisBrand">Chasis Marca</Label>
                <Input
                  {...register('specificData.chassisBrand')}
                  id="chassisBrand"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chasisNumber">Chasis Numero</Label>
                <Input
                  {...register('specificData.chassisNumber')}
                  id="chasisNumber"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="engineBrand">Motor Marca</Label>
                <Input
                  {...register('specificData.engineBrand')}
                  id="engineBrand"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="engineNumber">Motor Numero</Label>
                <Input
                  {...register('specificData.engineNumber')}
                  id="engineNumber"
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
                  {...register('specificData.propertyRegistration')}
                  id="propertyRegistration"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="percentage">Porcentaje</Label>
                <Input
                  {...register('specificData.percentage')}
                  id="percentage"
                  type="number"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Direccion</Label>
              <Input {...register('specificData.address')} id="address" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripcion</Label>
              <Textarea
                {...register('specificData.description')}
                id="description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="aps">Preventiva</Label>
                <Input
                  {...register('specificData.aps', { valueAsDate: true })}
                  defaultValue={moment(caseData.specificData?.aps).format(
                    'YYYY-MM-DD',
                  )}
                  id="aps"
                  type="date"
                />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="apsExpiresAt">Vencimiento APS</Label>
                <Input
                  {...register('specificData.apsExpiresAt')}
                  id="apsExpiresAt"
                  type="date"
                  disabled
                  // value={caseData.specificData?.apsExpiresAt?.toISOString()}
                />
              </div> */}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountDgr">Numero de Cuenta</Label>
                <Input
                  {...register('specificData.accountDgr')}
                  id="accountDgr"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomenclature">Nomenclatura</Label>
                <Input
                  {...register('specificData.nomenclature')}
                  id="nomenclature"
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
                {...register('specificData.itemToAppraise')}
                id="itemToAppraise"
                rows={4}
                placeholder="Enter each item on a new line"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripcion</Label>
              <Textarea
                {...register('specificData.description')}
                id="description"
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
        <h2 className="mb-4 text-lg font-semibold">Informacion Base</h2>
        <div className="space-y-4">
          {isEditing ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="record">Numero de expediente</Label>
                <Input {...register('record')} id="record" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="court">Juzgado</Label>
                <Input {...register('court')} id="court" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="court">Actor</Label>
                <Input {...register('plaintiff')} id="plaintiff" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="court">Demandado</Label>
                <Input {...register('defendant')} id="defendant" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="court">Tipo de ejecucion</Label>
                <Input {...register('type')} id="type" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Activo</SelectItem>
                        <SelectItem value="paralyzed">Paralizado</SelectItem>
                        <SelectItem value="closed">Baja</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Juicio</Label>
                <Select
                  value={caseData.caseType}
                  disabled
                  // onValueChange={(value: CaseType) =>
                  //   onUpdate({ caseType: value })
                  // }
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
                <Input {...register('debt')} id="debt" type="number" />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>Numero de Expediente: {caseData.record}</span>
              </div>
              <div className="flex items-center gap-2">
                <Gavel className="h-4 w-4 text-muted-foreground" />
                <span>Ejecución: {caseData.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>Deuda: ${caseData.debt.toLocaleString()}</span>
              </div>
            </>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Detalles del Juicio</h2>
        {renderDynamicFields()}
      </Card>
    </div>
  );
}
