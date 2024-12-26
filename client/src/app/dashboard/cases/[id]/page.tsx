import BackButton from '@/components/dashboard/back-button';
import CaseDetail from '@/components/dashboard/cases/case-detail';
import { cases } from '@/lib/data/cases';

export function generateStaticParams() {
  return cases.map((case_) => ({
    id: case_.id,
  }));
}

interface CasePageProps {
  params: { id: string };
}

export default async function CasePage({ params }: CasePageProps) {
  // warning error fix - params should be awaited
  const { id } = await params;

  const caseData = cases.find((case_) => case_.id === id);
  if (!caseData) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-4xl">
          <BackButton />
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <h2 className="font-semibold text-red-800">Case Not Found</h2>
            <p className="text-red-600">
              The requested case could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        <BackButton />
        <CaseDetail caseData={caseData} />
      </div>
    </div>
  );
}
