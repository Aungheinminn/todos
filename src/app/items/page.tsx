"use client"

import { Suspense, useState } from "react"
import ItemsLoading from "./loading"
import ItemCardComponent from "@/components/ItemCardComponent/ItemCardComponent"
import { Button } from "@/components/ui/button"
import Search from "@/components/Search/Search"

type ItemsHeaderProps = {
    search: string;
    onChange: (search: string) => void;
    handleAddItem: (item: any) => void;
}

type ItemsBody = {

}

const ItemsHeader:React.FC<ItemsHeaderProps> = ({ search, onChange, handleAddItem}) => {
    return (
        <div className="w-full flex justify-between items-center gap-x-2 px-1 my-2">
            <Search search={search} onChange={onChange}  type="normal" />             
            <Button className="bg-[#0ea5e9]" onClick={handleAddItem}>Add a plan</Button>
        </div>
    )
}

const ItemsBody = () => {
    return (
        <div className="w-full grid grid-cols-1 px-1">
            <ItemCardComponent name="Sample namenamenamenamenamenamenamenamenamenamenamenamenamename" description="Sample descdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdesc" />
        </div>
    )
}

const Items = () => {
    const [searchText, setSearchText] = useState<string>('')

    const handleChange = (key: string) => {
        setSearchText(key)
    }

    const handleAddItem = () => {

    }

    return (
        <Suspense fallback={<ItemsLoading />}>
            <div className="pt-[50px] w-full">
                <ItemsHeader search={searchText} onChange={handleChange} handleAddItem={handleAddItem} />
                <ItemsBody />                
            </div>

        </Suspense>
    )
}

export default Items