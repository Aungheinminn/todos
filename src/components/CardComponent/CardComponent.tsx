import Image from "next/image";
import routine from "@/assets/routines.svg"
import deleteRoutine from "@/assets/delete.svg"
import editRoutine from "@/assets/edit.svg"
import { Skeleton } from "../ui/skeleton";
import TooltipComponent from "../Tooltip/Tooltip";
import planLogo from "@/assets/plan.svg"
import more from "@/assets/more.svg"
import editIcon from "@/assets/edit.svg"
import deleteIcon from "@/assets/remove.svg"

import hoverMore from "@/assets/hover_more.svg"
import { PlanType } from "@/lib/types/plan.type";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useDeletePopupStore, useEditPopupStore } from "@/lib/popupStore";

const PopoverComponent = ({ plan, onEdit, onDelete }: {
    plan: PlanType,
    onEdit: ({ id, data}: {
        id: string,
        data: PlanType
    }) => void;
    onDelete: (id: string) => void;
}) => {
    const { openPopup: openDeletePopup, popupData: deletePopupData } = useDeletePopupStore(state => state)
    const { openPopup: openEditPopup, popupData: editPopupData } = useEditPopupStore(state => state)
    const handleDelete = () => {
        deletePopupData.itemToDelete = plan._id ? plan._id : ''
        deletePopupData.process = onDelete        
        openDeletePopup();
    }

    const handleEdit = () => {
        editPopupData.id = plan._id
        editPopupData.name = plan.name
        editPopupData.description = plan.description
        editPopupData.userId = plan.user_id
        editPopupData.type = 'editPlan'
        editPopupData.process = onEdit
        openEditPopup()
    }
    return (
        <Popover>
            <PopoverTrigger className="group p-[2px] border-2 border-[#78717C] hover:border-[#E7E5E6] rounded-md">
                {/* <button className="group p-[2px] border-2 border-[#78717C] hover:border-[#E7E5E6] rounded-md"> */}
                    <Image className="block group-hover:hidden" src={more} alt="more" />
                    <Image className="hidden group-hover:block" src={hoverMore} alt="hover more" />
                {/* </button> */}
            </PopoverTrigger>
            <PopoverContent className="p-1 flex flex-col gap-y-1">
                <div onClick={handleEdit} className="cursor-pointer flex justify-start items-center gap-x-3 w-full hover:bg-[#E7E5E4] rounded-md p-2">
                    <Image src={editIcon} alt="edit"/>
                    <p className="text-md font-medium">Edit</p>
                </div>
                <div onClick={handleDelete} className="cursor-pointer flex justify-start items-center gap-x-3 w-full hover:bg-[#E7E5E4] rounded-md p-2">
                    <Image src={deleteIcon} alt="delete"/>
                    <p className="text-md font-medium">Delete</p>
                </div>
            </PopoverContent>
        </Popover>
    )
}

const CardComponent = ({ plan, onEdit, onDelete }: {
    plan: PlanType;
    onEdit: ({ id, data}: {
        id: string,
        data: PlanType
    }) => void;
    onDelete: (id: string) => void;
}) => {
    const date = plan.createdAt ? new Date(plan.createdAt).toUTCString().split(' ').slice(0, 4).join(' ') : '' ;
     
    return (
        <div className="transition-all w-full flex flex-col justify-start gap-3 bg-[#cbd5e1] border-2 border-[#78717C] p-2 rounded-lg cursor-pointer hover:border-[#5b21b6]">
            <div className="flex gap-x-3 border-b border-[#E7E5E4] pb-3 pt-1">
                <div className="w-[50px] h-[50px] p-2 bg-[#0ea5e9] opacity-40 border-2 border-white rounded-md">
                    <Image className="w-full h-full" src={planLogo} alt="plan logo" />
                </div>
                <div className="flex flex-col items-start">
                    <TooltipComponent text={plan.name} />
                    <p className="text-sm line-clamp-1">{plan.description}</p>
                </div>
            </div>

            <div className="flex justify-between items-center pb-2">
                <div className="flex justify-start items-center gap-x-2 text-black">
                    <span className="text-md text-[#78717C] font-medium">Created At:</span>
                    <span className="text-md">{date}</span>                   
                </div>
                <div onClick={(e) => e.preventDefault()}>
                    <PopoverComponent plan={plan} onEdit={onEdit} onDelete={onDelete} />
                </div>
            </div>
        </div>
    );
}
export default CardComponent