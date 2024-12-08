import { NotificationTypes } from "./NotificationsHandlerUtils";

const NotificationTypeHandler = ({ notification }: { notification: any }) => {
  return (
    <>
      {NotificationTypes.map((item, index) => {
        if (item.type === notification.type) {
          const Component = item.component;
          return (
            <Component
              key={notification._id || index}
              {...notification}
            />
          );
        }
      })}
    </>
  );
};

export default NotificationTypeHandler;
