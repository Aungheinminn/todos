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
