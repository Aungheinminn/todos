import { BudgetType } from "./types/budget.type";

export const createBudget = async (data: BudgetType) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/budgets/wallet/${data.wallet_id}`,
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
  } catch (e) {
    console.error(e);
  }
};

export const getBudgetTransactions = async ({
  wallet_id,
  startDate,
  endDate,
}: {
  wallet_id: string;
  startDate: string | Date;
  endDate: string | Date;
}) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/budgets/wallet/${wallet_id}/transactions?startDate=${startDate}&endDate=${endDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getActiveBudgets = async (wallet_id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/budgets/wallet/${wallet_id}/active`,
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
