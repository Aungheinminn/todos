"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useTransactionPopupStore } from "@/lib/stores/transactionPopupStore";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const DeleteTransactionPopup = () => {
  const router = useRouter();
  const {
    isOpen: open,
    setIsOpen: setOpen,
    type,
    transactionDatas,
    resetTransactionDatas,
  } = useTransactionPopupStore((state) => state);

  const handleDeleteTransaction = () => {
    console.log(transactionDatas);
    try {
      transactionDatas.process.mutate(transactionDatas?._id || "", {
        onSuccess: (data: any) => {
          if (data.success) {
            setOpen(false);
            resetTransactionDatas();
            router.push("/transactions");
          }
        },
        onError: (error: any) => {
          console.error(error);
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    resetTransactionDatas();
  };
  return (
    <Drawer open={type === "delete" && open} onOpenChange={setOpen}>
      <DrawerContent className="w-full flex flex-col items-center gap-y-2 pb-3 bg-transparent border-0">
        <div className="w-[98%] flex flex-col items-center bg-gray-700 rounded-lg">
          <DrawerHeader className="hidden"></DrawerHeader>
          <DrawerTitle className="w-full text-center text-sm text-slate-400 border border-slate-500 border-t-0 border-x-0 py-2">
            Delete this transaction?
          </DrawerTitle>
          <Button
            className="w-full hover:bg-transparent bg-transparent text-red-500 text-base"
            onClick={handleDeleteTransaction}
          >
            Delete
          </Button>
        </div>
        <DrawerDescription className="hidden"></DrawerDescription>
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

export default DeleteTransactionPopup;
