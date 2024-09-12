import Image from "next/image";
import routine from "@/assets/routines.svg"
import deleteRoutine from "@/assets/delete.svg"
import editRoutine from "@/assets/edit.svg"
import { Skeleton } from "../ui/skeleton";
import TooltipComponent from "../Tooltip/Tooltip";
import planLogo from "@/assets/fitness_icon.svg"

const CardComponent = ({ title }: {
    title: string;
}) => {
    return (
        <div className="w-full flex justify-center items-center gap-x-3 bg-[#cbd5e1] p-2 rounded-md cursor-pointer">
            <div className="w-[80px] h-[50px] flex justify-center items-center p-2 bg-[#0ea5e9] opacity-40 border-2 border-white rounded-md">
                <Image className="w-[70px] h-full" src={planLogo} alt="plan logo" />
            </div>
            <div className="w-full h-[50px] flex justify-start items-start">
                <TooltipComponent text={title} />
            </div>
        </div>
    );
}
export default CardComponent