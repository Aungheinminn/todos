export type BudgetType = {
  _id?: string;
  user_id: string;
  wallet_id: string;
  budget: number;
  category: string;
  start_date?: string;
  end_date?: string;
  status?: string;
  createdAt?: string;
};
