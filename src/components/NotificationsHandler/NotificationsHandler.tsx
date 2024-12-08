import { NotificationType } from "@/lib/types/notification.type";
import NotificationTypeHandler from "../Notifications/NotificationTypeHandler";

type NotificationsHandlerProps = {
  notifications: any[];
};
const NoticationsHandler: React.FC<NotificationsHandlerProps> = ({
  notifications,
}) => {
  return (
    <div className="w-full grid grid-cols-1 gap-y-2 p-1">
      {notifications &&
        notifications.map((noti, index) => (
          <NotificationTypeHandler key={index} notification={noti} />
        ))}
    </div>
  );
};

export default NoticationsHandler;
