import { create } from 'zustand';

import type { FamilyLimitAuthorityResponse, FamilyLimitAuthorityState } from '@/features/family/types/limitAuthority.types';

interface ExtendedState extends FamilyLimitAuthorityState {
  updateTabPermissions: (childId: string, tabId: string, masterEnabled: boolean, permissions: Record<string, boolean>) => void;
}

export const useFamilyLimitAuthorityStore = create<ExtendedState>((set, get) => ({
  data: null,
  isLoading: false,
  error: null,
  setData: (data: FamilyLimitAuthorityResponse) => set({ data, error: null }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: Error | null) => set({ error }),
  reset: () => set({ data: null, isLoading: false, error: null }),
  updateTabPermissions: (childId: string, tabId: string, masterEnabled: boolean, permissions: Record<string, boolean>) => {
    const currentData = get().data;
    if (!currentData) return;

    const updatedData = {
      ...currentData,
      permissionsByChild: {
        ...currentData.permissionsByChild,
        [childId]: {
          ...currentData.permissionsByChild[childId],
          tabs: currentData.permissionsByChild[childId].tabs.map((tab) => {
            if (tab.tabId === tabId) {
              return {
                ...tab,
                masterToggle: {
                  ...tab.masterToggle,
                  isEnabled: masterEnabled,
                },
                permissions: tab.permissions.map((perm) => ({
                  ...perm,
                  isEnabled: permissions[perm.id] ?? perm.isEnabled,
                })),
              };
            }
            return tab;
          }),
        },
      },
    };

    set({ data: updatedData });
  },
}));
