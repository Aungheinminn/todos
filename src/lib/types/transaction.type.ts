export type TransactionType = {
  _id?: string;
  wallet_id: string;
  transaction: string | number;
  user_id: string;
  category: string;
  note: string;
  transaction_day: number;
  transaction_month: number;
  transaction_year: number;
};
