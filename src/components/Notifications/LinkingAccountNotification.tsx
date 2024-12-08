import { NotificationType } from "@/lib/types/notification.type";
import { Button } from "../ui/button";

const LinkingAccountNotification = ({
  _id,
  from,
  content,
}: NotificationType) => {
  return (
    <div
      key={_id}
      className="w-full flex flex-col justify-start bg-gray-400 py-2 px-3 gap-x-2 rounded-lg"
    >
      <div className="w-full flex justify-start gap-x-2">
        <div className="flex justify-center items-center text-white bg-gray-600 h-12 w-12 rounded-full">
          <p>{from.slice(0, 2)}</p>
        </div>
        <p className="max-w-[80%] text-black line-clamp-2 overflow-y-hidden">
          {content.message}
        </p>
      </div>
      <div className="flex justify-center items-center gap-x-2 ">
        <Button className="bg-sky-500 px-6">Accept</Button>
        <Button className="px-6">Decline</Button>
      </div>
    </div>
  );
};

export default LinkingAccountNotification;
