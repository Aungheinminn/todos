"use client"
import { useDeletePopupStore } from "@/lib/popupStore"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTitle } from "../ui/alert-dialog"

const DeletePopup = () => {
    const { isOpen, closePopup, popupData } = useDeletePopupStore(state => state)
    const handleDelete = () => {
        popupData.process(popupData.itemToDelete)
        closePopup()
    }
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent className="w-[320px] bg-[#334155] border-2 border-red-500 rounded-lg">
                <AlertDialogTitle className="whitespace-nowrap text-base">
                    Are you really sure to delete this item?
                </AlertDialogTitle>
                <h3 className="mb-1">This action can be undone.</h3>
                <AlertDialogFooter className="w-full flex flex-row justify-ceter items-center gap-x-1">
                    <AlertDialogCancel className="text-black w-1/2 m-0 p-0" onClick={closePopup}>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="w-1/2 m-0 p-0 bg-red-500" onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeletePopup