'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardHeader() {
  const router = useRouter();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {/* <Gavel className="h-8 w-8 text-primary" /> */}
            <span className="ml-2 text-xl font-bold text-primary">
              Welcome back Gonzalo
            </span>
          </div>

          <Button
            variant="ghost"
            onClick={() => router.push('/login')}
            className="text-gray-600 hover:text-gray-900"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}
