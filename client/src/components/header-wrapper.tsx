'use client';

import { usePathname } from 'next/navigation';
import Header from './header';

export default function HeaderWrapper() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  if (isDashboard) {
    return null;
  }

  return <Header />;
}
