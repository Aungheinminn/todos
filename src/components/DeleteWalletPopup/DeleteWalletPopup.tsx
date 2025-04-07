"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useWalletPopupStore } from "@/lib/stores/walletPopupStore";

const DeleteWalletPopup = () => {
  const {
    isOpen: open,
    setIsOpen: setOpen,
    type,
    walletDatas,
    resetWalletDatas,
  } = useWalletPopupStore((state) => state);

  const handleDeleteTransaction = () => {
    try {
      walletDatas.process.mutate(
        {
          wallet_id: walletDatas?._id || "",
        },
        {
          onSuccess: (data: any) => {
            if (data.success) {
              setOpen(false);
              resetWalletDatas();
            }
          },
          onError: (error: any) => {
            console.error(error);
          },
        },
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    resetWalletDatas();
  };
  return (
    <Drawer open={type === "delete" && open} onOpenChange={setOpen}>
      <DrawerContent className="w-full flex flex-col items-center gap-y-2 pb-3 bg-transparent border-0">
        <DrawerTitle className="hidden"></DrawerTitle>
        <div className="w-[98%] flex flex-col items-center bg-gray-700 rounded-lg">
          <DrawerHeader className="w-full border border-slate-500 border-t-0 border-x-0">
            <DrawerTitle className="w-full text-center text-sm text-slate-400">
              Delete this Wallet?
            </DrawerTitle>
            <DrawerDescription className="w-full text-center text-xs text-slate-400 ">
              This will permanently delete this wallet along with its related
              Transactions
            </DrawerDescription>
          </DrawerHeader>
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

export default DeleteWalletPopup;
