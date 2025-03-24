import Image from "next/image";
import dash from "@/assets/dash.svg";
import planIcon from "@/assets/plan.svg";
import { RoutineType } from "@/lib/types/routine.type";
import { useDeletePopupStore } from "@/lib/stores/popupStore";
import { PlanType } from "@/lib/types/plan.type";
import { redirect, useRouter } from "next/navigation";

type ItemCardComponentProps = {
    plan?: PlanType;
    routine: RoutineType;
    handleDelete: (data: string) => void;
}

const ItemCardComponent:React.FC<ItemCardComponentProps> = ({ plan, routine, handleDelete }) => {
    const router = useRouter()
    const { openPopup, popupData } = useDeletePopupStore(state => state)

    const handleDeleteRoutine = () => {
        popupData.itemToDelete = routine._id ?? ''
        popupData.process = handleDelete
        openPopup();
    }
    return (
        <div className="relative p-2 px-4 pb-10 w-full h-[100px] flex flex-col items-start justify-start bg-[#fae8ff] gap-y-1 border-2 border-[#0ea5e9] rounded-xl cursor-pointer ">
            <p className="w-4/5 text-base text-[#0ea5e9] font-medium truncate">{routine.name}</p>
            <span className="w-3/6 text-[#78717C] font-normal truncate">{routine.description}</span>
            <button onClick={handleDeleteRoutine} className="absolute w-5 h-5 flex items-center justify-center top-1 right-2 border-2 border-red-500 hover:border-[#be123c] rounded-md">
                <Image className="rotate-90" src={dash} alt="remove dash" />
            </button>
            <div onClick={() => router.push(`plans/${plan?._id}`)} className="transition-all group absolute flex justify-start items-center bottom-1 left-2 bg-[#0ea5e9] px-2 py-1 rounded-lg max-w-[30px] h-[25px] hover:max-w-[100px]">
                <Image className="block group-hover:hidden w-[30px] h-full" src={planIcon} alt="plan"  />
                <p className="hidden group-hover:block w-full truncate">{plan?.name}</p>
            </div>
        </div>
    )
}

export default ItemCardComponent