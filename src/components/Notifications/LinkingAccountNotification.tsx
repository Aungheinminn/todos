import { NotificationType } from "@/lib/types/notification.type";
import { Button } from "../ui/button";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

const LinkingAccountNotification = ({
  _id,
  from,
  content,
  last_seen,
}: NotificationType) => {
  TimeAgo.addLocale(en);
  const date = new TimeAgo("en-US").format(new Date(last_seen)).split(" ");
  const time = date[0] + " " + date[1];
  console.log(date);
  return (
    <div
      key={_id}
      className="w-full flex flex-col justify-start bg-gray-400 py-2 px-3 gap-2 rounded-lg"
    >
      <div className="w-full flex justify-start gap-x-2">
        <div className="flex shrink-0 justify-center items-center text-white bg-gray-600 h-12 w-12 rounded-full">
          <p>{from.name && from.name.slice(0, 2)}</p>
        </div>
        <p className="max-w-[80%] text-black line-clamp-2 overflow-y-hidden">
          {content.message}
        </p>
      </div>
      <div className="flex justify-center items-center gap-x-2 ">
        <Button className="bg-sky-500 px-6">Accept</Button>
        <Button className="px-6">Decline</Button>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <div
          className={`w-2 h-2 rounded-full ${time === "just now" ? "bg-green-400" : "bg-gray-600"}`}
        ></div>
        <p
          className={`text-xs ${time === "just now" ? "text-green-400" : "text-gray-800"} `}
        >
          {time}
        </p>
      </div>
    </div>
  );
};

export default LinkingAccountNotification;
