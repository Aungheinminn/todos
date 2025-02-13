export type BudgetType = {
  _id?: string;
  name: string;
  user_id: string;
  wallet_id: string;
  budget: number;
  category: string;
  range: string;
  start_date?: string;
  end_date?: string;
  createdAt?: string;
};
