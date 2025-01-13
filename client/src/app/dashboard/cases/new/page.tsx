import NewCaseForm from '@/components/dashboard/cases/new-case-form';
import { Card } from '@/components/ui/card';

import BackButton from '@/components/dashboard/back-button';

export default function NewCasePage() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        <BackButton />
        <Card className="p-6">
          <h1 className="mb-6 text-2xl font-bold">Crear Nuevo Caso</h1>
          <NewCaseForm />
        </Card>
      </div>
    </div>
  );
}
