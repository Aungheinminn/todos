import { NotificationType } from "@/lib/types/notification.type";

type NotificationsHandlerProps = {
  notifications: any[];
};
const NoticationsHandler: React.FC<NotificationsHandlerProps> = ({
  notifications,
}) => {
  return (
    <div>
      {notifications &&
        notifications.map((noti, index) => (
          <div className="text-black" key={index}>
            {noti.status} {noti.type}
          </div>
        ))}
    </div>
  );
};

export default NoticationsHandler;
