import { NotificationType } from "@/lib/types/notification.type";

type NotificationsHandlerProps = {
  notifications: any[];
};
const NoticationsHandler: React.FC<NotificationsHandlerProps> = ({
  notifications,
}) => {
  return (
    <div>
      {notifications && notifications.map((noti) => (
        <div className="text-black" key={noti._id}>
          {noti.status} {noti.type}
        </div>
      ))}
    </div>
  );
};

export default NoticationsHandler;
