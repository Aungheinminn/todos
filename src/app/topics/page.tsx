'use client'
import Search from "@/components/Search/Search"
import { useState } from "react"

const Topics = () => {
    const [searchText, setSearchText] = useState<string>('')
    const handleChange = (key: string) => {
        setSearchText(key)
    }
    return (
        <div className="w-full min-h-screen pt-[65px] text-black p-1">
                <Search search={searchText} onChange={handleChange} />    
                <div className="bg-[#4ade80] w-full shadow-2xl my-1 mt-5 py-1 px-2 border-2 border-gray-500 rounded-md">
                    <p className="text-3xl text-[#0ea5e9] font-medium mb-1">Label</p>
                    <span className="font-normal">Description</span>
                </div>
        </div>
    )
}
export default Topics