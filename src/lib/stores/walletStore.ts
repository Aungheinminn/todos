import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WalletType } from "../types/wallet.type";

interface WalletStore {
  currentWallet: WalletType | null;
  updateCurrentWallet: (currentWallet: WalletType) => void;
  reset: () => void;
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set) => ({
      currentWallet: null,
      updateCurrentWallet: (currentWallet) => set({ currentWallet }),
      reset: () => {
        set({ currentWallet: null });
      },
    }),
    {
      name: "current-wallet-storage",
      partialize: (state) => ({
        currentWallet: state.currentWallet,
      }),
    },
  ),
);
