import { NotificationTypes } from "./NotificationsHandlerUtils";

const NotificationTypeHandler = ({
  handleDeleteNotification,
  notification,
}: {
  handleDeleteNotification: (id: string) => void;
  notification: any;
}) => {
  return (
    <>
      {NotificationTypes.map((item, index) => {
        if (item.type === notification.type) {
          const Component = item.component;
          return (
            <Component
              key={notification._id || index}
              handleDeleteNotification={handleDeleteNotification}
              notification={notification}
            />
          );
        }
      })}
    </>
  );
};

export default NotificationTypeHandler;
