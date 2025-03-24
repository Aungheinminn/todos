import { TransactionType } from "@/lib/types/transaction.type";

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

export const getTransactionById = async (
  wallet_id: string,
  transaction_id: string,
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/transactions/wallet/${wallet_id}/transaction/${transaction_id}`,
    );
    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTransactionsByDate = async (
  wallet_id: string,
  month: number,
  year: number,
  limit: number = 5,
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/transactions/wallet/${wallet_id}/by-transaction-date/?limit=${limit}&transaction_month=${month}&transaction_year=${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createTransaction = async (data: TransactionType) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/transactions/wallet/${data.wallet_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const res = await response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const duplicateTransaction = async (data: TransactionType) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/transactions/wallet/${data.wallet_id}/duplicate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const res = await response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const updateTransaction = async (data: TransactionType) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/transactions/wallet/${data.wallet_id}/transaction/${data._id}`,
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
  } catch (error) {
    console.error(error);
  }
};

export const deleteTransaction = async (data: TransactionType) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/transactions/wallet/${data.wallet_id}/transaction/${data._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const res = await response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};
