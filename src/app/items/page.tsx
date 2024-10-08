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
import { useItemMutationHook } from "./itemMutationProvider"
import { useCreatePopupStore } from "@/lib/popupStore"
import { PlanType } from "@/lib/types/plan.type"
import CarouselComponent from "@/components/CarouselComponent/CarouselComponent"
import MutateLoading from "@/components/MutateLoading/MutateLoading"
import NotFound from "@/components/NotFound/NotFound"

type ItemsHeaderProps = {
    plans: PlanType[];
    search: string;
    onChange: (search: string) => void;
    handleAddItem: (item: any) => void;
}

type ItemsBodyProps = {
    isCreateMutating: boolean;
    routines: RoutineType[];
}

const ItemsHeader:React.FC<ItemsHeaderProps> = ({ plans, search, onChange, handleAddItem}) => {
    const { openPopup, popupData } = useCreatePopupStore()
    const handleAdd = () => {
        popupData.name = ''
        popupData.type = 'createRoutine'
        popupData.dropdownItems = plans
        popupData.process = handleAddItem

        openPopup();
    }

    return (
        <div className="w-full">
            <div className="w-full flex justify-between items-center gap-x-2 px-1 my-2">
                <Search search={search} onChange={onChange}  type="normal" />             
                <Button className="bg-[#0ea5e9]" onClick={handleAdd}>Add a Routine</Button>
            </div> 
            <CarouselComponent items={plans}  />          
        </div>

    )
}

const ItemsBody:React.FC<ItemsBodyProps> = ({ isCreateMutating, routines }) => {
    if(routines && routines.length === 0) {
        return <NotFound context="No Routine is found!" />
    }

    if(isCreateMutating){
        return <MutateLoading loadingItemHeight="100px" />
    }
    return (
        <div className="w-full mt-4 grid grid-cols-1 px-1 gap-y-2 mb-[55px]">
            { routines.map(routine => 
                <ItemCardComponent 
                    key={routine._id} 
                    name={routine.name} 
                    description={routine.description} 
                />
            )}
        </div>
    )
}

const Items = () => {
    const [searchText, setSearchText] = useState<string>('')

    const { currentUser, updateCurrentUser } = useCurrentUserStore(state=> state)

    const { createMutation, deleteMutation } = useItemMutationHook()
    
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

    const handleAddItem = async (data: RoutineType) => {
        const item = {
            ...data,
            user_id: currentUser?._id ?? ''
        }
        try {
            createMutation.mutate(item)
        } catch (e) {
            console.error(e)
        }
    }

    if(!currentUser || isPlansLoading || isRoutinesLoading){
        return <Loading />
    }
    
    return (
        <Suspense fallback={<ItemsLoading />}>
            <div className="pt-[55px] w-full">
                <ItemsHeader plans={plans} search={searchText} onChange={handleChange} handleAddItem={handleAddItem} />
                <ItemsBody isCreateMutating={createMutation.isLoading} routines={routines} />                
            </div>

        </Suspense>
    )
}

export default Items