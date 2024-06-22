'use client'
import RoutinesBody from "@/components/RoutinesBody/RoutinesBody"
import RoutinesHeader from "@/components/RoutinesHeader/RoutinesHeader"
import { useState } from "react"

const Routines = () => {
    const [searchText, setSearchText] = useState<string>('')

    const handleChange = (key: string) => {
        setSearchText(key)
    }

    const handleCreate = () => {
        console.log('Create routine')
    }

    return (
        <div className="w-full pt-[65px] p-1 px-2 flex flex-col items-center gap-y-6">
            <RoutinesHeader search={searchText} onChange={handleChange} onCreate={handleCreate} />
            <RoutinesBody />
        </div>
    )
}

export default Routines