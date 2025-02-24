import { create } from 'zustand';

type DashboardMenuStore = {
  activePage: string;
  setActivePage: (page: string) => void;
};

export const useDashboardMenuStore = create<DashboardMenuStore>()((set) => ({
  activePage: 'cases',
  setActivePage: (page) => set({ activePage: page }),
}));
