"use client"

import { Suspense, useState } from "react"
import ItemsLoading from "./loading"
import ItemCardComponent from "@/components/ItemCardComponent/ItemCardComponent"
import { Button } from "@/components/ui/button"
import Search from "@/components/Search/Search"
import { getRoutinesByPlanId, getRoutinesByUserId } from "@/lib/routines.service"
import { useQuery } from "react-query"
import { getPlanById, getPlans, getPlansByUser } from "@/lib/plan.service"
import { useCurrentUserStore } from "@/lib/userStore"
import { getCurrentUser } from "@/lib/users.service"
import Loading from "@/components/Loading/Loading"
import { RoutineType } from "@/lib/types/routine.type"

type ItemsHeaderProps = {
    search: string;
    onChange: (search: string) => void;
    handleAddItem: (item: any) => void;
}

type ItemsBodyProps = {
    routines: RoutineType[];
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

const ItemsBody:React.FC<ItemsBodyProps> = ({ routines }) => {
    return (
        <div className="w-full mt-4 grid grid-cols-1 px-1 gap-y-2">
            { routines.map(routine => <ItemCardComponent key={routine._id} name={routine.name} description={routine.description} />)}
            {/* <ItemCardComponent name="Sample namenamenamenamenamenamenamenamenamenamenamenamenamename" description="Sample descdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdesc" /> */}
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


    const { data: plans, isLoading: isPlansLoading } = useQuery({
        queryKey: ['plans'],
        queryFn: () => getPlansByUser(currentUser?._id ?? ''),
        enabled: !!currentUser
    })


    const { data: routines, isLoading: isRoutinesLoading } = useQuery({
        queryKey: ['routines'],
        queryFn: () => getRoutinesByUserId(currentUser?._id ?? ''),
        enabled: !!plans && !!currentUser
    })

    const handleChange = (key: string) => {
        setSearchText(key)
    }

    const handleAddItem = () => {

    }

    if(!currentUser || isPlansLoading || isRoutinesLoading){
        return <Loading />
    }

    return (
        <Suspense fallback={<ItemsLoading />}>
            <div className="pt-[55px] w-full">
                <ItemsHeader search={searchText} onChange={handleChange} handleAddItem={handleAddItem} />
                <ItemsBody routines={routines} />                
            </div>

        </Suspense>
    )
}

export default Items