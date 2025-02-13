"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useBudgetPopupStore } from "@/lib/budgetPopupStore";

const DeleteBudgetPopup = () => {
  const router = useRouter();
  const {
    isOpen: open,
    setIsOpen: setOpen,
    type,
    budgetDatas,
    resetBudgetDatas,
  } = useBudgetPopupStore((state) => state);

  const handleDeleteTransaction = () => {
  };

  const handleCancel = () => {
    setOpen(false);
    resetBudgetDatas();
  };
  return (
    <Drawer open={type === "delete" && open} onOpenChange={setOpen}>
      <DrawerContent className="w-full flex flex-col items-center gap-y-2 pb-3 bg-transparent border-0">
        <div className="w-[98%] flex flex-col items-center bg-gray-700 rounded-lg">
          <DrawerHeader className="hidden"></DrawerHeader>
          <p className="w-full text-center text-sm text-slate-400 border border-slate-500 border-t-0 border-x-0 py-2">
            Delete this transaction?
          </p>
          <Button
            className="w-full hover:bg-transparent bg-transparent text-red-500 text-base"
            onClick={handleDeleteTransaction}
          >
            Delete
          </Button>
        </div>
        <DrawerClose
          className="w-[98%] text-sky-500 text-base bg-gray-700 py-2 rounded-lg"
          onClick={handleCancel}
        >
          Cancel
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default DeleteBudgetPopup;
