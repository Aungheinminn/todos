import { create } from "zustand";

type BudgetPopupStore = {
  isOpen: boolean;
  type: string;
  budgetDatas: {
    id?: string;
    user_id: string;
    wallet: {
      id: string;
      wallet_name: string;
    };
    budget: string;
    category: {
      id: number;
      name: string;
      icon: string;
    };
    start_date: Date | string;
    end_date: Date | string;
    created_at?: Date;
    process: any;
  };
  setIsOpen: (data: boolean) => void;
  setType: (data: string) => void;
  setBudgetDatas: (data: any) => void;
  resetBudgetDatas: () => void;
};

export const useBudgetPopupStore = create<BudgetPopupStore>((set) => ({
  isOpen: false,
  type: "",
  budgetDatas: {
    id: "",
    user_id: "",
    wallet: {
      id: "",
      wallet_name: "",
    },
    budget: "",
    category: {
      id: 0,
      name: "",
      icon: "",
    },
    start_date: "",
    end_date: "",
    created_at: new Date(),
    process: () => {},
  },
  setIsOpen: (data: boolean) => set({ isOpen: data }),
  setType: (data: string) => set({ type: data }),
  setBudgetDatas: (data: any) => set({ budgetDatas: data }),
  resetBudgetDatas: () =>
    set({
      budgetDatas: {
        id: "",
        user_id: "",
        wallet: {
          id: "",
          wallet_name: "",
        },
        budget: "",
        category: {
          id: 0,
          name: "",
          icon: "",
        },
        start_date: "",
        end_date: "",
        created_at: new Date(),
        process: () => {},
      },
    }),
}));
