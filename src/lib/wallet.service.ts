import { WalletType } from "./types/wallet.type";

export const createWallet = async (data: WalletType) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/wallets/user/${data.user_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    return response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getWallets = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/wallets/user/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const res = await response.json();
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getWalletById = async (id: string, wallet_id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/wallets/user/${id}/wallet/${wallet_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const res = await response.json();
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getCurrentWallet = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/wallets/user/${id}/current-wallet`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const res = await response.json();
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const updateCurrentWallet = async ({
  wallet_id,
  user_id,
}: {
  wallet_id: string;
  user_id: string;
}) => {
  const response = await fetch(
    `http://localhost:3000/api/protected/wallets/user/${user_id}/make-current-wallet`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wallet_id }),
    },
  );

  const res = await response.json();
  return res;
};

export const updateWallet = async (data: WalletType) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/wallets/user/${data.user_id}/wallet/${data._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const deleteWallet = async ({
  id,
  wallet_id,
}: {
  id: string;
  wallet_id: string;
}) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/wallets/user/${id}/wallet/${wallet_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};
