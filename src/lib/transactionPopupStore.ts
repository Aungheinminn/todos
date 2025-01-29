import { create } from "zustand";

interface TransactionPopupStore {
  isOpen: boolean;
  type: string;
  transactionDatas: {
    _id?: string;
    amount: number;
    category: {
      id: number;
      name: string;
      icon: string;
    };
    note: string;
    date: Date;
    wallet: {
      id: string;
      wallet_name: string;
    };
    process: any;
  };
  setType: (data: string) => void;
  setTransactionDatas: (data: any) => void;
  resetTransactionDatas: () => void;
  setIsOpen: (data: boolean) => void;
  openPopup: () => void;
  closePopup: () => void;
}

export const useTransactionPopupStore = create<TransactionPopupStore>(
  (set) => ({
    isOpen: false,
    type: "",
    transactionDatas: {
      _id: "",
      amount: 0,
      category: {
        id: 0,
        name: "",
        icon: "",
      },
      note: "",
      date: new Date(),
      wallet: {
        id: "",
        wallet_name: "",
      },
      process: (data: any) => {},
    },
    setType: (data: string) => set({ type: data }),
    setTransactionDatas: (data: any) => set({ transactionDatas: data }),
    resetTransactionDatas: () =>
      set({
        transactionDatas: {
          _id: "",
          amount: 0,
          category: {
            id: 0,
            name: "",
            icon: "",
          },
          note: "",
          date: new Date(),
          wallet: {
            id: "",
            wallet_name: "",
          },
          process: (data: any) => {},
        },
        type: "",
      }),
    setIsOpen: (data: boolean) => set({ isOpen: data }),
    openPopup: () => set({ isOpen: true }),
    closePopup: () => set({ isOpen: false }),
  }),
);
