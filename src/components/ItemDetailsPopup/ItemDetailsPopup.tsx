"use client";
import { useItemDetailsPopupStore } from "@/lib/popupStore";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

const ItemDetailsPopup = () => {
  const { isOpen, closePopup, popupData } = useItemDetailsPopupStore();
  console.log(popupData);
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Details</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="w-full flex flex-col justify-start">
          <span>aaa</span>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => closePopup()}>
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ItemDetailsPopup;
