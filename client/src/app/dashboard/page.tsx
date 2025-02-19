'use client';

import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/dashboard/dashboard-header';
import DashboardCalendar from '@/components/dashboard/dashboard-calendar';
import CaseSearch from '@/components/dashboard/cases/case-search';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gavel, Plus } from 'lucide-react';
import { useState } from 'react';
import AuctionSearch from '@/components/dashboard/auctions/auction-search';
import { useAuth } from '@/lib/hooks';
import Loading from './loading';

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('cases');
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex flex-col justify-between sm:flex-row sm:items-center">
            <Tabs
              defaultValue="calendar"
              className="flex-1"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList>
                <TabsTrigger value="calendar">Calendario</TabsTrigger>
                <TabsTrigger value="cases">Causas</TabsTrigger>
                <TabsTrigger value="auctions">Subastas</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex gap-2">
              <Button onClick={() => router.push('/dashboard/cases/new')}>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Caso
              </Button>
              <Button onClick={() => router.push('/dashboard/auctions/new')}>
                <Gavel className="mr-2 h-4 w-4" />
                Nueva Subasta
              </Button>
            </div>
          </div>

          <div className="mt-4">
            {activeTab === 'calendar' ? (
              <Card className="p-6">
                <DashboardCalendar />
              </Card>
            ) : activeTab === 'cases' ? (
              <Card className="p-6">
                <CaseSearch />
              </Card>
            ) : (
              <Card className="p-6">
                <AuctionSearch />
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
