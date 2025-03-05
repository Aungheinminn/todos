import { create } from "zustand";
import { UserType } from "./types/user.type";
import { persist } from "zustand/middleware";

interface CurrentUserStore {
  currentUser: UserType | null;
  updateCurrentUser: (current: UserType) => void;
}

export const useCurrentUserStore = create<CurrentUserStore>()(
  persist(
    (set) => ({
      currentUser: null,
      updateCurrentUser: (current: UserType) => {
        console.log(current, "it is called");
        set({ currentUser: current });
      },
    }),
    {
      name: "current-user-storage",
      partialize: (state) => ({ currentUser: state.currentUser }),
    },
  ),
);
