import { create } from "zustand";
import { UserType } from "../types/user.type";
import { persist } from "zustand/middleware";

interface CurrentUserStore {
  currentUser: UserType | null;
  updateCurrentUser: (current: UserType) => void;
  reset: () => void;
}

export const useCurrentUserStore = create<CurrentUserStore>()(
  persist(
    (set) => ({
      currentUser: null,
      updateCurrentUser: (current: UserType) => {
        set({ currentUser: current });
      },
      reset: () => {
        set({ currentUser: null });
      },
    }),
    {
      name: "current-user-storage",
      partialize: (state) => ({ currentUser: state.currentUser }),
    },
  ),
);
