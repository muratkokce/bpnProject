import { create } from 'zustand';

import type { ChildrenData, ChildrenState } from '@/features/family/types/children.types';

export const useChildrenStore = create<ChildrenState>((set) => ({
  data: null,
  isLoading: false,
  error: null,
  setData: (data: ChildrenData) => set({ data, error: null }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: Error | null) => set({ error }),
  reset: () => set({ data: null, isLoading: false, error: null }),
}));
