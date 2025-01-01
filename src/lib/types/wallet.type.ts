export type WalletType = {
  _id?: string;
  wallet_name: string;
  user_id: string;
  currency: string;
  balance: string | number;
  current?: boolean;
};
