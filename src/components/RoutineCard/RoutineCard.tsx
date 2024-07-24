import Image from "next/image";
import routine from "@/assets/routines.svg"
import deleteRoutine from "@/assets/delete.svg"
import editRoutine from "@/assets/edit.svg"
import { Skeleton } from "../ui/skeleton";
import TooltipComponent from "../Tooltip/Tooltip";

const RoutineCard = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center bg-[#334155] p-3 rounded-md">
            <Skeleton className="w-full h-[100px] rounded-md" />
            <div className="w-full flex justify-between items-center gap-x-2 mt-2">
                <TooltipComponent text="View Routine" />
                <div className="flex justify-center items-center gap-x-1">
                    <button className="border-2 border-[#fdba74] rounded-lg">
                        <Image className="p-1" src={editRoutine} alt="routine" width={30} height={30} />
                    </button>
                    <button className="border-2 border-red-500 rounded-lg">
                        <Image className="p-1" src={deleteRoutine} alt="routine" width={30} height={30} />
                    </button>
                </div>
            </div>

        </div>
    );
}
export default RoutineCard