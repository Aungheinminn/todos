import { create } from "zustand";

interface WalletPopupStore {
  isOpen: boolean;
  type: string;
  walletDatas: {
    _id?: string;
    wallet_name: string;
    user_id: string;
    createdAt?: Date;
    currency: string;
    balance: number;
    current: boolean;
    process: (data: any) => void;
  };
  setType: (data: string) => void;
  setWalletDatas: (data: any) => void;
  resetWalletDatas: () => void;
  setIsOpen: (data: boolean) => void;
}

export const useWalletPopupStore = create<WalletPopupStore>((set) => ({
  isOpen: false,
  type: "",
  walletDatas: {
    _id: "",
    wallet_name: "",
    user_id: "",
    createdAt: new Date(),
    currency: "",
    balance: 0,
    current: false,
    process: (data: any) => {},
  },
  setType: (data: string) => set({ type: data }),
  setWalletDatas: (data: any) => set({ walletDatas: data }),
  resetWalletDatas: () =>
    set({
      walletDatas: {
        _id: "",
        wallet_name: "",
        user_id: "",
        createdAt: new Date(),
        currency: "",
        balance: 0,
        current: false,
        process: (data: any) => {},
      },
      type: "",
    }),
  setIsOpen: (data: boolean) => set({ isOpen: data }),
}));
