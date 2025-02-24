import DashboardHeader from '@/components/dashboard/dashboard-header';
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardSidebar />
      <div className="flex flex-col">
        <DashboardHeader />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
