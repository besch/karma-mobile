import { create } from 'zustand';

interface AppState {
  user: { id: string; email: string; name?: string } | null;
  setUser: (userData: { id: string; email: string; name?: string } | null) => void;
  dailyKarma: number;
  setDailyKarma: (points: number) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  dailyKarma: 0,
  setDailyKarma: (points) => set({ dailyKarma: points }),
})); 