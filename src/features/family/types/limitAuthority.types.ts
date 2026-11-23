export interface Permission {
  id: string;
  title: string;
  description: string;
  isEnabled: boolean;
  dependsOn?: string;
  requiresConfirmationOnEnable?: boolean;
  confirmationWarning?: string;
}

export interface MasterToggle {
  id: string;
  title: string;
  description: string;
  isEnabled: boolean;
}

export interface CardSummary {
  cardId: string;
  cardName: string;
  maskedNumber: string;
  badge: string;
}

export interface Tab {
  tabId: string;
  tabTitle: string;
  masterToggle: MasterToggle;
  permissions: Permission[];
  cardSummary?: CardSummary;
}

export interface Notifications {
  saveSuccessToast: {
    type: string;
    title: string;
    message: string;
  };
  saveConfirmationModal: {
    title: string;
    description: string;
    confirmButtonText: string;
    cancelButtonText: string;
  };
}

export interface LimitAuthorityData {
  childId: string;
  lastUpdatedAt: string;
  tabs: Tab[];
  notifications: Notifications;
}

export interface FamilyLimitAuthorityResponse {
  permissionsByChild: {
    [childId: string]: LimitAuthorityData;
  };
}

export interface FamilyLimitAuthorityState {
  data: FamilyLimitAuthorityResponse | null;
  isLoading: boolean;
  error: Error | null;
  setData: (data: FamilyLimitAuthorityResponse) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}
