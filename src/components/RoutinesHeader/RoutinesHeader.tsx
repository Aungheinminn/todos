'use client'
import { useState } from "react";
import Search from "../Search/Search";
import PopupComponent from "../Popup/Popup";
import { RoutineType } from "@/lib/types/routine.type";

type RoutinesHeaderProps = {
    search: string;
    onChange: (searchKey: string) => void;
    onCreate: (data: RoutineType) => void;
}
const RoutinesHeader:React.FC<RoutinesHeaderProps> = ({ search, onChange, onCreate }) => {
    const [animate, setAnimate] = useState<boolean>(false)
    const handleAnimate = () => {
        setAnimate(!animate)
    }
    return (
        <div className="w-full flex flex-col justify-start items-center gap-2">
            <div className="w-full flex justify-between items-center gap-x-2">
                <Search search={search} onChange={onChange} onAnimate={handleAnimate}  type="normal" />             
                {/* <button className={`w-[90px] h-[40px] bg-[#0ea5e9] border-0 rounded-lg p-2 `} onClick={onCreate}>Create</button> */}
                <PopupComponent process={onCreate} trigger="Create" />
            </div>
            <p className={`w-full text-[#3b82f6] text-xl font-normal text-left ${ animate === false ? 'block' : 'hidden'}`}>Routines</p>

        </div>
    );
}
export default RoutinesHeader