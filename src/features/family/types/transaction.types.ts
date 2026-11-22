export interface TransactionFilterTab {
  key: string;
  label: string;
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  pendingApprovalCount: number;
  pendingApprovalTotal: number;
  periodLabel: string;
}

export interface Transaction {
  id: string;
  title: string;
  category: string;
  categoryIcon: string;
  type: 'EXPENSE' | 'INCOME';
  status: 'PENDING_APPROVAL' | 'COMPLETED' | string;
  amount: number;
  formattedAmount: string;
  currency: string;
  date: string;
  formattedDate: string;
  channel: string;
  requiresParentAction: boolean;
  approvalNote?: string;
}

export interface EmptyState {
  illustrationKey: string;
  title: string;
  description: string;
  ctaText?: string;
}

export interface FamilyMemberTransactionData {
  childId: string;
  summary: TransactionSummary;
  filterTabs: TransactionFilterTab[];
  items: Transaction[];
  emptyState?: EmptyState;
}

export interface FamilyMemberTransactionsResponse {
  transactionsByChild: {
    [childId: string]: FamilyMemberTransactionData;
  };
}

export interface FamilyMemberTransactionState {
  data: FamilyMemberTransactionsResponse | null;
  isLoading: boolean;
  error: Error | null;
  setData: (data: FamilyMemberTransactionsResponse) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}
