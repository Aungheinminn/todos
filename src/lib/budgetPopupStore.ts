import { create } from "zustand";

type BudgetPopupStore = {
  isOpen: boolean;
  type: string;
  budgetDatas: {
    name: string;
    user_id: string;
    wallet_id: string;
    budget: string;
  };
};

export const useBudgetPopupStore = create<BudgetPopupStore>((set) => ({

}));
