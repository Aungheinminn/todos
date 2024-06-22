import Image from "next/image"
import topic from "@/assets/topics.svg"
import editRoutine from "@/assets/edit.svg"
import deleteRoutine from "@/assets/delete.svg"

const TopicCard = () => {
    return (
        <div className="w-full flex justify-between items-center">
            <div className="w-full flex justify-start items-center">
                <Image className="p-1" src={topic} alt="routine" width={30} height={30} />
                <p className="font-medium text-sm">Items 1</p>
            </div>
            <div className="w-full flex justify-end items-center gap-y-2">
                <button className="border-2 border-[#fdba74] rounded-lg">
                    <Image className="p-1" src={editRoutine} alt="routine" width={20} height={20} />
                </button>
                <button className="border-2 border-red-500 rounded-lg ml-1">
                    <Image className="p-1" src={deleteRoutine} alt="routine" width={20} height={20} />
                </button>
            </div>
        </div>
    )
}

export default TopicCard