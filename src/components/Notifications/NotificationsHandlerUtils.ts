import LinkingAcceptFromUser from "./LinkingAcceptFromUser";
import LinkingAccountNotification from "./LinkingAccountNotification";
import LinkingDeclinedFromUser from "./LinkingDeclinedFromUser";
type NotificationType = {
  type: string;
  component: () => JSX.Element<{ notification: any }>;
};
export const NotificationTypes: NotificationType[] = [
  {
    type: "LINKING_ACCOUNT",
    component: LinkingAccountNotification,
  },
  {
    type: "LINKING_ACCEPT",
    component: LinkingAcceptFromUser,
  },
  {
    type: "LINKING_DECLINED",
    component: LinkingDeclinedFromUser,
  },
];
