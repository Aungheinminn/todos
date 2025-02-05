import { create } from "zustand";

interface WalletPopupStore {
  isOpen: boolean;
  type: string;
  walletDatas: {
    _id?: string;
    wallet_name: string;
    user_id: string;
    created_at?: Date;
    currency: string;
    balance: number;
    current: boolean;
    process: any;
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
    created_at: new Date(),
    currency: "MMK",
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
        created_at: new Date(),
        currency: "",
        balance: 0,
        current: false,
        process: (data: any) => {},
      },
      type: "",
    }),
  setIsOpen: (data: boolean) => set({ isOpen: data }),
}));
