"use client"
import { Suspense, useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { createItems } from "@/lib/items.service";
import { useQuery } from "react-query";
import { getCurrentUser } from "@/lib/users.service";
import { useCurrentUserStore } from "@/lib/userStore";
import Badge from "@/components/Badge/Badge";
import 'react-day-picker/dist/style.css'
import HomeLoading from "./loading";

const Home = () => {
    const { currentUser, updateCurrentUser } = useCurrentUserStore(state => state)
    const [selectedDates, setSelectedDates] = useState<any[]>([])
    useQuery('currentUser', getCurrentUser, {
        onSuccess: (data) => {
            updateCurrentUser(data.data.currentUser)
        }
    })
    console.log('current',currentUser)

    // const handleAddDate = async () => {
    //     const newDate = new Date() as any
    //     console.log(newDate, typeof newDate)
    //     const data = {
    //         date: newDate,
    //         userId: currentUser?._id
    //     }
    //     setSelectedDates([...selectedDates, newDate])
    //     await createItems(data)
    //     console.log('new date', newDate)
    // }
    // const handleRemoveDate = () => {
    //     //No need yet
    // }

    return (
        <Suspense fallback={<HomeLoading />}>
            <div className="w-full pt-[55px] text-black flex items-center flex-col justify-center">
                <div className="mt-1" />
                <div className="w-full px-2">
                    <Badge title="Heads up!" desc="You can add components to your app using the cli." />
                </div>
                <div className="w-full"> 
                    <DayPicker
                        classNames={{
                            month: `bg-[#2c3e50] w-full px-3 py-2 border-2 border-[#34aeeb] rounded-md`,
                            table: `w-full mt-2`,
                            caption_label: `text-[#34aeeb] font-bold `,
                            nav: `flex justify-between items-center gap-x-2 text-[#34aeeb]`,
                            head_cell: `w-[50px] text-[#34aeeb] font-bold`,
                            button: ``,
                            button_reset: ``,
                            day: `h-[30px] text-[#34aeeb] hover:bg-[#34aeeb] hover:text-white rounded-full px-2`
                        
                        }}
                         mode="multiple"
                        selected={selectedDates}
                    />
                </div>
            </div>
        </Suspense>
    )
}
export default Home

