import CaseDetail from '@/components/dashboard/cases/case-detail';
import { cases } from '@/lib/data/cases';
// import type { Case } from '@/types/case';

export function generateStaticParams() {
  return cases.map((case_) => ({
    id: case_.id,
  }));
}

export default function CasePage({ params }: { params: { id: string } }) {
  const caseData = cases.find((case_) => case_.id === params.id);

  if (!caseData) {
    return <div>Case not found</div>;
  }

  return (
    <div className="mt-16 p-6">
      <CaseDetail caseData={caseData} />
    </div>
  );
}
