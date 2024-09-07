import { create } from 'zustand'
import { UserType } from './types/user.type'

interface CurrentUserStore {
  currentUser: UserType | null
  updateCurrentUser: (current: UserType) => void   
}

export const useCurrentUserStore = create<CurrentUserStore>((set) => ({
  currentUser: null,
  updateCurrentUser: (current: UserType) => set({ currentUser: current }),
}))