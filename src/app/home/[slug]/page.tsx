"use client"
import { Suspense, useState } from "react";
import { DayPicker } from "react-day-picker";
import { createItems } from "@/lib/items.service";
import { useQuery } from "react-query";
import { getCurrentUser } from "@/lib/users.service";
import { useCurrentUserStore } from "@/lib/userStore";
import Badge from "@/components/Badge/Badge";
import 'react-day-picker/dist/style.css'
import { dayStyle, headStyle, navStyle, headCellStyle, monthStyle, cellStyle, tableStyle } from "@/local_consts/daypicker.styles"
import HomeLoading from "./loading";

const Home = ({ params }: { params: { slug: string}}) => {
    const { currentUser, updateCurrentUser } = useCurrentUserStore(state => state)
    const [selectedDates, setSelectedDates] = useState<any[]>([])
    useQuery('currentUser', getCurrentUser, {
        onSuccess: (data) => {
            updateCurrentUser(data.data.currentUser)
        }
    })
    console.log('current',currentUser)

    const handleAddDate = async () => {
        const newDate = new Date() as any
        console.log(newDate, typeof newDate)
        const data = {
            date: newDate,
            userId: currentUser?._id
        }
        setSelectedDates([...selectedDates, newDate])
        await createItems(data)
        console.log('new date', newDate)
    }
    const handleRemoveDate = () => {
        //No need yet
    }


    return (
        <Suspense fallback={<HomeLoading />}>
            <div className="w-full pt-[50px] text-black flex items-center flex-col justify-center">
                <div className="mt-1" />
                <div className="w-full px-2">
                    <Badge title="Heads up!" desc="You can add components to your app using the cli." />
                </div>
                <div className="w-[95%] flex items-center justify-center my-4 rounded-lg border-2 border-[#34aeeb] bg-[#2C3E50]">
                    <DayPicker
                        styles={{
                            day: dayStyle,
                            caption: headStyle,
                            nav: navStyle,
                            head_cell: headCellStyle,
                            // month: monthStyle,
                            // cell: cellStyle,
                            // table: tableStyle,
                        }}
                        mode="multiple"
                        selected={selectedDates}
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-3">
                    <button className="cursor-pointer w-[150px] h-[40px] bg-[#0ea5e9] rounded-md text-white text-md font-normal" onClick={handleAddDate}>Commit</button>
                    <button className="cursor-pointer w-[150px] h-[40px] bg-[#be123c] rounded-md text-white text-md font-normal" onClick={handleRemoveDate}>Remove</button>
                </div>

            </div>
        </Suspense>
    )
}
export default Home

