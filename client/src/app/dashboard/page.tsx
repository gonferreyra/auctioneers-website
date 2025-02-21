'use client';

import { Card } from '@/components/ui/card';
import DashboardCalendar from '@/components/dashboard/dashboard-calendar';
import CaseSearch from '@/components/dashboard/cases/case-search';
import AuctionSearch from '@/components/dashboard/auctions/auction-search';
import NewCaseForm from '@/components/dashboard/cases/new-case-form';
import NewAuctionForm from '@/components/dashboard/auctions/new-auction-form';
import { useDashboardMenuStore } from '@/stores/useDashboardMenuStore';
import { useAuth } from '@/lib/hooks';
import Loading from './loading';

export default function DashboardPage() {
  const { isLoading } = useAuth();
  const activePage = useDashboardMenuStore((state) => state.activePage);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="">
        {activePage === 'calendar' ? (
          <Card className="p-6">
            <DashboardCalendar />
          </Card>
        ) : activePage === 'cases' ? (
          <Card className="p-6">
            <CaseSearch />
          </Card>
        ) : activePage === 'new-case' ? (
          <div className="mx-auto">
            <Card className="p-6">
              <h1 className="mb-6 text-2xl font-bold">Crear Nuevo Caso</h1>
              <NewCaseForm />
            </Card>
          </div>
        ) : activePage === 'new-auction' ? (
          <div className="mx-auto">
            <Card className="p-6">
              <h1 className="mb-6 text-2xl font-bold">Crear Nueva Subasta</h1>
              <NewAuctionForm />
            </Card>
          </div>
        ) : (
          activePage === 'auctions' && (
            <Card className="p-6">
              <AuctionSearch />
            </Card>
          )
        )}
      </div>
    </main>
  );
}
