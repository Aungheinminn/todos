import { set } from "date-fns"
import { create } from "zustand"

interface DetailPopupStore {
    isOpen: boolean
    openPopup: () => void
    closePopup: () => void
    popupData: {
        title: string
        name: string
    }
}

interface ActionPopupStore {
    isOpen: boolean
    openPopup: () => void
    closePopup: () => void
    popupData: {
        name: string;        
        description?: string
        type: string;
        process: (data: any) => void;
        items?: any;
    }
}

export const usePopupStore = create<DetailPopupStore>((set) => ({
    isOpen: false,
    openPopup: () => set({ isOpen: true }),
    closePopup: () => set({ isOpen: false }),
    popupData: {
        title: '',
        name: '',
    }
}))

export const useActionPopupStore = create<ActionPopupStore>((set) => ({
    isOpen: false,
    openPopup: () => set({ isOpen: true }),
    closePopup: () => set({ isOpen: false }),
    popupData: {
        name: '',        
        description: '',
        type: '',
        process: () => {},
        items: []
    }
}))