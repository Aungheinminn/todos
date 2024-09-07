import { set } from "date-fns"
import { create } from "zustand"

interface PopupStore {
    isOpen: boolean
    openPopup: () => void
    closePopup: () => void
    popupData: {
        title: string
        name: string
    }
}

export const usePopupStore = create<PopupStore>((set) => ({
    isOpen: false,
    openPopup: () => set({ isOpen: true }),
    closePopup: () => set({ isOpen: false }),
    popupData: {
        title: '',
        name: '',
    }
}))