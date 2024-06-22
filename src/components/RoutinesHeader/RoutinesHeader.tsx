'use client'
import { useState } from "react";
import Search from "../Search/Search";
type RoutinesHeaderProps = {
    search: string;
    onChange: (searchKey: string) => void;
    onCreate: () => void;
}
const RoutinesHeader:React.FC<RoutinesHeaderProps> = ({ search, onChange, onCreate }) => {
    const [animate, setAnimate] = useState<boolean>(false)
    const handleAnimate = () => {
        setAnimate(!animate)
    }
    return (
        <div className="w-full flex justify-end items-center gap-2">
            <div className="w-[90%] flex justify-between items-center">
                <p className={`text-[#3b82f6] text-xl font-normal ${ animate === false ? 'block' : 'hidden'}`}>Routines</p>
                <Search search={search} onChange={onChange} onAnimate={handleAnimate}  type="animated" />            
            </div>
            <button className={`w-[90px] h-[40px] bg-[#0ea5e9] border-0 rounded-lg p-2 `} onClick={onCreate}>Create</button>

        </div>
    );
}
export default RoutinesHeader