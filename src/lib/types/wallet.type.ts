export type WalletType = {
  _id?: string;
  wallet_name: string;
  user_id: string;
  created_at?: Date;
  currency: string;
  balance: string | number;
  current?: boolean;
  shared_user_ids?: string[];
};
