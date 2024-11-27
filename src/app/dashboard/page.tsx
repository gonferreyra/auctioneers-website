import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardCalendar from '@/components/dashboard/DashboardCalendar';
import CaseSearch from '@/components/dashboard/cases/CaseSearch';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <Tabs defaultValue="calendar" className="space-y-4">
            <TabsList>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="cases">Cases</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar">
              <Card className="p-6">
                <DashboardCalendar />
              </Card>
            </TabsContent>

            <TabsContent value="cases">
              <Card className="p-6">
                <CaseSearch />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
