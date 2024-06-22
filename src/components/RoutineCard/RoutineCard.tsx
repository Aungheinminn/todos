import Image from "next/image";
import routine from "@/assets/routines.svg"
import deleteRoutine from "@/assets/delete.svg"
import editRoutine from "@/assets/edit.svg"

const RoutineCard = () => {
    return (
        <div className="w-full flex justify-between items-center bg-[#334155] p-3 rounded-md">
            <div className="flex justify-center items-center gap-x-2">
                <Image src={routine} alt="routine" width={50} height={30} />                
                <p className="text-xl font-medium text-[#22d3ee]">Sample Name</p>
            </div>

            <div className="flex justify-center items-center gap-x-1">
                <button className="border-2 border-[#fdba74] rounded-lg">
                    <Image className="p-1" src={editRoutine} alt="routine" width={30} height={30} />
                </button>
                <button className="border-2 border-red-500 rounded-lg">
                    <Image className="p-1" src={deleteRoutine} alt="routine" width={30} height={30} />
                </button>
            </div>
        </div>
    );
}
export default RoutineCard