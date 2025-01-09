import { TransactionType } from "./types/transaction.type";

export const getTransactionsByWallet = async (wallet_id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/transactions/wallet/${wallet_id}`,
    );
    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const postTransactionByWallet = async (data: TransactionType) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/transactions/wallet/${data.wallet_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const res = await response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};
