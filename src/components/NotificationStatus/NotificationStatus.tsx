const NotificationStatus = ({ status }: { status: string }) => {
  const pendingState = {
    text: "text-yellow-400",
    bg: "bg-yellow-400",
  };
  const newState = {
    text: "text-green-400",
    bg: "bg-green-400",
  };
  const seenState = {
    text: "text-gray-600",
    bg: "bg-gray-600",
  };
  const acceptedState = {
    text: "text-sky-500",
    bg: "bg-sky-500",
  };
  const declinedState = {
    text: "text-red-500",
    bg: "bg-red-500",
  };
  return (
    <div className="flex justify-start items-center gap-x-1">
      <span
        className={`${status === "pending" ? pendingState.bg : status === "new" ? newState.bg : status === "seen" ? seenState.bg : status === "accepted" ? acceptedState.bg : status === "declined" ? declinedState.bg : ""} w-2 h-2 rounded-full`}
      ></span>
      <p
        className={`${status === "pending" ? pendingState.text : status === "new" ? newState.text : status === "seen" ? seenState.text : status === "accepted" ? acceptedState.text : status === "declined" ? declinedState.text : ""} text-xs`}
      >
        {status.toUpperCase()}
      </p>
    </div>
  );
};
export default NotificationStatus;
