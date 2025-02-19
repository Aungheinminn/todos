import { Skeleton } from "../ui/skeleton";
const BudgetBodyLoading = () => {
  return (
    <div className="w-full px-1 flex flex-col gap-y-2">
      <Skeleton className="w-full h-[76px] bg-slate-500 rounded-lg" />
      <Skeleton className="w-full h-[76px] bg-slate-500 rounded-lg" />
      <Skeleton className="w-full h-[76px] bg-slate-500 rounded-lg" />
      <Skeleton className="w-full h-[76px] bg-slate-500 rounded-lg" />
      <Skeleton className="w-full h-[76px] bg-slate-500 rounded-lg" />
    </div>
  );
};

export default BudgetBodyLoading;
