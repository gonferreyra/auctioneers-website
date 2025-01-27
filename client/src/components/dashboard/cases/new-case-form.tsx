'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
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
import { toast } from 'sonner';
import { useForm, Controller } from 'react-hook-form';
import { createCaseSchema, TCreateCaseSchema } from '@/validations/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createNewCase } from '@/lib/api';
import { useEffect } from 'react';
import { transformData } from '@/lib/utils';

export default function NewCaseForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TCreateCaseSchema>({
    resolver: zodResolver(createCaseSchema),
    defaultValues: {
      caseType: 'vehicle',
      status: 'active',
      specificData: {},
    },
  });

  // Observe changes on caseType
  const caseType = watch('caseType');

  useEffect(() => {
    const specificDefaults = {
      vehicle: {
        licensePlate: '',
        year: 1950,
        brand: '',
        model: '',
        chassisBrand: '',
        chassisNumber: '',
        engineBrand: '',
        engineNumber: '',
      },
      property: {
        propertyRegistration: '',
        percentage: 100,
        address: '',
        description: '',
        accountDgr: '',
        nomenclature: '',
      },
      appraisal: {
        itemToAppraise: '',
        description: '',
      },
    };

    reset({
      caseType,
      specificData: specificDefaults[caseType] || {},
    });
  }, [caseType, reset]);

  const { mutate: createCase } = useMutation({
    mutationFn: createNewCase,
    onSuccess: () => {
      toast.success('Caso creado correctamente');
      router.push('/dashboard');
    },
    // server errors
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // client side validation errors - client errors
  const onError = () => {
    (Object.keys(errors) as Array<keyof TCreateCaseSchema>).forEach((key) => {
      const error = errors[key];
      if (error) {
        toast.error(error.message || 'Hubo un error');
      }
    });
  };

  const onSubmit = async () => {
    const transformedData = transformData(getValues());
    const year = getValues('specificData.year');
    setValue('specificData.year', Number(year));
    // console.log(transformedData);
    createCase(transformedData);
  };

  const renderDynamicFields = () => {
    switch (caseType) {
      case 'vehicle':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="licensePlate">Dominio *</Label>
                <Input
                  {...register('specificData.licensePlate')}
                  id="licensePlate"
                  required
                />
              </div>
              <div>
                <Label htmlFor="year">Año</Label>
                <Input
                  {...register('specificData.year')}
                  id="year"
                  type="number"
                  min={1950}
                  max={new Date().getFullYear() + 1}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brand">Marca *</Label>
                <Input
                  {...register('specificData.brand')}
                  id="brand"
                  required
                />
              </div>
              <div>
                <Label htmlFor="model">Modelo *</Label>
                <Input
                  {...register('specificData.model')}
                  id="model"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="chassisBrand">Chasis Marca</Label>
                <Input
                  {...register('specificData.chassisBrand')}
                  id="chassisBrand"
                />
              </div>
              <div>
                <Label htmlFor="chasisNumber">Chasis Numero</Label>
                <Input
                  {...register('specificData.chassisNumber')}
                  id="chassisNumber"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="engineBrand">Motor Marca</Label>
                <Input
                  {...register('specificData.engineBrand')}
                  id="engineBrand"
                  name="engineBrand"
                />
              </div>
              <div>
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
              <div>
                <Label htmlFor="propertyRegistration">Matricula *</Label>
                <Input
                  {...register('specificData.propertyRegistration')}
                  id="propertyRegistration"
                  required
                />
              </div>
              <div>
                <Label htmlFor="percentage">Porcentaje</Label>
                <Input
                  {...register('specificData.percentage')}
                  id="percentage"
                  type="number"
                  min={0}
                  max={100}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Dirección *</Label>
              <Input {...register('specificData.address')} id="address" />
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                {...register('specificData.description')}
                id="description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="accountDgr">Numero de Cuenta</Label>
                <Input
                  {...register('specificData.accountDgr')}
                  id="accountDgr"
                  name="accountDgr"
                />
              </div>
              <div>
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
            <div>
              <Label htmlFor="itemsToAppraise">Items a Tasar *</Label>
              <Textarea
                {...register('specificData.itemToAppraise')}
                id="itemToAppraise"
                placeholder="Enter each item on a new line"
                rows={4}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>
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
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <Label htmlFor="record">Numero de Expediente *</Label>
            <Input {...register('record')} id="record" name="record" required />
          </div>

          <div>
            <Label htmlFor="plaintiff">Actor *</Label>
            <Input {...register('plaintiff')} id="plaintiff" required />
          </div>

          <div>
            <Label htmlFor="defendant">Demandado *</Label>
            <Input {...register('defendant')} id="defendant" required />
          </div>

          <div>
            <Label htmlFor="type">Tipo de Ejecución *</Label>
            <Input {...register('type')} id="type" name="type" required />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="court">Juzgado *</Label>
            <Input {...register('court')} id="court" required />
          </div>

          <div>
            <Label htmlFor="lawOffice">Estudio de Abogados</Label>
            <Input {...register('lawOffice')} id="lawOffice" />
          </div>

          <div>
            <Label htmlFor="debt">Deuda</Label>
            <Input
              {...register('debt', { setValueAs: Number })}
              id="debt"
              type="number"
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paralyzed">Paralyzed</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label htmlFor="caseType">Tipo de Juicio</Label>
            <Controller
              name="caseType"
              control={control}
              render={({ field }) => (
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select case type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vehicle">Rodado</SelectItem>
                    <SelectItem value="property">Inmueble</SelectItem>
                    <SelectItem value="appraisal">Tasación</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h2 className="mb-4 text-lg font-semibold">Detalles Adicionales</h2>
        {renderDynamicFields()}
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Create Case
        </Button>
      </div>
    </form>
  );
}
