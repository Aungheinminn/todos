import { WalletType } from "@/lib/types/wallet.type";

export const createSharedWallet = async (data: WalletType) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/shared-wallets/user/${data.user_id}`,
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

export const getSharedWallets = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/shared-wallets/user/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  } catch (e) {
    console.error(e);
  }
}
