"use client"
import { usePopupStore } from "@/lib/popupStore"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "../ui/dialog"
import { Button } from "../ui/button"

const DetailPopup = () => {
    const { isOpen, closePopup, popupData } = usePopupStore()
    return (
        <Dialog open={isOpen} onOpenChange={closePopup}>
            <DialogContent className="w-[300px] flex flex-col bg-[#334155] rounded-lg">
                <DialogHeader className="w-[250px] text-start text-pretty line-clamp-4">
                    <h3 className="text-lg font-semibold">{popupData.title}</h3>
                    <p className="w-[250px] break-words font-medium">{popupData.name}</p>
                </DialogHeader>
                <DialogFooter className="w-[250px] flex justify-end items-end">
                    <Button className="w-[70px]" onClick={closePopup}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DetailPopup