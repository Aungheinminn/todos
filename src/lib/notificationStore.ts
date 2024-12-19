import { create } from "zustand";

interface NotificationStore {
  pendingNotifications: any[];
  updatePendingNotifications: (notifications: any) => void;
  updatePendingNotification: (notification: any) => void;
  resetPendingNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  pendingNotifications: [],
  updatePendingNotifications: (notifications) => {
    set({ pendingNotifications: notifications });
  },
  updatePendingNotification: (notification) => {
    const notifications = get().pendingNotifications;

    console.log("pending notification", notification, notifications, [
      ...notifications, notification]);
    set({ pendingNotifications: [...notifications, notification] });
  },
  resetPendingNotifications: () => set({ pendingNotifications: [] }),
}));
