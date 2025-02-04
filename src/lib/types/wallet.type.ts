export type WalletType = {
  _id?: string;
  wallet_name: string;
  user_id: string;
  createdAt?: Date;
  currency: string;
  balance: string | number;
  current?: boolean;
};
