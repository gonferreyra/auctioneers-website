import CaseDetail from '@/components/dashboard/cases/case-detail';
import type { Case } from '@/types/case';

// Mock data - Replace with actual API call
const cases: Case[] = [
  {
    id: '1',
    internalNumber: '2024-001',
    recordNumber: '123456/2024',
    title: 'Banco Suquia c/ Daniel Blanco - Ejecucion hipotecaria',
    status: 'active',
    court: 'Juzgado 1ra Instancia y 11 nominacion',
    plaintiff: 'Banco Suquia S.A.',
    defendant: 'Daniel Blanco',
    type: 'Ejecucion hipotecaria',
    filingDate: '2024-01-15',
    movements: [
      {
        id: 'm1',
        date: '2024-01-15',
        description: 'Initial filing',
        type: 'filing',
      },
      {
        id: 'm2',
        date: '2024-02-01',
        description: 'Motion for preliminary hearing filed',
        type: 'motion',
      },
    ],
  },
  {
    id: '2',
    internalNumber: '2024-002',
    recordNumber: '123457/2024',
    title: 'Cooperativa c/ Martinez - Ejecucion prendaria',
    status: 'paralyzed',
    court: 'Juzgado 1ra Instancia y 5 nominacion',
    plaintiff: 'Cooperativa de Credito Ltda.',
    defendant: 'Juan Martinez',
    type: 'Ejecucion prendaria',
    filingDate: '2024-02-01',
    movements: [
      {
        id: 'm1',
        date: '2024-02-01',
        description: 'Initial filing',
        type: 'filing',
      },
    ],
  },
];

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
    <div className="p-6">
      <CaseDetail caseData={caseData} />
    </div>
  );
}
