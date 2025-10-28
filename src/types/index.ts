export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface Bill {
  id: string;
  name: string;
  category: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue';
  recurring: boolean;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  pendingBills: number;
}
