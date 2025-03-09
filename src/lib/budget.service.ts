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
  category,
  startDate,
  endDate,
  limit = 5,
}: {
  wallet_id: string;
  category: string;
  startDate: string | Date;
  endDate: string | Date;
  limit: number;
}) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/budgets/wallet/${wallet_id}/get-transactions-by-timeRange?category=${encodeURIComponent(category)}&startDate=${startDate}&endDate=${endDate}&limit=${limit}`,
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

export const getTopUsageBudgetTransactions = async ({
  wallet_id,
  category,
  startDate,
  endDate,
}: {
  wallet_id: string;
  category: string;
  startDate: string | Date;
  endDate: string | Date;
}) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/budgets/wallet/${wallet_id}/get-top-usage-transactions-by-timeRange?category=${encodeURIComponent(category)}&startDate=${startDate}&endDate=${endDate}`,
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

export const deleteBudget = async ({
  id,
  wallet_id,
}: {
  id: string;
  wallet_id: string;
}) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/budgets/wallet/${wallet_id}/budget/${id}`,
      {
        method: "DELETE",
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

export const updateBudget = async (data: BudgetType) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/budgets/wallet/${data.wallet_id}/budget/${data._id}`,
      {
        method: "PUT",
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

export const endBudget = async ({
  id,
  wallet_id,
}: {
  id: string;
  wallet_id: string;
}) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/budgets/wallet/${wallet_id}/budget/${id}/end-budget`,
      {
        method: "PUT",
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

export const getBudget = async ({
  id,
  wallet_id,
}: {
  id: string;
  wallet_id: string;
}) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/protected/budgets/wallet/${wallet_id}/budget/${id}`,
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
