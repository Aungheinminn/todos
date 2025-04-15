import { WalletType } from "@/lib/types/wallet.type";

export const createSharedWallet = async (data: WalletType) => {
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
