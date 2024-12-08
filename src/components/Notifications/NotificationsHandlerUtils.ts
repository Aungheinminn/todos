import LinkingAccountNotification from "./LinkingAccountNotification";
type NotificationType = {
  type: string;
  component: () => JSX.Element<{ notification: any }>;
};
export const NotificationTypes: NotificationType[] = [
  {
    type: "LINKING_ACCOUNT",
    component: LinkingAccountNotification,
  },
];
