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
