export type SharedWalletRequestType = {
  _id?: string;
  status: string;
  wallet_id: string;
  inviter_id: string;
  invitee_id: string;
  created_at?: string;
};

export type SharedWalletRequestResponseType = {
  _id?: string;
  status: string;
  wallet_data: {
    _id: string;
    wallet_name: string;
  };
  inviter_data: {
    _id: string;
    username: string;
    email: string;
  };
  invitee_data: {
    _id: string;
    username: string;
    email: string;
  };
  created_at?: string;
};
