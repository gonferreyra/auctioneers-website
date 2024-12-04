'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import NewCaseForm from '@/components/dashboard/cases/new-case-form';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function NewCasePage() {
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="p-6">
          <h1 className="mb-6 text-2xl font-bold">Create New Case</h1>
          <NewCaseForm />
        </Card>
      </div>
    </div>
  );
}
