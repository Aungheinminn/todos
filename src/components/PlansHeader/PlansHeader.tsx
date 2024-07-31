'use client'
import { useState } from "react";
import Search from "../Search/Search";
import PopupComponent from "../Popup/Popup";
import { RoutineType } from "@/lib/types/routine.type";
import SelectComponent from "../Select/Select";
import Link from "next/link";

type PlansHeaderProps = {
    slug: string;
    search: string;
    onChange: (searchKey: string) => void;
    onCreate: (data: RoutineType) => void;
}
const PlansHeader:React.FC<PlansHeaderProps> = ({ slug, search, onChange, onCreate }) => {
    const [animate, setAnimate] = useState<boolean>(false)
    const handleAnimate = () => {
        setAnimate(!animate)
    }
    return (
        <div className="w-full flex flex-col justify-start items-center gap-2">
            {/* <Link className="text-black" href="/">Plans</Link> */}
            <div className="w-full flex justify-between items-center gap-x-2">
                <Search search={search} onChange={onChange} onAnimate={handleAnimate}  type="normal" />             
                <PopupComponent process={onCreate} trigger="Create" />
            </div>
            <div className="w-full flex justify-end">
                <SelectComponent defaultValue={slug} />
            </div>

        </div>
    );
}
export default PlansHeader;