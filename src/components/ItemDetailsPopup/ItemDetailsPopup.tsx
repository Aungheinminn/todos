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
      <AlertDialogContent className="w-[320px] p-6 bg-[#334155] rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="max-w-[270px] text-start text-[#0ea5e9] line-clamp-1"><span className="text-black">Plan:</span> {popupData.plan.name}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="w-full flex flex-col justify-start gap-y-1">
					<span className="text-black font-medium">Routines:</span>
					{ popupData.routines.map(routine => (
						<span className="max-w-[270px] text-white line-clamp-1" key={routine._id}>{routine.name}</span>	
					))}

					<p className="p-1 mt-5 max-w-full text-white bg-gray-600 border-0 rounded-lg line-clamp-1"><span className="mr-2 text-black">Created at:</span>{new Date(popupData.date).toDateString()}</p>
        </AlertDialogDescription>
        <AlertDialogFooter className="flex justify-center items-center">
          <AlertDialogCancel
            className="w-[100px] text-black rounded-lg"
            onClick={() => closePopup()}
          >
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ItemDetailsPopup;
