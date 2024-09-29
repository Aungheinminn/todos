"use client"

import { Suspense, useState } from "react"
import ItemsLoading from "./loading"
import ItemCardComponent from "@/components/ItemCardComponent/ItemCardComponent"
import { Button } from "@/components/ui/button"
import Search from "@/components/Search/Search"
import { getRoutinesByPlanId } from "@/lib/routines.service"
import { useQuery } from "react-query"
import { getPlanById, getPlans, getPlansByUser } from "@/lib/plan.service"
import { useCurrentUserStore } from "@/lib/userStore"
import { getCurrentUser } from "@/lib/users.service"

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

    const { currentUser, updateCurrentUser } = useCurrentUserStore(state=> state)
    
    useQuery('currentUser', getCurrentUser, {
        onSuccess: (data) => {
            updateCurrentUser(data.data.currentUser)
            console.log('data', data)
        }
    })


    const { data: plan, isLoading: isPlanLoading } = useQuery({
        queryKey: ['plan'],
        queryFn: () => getPlansByUser(currentUser?._id ?? ''),
        enabled: !!currentUser
    })


    const { data: routines, isLoading: isRoutinesLoading } = useQuery({
        queryKey: ['routines', plan?._id],
        queryFn: () => getRoutinesByPlanId(plan?._id),
        enabled: !!plan
    })

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