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

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('calendar');

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center justify-between">
            <Tabs
              defaultValue="calendar"
              className="flex-1"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="cases">Cases</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex gap-2">
              <Button onClick={() => router.push('/dashboard/cases/new')}>
                <Plus className="mr-2 h-4 w-4" />
                New Case
              </Button>
              <Button onClick={() => router.push('/dashboard/auctions/new')}>
                <Gavel className="mr-2 h-4 w-4" />
                New Auction
              </Button>
            </div>
          </div>

          <div className="mt-4">
            {activeTab === 'calendar' ? (
              <Card className="p-6">
                <DashboardCalendar />
              </Card>
            ) : (
              <Card className="p-6">
                <CaseSearch />
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
