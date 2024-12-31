import { create } from "zustand";

interface WalletStore {
  isOpen: boolean;
  wallet: string;
  setWallet: (wallet: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
  isOpen: false,
  wallet: "",
  setWallet: (wallet) => set({ wallet }),
  setIsOpen: (isOpen) => set({ isOpen }),
}));
