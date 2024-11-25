"use client";
import { usePopupStore } from "@/lib/popupStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

const DetailPopup = () => {
  const { isOpen, closePopup, popupData } = usePopupStore();
  return (
    <Dialog open={isOpen} onOpenChange={closePopup}>
      <DialogContent className="w-[300px] flex flex-col bg-[#334155] rounded-lg">
        <DialogHeader className="w-[250px] text-start text-pretty line-clamp-4">
          <DialogTitle className="text-lg font-semibold">
            {popupData.title}
          </DialogTitle>
          <DialogDescription className="w-[250px] break-words font-medium">
            {popupData.name}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-[250px] flex justify-end items-end">
          <Button className="w-[70px]" onClick={closePopup}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailPopup;
