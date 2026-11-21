export enum CardType {
  PREPAID_YOUTH = 'PREPAID_YOUTH',
  PREPAID_STANDARD = 'PREPAID_STANDARD',
  CREDIT = 'CREDIT',
}

export enum CardStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
  EXPIRED = 'EXPIRED',
}

export interface Card {
  cardId: string;
  maskedCardNumber: string;
  cardType: CardType | string;
  cardStatus: CardStatus | string;
  dailyLimit: number;
}

export enum ChildStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  BLOCKED = 'BLOCKED',
}

export interface Account {
  accountNumber: string;
  iban: string;
  branchName: string;
  currency: string;
  balance: number;
  formattedBalance: string;
  availableBalance: number;
  blockedAmount: number;
  card: Card;
}

export interface Child {
  id: string;
  fullName: string;
  maskedIdentityNumber: string;
  birthDate: string;
  age: number;
  avatarUrl: string;
  status: ChildStatus | string;
  addedAt: string;
  account?: Account;
}

export interface AvailableChild extends Child {
  verificationScenario: string;
  expectedModal: {
    type: string;
    title: string;
    message: string;
    primaryButtonText: string;
    secondaryButtonText?: string;
    errorCode?: string;
  };
}

export interface ParentInfo {
  parentId: string;
  fullName: string;
  hasActiveContract: boolean;
  maxAllowedChildren: number;
}

export interface ChildrenData {
  parentInfo: ParentInfo;
  registeredChildren: Child[];
  availableToAddChildren: AvailableChild[];
}

export interface ChildrenState {
  data: ChildrenData | null;
  isLoading: boolean;
  error: Error | null;
  setData: (data: ChildrenData) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}
