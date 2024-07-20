"use client"
import Progressbar from "@/components/Progressbar/Progressbar"
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Cookies from 'js-cookie';
import { createItems } from "@/lib/items.service";


const Home = ({params}: { params: { slug: string}}) => {
    const [selectedDates, setSelectedDates] = useState<any[]>([])
    const handleAddDate = async () => {
        const newDate = new Date() as any
        console.log(newDate, typeof newDate)
        setSelectedDates([...selectedDates, newDate])
        await createItems({date: newDate})
    }
    const handleRemoveDate = () => {
        //No need yet
    }
    console.log(selectedDates)

    return (
        <div className="w-full pt-[50px] text-black flex items-center flex-col">
            <h1>Home {params.slug}</h1>
            <div className="w-full flex items-center justify-center">
                <DayPicker
                    mode="multiple"
                    selected={selectedDates}
                />
            </div>
            <div className="w-full flex justify-center items-center gap-x-3">
                <button className="cursor-pointer w-[150px] h-[40px] bg-[#0ea5e9] rounded-md text-white text-md font-normal" onClick={handleAddDate}>Commit</button>
                <button className="cursor-pointer w-[150px] h-[40px] bg-[#be123c] rounded-md text-white text-md font-normal" onClick={handleRemoveDate}>Remove</button>
            </div>

            <div className="w-[90%] flex items-center justify-center px-5">
                <Progressbar /> 
            </div>
        </div>
    )
}
export default Home

