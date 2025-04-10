import { Skeleton } from "../ui/skeleton";

const RequestsLoading = () => {
  return (
    <div className="w-full flex flex-col gap-y-1 px-1">
      <Skeleton className="w-full h-[100px] bg-gray-700 rounded-none" />
      <Skeleton className="w-full h-[100px] bg-gray-700 rounded-none" />
      <Skeleton className="w-full h-[100px] bg-gray-700 rounded-none" />
    </div>
  );
};

export default RequestsLoading;
