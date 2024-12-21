import { NotificationType } from "@/lib/types/notification.type";
import NotificationTypeHandler from "../Notifications/NotificationTypeHandler";

type NotificationsHandlerProps = {
  handleDeleteNotification: (id: string) => void;
  notifications: any[];
};
const NoticationsHandler: React.FC<NotificationsHandlerProps> = ({
  handleDeleteNotification,
  notifications,
}) => {
  return (
    <div className="w-full grid grid-cols-1 gap-y-2 p-1 mb-[50px] overflow-auto">
      {notifications &&
        notifications.map((noti, index) => (
          <NotificationTypeHandler
            key={index}
            handleDeleteNotification={handleDeleteNotification}
            notification={noti}
          />
        ))}
    </div>
  );
};

export default NoticationsHandler;
