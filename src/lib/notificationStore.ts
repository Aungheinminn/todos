import { create } from "zustand";

interface NotificationStore {
  pendingNotifications: any[];
  updatePendingNotifications: (notifications: any[]) => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  pendingNotifications: [],
  updatePendingNotifications: (notifications) => {
    const pendingNotis = get().pendingNotifications;
    if(pendingNotis.length > 0) {
      notifications = [...pendingNotis, ...notifications]
    }
    set({ pendingNotifications: notifications })
    }
}));
