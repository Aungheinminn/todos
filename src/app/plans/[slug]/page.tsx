"use client"
import PlansHeader from "@/components/PlansHeader/PlansHeader"
import { createRoutine } from "@/lib/routines.service"
import { RoutineType } from "@/lib/types/routine.type"
import { useState } from "react"

const Plans = ({ params }: { params: { slug: string } }) => {
    console.log('params', params.slug)
    const [selected, setSelected] = useState<string>('')
    const [searchText, setSearchText] = useState<string>('')

    const handleChange = (key: string) => {
        setSearchText(key)
    }

    const handleCreate = async (data: RoutineType) => {
        const res = await createRoutine(data)
        console.log('res',res)
    }
    return (
        <div className="w-full pt-[65px] p-1 px-2 flex flex-col items-center gap-y-6">
            <PlansHeader slug={params.slug || 'Select'} search={searchText} onChange={handleChange} onCreate={handleCreate} />
        </div>
        
    )
}
export default Plans