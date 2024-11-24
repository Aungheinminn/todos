import { create } from "zustand";
import { PlanType } from "./types/plan.type";

interface DetailPopupStore {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  popupData: {
    title: string;
    name: string;
  };
}

interface CreatePopupStore {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  popupData: {
    name: string;
    description?: string;
    type: string;
    dropdownItems?: PlanType[];
    process: (data: any) => void;
  };
}

interface EditPopupStore {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  popupData: {
    id?: string;
    userId: string;
    name: string;
    description?: string;
    type: string;
    process: (data: any) => void;
  };
}

interface DeletePopupStore {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  popupData: {
    itemToDelete: string;
    process: (data: string) => void;
  };
}

interface ItemDetailsPopupStore {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  popupData: {
    date: string;
    plan: string;
    routines: string[];
    user_id: string;
  };
}

export const usePopupStore = create<DetailPopupStore>((set) => ({
  isOpen: false,
  openPopup: () => set({ isOpen: true }),
  closePopup: () => set({ isOpen: false }),
  popupData: {
    title: "",
    name: "",
  },
}));

export const useCreatePopupStore = create<CreatePopupStore>((set) => ({
  isOpen: false,
  openPopup: () => set({ isOpen: true }),
  closePopup: () => set({ isOpen: false }),
  popupData: {
    name: "",
    description: "",
    type: "",
    dropdownItems: [],
    process: () => {},
  },
}));

export const useEditPopupStore = create<EditPopupStore>((set) => ({
  isOpen: false,
  openPopup: () => set({ isOpen: true }),
  closePopup: () => set({ isOpen: false }),
  popupData: {
    id: "",
    userId: "",
    name: "",
    description: "",
    type: "",
    process: () => {},
  },
}));

export const useDeletePopupStore = create<DeletePopupStore>((set) => ({
  isOpen: false,
  openPopup: () => set({ isOpen: true }),
  closePopup: () => set({ isOpen: false }),
  popupData: {
    itemToDelete: "",
    process: () => {},
  },
}));

export const useItemDetailsPopupStore = create<ItemDetailsPopupStore>((set) => ({
  isOpen: false,
  openPopup: () => set({ isOpen: true }),
  closePopup: () => set({ isOpen: false }),
  popupData: {
    date: "",
    plan: "",
    routines: [],
    user_id: "",
  },
}));

