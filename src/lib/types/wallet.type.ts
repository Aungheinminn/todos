export type SharedWalletUserType = {
  username: string;
  email: string;
  icon: string;
};

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

export type SharedWalletType = Omit<WalletType, "shared_user_ids"> & {
  shared_user_ids: SharedWalletUserType[];
};

export type WalletWithUserInfoType = Omit<WalletType, "user_id"> & {
  user: {
    username: string;
    email: string;
    _id: string;
  };
};
