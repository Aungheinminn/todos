export type TransactionType = {
  _id?: string;
  wallet_id: string;
  transaction: string | number;
  user_id: string;
  category: string;
  note: string;
  created_at: string | Date;
};
