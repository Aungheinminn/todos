import Image from "next/image";
import routine from "@/assets/routines.svg"
import deleteRoutine from "@/assets/delete.svg"
import editRoutine from "@/assets/edit.svg"
import { Skeleton } from "../ui/skeleton";
import TooltipComponent from "../Tooltip/Tooltip";
import planLogo from "@/assets/fitness_icon.svg"
import { PlanType } from "@/lib/types/plan.type";

const CardComponent = ({ plan }: {
    plan: PlanType;
}) => {
    const date = plan.date ? new Date(plan.date).toUTCString().split(' ').slice(0, 3).join(' ') : '' ;
     
    return (
        <div className="w-full flex justify-center items-center gap-x-3 bg-[#cbd5e1] p-2 rounded-md cursor-pointer">
            <div className="w-[80px] h-[50px] flex justify-center items-center p-2 bg-[#0ea5e9] opacity-40 border-2 border-white rounded-md">
                <Image className="w-[70px] h-full" src={planLogo} alt="plan logo" />
            </div>
            <div className="w-full flex flex-col justify-start items-start text-[#64748b]">
                <TooltipComponent text={plan.name} />
                <span className="text-sm">{date}</span>
            </div>
        </div>
    );
}
export default CardComponent