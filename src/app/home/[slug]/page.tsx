"use client"
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { createItems } from "@/lib/items.service";
import { useQuery } from "react-query";
import { getCurrentUser } from "@/lib/users.service";
import { useCurrentUserStore } from "@/lib/userStore";


const Home = ({ params }: { params: { slug: string}}) => {
    const { currentUser, updateCurrentUser } = useCurrentUserStore(state => state)
    useQuery('currentUser', getCurrentUser, {
        onSuccess: (data) => {
            updateCurrentUser(data.data.currentUser)
        }
    })

    console.log('current',currentUser)


    const [selectedDates, setSelectedDates] = useState<any[]>([])

    const handleAddDate = async () => {
        const newDate = new Date() as any
        console.log(newDate, typeof newDate)
        // setSelectedDates([...selectedDates, newDate])
        await createItems({date: newDate})
    }
    const handleRemoveDate = () => {
        //No need yet
    }

    return (
        <div className="w-full pt-[50px] text-black flex items-center flex-col">
            <div className="w-[85%] flex items-center justify-center bg-[#38bdf8] my-4 rounded-lg">
                <DayPicker
                    mode="multiple"
                    selected={selectedDates}
                />
            </div>
            <div className="w-full flex justify-center items-center gap-x-3">
                <button className="cursor-pointer w-[150px] h-[40px] bg-[#0ea5e9] rounded-md text-white text-md font-normal" onClick={handleAddDate}>Commit</button>
                <button className="cursor-pointer w-[150px] h-[40px] bg-[#be123c] rounded-md text-white text-md font-normal" onClick={handleRemoveDate}>Remove</button>
            </div>

        </div>
    )
}
export default Home

