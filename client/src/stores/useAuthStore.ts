import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
  id: number;
  email: string;
  verified: boolean;
};

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'userAuth',
      partialize: (state) => ({
        user: state.user,
        storage:
          typeof window !== 'undefined' ? window.localStorage : undefined,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
